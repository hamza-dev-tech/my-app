import Photo from "@/components/photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

export default function Home() {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-between xl:pt-8 xl:pb-24 xl:flex-row">
          <div className="text-center xl:text-left order-2 xl:order-none">
            {/* Rotating Titles */}
            <div className="inline-block h-6 overflow-hidden">
              <div className="animate-vertical-slide text-xl">
                <span className="block h-6 leading-6">Software Engineer</span>
                <span className="block h-6 leading-6">
                  Blockchain Enthusiast
                </span>
                <span className="block h-6 leading-6">UI/UX Designer</span>
                <span className="block h-6 leading-6">
                  Full Stack Developer
                </span>
              </div>
            </div>

            {/* Main Heading with Typing Animation */}
            <h1 className="h1 mb-6">
              Hello I&apos;m <br />
              <span className="text-primary-accent  ">Hamza Shabbir</span>
            </h1>

            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-8">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-primary-accent rounded-full flex justify-center items-center text-primary-accent text-base hover:bg-primary-accent hover:text-primary hover:transition-all duration-500 "
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
