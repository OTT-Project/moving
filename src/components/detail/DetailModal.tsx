import Logo from '@/images/Logo.svg';
import Star from '@/icons/starIcon.svg';
import Favorite from '@/icons/favoriteIcon.svg';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import SeriesTab from './components/tab/SeriesTab';
import RelatedWorksTab from './components/tab/RelatedWorksTab';
import UserReviewsTab from './components/tab/UserReviewsTab';
import DetailsTab from './components/tab/DetailsTab';
import TrailerTab from './components/tab/TrailerTab';
import clsx from 'clsx';
import { useModalAnimateStore } from '@/lib/store/modalAnimateStore';
import { useRouter } from 'next/router';
import { useModalData } from '@/lib/hook/useModalData';
import LoadingSpinners from '../shared/LoadingSpinners';

interface DetailModalProps {
  isOpacity: boolean;
  handleModalClose: () => void;
}

export default function DetailModal({
  isOpacity,
  handleModalClose,
}: DetailModalProps) {
  const reviewFavoriteClass = 'flex items-center gap-2 text-xs text-white';
  const MOVIE_TAB_LIST = [
    '시리즈',
    '연관작품',
    '사용자 평',
    '상세정보',
    '예고편',
  ];
  const router = useRouter();
  const { movieNumber } = router.query;
  const { modalAnimate, modalAnimateActive } = useModalAnimateStore();
  const [tabIsActive, setTabIsActive] = useState<number>(0);
  const {
    movieQuery,
    creditQuery,
    reviewQuery,
    currentPage,
    setCurrentPage,
    trailerQuery,
    recommendationQuery,
    seriesQuery,
    ageQuery,
    genreQuery,
  } = useModalData(Number(movieNumber), 'en-US');

  // 영화 개봉년도
  const movieYear = new Date(movieQuery.data?.release_date).getFullYear();
  const modalBackPoster = movieQuery.data?.backdrop_path
    ? process.env.NEXT_PUBLIC_BACK_IMAGE_URL + movieQuery.data.backdrop_path
    : '/images/defaultBackPoster.png';
  console.log(movieQuery.data);

  useEffect(() => {
    setTimeout(() => {
      setTabIsActive(0);
    }, 500);
  }, [isOpacity]);

  useEffect(() => {
    modalAnimateActive();
  }, [modalAnimate]);

  if (
    movieQuery.isLoading ||
    creditQuery.isLoading ||
    seriesQuery.isLoading ||
    creditQuery.isLoading ||
    reviewQuery.isLoading ||
    recommendationQuery.isLoading ||
    trailerQuery.isLoading ||
    !movieNumber
  ) {
    return <LoadingSpinners />;
  }

  if (
    movieQuery.isError ||
    creditQuery.isError ||
    seriesQuery.isError ||
    creditQuery.isLoading ||
    reviewQuery.isError ||
    recommendationQuery.isError ||
    trailerQuery.isError
  ) {
    return <div>에러...</div>;
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-[1080px] bg-[#000000]">
      <div
        className={clsx(
          'mb-10 bg-cover bg-center bg-no-repeat px-3 pt-7 sm:px-5 md:mb-20 lg:px-20',
          modalAnimate && 'animate-zoomBg'
        )}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 10%, rgba(0, 0, 0, 0.4) 100%), url(${modalBackPoster})`,
        }}
      >
        <div className="mb-24 flex items-center justify-between sm:mb-40 md:mb-52">
          <h2>
            <Logo />
          </h2>
          <button
            type="button"
            className="text-lg font-bold sm:text-xl"
            onClick={() => {
              handleModalClose();
            }}
          >
            ✕
          </button>
        </div>
        <div>
          <div className="mb-4 flex items-center gap-6">
            <div
              className={`${reviewFavoriteClass} flex items-center font-semibold`}
            >
              <Star />
              <span className="block pt-1">
                {movieQuery.data.vote_average.toFixed(1)}
              </span>
            </div>
            <button className={`${reviewFavoriteClass} font-normal`}>
              <Favorite />
              관심
            </button>
          </div>
          <h3 className="text-2xl font-semibold text-white sm:text-4xl lg:text-[46px]">
            {movieQuery.data.title}{' '}
            {movieYear ? (
              <span className="text-lg font-normal text-[#D9D9D9] sm:text-2xl lg:text-3xl">
                ({movieYear})
              </span>
            ) : (
              ''
            )}
          </h3>
          <ul className="mb-4 mt-3 flex flex-wrap items-center gap-2 lg:mb-6 lg:mt-4">
            {seriesQuery.data?.parts.length > 0 && (
              <li className="flex h-7 items-center justify-center rounded-xl border-[1px] border-white bg-[rgba(43,45,49,0.8)] px-4 pt-[2px] text-xs font-normal text-white">
                시리즈 {seriesQuery.data?.parts.length}개
              </li>
            )}

            {ageQuery.data?.iso_639_1 && (
              <li className="flex h-7 items-center justify-center rounded-xl border-[1px] border-white bg-[rgba(43,45,49,0.8)] px-4 pt-[2px] text-xs font-normal text-white">
                {ageQuery.data?.certification === 'ALL'
                  ? ageQuery.data?.certification
                  : ageQuery.data?.certification + '세'}
              </li>
            )}

            {movieQuery.data.genres.map(
              (genre: { id: number; name: string }) => {
                return (
                  <li
                    key={genre.id}
                    className="flex h-7 items-center justify-center rounded-xl border-[1px] border-white bg-[rgba(43,45,49,0.8)] px-4 pt-[2px] text-xs font-normal text-white"
                  >
                    {genre.name}
                  </li>
                );
              }
            )}
          </ul>
          <div className="flex flex-col-reverse justify-between gap-4 md:flex-row lg:gap-6">
            <p className="line-clamp-3 basis-[100%] text-sm font-normal text-white md:basis-[70%]">
              {movieQuery.data.overview}
            </p>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: '/trailerPage',
                  query: { trailerKey: trailerQuery.data.key },
                });
              }}
              className="h-10 max-w-full basis-[100%] rounded-xl bg-[#2D73F3] py-2 text-base font-semibold text-white disabled:bg-gray sm:text-lg md:max-w-64 md:basis-[30%] lg:h-12 lg:text-xl"
              disabled={!trailerQuery.data}
            >
              {!trailerQuery.data ? '영상이 없습니다.' : '시청하기'}
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 sm:px-5 lg:px-20">
        <div className="mb-8 flex w-full items-center gap-2 border-b-2 border-white pb-4 sm:mb-12 sm:gap-4">
          {MOVIE_TAB_LIST.map((tab, index) => {
            const isActive =
              index === tabIsActive
                ? 'modal-tab-active text-[#2D73F3]'
                : 'text-white';
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setTabIsActive(index);
                }}
                className={`relative px-1 text-xs font-bold sm:px-2 sm:text-sm md:px-4 md:text-base ${isActive}`}
              >
                {tab} {index === 2 && `${reviewQuery.data.total_results}+`}
              </button>
            );
          })}
        </div>
      </div>

      {match(tabIsActive)
        .with(0, () => {
          return (
            <SeriesTab
              seriesData={seriesQuery.data}
              genreData={genreQuery.data}
            />
          );
        })
        .with(1, () => {
          return (
            <RelatedWorksTab
              recommendationData={recommendationQuery.data}
              setTabIsActive={setTabIsActive}
            />
          );
        })
        .with(2, () => {
          return (
            <UserReviewsTab
              reviewData={reviewQuery.data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          );
        })
        .with(3, () => {
          return (
            <DetailsTab
              movieData={movieQuery.data}
              ageData={ageQuery.data}
              creditData={creditQuery.data}
            />
          );
        })
        .with(4, () => {
          return <TrailerTab trailerKey={trailerQuery.data.key} />;
        })
        .otherwise(() => {
          return (
            <SeriesTab
              seriesData={seriesQuery.data}
              genreData={genreQuery.data}
            />
          );
        })}
    </div>
  );
}
