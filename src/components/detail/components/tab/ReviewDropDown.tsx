import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';

interface ReviewDropDownProps {
  sortText: string;
  setSortText: React.Dispatch<SetStateAction<string>>;
}

export default function ReviewDropDown({
  sortText,
  setSortText,
}: ReviewDropDownProps) {
  const SORT_CONTENT_LIST = ['최신순', '별점 높은순', '별점 낮은순'];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropDownActive = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative w-28 md:w-32">
      <button
        type="button"
        className="relative w-full text-sm sm:text-base"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {sortText}
        <Image
          src="/icons/dropdownIcon.svg"
          className="absolute right-0 top-[50%] translate-y-[-50%]"
          width={14}
          height={6}
          alt="드롭다운 아이콘"
        />
      </button>
      <motion.ul
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropDownActive}
        className="absolute left-[50%] top-7 w-full translate-x-[-50%] overflow-hidden rounded-lg border-[1px] border-gray bg-[#3a3a3a] p-[6px]"
      >
        {SORT_CONTENT_LIST.map((sort, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                className="w-full rounded-lg p-2 text-sm hover:bg-[#5c5a5d] sm:text-base"
                onClick={() => {
                  setSortText(sort);
                  setIsOpen(false);
                }}
              >
                {sort}
              </button>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
