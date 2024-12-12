import React, { useRef, useState } from "react";
import { useEffect } from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePortfolioThunk,
  getOnePortfolioThunk,
  updatePortfolioThunk,
} from "../../stores/thunks/portfolioThunk";

export default function PortfolioModal({ mbrPrtflId, onClose }) {
  const dispatch = useDispatch();
  const mbrPrtflTtlRef = useRef();
  const mbrPrtflTextRef = useRef();
  const portfolioDetails = useSelector((state) => state.portfolio.details);

  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [editData, setEditData] = useState({
    mbrPrtflTtl: "",
    mbrPrtflText: "",
  });

  useEffect(() => {
    console.log("PortfolioModal에서 받은 mbrPrtflId:", mbrPrtflId); // 전달된 ID를 확인
    if (mbrPrtflId) {
      dispatch(getOnePortfolioThunk(mbrPrtflId));
    }
  }, [mbrPrtflId, dispatch]);

  // 삭제 핸들러

  useEffect(() => {
    if (portfolioDetails) {
      setEditData({
        mbrPrtflTtl: portfolioDetails.mbrPrtflTtl || "",
        mbrPrtflText: portfolioDetails.mbrPrtflText || "",
      });
    }
  }, [portfolioDetails]);

  // 입력 값 변경 핸들러
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let editData = new FormData();
    editData.append("mbrPrtflTtl", mbrPrtflTtlRef.current.value);
    editData.append("mbrPrtflText", mbrPrtflTextRef.current.value);

    // 콘솔에 입력 데이터 출력
    console.log("전송 데이터 - 제목:", mbrPrtflTtlRef.current.value);
    console.log("전송 데이터 - 내용:", mbrPrtflTextRef.current.value);

    // 수정 데이터 전송
    dispatch(updatePortfolioThunk(mbrPrtflId, editData))
      .then(() => {
        alert("포트폴리오가 성공적으로 수정되었습니다.");
        dispatch(getOnePortfolioThunk(mbrPrtflId));
        setEditMode(false); // 수정 모드 종료
      })
      .catch((error) => {
        console.error("포트폴리오 수정 중 오류 발생:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

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
          {editMode ? (
            // 수정 모드
            <form onSubmit={handleEditSubmit}>
              <div className={PortfolioListStyle.summaryBox}>
                <input
                  type="text"
                  name="mbrPrtflTtl"
                  onChange={handleEditChange}
                  ref={mbrPrtflTtlRef}
                  defaultValue={portfolioDetails.mbrPrtflTtl}
                  required
                />
              </div>
              <div className={PortfolioListStyle.textLine}>
                <textarea
                  name="mbrPrtflText"
                  onChange={handleEditChange}
                  ref={mbrPrtflTextRef}
                  defaultValue={portfolioDetails.mbrPrtflText}
                  required
                ></textarea>
              </div>
              <div className={PortfolioListStyle.buttonBox}>
                <button type="submit" className={PortfolioListStyle.saveBtn}>
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className={PortfolioListStyle.cancelBtn}
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            // 보기 모드.
            <>
              <div className={PortfolioListStyle.summaryBox}>
                <h3>{portfolioDetails.mbrPrtflTtl}</h3>
              </div>
              <div className={PortfolioListStyle.textLine}>
                <p>{portfolioDetails.mbrPrtflText}</p>
              </div>
              <div className={PortfolioListStyle.attachFileList}>
                첨부파일
                {portfolioDetails.attVOs && portfolioDetails.attVOs.length > 0
                  ? portfolioDetails.attVOs.map((file, index) => (
                      <div key={index}>{file.attUrl}</div>
                    ))
                  : " : 첨부파일이 없습니다."}
              </div>
              <div className={PortfolioListStyle.buttonBox}>
                <button
                  onClick={() => setEditMode(true)}
                  className={PortfolioListStyle.editBtn}
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className={PortfolioListStyle.deleteBtn}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
