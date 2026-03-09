import Container from "@/components/Container";
import Image from "next/image";

const VideoPartnersSection = () => {
  return (
    <section className="py-20 bg-white">
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
          Travel Itineraries
        </h2>

        <div className="relative w-full h-105 md:h-125 rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/v1EelA5RgW4?si=ZsmWuHFCk-R5mkGT"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-10 items-center opacity-70">
          <div className="flex justify-center grayscale hover:grayscale-0 transition">
            <Image
              src="/logo1.png"
              className="cursor-pointer"
              alt="partner"
              width={150}
              height={60}
            />
          </div>

          <div className="flex justify-center grayscale hover:grayscale-0 transition">
            <Image
              src="/logo2.png"
              className="cursor-pointer"
              alt="partner"
              width={150}
              height={60}
            />
          </div>

          <div className="flex justify-center grayscale hover:grayscale-0 transition">
            <Image
              src="/logo3.png"
              className="cursor-pointer"
              alt="partner"
              width={150}
              height={60}
            />
          </div>

          <div className="flex justify-center grayscale hover:grayscale-0 transition">
            <Image
              src="/logo4.png"
              className="cursor-pointer"
              alt="partner"
              width={150}
              height={60}
            />
          </div>

          <div className="flex justify-center grayscale hover:grayscale-0 transition">
            <Image
              src="/logo5.png"
              className="cursor-pointer"
              alt="partner"
              width={150}
              height={40}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoPartnersSection;
