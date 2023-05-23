import React, { useContext } from "react";

import "./Article.css";
import { ThemeContext } from "../../ThemeContexts/ThemeContext";

const Article = ({ imgUrl, date, text }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={
          darkMode
            ? "gpt3__blog-container_article"
            : "gpt3__blog-container_article-light"
        }
      >
        <div className="gpt3__blog-container_article-image">
          <img src={imgUrl} alt="blog_image" />
        </div>
        <div
          className={
            darkMode
              ? "gpt3__blog-container_article-content"
              : "gpt3__blog-container_article-content-light"
          }
        >
          <div>
            <p>{date}</p>
            <h3>{text}</h3>
          </div>
          <p>Read Full Article</p>
        </div>
      </div>
    </>
  );
};
export default Article;
