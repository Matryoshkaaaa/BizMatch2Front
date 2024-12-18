import React from "react";
import { useState } from "react";
import PortfolioListStyle from "./PortfolioList.module.css";
import { host } from "../../utils/hosts";

export default function Portfolio({ portfolio }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const attVOs = portfolio?.attVOs;
  const imgPath = attVOs && attVOs[0]?.attUrlNonread;
  const handleError = (error) => {
    setIsError(true);
    console.error("Image loading error:", error);
  };

  // 줄바꿈 처리 함수
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null; // undefined 또는 null인 경우 아무것도 반환하지 않음
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
          src={`${host()}:8080/images/portfolio/img/${imgPath}/`}
          onError={handleError}
          onLoad={() => setIsLoading(false)} // 로딩 완료 시 상태 변경
          className={PortfolioListStyle.portfolioItemImg}
          alt=""
        />
      )}
      <h3 className={PortfolioListStyle.portfolioItemH3}>
        {portfolio.mbrPrtflTtl}
      </h3>
      <p className={PortfolioListStyle.description}>
        {renderTextWithLineBreaks(portfolio.mbrPrtflText)}
      </p>
    </div>
  );
}
