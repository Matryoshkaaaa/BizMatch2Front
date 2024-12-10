import React, { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import PortfolioListStyle from "./PortfolioList.module.css";
import { getPortfolioListThunk } from "../../stores/thunks/portfolioThunk";
import { useDispatch, useSelector } from "react-redux";
import AddPortfolioModal from "../ui/AddPortfolioModal";
import PortfolioModal from "../ui/PortfolioModal";

export default function PortfolioList() {
  const dispatch = useDispatch();

  const portfolios = useSelector((state) => state.portfolio.data ?? []);

  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const sessionInfo = sessionStorage.getItem("info");
    if (sessionInfo) {
      const companyId = JSON.parse(sessionInfo).cmpId;
      dispatch(getPortfolioListThunk(companyId));
    }
  }, [dispatch]);

  const openPortfolioModal = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const closePortfolioModal = () => {
    setSelectedPortfolio(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    console.log("모달 오픈 확인");
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className={PortfolioListStyle.portfolioContainer}>
        <div className={PortfolioListStyle.portfolioGallery}>
          {portfolios.length > 0 ? (
            portfolios.map((portfolio, index) => (
              <div key={index} onClick={() => openPortfolioModal(portfolio)}>
                <Portfolio
                  portfolio={{
                    image: portfolio.image || "default-image-path.jpg",
                    mbrPrtflTtl: portfolio.mbrPrtflTtl,
                    mbrPrtflText: portfolio.mbrPrtflText,
                  }}
                />
              </div>
            ))
          ) : (
            <div className={PortfolioListStyle.noPortfolio}>
              등록된 포트폴리오가 없습니다.
            </div>
          )}
        </div>
        <button id="add-btn" onClick={openAddModal}>
          등록
        </button>

        <div className={PortfolioListStyle.pagenationBox}></div>

        {selectedPortfolio && (
          <PortfolioModal
            portfolio={selectedPortfolio}
            onClose={closePortfolioModal}
          />
        )}
        {isAddModalOpen && <AddPortfolioModal onClose={closeAddModal} />}

        {/* Pagination 영역 주석 처리 */}
        {/* 
        <div className={PortfolioListStyle.pagination}>
          <a href="#">처음</a>
          <a href="#">&laquo;</a>
          <a href="#" className={PortfolioListStyle.active}>1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">7</a>
          <a href="#">8</a>
          <a href="#">9</a>
          <a href="#">10</a>
          <a href="#">&raquo;</a>
          <a href="#">끝</a>
        </div>
        */}
      </div>

      {/* 포트폴리오 모달 */}
      {/* <div id="portfolioModal" className={PortfolioListStyle.modal}>
        <div className={PortfolioListStyle.modalContent}>
          <span className={PortfolioListStyle.closeButton}>&times;</span>
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
      </div> */}

      {/* 포트폴리오 등록 모달 */}
      {/* <div id="insertModal" className={PortfolioListStyle.modal2}>
        <div className={PortfolioListStyle.modalContent2}>
          <button className={PortfolioListStyle.closeBtn2}>&times;</button>
          <form
            action="/member/newportfolio"
            method="post"
            id="addPortfolioForm"
            encType="multipart/form-data"
          >
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
      </div> */}
    </>
  );
}
