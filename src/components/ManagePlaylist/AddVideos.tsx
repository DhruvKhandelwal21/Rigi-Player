import React, { useState } from "react";
import { VIDEOS } from "../../helpers/sampleVideos";

interface AddVideosProps {
  onClose: () => void;
  onAddToPlayList: (ids: number[])=> void;
}
const AddVideos: React.FC<AddVideosProps> = ({ onClose, onAddToPlayList }) => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md md:w-[50%] md:h-[50%] xs:w-full xs:h-1/2 m-2 flex flex-col gap-2 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <p className=" text-xl font-semibold">Add Videos</p>
          <div className="flex items-center gap-2">
            <button
              className="bg-black text-white py-1 px-2 rounded-md"
              onClick={() => {
                onAddToPlayList(checkedItems)
                onClose();
              }}
            >
              Add
            </button>
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
        <div className="flex flex-col gap-4">
          {VIDEOS.map((item, index) => {
            return (
              <div className="flex gap-2 items-center w-full bg-[#FCEEFF] my-1 px-2 max-h-fit rounded-md py-1 " key={index}>
                <input
                  type="checkbox"
                  className='h-4 w-4'
                  name={item.name}
                  checked={checkedItems.includes(item.id)}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                />
                <p className="font-mono text-md ">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddVideos;
