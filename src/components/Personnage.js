import "./css/Personnage.css";
import Header from "./Header";
import axios from "axios";
import Pagination from "./Pagination";
import Image from "./Image";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Personnage = () => {
  const { id } = useParams();
  const [characterName, setCharacterName] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  // const [data, setData]
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  console.log("Personnage :" + id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-bak.herokuapp.com/comics/${id}`
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.comics.length / limit));
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        // Todo manage 4XX/5XX
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <Header
        setCharacterName={setCharacterName}
        characterName={characterName}
      />
      <div className="personnages-container">
        <div className="personnages-pagination">
          {data.comics.length > 3 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}
        </div>

        <div className="personnages-content">
          {data.comics &&
            data.comics.map((elem, index) => {
              return <Image elem={elem} key={elem._id} id={id} />;
            })}
        </div>
      </div>
    </div>
  );
};
export default Personnage;
