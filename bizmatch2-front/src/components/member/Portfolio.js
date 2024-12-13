import { useDispatch, useSelector } from "react-redux";
import PortfolioListStyle from "./PortfolioList.module.css";
import React, { useEffect } from "react";
import { readImg } from "../../stores/thunks/portfolioThunk";

export default function Portfolio({ portfolio }) {
  const dispatch = useDispatch();
  const imgPath = portfolio?.attVOs[0]?.attUrlNonread;
  const imgByte = useSelector((state) => state.portfolio.image);

  useEffect(() => {
    dispatch(readImg(imgPath));
  }, [dispatch, imgPath]);
  return (
    <div className={PortfolioListStyle.portfolioItem}>
      <img
        src={imgPath ? imgPath : `/images/second-section2.svg`}
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
