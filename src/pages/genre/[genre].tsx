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
import DEFAULT_IMAGE from '@/images/defaultPoster.png';

export default function genre() {
  const router = useRouter();
  const { genre } = router.query;
  const { genres, fetchGenres } = useGenreStore(); // 스토어에서 genres와 fetchGenres 사용
  const [genreId, setGenreId] = useState<string | null>(null);
  const { isOpenModal, isOpacity, handleModalOpen, handleModalClose } =
    useModal(); // 모달 연동

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenres();
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
      genre: genreId || '',
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

          <ul className="grid grid-cols-3 gap-[1.4vw] md:grid-cols-5 xl:grid-cols-8">
            {data?.pages.map((page) =>
              page?.results.map((poster) => {
                const posterPath = poster.poster_path
                  ? `${BASE_IMAGE_URL}${poster.poster_path}`
                  : DEFAULT_IMAGE;
                return (
                  <li key={poster.id}>
                    <div
                      className="flex h-[30vw] w-[22vw] flex-col justify-between truncate md:h-[21vw] md:w-[13.4vw] xl:h-[12vw] xl:w-[7.9vw]"
                      onClick={() => {
                        handleModalOpen(poster.id);
                      }}
                    >
                      <div className="relative mb-1 h-[30vw] w-full cursor-pointer md:h-[18.2vw] xl:h-[10.2vw]">
                        <Image
                          src={posterPath}
                          layout="fill"
                          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 18vw, 12vw"
                          alt="세로 포스터"
                          className="rounded-2xl"
                          placeholder="blur"
                          blurDataURL={'/images/defaultPoster.png'}
                          loading="lazy"
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
