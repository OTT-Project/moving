import { useModal } from '@/lib/hook/useModal';
import { useModalAnimateStore } from '@/lib/store/modalAnimateStore';
import { useModalStore } from '@/lib/store/modalStore';
import { SeriesData } from '@/types/detail/type';
import Image from 'next/image';

interface SeriesTabProps {
  seriesData: SeriesData;
  genreData: any;
}

export default function SeriesTab({ seriesData, genreData }: SeriesTabProps) {
  const { setScrollTop } = useModalStore();
  const { handleModalChange } = useModal();
  const { resetModalAnimate } = useModalAnimateStore();

  return (
    <div className="px-3 pb-10 text-white sm:px-5 lg:px-20">
      {seriesData?.parts?.length > 0 ? (
        seriesData.parts
          .sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          )
          .map((part) => {
            const movieYear = new Date(part.release_date).getFullYear();
            const posterImage = part.poster_path
              ? process.env.NEXT_PUBLIC_BACK_IMAGE_URL + part.poster_path
              : '/images/defaultPoster.png';

            const genreResultList = genreData.genres.filter((genre: any) =>
              part.genre_ids.includes(genre.id)
            );

            return (
              <div
                key={part.id}
                className="relative mb-7 flex w-[100%] gap-4 border-b-2 border-[#2D313A] pb-7 sm:mb-12 sm:pb-12"
              >
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    handleModalChange(part.id);
                    resetModalAnimate();
                    setScrollTop();
                  }}
                >
                  <Image
                    src={posterImage}
                    width={130}
                    height={178}
                    className="rounded-xl"
                    alt={`${part.title} 포스터 이미지`}
                  />
                </div>
                <div className="basis-[80%] pr-2 sm:pr-10 md:pr-20">
                  <h3 className="mb-1 text-base font-bold md:text-xl">
                    {part.title}
                  </h3>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    {movieYear ? (
                      <span className="text-base font-medium">
                        ({movieYear})
                      </span>
                    ) : (
                      ''
                    )}
                    <div className="break-keep rounded-lg border-[1px] border-[#F29B2E] px-3 py-[2px] text-xs font-normal text-[#F29B2E] sm:text-sm">
                      {genreResultList.map(
                        (
                          genreResult: { id: number; name: string },
                          index: number
                        ) => {
                          return (
                            <span key={genreResult.id}>
                              {genreResult.name}
                              {index < genreResultList.length - 1 && ', '}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <p className="line-clamp-3">{part.overview}</p>
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          시리즈가 없습니다.
        </div>
      )}
    </div>
  );
}
