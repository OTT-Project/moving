import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { useUpcomingMovie } from '@/hook/mainpage/useUpcomingMovie';
import Image from 'next/image';

export default function BeforeOpening() {
  const { data, isLoading, isError } = useUpcomingMovie();

  const limited = data?.results.slice(0, 3);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* 왼쪽 이미지 */}
      <div className="absolute left-0 z-0 h-[400px] w-[600px] translate-x-[0%] translate-y-[13%]">
        {limited && limited[0] && (
          <Image
            src={`${BASE_IMAGE_URL}${limited[0].backdrop_path}`}
            layout="fill"
            objectFit="cover"
            alt={limited[0].title}
            className="rounded-lg opacity-30 shadow-lg"
          />
        )}
      </div>

      {/* 가운데 이미지 */}
      <div className="relative z-10 h-[506px] w-[789px]">
        {limited && limited[1] && (
          <Image
            src={`${BASE_IMAGE_URL}${limited[1].backdrop_path}`}
            layout="fill"
            objectFit="cover"
            alt={limited[1].title}
            className="rounded-lg shadow-xl transition-transform duration-300"
          />
        )}
      </div>

      {/* 오른쪽 이미지 */}
      <div className="absolute right-0 z-0 h-[400px] w-[600px] translate-x-[0%] translate-y-[13%]">
        {limited && limited[2] && (
          <Image
            src={`${BASE_IMAGE_URL}${limited[2].backdrop_path}`}
            layout="fill"
            objectFit="cover"
            alt={limited[2].title}
            className="rounded-lg opacity-30  shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
