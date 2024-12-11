import { useEffect } from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolioThunk,
  getOnePortfolioThunk,
} from "../../stores/thunks/portfolioThunk";

export default function PortfolioModal({ mbrPrtflId, onClose }) {
  const dispatch = useDispatch();
  const portfolioDetails = useSelector((state) => state.portfolio.details);

  useEffect(() => {
    console.log("PortfolioModal에서 받은 mbrPrtflId:", mbrPrtflId); // 전달된 ID를 확인
    if (mbrPrtflId) {
      dispatch(getOnePortfolioThunk(mbrPrtflId));
    }
  }, [mbrPrtflId, dispatch]);

  // 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deletePortfolioThunk(mbrPrtflId))
        .then(() => {
          alert("포트폴리오가 성공적으로 삭제되었습니다.");
          onClose(); // 모달 닫기
        })
        .catch((error) => {
          console.error("포트폴리오 삭제 중 오류 발생:", error);
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  // 데이터가 로드되지 않았을 때 처리
  if (!portfolioDetails || portfolioDetails.mbrPrtflId !== mbrPrtflId) {
    return (
      <div
        id="portfolioModal"
        className={PortfolioListStyle.modal}
        style={{ display: "block" }}
        onClick={onClose}
      >
        <div
          className={PortfolioListStyle.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={PortfolioListStyle.closeButton} onClick={onClose}>
            &times;
          </span>
          <div className={PortfolioListStyle.contentBox}>
            <p>데이터를 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <div id="mbrPrtflTtl" className={PortfolioListStyle.mbrPrtflTtl}>
                {portfolioDetails.mbrPrtflTtl}
              </div>
              <div className={PortfolioListStyle.textLine}>
                <div className={PortfolioListStyle.weight}>포트폴리오 상세</div>
                <p
                  id="mbrPrtflText"
                  className={PortfolioListStyle.mbrPrtflText}
                >
                  {portfolioDetails.mbrPrtflText}
                </p>
                <div className={PortfolioListStyle.attachFileList}>
                  첨부파일:
                  {portfolioDetails.attVOs && portfolioDetails.attVOs.length > 0
                    ? portfolioDetails.attVOs.map((file, index) => (
                        <div key={index}>{file.fileName}</div>
                      ))
                    : "첨부파일이 없습니다."}
                </div>
              </div>
              <div className={PortfolioListStyle.buttonBox}>
                <button className={PortfolioListStyle.edit}>수정</button>
                <button
                  onClick={handleDelete}
                  className={PortfolioListStyle.deleteBtn}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
