import { fetchRelatedWorks } from '@/api/searchAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { fetchRelatedWorksProps } from '@/types/searchPage/searchMovie';
import { useQuery } from '@tanstack/react-query';

export const useRelatedWorks = ({ movieId }: fetchRelatedWorksProps) => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['relatedWorks', movieId],
    queryFn: () => fetchRelatedWorks({ movieId }),
  });
};
