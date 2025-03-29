import { useModalStore } from '@/lib/store/modalStore';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalFrameProps {
  children: ReactNode;
  isOpenModal: boolean;
  isOpacity: boolean;
  handleModalClose: () => void;
}

export default function ModalFrame({
  children,
  isOpenModal,
  isOpacity,
  handleModalClose,
}: ModalFrameProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { scrollTop, resetScrollTop } = useModalStore();

  useEffect(() => {
    if (scrollTop && modalRef.current) {
      modalRef.current.scrollTop = 0;
      resetScrollTop();
    }
  }, [scrollTop, resetScrollTop]);

  return (
    <div
      className={`fixed left-0 top-0 z-[100] h-screen w-full items-center justify-center`}
      style={{ display: isOpenModal ? 'flex' : 'none' }}
    >
      <div
        className={`absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.7)] ${isOpacity ? 'animate-modalFadeIn' : 'animate-modalFadeOut'}`}
        onClick={handleModalClose}
      />
      <div
        ref={modalRef}
        className={`modal-scroll h-[95vh] max-h-[1200px] w-[95vw] max-w-[1080px] overflow-y-auto rounded-xl bg-[#000000] opacity-0 ${isOpacity ? 'animate-modalFadeIn' : 'animate-modalFadeOut'}`}
      >
        {children}
      </div>
    </div>
  );
}
