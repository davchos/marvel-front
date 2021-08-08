import "./css/Image.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Image = ({ elem, id, setCookie }) => {
  const [description, setDescription] = useState({ display: "none" });
  const [image, setImage] = useState({ display: "block" });
  const [buttonDescription, setButtonDescription] =
    useState("Show description");
  const [buttonFavoris, setButtonFavoris] = useState("Add to favoris");

  let location = useLocation();

  const picture = elem.thumbnail.path + "." + elem.thumbnail.extension;

  const handleClickButtonFavoris = (event) => {
    // console.log(Cookies.get());
    if (location.pathname === "/personnages" || location.pathname === "/") {
      if (!Cookies.get(`character-${elem._id}`)) {
        Cookies.set(`character-${elem._id}`, JSON.stringify(elem));
        setButtonFavoris("Remove from favoris");
      } else {
        Cookies.remove(`character-${elem._id}`);
        setButtonFavoris("Add to favoris");
      }
    } else if (
      location.pathname === "/comics" ||
      location.pathname == `/personnage/${id}`
    ) {
      if (!Cookies.get(`comics-${elem._id}`)) {
        Cookies.set(`comics-${elem._id}`, JSON.stringify(elem));
        setButtonFavoris("Remove from favoris");
      } else {
        Cookies.remove(`comics-${elem._id}`);
        setButtonFavoris("Add to favoris");
      }
    } else if (location.pathname == `/personnage/${id}`) {
      if (!Cookies.get(`comics-${elem._id}`)) {
        Cookies.set(`comics-${elem._id}`, JSON.stringify(elem));
        setButtonFavoris("Remove from favoris");
      } else {
        Cookies.remove(`comics-${elem._id}`);
        setButtonFavoris("Add to favoris");
      }
    } else if (location.pathname == `/favoris`) {
      Cookies.remove(`comics-${elem._id}`);
      Cookies.remove(`character-${elem._id}`);
      setButtonFavoris("Add to favoris");
      setCookie(Cookies.get());
    }
    console.log(Cookies.get());
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

  const handleLink = (location) => {
    if (
      (location.pathname === "/personnages" || location.pathname === "/") &&
      elem.comics.length !== 0
    ) {
      return { ...location, pathname: `/personnage/${elem._id}` };
    } else if (location.pathname === "/comics") {
      return;
    }
  };
  useEffect(() => {
    if (
      Cookies.get(`character-${elem._id}`) ||
      Cookies.get(`comics-${elem._id}`)
    ) {
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
          style={{
            display: !elem.description ? "none" : "block",
          }}
        >
          {buttonDescription}
        </button>
        <button onClick={handleClickButtonFavoris}>{buttonFavoris}</button>
      </div>
      <Link
        to={handleLink}
        key={elem._id}
        style={{ textDecoration: "none" }}
        className="disabledCursor"
      >
        <img
          style={image}
          key={elem._id}
          className="image-img"
          src={picture}
          alt="Character"
        />

        <div style={description} className="image-description">
          <p>{elem.description}</p>
        </div>
        {elem.title ? (
          <div className="image-name">{elem.title}</div>
        ) : (
          <div className="image-name">{elem.name}</div>
        )}
      </Link>
    </div>
  );
};
export default Image;
