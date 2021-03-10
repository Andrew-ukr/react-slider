import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const chechNmb = (nmb) => {
    if (nmb > people.length - 1) {
      return setIndex(0);
    }
    if (nmb < 0) {
      return setIndex(people.length - 1);
    }
    return setIndex(nmb);
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      chechNmb(index + 1);
    }, 3000);
    return () => {
      clearInterval(autoplay);
    };
  });

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map(({ id, image, name, title, quote }, i) => {
          let position = "nextSlide";

          if (index === i) {
            position = "activeSlide";
          }

          if (i === index - 1 || (index === 0 && people.length - 1 === i)) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={title} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button
          className="prev"
          onClick={() => {
            chechNmb(index - 1);
          }}
        >
          <FiChevronLeft></FiChevronLeft>
        </button>
        <button
          className="next"
          onClick={() => {
            chechNmb(index + 1);
          }}
        >
          <FiChevronRight></FiChevronRight>
        </button>
      </div>
    </section>
  );
}

export default App;
