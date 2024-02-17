import React, { useRef } from "react";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { fastFoward, play, pause, undo, fullscreen } from "../../assets";
interface VideoPlayerProps {
  name: string;
  src: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ name, src, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    playState,
    fastForward,
    backForward,
    togglePlay,
    handleDefaultProgress,
    handleManualProgress,
    handlePlayBackSpeed,
    toggleFullscreen,
    handleVolumeChange
  } = useVideoPlayer(videoRef);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-8 m-2 rounded-lg shadow-md md:w-[60%] md:h-[70%] xs:w-full xs:h-1/2 flex flex-col gap-2 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <p className=" text-xl font-semibold">{name}</p>
          <button
            className="bg-black text-white py-1 px-2 rounded-md"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </button>
        </div>
        <div className="sm:p-2 xs:p-1 h-full w-full bg-black relative">
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={handleDefaultProgress}
            autoPlay
            loop
            className="absolute inset-0 w-full h-full"
          ></video>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={playState.progress}
          onChange={(e) => handleManualProgress(e)}
        />
        <div className="flex flex-row justify-between items-center gap-6 mb-1">
          <div className="flex flex-row items-center gap-1">
            <img
              src={undo}
              className="text-sm cursor-pointer md:w-[30px] md:h-[30px] xs:w-[18px] xs:h-[18px]"
              onClick={backForward}
            />
            {playState?.isPlaying ? (
              <img
                src={pause}
                className="text-sm cursor-pointer md:w-[30px] md:h-[30px] xs:w-[18px] xs:h-[18px]"
                onClick={() => togglePlay()}
              />
            ) : (
              <img
                src={play}
                className="text-sm cursor-pointer md:w-[30px] md:h-[30px] xs:w-[18px] xs:h-[18px]"
                onClick={() => togglePlay()}
              />
            )}
            <img
              src={fastFoward}
              className="text-sm cursor-pointer md:w-[30px] md:h-[30px]  xs:w-[18px] xs:h-[18px]"
              onClick={fastForward}
            />
            <div className="bg-gray-500 md:py-1 md:px-2 xs:p-1 rounded-md flex flex-grow items-center md:ml-4 xs:ml-2">
              <p className='font-mono text-sm'>
                {`${Math.floor((videoRef.current?.currentTime || 0) / 60)}:${(
                  "0" + Math.floor((videoRef.current?.currentTime || 0) % 60)
                ).slice(-2)}/`}
                {`${Math.floor((videoRef.current?.duration || 0) / 60)}:${(
                  "0" + Math.floor((videoRef.current?.duration || 0) % 60)
                ).slice(-2)}`}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
          <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={videoRef.current?.volume}
          onChange={handleVolumeChange}
          className="appearance-none w-[60px] h-1 bg-gray-400 rounded-full focus:outline-none"
        />
            <select
              value={playState?.speed}
              onChange={handlePlayBackSpeed}
              className="px-1 py-1 cursor-pointer rounded-md bg-white border border-gray-300 text-sm xs:w-[20px] xs:h-[25px] sm:w-full"
            >
              <option value={0.5}>0.5</option>
              <option value={0.75}>0.75</option>
              <option value={1}>1</option>
              <option value={1.25}>1.25</option>
              <option value={1.5}>1.5</option>
            </select>
            <img
              src={fullscreen}
              className="text-sm cursor-pointer md:w-[23px] md:h-[23px] xs:w-[15px] xs:h-[15px]"
              onClick={() => toggleFullscreen()}
            />
          </div>

          {/* <div className="flex flex-col justify-center">
    <ShortcutIcon />
    <p className="text-sm">Shortcut</p>
  </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
