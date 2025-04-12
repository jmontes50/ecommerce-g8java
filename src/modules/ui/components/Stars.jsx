const Stars = ({ rating }) => {
  const totalMax = 5;
  //porque necesitamos iterar, se le convirtio en un Array
  const currentStars = [...Array(totalMax)];

  return (
    <div className="flex items-center mb-4">
      {currentStars.map((star, i) => (
        <i
          key={i}
          className={`text-yellow-400 me-2 ${
            i < rating ? "fa-solid" : "fa-regular"
          } fa-star`}
        />
      ))}
      <span className="text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Stars;
