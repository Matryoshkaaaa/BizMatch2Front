import PortfolioListStyle from "./PortfolioList.module.css";

export default function Portfolio({ portfolio }) {
  return (
    <div className={PortfolioListStyle.portfolioItem}>
      <img
        src={portfolio.image || "second-section2.svg"} // 이미지가 없을 경우 기본 이미지 표시
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
