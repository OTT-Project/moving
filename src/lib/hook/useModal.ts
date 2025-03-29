import { useState } from 'react';
import { useRouter } from 'next/router';

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpacity, setIsOpacity] = useState<boolean>(false);
  const router = useRouter();

  const handleModalOpen = (id: number) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, movieNumber: id },
      },
      undefined,
      { scroll: false }
    );
    setIsOpenModal(true);
    setIsOpacity(true);
  };

  const handleModalChange = (id: number) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, movieNumber: id },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleModalClose = () => {
    const { movieNumber, ...restQueries } = router.query;
    setIsOpacity(false);

    setTimeout(() => {
      router.replace(
        {
          pathname: router.pathname,
          query: restQueries,
        },
        undefined,
        { scroll: false }
      );
      setIsOpenModal(false);
    }, 500);
  };

  return {
    isOpenModal,
    isOpacity,
    handleModalOpen,
    handleModalChange,
    handleModalClose,
  };
};
