import Image from 'next/image';
import StarIcon from '@/icons/starIcon.svg';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useGenreStore } from '../../../store/useGenreStore';
import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { motion } from 'framer-motion';

interface Poster {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

interface Data {
  results: Poster[];
}

interface SectionCardListProps {
  handleModalOpen?: (id: number) => void;
  data?: Data;
  isLoading: boolean;
  isError: boolean;
  content: string;
}

export default function SectionCardList({
  handleModalOpen,
  data,
  isLoading,
  isError,
  content,
}: SectionCardListProps) {
  const { genres, fetchGenres } = useGenreStore();

  useEffect(() => {
    if (Object.keys(genres).length === 0) {
      fetchGenres();
    }
  }, [genres, fetchGenres]);

  // genre_ids 배열을 장르 이름으로 변환
  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((id) => genres[id] || '알 수 없음');
  };

  const limitedData = data?.results.slice(0, 6);

  if (isLoading) {
    return;
  }

  if (isError) {
    return <div>네트워크 에러</div>;
  }

  return (
    <section className="ml-[8.5vw] mt-[96px] flex flex-col md:mr-0 xl:mr-[8.5vw] ">
      <h2 className="mb-7 text-2xl font-bold">{content}</h2>
      <ul className="scrollbar-hide flex gap-[2.8vw] overflow-y-hidden overflow-x-scroll">
        {limitedData?.map((poster) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              handleModalOpen?.(poster.id);
            }}
            key={poster.id}
            className="h-[55vw] max-w-[30vw] cursor-pointer py-6 pl-4 md:h-[35vw] md:max-w-[23vw] xl:h-auto  xl:max-w-[11vw] "
          >
            <div className="relative h-[30vw] w-[25vw] md:h-[23vw] md:w-[18vw] xl:h-[14.5vw] xl:w-[10.53vw] ">
              <Image
                src={`${BASE_IMAGE_URL}${poster.poster_path}`}
                layout="fill"
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 23vw, 10.53vw"
                alt="세로 포스터"
                className="max-h-[290px] rounded-2xl object-cover"
              />
            </div>
            <div className=" my-2 flex items-center justify-between">
              <span className="md: max-w-[14vw] truncate break-normal text-[3vw] font-semibold md:text-[2vw] xl:max-w-[6.5vw] xl:text-[1vw]">
                {poster.title}
              </span>
              <div className="ml-1 flex items-center">
                <StarIcon />
                <span className="ml-2 text-xs xl:text-sm">
                  {poster.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm">
                {dayjs(poster.release_date).format('YYYY')}
              </span>
              <span className="ml-2 truncate rounded-lg border border-[#f2b42e] px-2 py-[3px] text-[1.7vw] md:text-[0.7vw] xl:text-[0.65vw]">
                {getGenreNames(poster.genre_ids).join(', ')}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
