import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { useSearch } from '@/hook/searchpage/usesearch';
import { useModal } from '@/lib/hook/useModal';
import { SearchResultProps } from '@/types/searchPage/searchMovie';
import Image from 'next/image';
import { useEffect } from 'react';
import ModalFrame from '../modal/ModalFrame';
import DetailModal from '../detail/DetailModal';

const DEFAULT_IMAGE = '/images/defaultPoster.png';

export default function SearchResult({
  query,
  onSearchMovieId,
}: SearchResultProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearch({
    query: query || '',
    page: 1,
  });
  const { isOpenModal, isOpacity, handleModalOpen, handleModalClose } =
    useModal(); // 모달 연동
  console.log('Data:', data);
  console.log('Has Next Page:', hasNextPage);

  useEffect(() => {
    if (data?.pages?.[0]?.results?.[0]?.id) {
      onSearchMovieId(data.pages[0].results[0].id);
    }
  }, [data, onSearchMovieId]);

  const totalResults = data?.pages.reduce(
    (acc, page) => acc + (page?.results?.length || 0),
    0
  );

  return (
    <section className="mb-16">
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
        <span className="text-base font-bold">검색결과</span>
        <span className="ml-2 rounded-lg border-[1px] border-[#f2b42e] px-2 py-[3px] text-xs">
          {`${totalResults}+`}
        </span>
      </h2>
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
                    />
                  </div>
                  <span>{poster.title}</span>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {hasNextPage && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full border-4  border-gray bg-blue px-3 py-2 text-sm font-bold"
          >
            {isFetchingNextPage ? 'Loading...' : '더보기'}
          </button>
        </div>
      )}
    </section>
  );
}
