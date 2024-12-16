import React, { useEffect, useRef, useState } from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";
import { registPortfolioThunk } from "../../stores/thunks/portfolioThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DraggableModal from "./DraggableModal";

export default function AddPortfolioModal({ onClose, cmpId }) {
  const dispatch = useDispatch();
  const mbrPrtflTtlRef = useRef();
  const mbrPrtflTextRef = useRef();
  const navigate = useNavigate();

  // 폼 입력 상태 관리
  const [portfolioData, setPortfolioData] = useState({
    mbrPrtflTtl: "",
    mbrPrtflText: "",
    attList: [],
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({ ...portfolioData, [name]: value });
  };

  // 파일 첨부 핸들러
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPortfolioData({
      ...portfolioData,
      attList: [...portfolioData.attList, ...files],
    });
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index) => {
    const updatedFiles = portfolioData.attList.filter((_, i) => i !== index);
    setPortfolioData({ ...portfolioData, attList: updatedFiles });
  };

  // 폼 제출 핸들러.
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("mbrPrtflTtl", mbrPrtflTtlRef.current.value);
    formData.append("mbrPrtflText", mbrPrtflTextRef.current.value);
    portfolioData.attList.forEach((file) => {
      formData.append(`attList`, file);
    });

    for (let [key, value] of formData.entries()) {
      console.log("전송데이터:", `${key}: ${value}`);
    }

    dispatch(registPortfolioThunk(formData))
      .then(() => {
        alert("포트폴리오가 성공적으로 등록되었습니다.");
        onClose(); // 모달 닫기
        console.log(cmpId);
        // navigate(`/member/mypage/company/portfolio/${cmpId}`);
      })
      .catch((error) => {
        console.error("포트폴리오 등록 중 오류 발생:", error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        console.log("ESC 키 눌림 - onClose 호출됨");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <DraggableModal isOpen={true} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={PortfolioListStyle.contentBoxArea}>
          <div className={PortfolioListStyle.contentBox2}>
            <div className={PortfolioListStyle.summaryBox}>
              <div className={PortfolioListStyle.about}>프로젝트명</div>
              <div className={PortfolioListStyle.name}>
                <input
                  id="mbrPrtflTtl"
                  name="mbrPrtflTtl"
                  type="text"
                  ref={mbrPrtflTtlRef}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={PortfolioListStyle.textLine}>
              프로젝트 상세
              <textarea
                id="mbrPrtflText"
                name="mbrPrtflText"
                ref={mbrPrtflTextRef}
                onChange={handleChange}
                className={PortfolioListStyle.textLineTextarea}
                required
              ></textarea>
              <div className={PortfolioListStyle.attachFileList}>
                <div>첨부파일</div>
                <ul>
                  {portfolioData.attList.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={PortfolioListStyle.imageUpload}>
              <input
                className={PortfolioListStyle.fileList}
                type="file"
                name="attList"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <input
              className={PortfolioListStyle.signupBtn}
              type="submit"
              value="등록하기"
            />
          </div>
        </div>
      </form>
    </DraggableModal>
  );
}
