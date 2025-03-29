import { useModal } from '@/lib/hook/useModal';
import { useModalAnimateStore } from '@/lib/store/modalAnimateStore';
import { useModalStore } from '@/lib/store/modalStore';
import { movieImage } from '@/lib/utils/movieImage';
import { RelatedWork } from '@/types/detail/type';
import Image from 'next/image';

interface RelatedWorksTabProps {
  recommendationData: RelatedWork;
  setTabIsActive: React.Dispatch<React.SetStateAction<number>>;
}

export default function RelatedWorksTab({
  recommendationData,
  setTabIsActive,
}: RelatedWorksTabProps) {
  const { setScrollTop } = useModalStore();
  const { handleModalChange } = useModal();
  const { resetModalAnimate } = useModalAnimateStore();

  return (
    <>
      {recommendationData.results.length > 0 ? (
        <div className="grid grid-cols-[repeat(3,1fr)] gap-x-4 gap-y-6 px-3 pb-10 text-white sm:grid-cols-[repeat(4,1fr)] sm:px-5 md:grid-cols-[repeat(5,1fr)] lg:grid-cols-[repeat(6,1fr)] lg:gap-x-6 lg:gap-y-9 lg:px-20">
          {recommendationData.results.map((result) => {
            const posterImage = result.poster_path
              ? process.env.NEXT_PUBLIC_BACK_IMAGE_URL + result.poster_path
              : '/images/defaultPoster.png';
            return (
              <div key={result.id} className="flex flex-col">
                <div
                  className="mb-2 flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    handleModalChange(result.id);
                    resetModalAnimate();
                    setTabIsActive(0);
                    setScrollTop();
                  }}
                >
                  <Image
                    src={posterImage}
                    width={130}
                    height={178}
                    className="max-h-[150px] min-h-[150px] rounded-xl sm:max-h-[178px] sm:min-h-[178px]"
                    alt="포스터 이미지"
                  />
                </div>
                <h4 className="line-clamp-1 text-sm font-semibold text-white sm:text-base">
                  {result.title}
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          연관된 작품이 없습니다.
        </div>
      )}
    </>
  );
}
