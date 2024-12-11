import React, { useState } from "react";
import PortfolioListStyle from "../member/PortfolioList.module.css";
import { registPortfolioThunk } from "../../stores/thunks/portfolioThunk";
import { useDispatch } from "react-redux";

export default function AddPortfolioModal({ onClose }) {
  const dispatch = useDispatch();

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

    console.log("폼 데이터 상태:", portfolioData);

    const formData = new FormData();
    formData.append("mbrPrtflTtl", portfolioData.mbrPrtflTtl);
    formData.append("mbrPrtflText", portfolioData.mbrPrtflText);
    portfolioData.attList.forEach((file, index) => {
      formData.append(`attList[${index}]`, file);
    });

    for (let [key, value] of formData.entries()) {
      console.log("전송데이터:", `${key}: ${value}`);
    }

    dispatch(registPortfolioThunk(formData))
      .then(() => {
        alert("포트폴리오가 성공적으로 등록되었습니다.");
        onClose(); // 모달 닫기
      })
      .catch((error) => {
        console.error("포트폴리오 등록 중 오류 발생:", error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

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
                    value={portfolioData.mbrPrtflTtl}
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
                  value={portfolioData.mbrPrtflText}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className={PortfolioListStyle.attachFileList}>
                  <div>첨부파일:</div>
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
