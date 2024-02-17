import VideoCard from "../components/VideoPlayer/videoCard";
import { VIDEOS } from "../helpers/sampleVideos";
const HomePage = () => {
  
  return (
    <div className="md:h-[93vh] xs:h-full bg-[#CFBEFF]">
      <div className="flex justify-center items-center md:flex-row xs:flex-col gap-5 flex-wrap px-6 w-full py-2">
        {VIDEOS?.map((item) => (
          <VideoCard id={item.id} name={item.name} src={item.src} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
