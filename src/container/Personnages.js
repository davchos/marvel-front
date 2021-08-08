import "./css/Personnages.css";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "../components/Image";

const Personnages = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [characterName, setCharacterName] = useState("");

  // const [pages, setPages] = useState([1]);
  const [limit, setLimit] = useState(100);
  let query = "?limit=" + limit + "&page=" + page + "&name=" + characterName;

  const updatePage = (index) => {
    setPage(index + 1);
  };
  // console.log(query);
  useEffect(() => {
    console.log(characterName);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters${query}`
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
  }, [page, characterName]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Header
        setCharacterName={setCharacterName}
        characterName={characterName}
      />
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
export default Personnages;
