import { fetchVideos } from '@/api/mainpageBanner';
import { VideoType } from '@/types/mainPage/mainbanner';
import { useQuery } from '@tanstack/react-query';

export const useVideos = (movieId: number) => {
  return useQuery<VideoType>({
    queryKey: ['Videos', movieId],
    queryFn: () => fetchVideos({ movieId }),
  });
};
