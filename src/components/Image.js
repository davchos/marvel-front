import "./css/Image.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Image = ({ elem }) => {
  const [description, setDescription] = useState({ display: "none" });
  const [image, setImage] = useState({ display: "block" });
  const [buttonDescription, setButtonDescription] =
    useState("Show description");
  const [buttonFavoris, setButtonFavoris] = useState("Add to favoris");

  const picture = elem.thumbnail.path + "." + elem.thumbnail.extension;

  const handleClickButtonFavoris = (event) => {
    if (!Cookies.get(`character-comics-${elem._id}`)) {
      Cookies.set(`character-comics-${elem._id}`, elem._id);
      setButtonFavoris("Remove from favoris");
    } else {
      Cookies.remove(`character-comics-${elem._id}`);
      setButtonFavoris("Add to favoris");
    }
  };

  const handleClickButtonDescription = (event) => {
    if (buttonDescription === "Show description") {
      setButtonDescription("Hide description");
      setImage({ display: "none" });
      setDescription({ display: "block" });
    } else {
      setButtonDescription("Show description");
      setImage({ display: "block" });
      setDescription({ display: "none" });
    }
  };

  //   const handleFavoris = ()=>{

  //   }
  useEffect(() => {
    if (Cookies.get(`character-comics-${elem._id}`)) {
      setButtonFavoris("Remove from favoris");
    } else {
      setButtonFavoris("Add to favoris");
    }
  }, []);
  return (
    <div>
      <div className="image-button">
        <button
          onClick={handleClickButtonDescription}
          //   disabled={elem.description.length === 0 ? true : false}
          style={{
            // visibility: elem.description.length === 0 ? "hidden" : "visible",
            display: elem.description.length === 0 ? "none" : "block",
          }}
        >
          {buttonDescription}
        </button>
        <button onClick={handleClickButtonFavoris}>{buttonFavoris}</button>
      </div>
      <Link
        to={elem.comics.length !== 0 ? `/personnage/${elem._id}` : "#"}
        key={elem._id}
        style={{ textDecoration: "none" }}
        className="disabledCursor"
        // data-tip=""
        // data-for={elem.name}
        // id="personnages-show"
      >
        {/* <div id="personnages-show"> */}
        <img
          style={image}
          key={elem._id}
          className="image-img"
          src={picture}
          alt="Character"
          //   onMouseOver={(e) => {
          //   console.log(image + description + typeof setDescription);
          //   console.log("Picture enter");
          // setImage({ display: "none" });
          // setDescription({ display: "block" });
          //   console.log(image + description);
          //   }}
          // onMouseOut={(e) => {
          // //   console.log("Picture leave");
          //   setImage({ display: "block" });
          //   setDescription({ display: "none" });
          // }}
          // data-tip=""
          // data-for={elem.name}
        />
        {/* <div className="personnages-name">{elem.name}</div> */}
        <div
          style={description}
          className="image-description"
          //   onMouseOut={(e) => {
          //     //   console.log("Picture leave");
          //     setImage({ display: "block" });
          //     setDescription({ display: "none" });
          //   }}
        >
          {/* <span>{elem.name}</span> */}
          <p>{elem.description}</p>
        </div>
        {/* </div> */}
        <div className="image-name">{elem.name}</div>
      </Link>
    </div>
  );
};
export default Image;
