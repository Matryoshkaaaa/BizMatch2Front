import React from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";

export default function PortfolioModal({ portfolio, onClose }) {
  return (
    <>
      <div
        id="portfolioModal"
        className={PortfolioListStyle.modal}
        style={{ display: "block" }} // 모달 표시
        onClick={onClose} // 배경 클릭 시 닫기
      >
        <div
          className={PortfolioListStyle.modalContent}
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 차단
        >
          <span className={PortfolioListStyle.closeButton} onClick={onClose}>
            &times;
          </span>
          <div className={PortfolioListStyle.contentBox}>
            <div className={PortfolioListStyle.summaryBox}>
              <div
                id="mbrPrtflTtl"
                className={PortfolioListStyle.mbrPrtflTtl}
              ></div>
              <div className={PortfolioListStyle.textLine}>
                <div className={PortfolioListStyle.weight}>포트폴리오 상세</div>
                <p
                  id="mbrPrtflText"
                  className={PortfolioListStyle.mbrPrtflText}
                ></p>
                <div className={PortfolioListStyle.attachFileList}>
                  첨부파일
                  <div
                    id="attList"
                    className={PortfolioListStyle.attList}
                  ></div>
                </div>
              </div>
              <div className={PortfolioListStyle.buttonBox}>
                <button className={PortfolioListStyle.edit}>수정</button>
                <button className={PortfolioListStyle.deleteBtn}>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
