import PortfolioListStyle from "./PortfolioList.module.css";
import React from "react";

export default function Portfolio({ portfolio }) {
  return (
    <div className={PortfolioListStyle.portfolioItem}>
      <img
        src="/images/second-section2.svg"
        alt={portfolio.mbrPrtflTtl}
        className={PortfolioListStyle.portfolioItemImg}
      />
      <h3 className={PortfolioListStyle.portfolioItemH3}>
        {portfolio.mbrPrtflTtl}
      </h3>
      <p className={PortfolioListStyle.description}>{portfolio.mbrPrtflText}</p>
    </div>
  );
}
