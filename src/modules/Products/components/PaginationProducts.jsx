const PaginationProducts = ({totalPages, setPage}) => {

  const arrButtons = [];

  for(let i = 1; i <= totalPages; i++){
    const joinItem = (
      <button 
        key={i}
        className="join-item btn" 
        onClick={() => {setPage(i)}}
      >
        {i}
      </button>
    )
    arrButtons.push(joinItem)
  }

  // console.log({ arrButtons });

  return (
    <div className="join">
      {arrButtons}
    </div>
  )
}

export default PaginationProducts