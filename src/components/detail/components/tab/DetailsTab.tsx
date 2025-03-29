import { Acting, Genre, MovieData } from '@/types/detail/type';
import Image from 'next/image';
import defaultImage from '@/images/defaultImage.png';

interface DetailsTabProps {
  movieData: MovieData;
  ageData: any;
  creditData: any;
}

export default function DetailsTab({
  movieData,
  ageData,
  creditData,
}: DetailsTabProps) {
  const posterImage = movieData.poster_path
    ? process.env.NEXT_PUBLIC_BACK_IMAGE_URL + movieData.poster_path
    : '/images/defaultPoster.png';
  const dateYear = new Date(movieData.release_date).getFullYear();
  const dateMonth = new Date(movieData.release_date).getMonth();
  const writing = creditData.crew.find((key: any) => key.job === 'Director');
  return (
    <div className="px-3 pb-10 text-white sm:px-5 lg:px-20">
      <div className="mb-5 border-b-[1px] border-[#2D313A] pb-5 sm:mb-10 sm:pb-10">
        <h2 className="text-lg font-semibold md:text-2xl">{movieData.title}</h2>
        <span className="mb-2 mt-4 block text-sm font-medium sm:text-base">
          시놉시스
        </span>
        <p className="text-sm font-normal">{movieData.overview}</p>
      </div>
      <div className="mb-5 border-b-[1px] border-[#2D313A] sm:mb-10">
        <h2 className="mb-4 text-sm font-medium sm:text-base">출연진</h2>
        <ul className="credit-scroll flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:gap-6 sm:pb-10">
          {creditData.cast.map((acting: Acting) => {
            const actingImage =
              acting.profile_path !== null
                ? process.env.NEXT_PUBLIC_BACK_IMAGE_URL + acting.profile_path
                : defaultImage.src;
            return (
              <li className="flex min-w-[100px] flex-col items-center text-center sm:min-w-[120px]">
                <div
                  className="mb-2 h-[70px] w-[70px] rounded-full bg-cover bg-center bg-no-repeat sm:h-[100px] sm:w-[100px]"
                  style={{ backgroundImage: `url(${actingImage})` }}
                />
                <span className="break-keep text-sm font-bold">
                  {acting.name}
                </span>
                <span className="mb-1 mt-2 block break-keep text-xs">
                  {acting.character}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mb-5 flex gap-5 pb-5 sm:mb-10 sm:pb-10">
        <div className="mb-2 flex-shrink-0">
          <Image
            src={posterImage}
            width={130}
            height={178}
            className="rounded-xl"
            alt="포스터 이미지"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold sm:text-base">
            {movieData.tagline}
          </h3>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-sm font-semibold">개요</span>
            <span className="text-sm font-normal">{`${dateYear ? dateYear : ''} ・ ${dateMonth ? dateMonth : ''}`}</span>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-sm font-semibold">장르</span>

            <span className="text-sm font-normal">
              {movieData.genres.map((genre: Genre, index) => {
                return (
                  <i key={genre.id} className="mr-1 not-italic">
                    {genre.name}
                    {index !== movieData.genres.length - 1 && ','}
                  </i>
                );
              })}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-sm font-semibold">감독</span>
            <span className="text-sm font-normal">{writing.name}</span>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-sm font-semibold">등급</span>
            <span className="text-sm font-normal">
              {ageData?.certification}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
