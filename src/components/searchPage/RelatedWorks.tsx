import { useRelatedWorks } from '@/hook/searchpage/useRelatedWorks';
import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { fetchRelatedWorksProps } from '@/types/searchPage/searchMovie';
import Image from 'next/image';
import { useModal } from '@/lib/hook/useModal';
import ModalFrame from '../modal/ModalFrame';
import DetailModal from '../detail/DetailModal';

export default function RelatedWorks({ movieId }: fetchRelatedWorksProps) {
  const { data } = useRelatedWorks({
    movieId,
  });

  const { isOpenModal, isOpacity, handleModalOpen, handleModalClose } =
    useModal(); // 모달 연동
  const limitedData = data?.results.slice(0, 16);

  return (
    <section className="mb-[143px]">
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
      <h2 className="mb-4">
        <span className="text-base font-bold">연관작품</span>
        <span className="ml-2 rounded-lg border-[1px] border-[#f2b42e] px-2 py-[3px] text-xs">
          16+
        </span>
      </h2>
      <hr className="mb-9 border-[1px] text-[#f3f3f3]" />
      <ul className="grid grid-cols-3 gap-[1.4vw] md:grid-cols-5 xl:grid-cols-8">
        {limitedData?.map((poster) => (
          <li key={poster.id}>
            <div
              className="flex h-[30vw] w-[22vw] flex-col justify-between truncate md:h-[21vw] md:w-[13.4vw] xl:h-[12vw] xl:w-[7.9vw]"
              onClick={() => {
                handleModalOpen(poster.id);
              }}
            >
              <div className="relative mb-1 h-[30vw] w-full cursor-pointer md:h-[18.2vw] xl:h-[10.2vw]">
                <Image
                  src={`${BASE_IMAGE_URL}${poster.poster_path}`}
                  layout="fill"
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 18vw, 12vw"
                  alt="세로 포스터"
                  className="rounded-2xl"
                  placeholder="blur"
                  blurDataURL={'/images/defaultPoster.png'}
                />
              </div>
              <span>{poster.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
