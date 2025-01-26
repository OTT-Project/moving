import Image from 'next/image';

export default function Membership() {
  return (
    <>
      <section className="relative mt-[72px] h-[150px] w-full overflow-hidden bg-blue">
        <div className="absolute bottom-[-200px] left-1/2 h-[600px] w-[1200px] -translate-x-1/2 transform  opacity-10">
          <Image
            src={'/images/membershipBackgroundImage.png'}
            fill
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 23vw, 10.53vw"
            alt="로고"
          />
        </div>
        <div className=" flex h-full items-center justify-center ">
          <div className="mr-4">
            <p className="text-center text-xl font-medium md:text-left">
              멤버십 이용자라면?
            </p>
            <p className="text-2xl font-extrabold">
              <span className="text-[#f2a42e]">무빙 어플</span>
              <span>로도 웅장하게 즐겨보세요!</span>
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute top-12 h-[50px] w-[88px]">
              <Image
                src={'/images/membership-mobile.png'}
                width={50}
                height={88}
                alt="멤버십 모바일 이미지"
              />
            </div>
            <div className=" mt-6 h-[109px] w-[178px]">
              <Image
                src={'/images/membership-pc.png'}
                width={178}
                height={109}
                alt="멤버십 pc 이미지"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
