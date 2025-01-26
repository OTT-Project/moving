import { BASE_IMAGE_URL } from '@/api/mainpageAPI';
import { useUpcomingMovie } from '@/hook/mainpage/useUpcomingMovie';
import dayjs from 'dayjs';
import Image from 'next/image';
import { motion } from 'framer-motion';
interface BeforeOpeningProps {
  handleModalOpen?: (id: number) => void;
}

export default function BeforeOpening({ handleModalOpen }: BeforeOpeningProps) {
  const { data, isLoading, isError } = useUpcomingMovie();

  const limited = data?.results.slice(0, 5);

  if (isLoading) {
    return;
  }

  if (isError) {
    <div>네트워크 에러1</div>;
  }

  return (
    <section className="ml-[8.5vw] mt-14 flex flex-col md:mr-0 xl:mr-[8.5vw] ">
      <h2 className="mb-7 text-2xl font-bold">❓곧 공개되는 신작영화</h2>
      <ul className="scrollbar-hide flex gap-[20vw] overflow-y-hidden overflow-x-scroll  md:gap-[14vw] xl:gap-[1.8vw]">
        {limited?.map((poster) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              handleModalOpen?.(poster.id);
            }}
            key={poster.id}
            className="relative h-auto max-w-[14.53vw] cursor-pointer sm:py-5 sm:pl-4"
          >
            <div className="relative h-[32vw] w-[30vw] md:h-[29vw] md:w-[25vw] xl:h-[18.54vw] xl:w-[14.53vw] ">
              <Image
                src={`${BASE_IMAGE_URL}${poster.poster_path}`}
                layout="fill"
                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 23vw, 10.53vw"
                alt="세로 포스터"
                className="rounded-2xl blur-[1px] "
              />
            </div>
            <div className="sm:-[3vw] md:-[2vw] absolute inset-0 flex h-[32vw] w-[30vw] items-center justify-center rounded-2xl border border-[#f2b42e] bg-black text-[#f2b42e] opacity-80 sm:left-4 sm:top-5 md:h-[29vw] md:w-[25vw] xl:h-[18.54vw] xl:w-[14.53vw] xl:text-[1vw]">
              <span className="mr-2 font-light">Released at</span>
              <span className="font-medium">
                {dayjs(poster.release_date).format('YYYY · MM')}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
