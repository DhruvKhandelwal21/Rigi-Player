import { useState, useContext, createContext } from "react";

interface childrenNode{
    children: React.ReactNode;
}
interface Video {
    id: number;
    order: number;
    name: string;
    src: string;
  }
  
interface PlaylistContextType{
    playlistState: Video[];
    setPlaylistState: (videos:any)=> void;
}


const playlistContext = createContext({} as PlaylistContextType);

export const PlaylistStateProvider:React.FC<childrenNode> = ({ children }) => {
  const [playlistState, setPlaylistState] = useState([]);
  
  return (
    <playlistContext.Provider value={{ playlistState, setPlaylistState }}>
      {children}
    </playlistContext.Provider>
  );
};
export const usePlaylist = () => useContext(playlistContext);