export default function HeroArticle() {
  return (
    <>
      <div className="px-2 lg:px-28">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-semibold leading-loose">The blog</p>
          <h1 className="font-semibold text-3xl lg:text-5xl lg:leading-loose">
            Writings from our team
          </h1>
          <p className="leading-loose mb-5">
            The latest industry news, interviews, technologies, and resources
          </p>
        </div>
        <div
          data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "isAutoPlay": true
  }'
          className="relative"
        >
          <div className="hs-carousel relative overflow-hidden w-full min-h-[450px] bg-white rounded-lg">
            <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
              <div className="hs-carousel-slide">
                <div className="flex justify-center h-full p-6">
                  <span className="self-center text-4xl transition duration-700">
                    <img src="/1.png" className="object-cover" alt="" />
                  </span>
                </div>
              </div>
              <div className="hs-carousel-slide">
                <div className="flex justify-center h-full p-6">
                  <span className="self-center text-4xl transition duration-700">
                    <img src="/2.png" className="object-cover" alt="" />
                  </span>
                </div>
              </div>
              <div className="hs-carousel-slide">
                <div className="flex justify-center h-full p-6">
                  <span className="self-center text-4xl transition duration-700">
                    <img src="/3.png" className="object-cover" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
            <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
            <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
            <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
          </div> */}
        </div>
      </div>
    </>
  );
}
