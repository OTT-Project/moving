import Image from 'next/image';
import LeftArrow from '@/icons/left-arrow-Icon.svg';
import RightArrow from '@/icons/right-arrow-Icon.svg';
import {
  useDirector,
  useRecommendationMovie,
} from '@/hook/useRecommendationMovie';
import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { CrewMember } from '@/types/mainPage/mainbanner';
import { useVideos } from '@/hook/useVideos';
import { useState } from 'react';
import clsx from 'clsx';

export default function MainBanner() {
  const { data: bannerImage, isLoading, isError } = useRecommendationMovie();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const limitedData = bannerImage?.results ?? [];

  const currentGroup = limitedData?.slice(
    currentGroupIndex * 4,
    (currentGroupIndex + 1) * 4
  );

  const currentMovie = currentGroup.length
    ? currentGroup[currentMovieIndex]?.id
    : null;
  const { data: directorData } = useDirector(currentMovie ?? 0);
  const { data: videoData } = useVideos(currentMovie ?? 0);

  const director = directorData?.crew?.find(
    (person: CrewMember) => person.job === 'Director'
  );

  if (isLoading) {
    return <div> 로딩중</div>;
  }

  if (isError) {
    return <div>네트워크 에러</div>;
  }

  if (!limitedData || limitedData.length === 0) {
    return <div>추천영화가 없습니다.</div>;
  }
  const handleNext = () => {
    if (currentGroupIndex < Math.ceil(limitedData.length / 4) - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
      setCurrentMovieIndex(0); // 다음 그룹의 첫 번째 영화로 이동
    }
  };

  const handlePrev = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
      setCurrentMovieIndex(0); // 이전 그룹의 첫 번째 영화로 이동
    }
  };

  const handleMovieClick = (index: number) => {
    setCurrentMovieIndex(index);
  };

  return (
    <section className="">
      <div className="relative h-auto w-full">
        <div
          className="absolute inset-0 
      bg-gradient-to-t from-[#131518] to-[rgba(59,63,69,0)]"
        />
        <div className="flex h-[708px] w-full items-center justify-center overflow-hidden">
          {videoData?.results[0]?.key ? (
            <iframe
              width={3320}
              height={1538}
              src={`https://www.youtube.com/embed/${videoData?.results[0].key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
              title={videoData?.results[0]?.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <Image
              src={`${BASE_IMAGE_URL}${currentGroup[currentMovieIndex].backdrop_path}`}
              layout="responsive"
              width={1920}
              height={708}
              alt="메인 베너"
            />
          )}
        </div>

        <div className="absolute bottom-0 mx-[8.5vw] text-center text-white">
          <h1 className="flex flex-col gap-2 text-start text-white ">
            <span className="ml-1 text-base">{director?.name}</span>
            <span className="text-[3.1vw] font-semibold">
              {currentGroup[currentMovieIndex]?.title}
            </span>
          </h1>
          <ul className="relative flex gap-[2.45vw]">
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-[-25px] top-[50%] flex h-[50px] w-[50px] -translate-y-1/2 transform items-center justify-center rounded-full bg-white"
            >
              <LeftArrow />
            </button>
            {currentGroup?.map((poster, index) => (
              <li onClick={() => handleMovieClick(index)}>
                <Image
                  key={poster.id}
                  src={`${BASE_IMAGE_URL}${poster.backdrop_path}`}
                  width={358}
                  height={190}
                  alt="가로 이미지"
                  className={clsx(
                    'h-auto max-w-[358px] cursor-pointer rounded-2xl',
                    {
                      ' border-4 border-[#f29b2e]': index === currentMovieIndex,
                    }
                  )}
                />
              </li>
            ))}

            <button
              onClick={handleNext}
              type="button"
              className="absolute right-[-25px] top-[50%] flex h-[50px] w-[50px] -translate-y-1/2 transform items-center justify-center rounded-full bg-white"
            >
              <RightArrow />
            </button>
          </ul>
        </div>
      </div>
    </section>
  );
}