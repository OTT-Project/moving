import { useRouter } from 'next/router';
import SearchResult from '@/components/searchPage/SearchResult';
import RelatedWorks from '@/components/searchPage/RelatedWorks';
import { useState } from 'react';

export default function genre() {
  const router = useRouter();
  const { query } = router.query;
  const [movieId, setMovieId] = useState<number | null>(null);

  return (
    <div className="pt-[76px]">
      <div className="mx-[13vw]">
        <h1 className="my-14">
          <span className="text-[40px] font-bold text-white">
            '{`${query}`}'
          </span>
          <span className="text-xl font-normal text-[#d9d9d9]"> 검색결과</span>
        </h1>
        <SearchResult query={query} onSearchMovieId={(id) => setMovieId(id)} />
        <RelatedWorks movieId={movieId} />
      </div>
    </div>
  );
}
