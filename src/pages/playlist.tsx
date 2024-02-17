import { useEffect, useState } from "react";
import AddVideos from "../components/ManagePlaylist/AddVideos";
import EditPlayList from "../components/ManagePlaylist/EditPlayList";
import { VIDEOS } from "../helpers/sampleVideos";
import VideoCard from "../components/VideoPlayer/videoCard";
import { usePlaylist } from "../context/playlistContext";
interface Video {
  id: number;
  title: string;
  src: string;
  thumb: string;
}
let searchTimeout: any;
const Playlist = () => {
  const context = usePlaylist();
  const { playlistState, setPlaylistState } = context;
  const [openAddPlayListDialog, setOpenAddPlaylistDialog] = useState(false);
  const [openEditPlayListDialog, setOpenEditPlayListDialog] = useState(false);
  const [filteredData, setFilteredData] = useState<Video[]>(playlistState);
  const [searchText, setSearchText] = useState("");
  //   const [playlistVideos, setPlayListVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchFilteredData();
  }, [playlistState]);

  // Debouncing for Effecient Search

  useEffect(() => {
    if (playlistState.length) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        fetchFilteredData();
      }, 500);
    }
  }, [searchText]);

  const onAddToPlayList = (videos: number[]) => {
    const toBeAddedVideos: any = VIDEOS.filter((video: any) =>
      videos.find((item: number) => video.id === item)
    );
    const filteredVideos: any = toBeAddedVideos.filter(
      (item: any) => !playlistState.some((video) => video.id === item.id)
    );

    setPlaylistState([...playlistState, ...filteredVideos]);
  };

  const handleDeletePlaylistVideo = (id: number) => {
    const indexToBeRemoved = playlistState.findIndex((item) => item.id === id);
    if (indexToBeRemoved > -1) {
      const updatedPlaylistState = playlistState.filter(
        (item) => item.id !== id
      );
      setPlaylistState(updatedPlaylistState);
    }
  };

  const fetchFilteredData = () => {
    if (searchText.length) {
      const data: any = playlistState?.filter((item: any) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(data);
    } else {
      setFilteredData(playlistState);
    }
  };

  return (
    <div className="flex flex-col w-full h-[100%] bg-[#CFBEFF] pt-20">
      <div className="flex xs:flex-col md:flex-row gap-2 items-center justify-start p-2">
        <div className="flex gap-2 ">
          <button
            className="bg-white px-4 py-2 border-black border-[1px] font-mono rounded-md"
            onClick={() => setOpenAddPlaylistDialog(!openAddPlayListDialog)}
          >
            Add Videos
          </button>
          <button
            className="bg-white px-4 py-2 border-black border-[1px] font-mono rounded-md"
            onClick={() => setOpenEditPlayListDialog(!openEditPlayListDialog)}
          >
            Edit Playlist
          </button>
        </div>

        <input
          className="md:w-1/5 xs:w-full sm:w-1/2 px-4 py-2 rounded-md font-mono"
          placeholder="Enter the title"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex gap-5 flex-wrap justify-center my-4 px-6">
        {filteredData?.length ? (
          filteredData?.map((item) => (
            <VideoCard
              id={item.id}
              title={item.title}
              src={item.src}
              thumb={item.thumb}
              deleteVideo={true}
              handleDelete={handleDeletePlaylistVideo}
            />
          ))
        ) : (
          <p className="font-mono font-semibold text-2xl text-center text-[#1D0638]">
            No Videos Found
          </p>
        )}
      </div>
      {openAddPlayListDialog && (
        <AddVideos
          onAddToPlayList={onAddToPlayList}
          onClose={() => {
            setOpenAddPlaylistDialog(!openAddPlayListDialog);
          }}
        />
      )}
      {openEditPlayListDialog && (
        <EditPlayList
          // onAddToPlayList = {onAddToPlayList}
          onClose={() => {
            setOpenEditPlayListDialog(!openEditPlayListDialog);
          }}
        />
      )}
    </div>
  );
};

export default Playlist;
