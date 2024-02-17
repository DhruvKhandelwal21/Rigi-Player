import React, { useState } from "react";
import { thumbnail, deleteIcon,play } from "../../assets";
import VideoPlayer from "./videoPlayer";

interface VideoCardProps {
  id: number;
  name: string;
  src: string;
  deleteVideo?: boolean;
  handleDelete?: (id:number) => void
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  name,
  src,
  deleteVideo = false,
  handleDelete = ()=>{}
}: any) => {
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);

  return (
    <>
      <div className="flex flex-col border-gray-200 border-[2px] lg:w-1/5 md:w-1/3 xs:w-full sm:w-1/2 h-auto bg-white rounded-lg ">
        <img
          className="w-full h-44 cursor-pointer object-cover rounded-sm border-b-zinc-400 border-b-[3px]"
          src={thumbnail}
          alt="play"
          onClick={() => setOpenVideoPlayer(!openVideoPlayer)}
        />
        <div className="px-2 py-2 flex justify-between items-center">
          <h3 className="text-md font-mono text-black">{name}</h3>
          <div className='flex gap-1 items-center'>
            {deleteVideo && (
              <img
              src={deleteIcon}
              className="text-sm cursor-pointer w-[22px] h-[22px]"
              onClick={() => handleDelete(id)}
            /> 
            )}
            <img
                src={play}
                className="text-sm cursor-pointer w-[30px] h-[30px]"
                onClick={() => setOpenVideoPlayer(!openVideoPlayer)}
              />
          </div>
        </div>
      </div>

      {openVideoPlayer && (
        <VideoPlayer
          src={src}
          name={name}
          onClose={() => {
            setOpenVideoPlayer(!openVideoPlayer);
          }}
        />
      )}
    </>
  );
};

export default VideoCard;
