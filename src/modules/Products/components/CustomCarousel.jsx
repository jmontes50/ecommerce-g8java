import { useState } from "react";

const CustomCarousel = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const imgs = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1526692202263-843e30c353e8?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "models",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1531901390263-0016793c7c7d?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "models2",
    },
  ];

  const previousImg = () => {
    const newIndex = currentImg === 0 ? imgs.length - 1 : currentImg - 1;
    setCurrentImg(newIndex);
  };

  const nextImg = () => {
    const newIndex = currentImg === imgs.length - 1 ? 0 : currentImg + 1;
    setCurrentImg(newIndex);
  };

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden">
      {/* {imgs.map((img) => ( */}
      <div className="w-full h-full relative">
        <img
          src={imgs[currentImg].src}
          alt={imgs[currentImg].label}
          className="w-full h-full object-cover"
        />
      </div>
      <button
        className="btn btn-circle absolute left-8 top-1/2 -translate-y-1/2"
        onClick={previousImg}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        className="btn btn-circle absolute right-8 top-1/2 -translate-y-1/2"
        onClick={nextImg}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      {/* ))} */}
    </div>
  );
};

export default CustomCarousel;
