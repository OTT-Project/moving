import { ClipLoader } from 'react-spinners';

export default function LoadingSpinners() {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <ClipLoader color="#2D73F3" loading={true} size={80} />
    </div>
  );
}
