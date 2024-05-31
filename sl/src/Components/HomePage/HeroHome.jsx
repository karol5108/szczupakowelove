import React from 'react';

function HeroHome() {
  return (
    <section className="pb-12 bg-white from-[#E8E3F5] via-[#EDEAFB] to-[#F7FAFC]">
      <div className="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
        <div className="justify-center w-full text-center lg:p-10 max-auto">
          <div className="justify-center w-full mx-auto">
            <div className="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
              <img
                className='w-32 h-32 rounded-full border border-[#E8E3F4]'
                src='https://down-sg.img.susercontent.com/file/326fb42aab3c193f6522bed275e75289'
                
              />
            </div>
            <p className="sm:mt-8 mt-3 sm:px-10 text-[#10172A] text-4xl sm:text-6xl font-semibold tracking-tighter">
              NOWA MARKA NA RYNKU, KTÓRA KŁADZIE DUŻY NACISK NA 
              <span className="underline leading-8 underline-offset-8 decoration-8 decoration-[#8B5CF6]"> JAKOŚĆ, SZCZEGÓŁY I OBSŁUGĘ KLIENTA</span> 
            </p>
            <p className="sm:mt-8 mt-2.5 text-[#10172A] sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter">
              <span className="font-semibold">Zespół wykfalifikowanych pracowników ściśle kontroluje etapy produckji oraz wprowadza nowe rozwiązania. </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
