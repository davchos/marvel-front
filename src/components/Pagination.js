import "./css/Pagination.css";

const Pagination = ({ page, totalPages, setPage }) => {
  const handleClickPrev = () => {
    setPage(page === 1 ? 1 : page - 1);
  };
  const handleClickNext = () => {
    setPage(page === totalPages ? totalPages : page + 1);
  };
  return (
    <div className="pagination">
      <i
        onClick={handleClickPrev}
        className="far fa-arrow-alt-circle-left fa-3x"
      />{" "}
      {page}
      <i
        onClick={handleClickNext}
        className="far fa-arrow-alt-circle-right fa-3x "
      />
    </div>
  );
};
export default Pagination;
