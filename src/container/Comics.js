import "./css/Comics.css";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "../components/Image";
import Pagination from "../components/Pagination";

const Comics = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [limit, setLimit] = useState(100);
  const [comicsName, setComicsName] = useState("");

  let query = "?limit=" + limit + "&page=" + page + "&title=" + comicsName;

  const updatePage = (index) => {
    setPage(index + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-bak.herokuapp.com/comics${query}`
        );

        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / limit));

        setIsLoading(false);
      } catch (error) {
        // Todo manage 4XX/5XX
        console.log(error);
      }
    };

    fetchData();
  }, [page, comicsName]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Header setComicsName={setComicsName} />
      <div className="personnages-container">
        <div className="personnages-pagination">
          {data.count > 3 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </div>

        <div className="personnages-content">
          {data.results &&
            data.results.map((elem, index) => {
              return <Image elem={elem} key={elem._id} />;
            })}
        </div>
      </div>
    </div>
  );
};
export default Comics;
