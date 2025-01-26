import BeforeOpening from '@/components/mainPage/ComingSoonMovies';
import PopularMovies from '@/components/mainPage/popularMovies';
import Membership from '@/components/mainPage/membership';
import MainBanner from '@/components/mainPage/MainBanner';
import { useModal } from '@/lib/hook/useModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ModalFrame from '@/components/modal/ModalFrame';
import DetailModal from '@/components/detail/DetailModal';
import { useWeekTrend } from '@/hook/mainpage/useWeekTrend';
import SectionCardList from '@/components/mainPage/SectionCardList ';
import { useGameMovie } from '@/hook/mainpage/useGameMovie';
import { useSeriesMovie } from '@/hook/mainpage/useSeriesMovie';
import { useTodayMovie } from '@/hook/mainpage/useTodayMovie';

export default function MoviesSection() {
  const { isOpenModal, isOpacity, handleModalOpen, handleModalClose } =
    useModal();
  const router = useRouter();

  const {
    data: weekTrendData,
    isLoading: weekTrendLoading,
    isError: weekTrendError,
  } = useWeekTrend();

  const {
    data: GameMovieData,
    isLoading: GameMovieLoading,
    isError: GameMovieError,
  } = useGameMovie();

  const {
    data: SeriesMovieData,
    isLoading: SeriesMovieLoading,
    isError: SeriesMovieError,
  } = useSeriesMovie();

  const {
    data: TodayMovieData,
    isLoading: TodayMovieLoading,
    isError: TodayMovieError,
  } = useTodayMovie();

  useEffect(() => {
    if (router.query.movieNumber) {
      const movieNumber = Number(router.query.movieNumber);
      handleModalOpen(movieNumber);
    }
  }, []);

  return (
    <main>
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

      <MainBanner handleModalOpen={handleModalOpen} />

      <SectionCardList
        handleModalOpen={handleModalOpen}
        data={weekTrendData}
        isLoading={weekTrendLoading}
        isError={weekTrendError}
        content={'🔥이번주 트렌드'}
      />

      <SectionCardList
        handleModalOpen={handleModalOpen}
        data={GameMovieData}
        isLoading={GameMovieLoading}
        isError={GameMovieError}
        content={'🎮게임을 현실로! 게임 원작 영화'}
      />

      <BeforeOpening handleModalOpen={handleModalOpen} />

      <SectionCardList
        handleModalOpen={handleModalOpen}
        data={SeriesMovieData}
        isLoading={SeriesMovieLoading}
        isError={SeriesMovieError}
        content={'🎬 명작 시리즈를 한번에'}
      />
      <PopularMovies handleModalOpen={handleModalOpen} />

      <Membership />

      <SectionCardList
        handleModalOpen={handleModalOpen}
        data={TodayMovieData}
        isLoading={TodayMovieLoading}
        isError={TodayMovieError}
        content={'오늘은 이 컨텐츠 어때요?'}
      />
    </main>
  );
}
