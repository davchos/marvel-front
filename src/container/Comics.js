import "./css/Comics.css";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Comics = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [limit, setLimit] = useState(10);
  let query = "?limit=" + limit + "&page=" + page;

  const updatePage = (index) => {
    setPage(index + 1);
  };
  // console.log(query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics${query}`
        );
        // console.log(response.data);
        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / limit));
        const arrayLength = Math.ceil(response.data.count / limit);
        // console.log(arrayLength);
        const tmp = new Array(arrayLength).fill(1);
        setPages(tmp);
        setIsLoading(false);
        // console.log(response);
      } catch (error) {
        // Todo manage 4XX/5XX
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Header />
      <div className="comics-container">
        <div className="comics-content">
          {data.results.map((elem, index) => {
            const image = elem.thumbnail.path + "." + elem.thumbnail.extension;
            // console.log(image);

            return (
              <div key={index}>
                <img className="comics-img" src={image} alt="Character" />
              </div>
            );
          })}
        </div>

        <div id="offers-pages" className="offers-container">
          <span className="offers-pages">page:</span>
          {pages.map((elem, index) => {
            const update = () => {
              updatePage(index);
            };
            return (
              <span className="offers-pages" key={index} onClick={update}>
                {index + 1}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Comics;
