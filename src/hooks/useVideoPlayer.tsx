import { useState, useEffect } from "react";

const useVideoPlayer = (videoRef: any) => {
  const [playState, setPlayState] = useState({
    speed: 1,
    isPlaying: true,
    progress: 0,
  });

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const backForward = () => {
    videoRef.current.currentTime -= 5;
  };

  const togglePlay = () => {
    setPlayState({
      ...playState,
      isPlaying: !playState.isPlaying,
    });
  };

  useEffect(() => {
    playState.isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [playState.isPlaying, videoRef]);

  const handleDefaultProgress = (_e: any) => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setPlayState({
      ...playState,
      progress,
    });
  };

  const handleManualProgress = (e: any) => {
    const progress = parseFloat(e.target.value);
    const progressValue = (videoRef.current.duration / 100) * progress;
    videoRef.current.currentTime = progressValue;
    setPlayState({
      ...playState,
      progress,
    });
  };

  const handlePlayBackSpeed = (e: any) => {
    const playBackSpeed = parseFloat(e.target.value);
    videoRef.current.playbackRate = playBackSpeed;
    setPlayState({
      ...playState,
      speed: playBackSpeed,
    });
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return {
    playState,
    fastForward,
    backForward,
    togglePlay,
    handleDefaultProgress,
    handleManualProgress,
    handlePlayBackSpeed,
    toggleFullscreen,
    handleVolumeChange,
  };
};

export default useVideoPlayer;
