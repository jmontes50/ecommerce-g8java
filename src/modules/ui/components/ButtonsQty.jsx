const ButtonsQty = ({ qtyCart, incrementQty, decrementQty }) => {
  return (
    <div className="flex">
      <button
        className="p-4 border-y-2 border-s-2 dark:border-white rounded-s-lg hover:bg-gray-500 cursor-pointer"
        onClick={decrementQty}
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <span className="p-4 flex align-middle border-y-2 border-white">
        {qtyCart}
      </span>
      <button
        className="p-4 border-y-2 border-e-2 rounded-e-lg border-white hover:bg-gray-500 cursor-pointer"
        onClick={incrementQty}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default ButtonsQty;
