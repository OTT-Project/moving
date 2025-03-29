import { useRouter } from 'next/router';

export default function TrailerPage() {
  const router = useRouter();
  const { trailerKey } = router.query;
  return (
    <div className="relative h-screen w-screen">
      <button
        type="button"
        className="absolute left-6 top-6 z-50 text-4xl"
        onClick={() => {
          router.back();
        }}
      >
        〈
      </button>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
        title="예고편"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
