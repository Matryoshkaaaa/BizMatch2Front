import React, { useEffect, useState } from "react";
import PortfolioListStyle from "./PortfolioList.module.css";
import { getFreelancerPortfolioListThunk } from "../../stores/thunks/portfolioThunk";
import { useDispatch, useSelector } from "react-redux";
import AddPortfolioModal from "../ui/AddPortfolioModal";
import PortfolioModal from "../ui/PortfolioModal";
import CmsPagination from "../../admin/components/CmsPagination";
import { portfolioAction } from "../../stores/ToolkitStrore";
import { useParams } from "react-router-dom";
import Portfolio from "./Portfolio";

export default function FreelancerPortfolioList() {
  const dispatch = useDispatch();

  const { data: portfolios, pagination } = useSelector(
    (state) => state.portfolio
  );

  const { currentPage = 1, itemsPerPage = 9 } = pagination || {}; // 현재 페이지와 아이템 수 설정

  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { emilAddr } = useParams(); // 이메일 주소를 URL 파라미터로 가져옴

  // 프리랜서 포트폴리오 목록 조회
  useEffect(() => {
    if (emilAddr) {
      dispatch(getFreelancerPortfolioListThunk(emilAddr));
    }
  }, [portfolios.length, emilAddr, dispatch]);

  // Redux에서 받은 포트폴리오 리스트를 콘솔로 확인
  useEffect(() => {
    if (portfolios.length > 0) {
      //console.log("서버로부터 받은 프리랜서 포트폴리오 리스트:", portfolios);
    } else {
      //console.log("포트폴리오 리스트가 비어 있습니다.");
    }
  }, [portfolios]);

  // 현재 페이지에 따라 보여줄 데이터 계산
  const paginatedData = portfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openPortfolioModal = (mbrPrtflId) => {
    //console.log("선택된 포트폴리오 ID:", mbrPrtflId);
    setSelectedPortfolio(mbrPrtflId);
  };

  const closePortfolioModal = () => {
    setSelectedPortfolio(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    //console.log("모달 오픈 확인");
  };

  const closeAddModal = () => {
    //console.log("closeAddModal 호출됨");
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className={PortfolioListStyle.portfolioContainer}>
        <div className={PortfolioListStyle.result}>
          {paginatedData.length > 0 ? (
            paginatedData.map((portfolio) => (
              <div
                key={portfolio.mbrPrtflId}
                onClick={() => openPortfolioModal(portfolio.mbrPrtflId)}
              >
                <Portfolio key={portfolio.mbrPrtflId} portfolio={portfolio} />
              </div>
            ))
          ) : (
            <div className={PortfolioListStyle.noPortfolio}>
              등록된 포트폴리오가 없습니다.
            </div>
          )}
        </div>
        <button
          id="add-btn"
          onClick={openAddModal}
          className={PortfolioListStyle.addBtn}
        >
          등록
        </button>
        <CmsPagination
          totalItems={portfolios.length} // 전체 포트폴리오 수
          itemsPerPage={itemsPerPage} // 페이지당 아이템 수
          currentPage={currentPage} // 현재 페이지
          onPageChange={(page) =>
            dispatch(portfolioAction.setCurrentPage(page))
          } // 페이지 변경 핸들러
        />
        {selectedPortfolio && (
          <PortfolioModal
            mbrPrtflId={selectedPortfolio}
            onClose={closePortfolioModal}
            onUpdate={() => {
              if (emilAddr) {
                dispatch(getFreelancerPortfolioListThunk(emilAddr));
              }
            }}
          />
        )}
        {isAddModalOpen && (
          <AddPortfolioModal cmpId={emilAddr} onClose={closeAddModal} />
        )}
      </div>
    </>
  );
}
