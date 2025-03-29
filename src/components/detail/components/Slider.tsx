import { useEffect, useRef } from 'react';
import { usePopularMovie } from '@/hook/mainpage/usePopularMovie';
import { BASE_IMAGE_URL } from '@/api/mainpageAPI';

const DualDirectionSlider = () => {
  const { data, isLoading, isError } = usePopularMovie();
  const leftToRightRef = useRef<HTMLDivElement>(null);
  const rightToLeftRef = useRef<HTMLDivElement>(null);

  const startSlider = (
    slider: HTMLDivElement | null,
    direction: 'left' | 'right'
  ) => {
    if (!slider) return;

    let start = direction === 'right' ? -slider.scrollWidth / 2 : 0;
    const speed = 0.3;

    const moveSlider = () => {
      if (direction === 'left') {
        start -= speed;
        if (start <= -slider.scrollWidth / 2) {
          start = 0;
        }
      } else if (direction === 'right') {
        start += speed;
        if (start >= 0) {
          start = -slider.scrollWidth / 2;
        }
      }
      slider.style.transform = `translateX(${start}px)`;
      requestAnimationFrame(moveSlider);
    };

    requestAnimationFrame(moveSlider);
  };

  useEffect(() => {
    if (data && data.results.length > 0) {
      const leftSlider = leftToRightRef.current;
      const rightSlider = rightToLeftRef.current;

      startSlider(leftSlider, 'right');
      startSlider(rightSlider, 'left');
    }
  }, [data]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 가져오는데 실패했습니다.</div>;

  const images = data?.results.map(
    (movie: { id: number; backdrop_path: string }) =>
      `${BASE_IMAGE_URL}${movie.backdrop_path}`
  );

  return (
    <div className="relative mt-[156px] overflow-hidden">
      <h3 className="mb-4 text-center text-[40px] font-semibold text-white">
        무빙에서 뜨는 인기 영화들
      </h3>
      <p className="mb-11 text-center text-[24px] font-medium text-white">
        해외, 국내, 인기, 최신 영화
      </p>
      <div className="relative overflow-hidden">
        <div
          ref={rightToLeftRef}
          className="flex w-[calc(375px*11*2)] space-x-4"
          style={{
            display: 'flex',
            willChange: 'transform',
          }}
        >
          {images?.map((src, index) => (
            <img
              key={`rightToLeft-${index}`}
              src={src}
              alt={`Slide ${index}`}
              className="h-[215px] w-[375px] flex-shrink-0 rounded-lg"
            />
          ))}
          {images?.map((src, index) => (
            <img
              key={`rightToLeft-clone-${index}`}
              src={src}
              alt={`Slide Clone ${index}`}
              className="h-[215px] w-[375px] flex-shrink-0 rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden">
        <div
          ref={leftToRightRef}
          className="flex w-[calc(375px*11*2)] space-x-4"
          style={{
            display: 'flex',
            willChange: 'transform',
          }}
        >
          {images?.map((src, index) => (
            <img
              key={`leftToRight-${index}`}
              src={src}
              alt={`Slide ${index}`}
              className="h-[215px] w-[375px] flex-shrink-0 rounded-lg"
            />
          ))}
          {images?.map((src, index) => (
            <img
              key={`leftToRight-clone-${index}`}
              src={src}
              alt={`Slide Clone ${index}`}
              className="h-[215px] w-[375px] flex-shrink-0 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DualDirectionSlider;
