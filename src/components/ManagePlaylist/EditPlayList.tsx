import { useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { usePlaylist } from "../../context/playlistContext";
import update from "immutability-helper";

const type = "VIDEO"; // Define the type variable

const VideoList = ({ video, index, moveVideoItem }: any) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [, dropRef] = useDrop({
    accept: type,
    hover: (item: any, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect: any = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveVideoItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef<HTMLDivElement>(null);
  const dragDropRef: any = dragRef(dropRef(ref));

  return (
    <div className='w-full bg-[#FCEEFF] my-1 flex justify-center items-center max-h-fit rounded-md py-1 hover:cursor-move' ref={dragDropRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{video.title}</h3>
    </div>
  );
};

const EditPlayList = ({ onClose }: any) => {
  const context = usePlaylist();
  const { playlistState, setPlaylistState } = context;

  const moveVideoItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = playlistState[dragIndex];
      // const hoverItem = playlistState[hoverIndex];
      // Swap places of dragItem and hoverItem in the pets array
      const updatedData = update(playlistState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      });
      setPlaylistState(updatedData);
    },
    [playlistState]
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md md:w-[40%] md:h-[50%] xs:w-full xs:h-1/2 m-2 flex flex-col gap-2 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <p className=" text-xl font-mono font-semibold">Rearrange Videos</p>
          <div className="flex items-center gap-2">
            <button
              className="bg-black text-white py-1 px-2 rounded-md"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100">
          <DndProvider backend={HTML5Backend}>
            {playlistState?.length ? playlistState.map((video, index) => (
              <VideoList
                index={index}
                video={video}
                moveVideoItem={moveVideoItem}
              />
            )): <p className='text-md font-mono'>Please Add Videos to PlayList</p>}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default EditPlayList;
