import VideoCard from "../components/VideoPlayer/videoCard";
import { VIDEOS } from "../helpers/sampleVideos";
const HomePage = () => {
  
  return (
    <div className="h-full bg-[#CFBEFF] mt-12">
      <div className="flex justify-center items-center md:flex-row xs:flex-col gap-5 flex-wrap px-6 w-full py-2">
        {VIDEOS?.map((item) => (
          <VideoCard id={item.id} title={item.title} src={item.src} thumb = {item.thumb} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
