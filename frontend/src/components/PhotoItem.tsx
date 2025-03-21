"use client";

import PhotoImage from "./PhotoImage";

type PhotoProps = {
  photo: {
    id: number;
    url: string;
    title: string;
  };
  index: number;
};

const PhotoItem = ({ photo, index }: PhotoProps) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden relative">
      <PhotoImage url={photo.url} title={photo.title} index={index} />
      <div className="p-2 bg-white">
        <p className="text-sm text-center font-semibold mt-2">{photo.title}</p>
      </div>
    </div>
  );
};

export default PhotoItem;
