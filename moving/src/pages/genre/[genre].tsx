import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGenreMovies } from '@/hook/genre/useGenreMovies';
import { useGenreStore } from '../../../store/useGenreStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useModal } from '@/lib/hook/useModal';
import ModalFrame from '@/components/modal/ModalFrame';
import DetailModal from '@/components/detail/DetailModal';

const DEFAULT_IMAGE = '/images/defaultPoster.png';

export default function genre() {
  const router = useRouter();
  const { genre } = router.query;
  const { genres, fetchGenres } = useGenreStore(); // 스토어에서 genres와 fetchGenres 사용
  const [genreId, setGenreId] = useState<string | null>(null);
  const { isOpenModal, isOpacity, handleModalOpen, handleModalClose } =
    useModal(); // 모달 연동

  useEffect(() => {
    // 장르 데이터를 가져오는 비동기 작업
    const fetchData = async () => {
      await fetchGenres(); // 스토어의 fetchGenres 호출
    };

    if (genre && genres) {
      // 장르 이름으로 ID 매핑
      const id = Object.entries(genres).find(
        ([_, name]) => name === genre
      )?.[0];
      if (id) setGenreId(id); // 장르 ID 설정
    }

    fetchData();
  }, [fetchGenres, genre, genres]);

  const currentYear = dayjs().year();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGenreMovies({
      genre: genreId || '', // genreId를 사용 (없으면 빈 값)
      year: currentYear,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="pt-[76px]">
      <ModalFrame
        isOpenModal={isOpenModal}
        isOpacity={isOpacity}
        handleModalClose={handleModalClose}
      >
        {isOpenModal && (
          <DetailModal
            isOpacity={isOpacity}
            handleModalClose={handleModalClose}
          />
        )}
      </ModalFrame>
      <div className="mx-[13vw]">
        <h1 className="my-14 text-[40px] font-bold text-white">'{genre}'</h1>
        <section className="mb-16">
          <hr className="mb-9 border-[1px] text-[#f3f3f3]" />
          <ul className="flex flex-wrap gap-[1.4vw]">
            {data?.pages.map((page) =>
              page?.results.map((poster) => {
                const posterPath = poster.poster_path
                  ? `${BASE_IMAGE_URL}${poster.poster_path}`
                  : DEFAULT_IMAGE;
                return (
                  <li key={poster.id}>
                    <div
                      className="h-[230px] w-[22vw] truncate md:h-[23vw] md:w-[11vw] xl:h-[18vw] xl:w-[7.9vw]"
                      onClick={() => {
                        handleModalOpen(poster.id);
                      }}
                    >
                      <div className="relative mb-4 h-[10.2vw] w-[7vw] cursor-pointer">
                        <Image
                          src={posterPath}
                          layout="fill"
                          alt="세로 포스터"
                          className="rounded-2xl"
                          placeholder="blur"
                          blurDataURL={posterPath}
                        />
                      </div>
                      <span>{poster.title}</span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </section>
        <div className="flex items-center justify-center" ref={ref}>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 1,
            }}
            className={clsx({
              hidden: hasNextPage === false,
              'border-t-blue-500 mb-10 h-6 w-6 rounded-full border-4 border-gray border-transparent border-t-[#ffffff]':
                hasNextPage === true,
            })}
          />
        </div>
      </div>
    </div>
  );
}
