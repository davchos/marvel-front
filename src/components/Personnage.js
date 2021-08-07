import "./css/Personnage.css";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Personnage = () => {
  const { id } = useParams();

  // const [data, setData]
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  console.log("Personnage :" + id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        setData(response.data);

        setIsLoading(false);
        console.log(response);
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
      <Header />
      <div className="personnage-content">
        {data.comics.map((elem, index) => {
          const image = elem.thumbnail.path + "." + elem.thumbnail.extension;
          return (
            <div>
              <span key={elem._id}>{elem.title}</span>
              <div key={index}>
                <img
                  key={index}
                  className="personnage-img"
                  src={image}
                  alt="Character"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Personnage;
