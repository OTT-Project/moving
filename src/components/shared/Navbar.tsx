import SearchICon from '@/icons/searchIcon.svg';
import Logo from '@/images/Logo.svg';
import DropdownIcon from '@/icons/dropdownIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDropdown } from '@/hook/navBar/useDropdown';
import { useGenreStore } from '../../../store/useGenreStore';

export default function Navbar() {
  const {
    isOpen: isOpensDropDown,
    toggleDropdown,
    dropdownRef,
  } = useDropdown();
  const { genres, fetchGenres } = useGenreStore();
  const [isTransparent, setIsTransparent] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY <= 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleLogo = () => {
    router.push('/');
  };

  const handleSearch = () => {
    const query = inputRef.current?.value.trim();
    if (!query) {
      router.push('/');
    } else {
      router.push(`/search/${query}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGenreClick = (name: string) => {
    router.push(`/genre/${name}`);
  };

  return (
    <motion.div
      animate={{
        backgroundColor: isTransparent
          ? 'rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.8)',
      }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full"
    >
      <header className="mx-4 my-[26.75px] flex items-center justify-between md:mx-6 xl:mx-40">
        <button onClick={handleLogo}>
          <Logo />
        </button>
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleDropdown}
            className=" relative mr-3 flex items-center md:mr-10"
          >
            <span className=" mr-4 text-nowrap text-white">장르</span>
            <DropdownIcon />
            <div
              ref={dropdownRef}
              className={clsx(
                'dropdown-scroll absolute top-[35px] flex h-[294px] w-[116px] flex-col overflow-auto rounded-xl bg-[#3a3a3a] p-[6px]',
                {
                  hidden: isOpensDropDown === false,
                  block: isOpensDropDown === true,
                }
              )}
            >
              <ul className="">
                {Object.entries(genres).map(([id, name]) => (
                  <li
                    key={id}
                    className="block rounded-lg p-2 hover:bg-[#5c5a5d]"
                    value={name}
                    onClick={() => handleGenreClick(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </button>
          <div className="flex h-6 w-40 items-center justify-between rounded-lg bg-[#404040] px-4 opacity-50 md:w-64 xl:h-9 xl:w-[360px]">
            <input
              ref={inputRef}
              type="text"
              placeholder="영화 제목을 입력해 주세요."
              className="mb-[3px] w-full bg-transparent  placeholder:text-xs focus:outline-none"
              onKeyDown={handleKeyDown}
            />
            <span className="relative hidden cursor-pointer md:block">
              <SearchICon onClick={handleSearch} />
            </span>
          </div>
        </div>
      </header>
    </motion.div>
  );
}
