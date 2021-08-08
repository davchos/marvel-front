import "./css/Favoris.css";

import Cookies from "js-cookie";

import Header from "../components/Header";
import Image from "../components/Image";
import { useState } from "react";

const Favoris = (props) => {
  const [allCookies, setCookie] = useState(Cookies.get());
  const favoris = [];

  for (const [key, value] of Object.entries(allCookies)) {
    if (key.match(/^comics/) || key.match(/^character/)) favoris.push(value);
  }

  console.log(favoris);
  //   console.log(character);

  return (
    <div>
      <Header />
      <div className="personnages-container">
        <div className="personnages-pagination"></div>

        <div className="personnages-content">
          {favoris.length >= 1 &&
            favoris.map((elem, index) => {
              const newElem = JSON.parse(elem);
              return (
                <Image elem={newElem} key={newElem._id} setCookie={setCookie} />
              );
            })
            //   ) : (
            // <span> Pas de favoris </span>
          }
        </div>
      </div>
    </div>
  );
};
export default Favoris;
