import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import loader from "./loader.gif";
import "./css/Main.css";
export default function Main() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState(false);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const myFun = async () => {
      setStatus(true);
      let api = "https://api.gyanibooks.com/library/get_dummy_notes/";
      let fetching = await fetch(api);
      let convert = await fetching.json();
      setData(convert);
      setStatus(false);
    };
    myFun();
  }, []);

  // function for theme
  const myTheme = () => {
    setTheme(!theme);
  };
  return (
    <>
      {/* code for cards for fetching all the data from API */}
      {theme
        ? (document.body.style.backgroundColor = "black")
        : (document.body.style.backgroundColor = "white")}

      <div className="container mt-3">
        {status ? (
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img src={loader} alt="loader" id="loader" />
            </div>
          </div>
        ) : (
          <div className="row">
            {data.map((ele) => {
              return (
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 d-flex justify-content-center text-center mt-5"
                  key={uuidv4()}
                >
                  <div className={theme ? "darkCard" : "card"}>
                    <div className="bg">
                      <h3 className="heading_card">{ele.title}</h3>
                      <h5>{ele.category}</h5>
                      <span className="badge badge-danger">{ele.id}</span>
                    </div>
                    <div className="blob"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {status ? (
        ""
      ) : (
        <div className={theme ? "darkMode" : "lightMode"} onClick={myTheme}>
          {theme ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </div>
      )}
    </>
  );
}
