import React from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";

export default function AddPortfolioModal({ onClose }) {
  return (
    <div
      id="insertModal"
      className={PortfolioListStyle.modal2}
      style={{ display: "block" }} // 모달 표시
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className={PortfolioListStyle.modalContent2}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 차단
      >
        <button className={PortfolioListStyle.closeBtn2} onClick={onClose}>
          &times;
        </button>
        <form>
          <div className={PortfolioListStyle.contentBoxArea}>
            <div className={PortfolioListStyle.contentBox2}>
              <div className={PortfolioListStyle.summaryBox}>
                <div className={PortfolioListStyle.about}>프로젝트명</div>
                <div className={PortfolioListStyle.name}>
                  <input id="mbrPrtflTtl" name="mbrPrtflTtl" type="text" />
                </div>
              </div>
              <div className={PortfolioListStyle.textLine}>
                프로젝트 상세
                <textarea
                  id="mbrPrtflText"
                  name="mbrPrtflText"
                  type="text"
                ></textarea>
                <div className={PortfolioListStyle.attachFileList}>
                  <div>첨부파일</div>
                </div>
              </div>
              <div className={PortfolioListStyle.imageUpload}>
                <input
                  className={PortfolioListStyle.fileList}
                  type="file"
                  name="attList[0]"
                />
                <button
                  className={PortfolioListStyle.fileButton}
                  type="button"
                  id="add_attr_file"
                >
                  첨부자료 추가
                </button>
              </div>
              <input
                className={PortfolioListStyle.signupbtn}
                type="submit"
                value="등록하기"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
