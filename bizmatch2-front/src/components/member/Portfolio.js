import React from "react";
import { useState } from "react";
import PortfolioListStyle from "./PortfolioList.module.css";

export default function Portfolio({ portfolio }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const attVOs = portfolio?.attVOs;
  const imgPath = attVOs && attVOs[0]?.attUrlNonread;
  const handleError = (error) => {
    setIsError(true);
    console.error("Image loading error:", error);
  };

  return (
    <div className={PortfolioListStyle.portfolioItem}>
      {isLoading ? (
        <img
          src={`/images/second-section2.svg`}
          className={PortfolioListStyle.portfolioItemImg}
          alt=""
        />
      ) : isError ? (
        <img
          src={`/images/second-section2.svg`}
          className={PortfolioListStyle.portfolioItemImg}
          alt=""
        />
      ) : (
        <img
          src={`http://localhost:8080/images/portfolio/img/${imgPath}/`}
          onError={handleError}
          onLoad={() => setIsLoading(false)} // 로딩 완료 시 상태 변경
          className={PortfolioListStyle.portfolioItemImg}
          alt=""
        />
      )}
      <h3 className={PortfolioListStyle.portfolioItemH3}>
        {portfolio.mbrPrtflTtl}
      </h3>
      <p className={PortfolioListStyle.description}>{portfolio.mbrPrtflText}</p>
    </div>
  );
}
