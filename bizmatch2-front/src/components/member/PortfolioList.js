import React, { useEffect, useState } from "react";
// import Portfolio from "./Portfolio";
import PortfolioListStyle from "./PortfolioList.module.css";
import { getPortfolioListThunk } from "../../stores/thunks/portfolioThunk";
import { useDispatch, useSelector } from "react-redux";
import AddPortfolioModal from "../ui/AddPortfolioModal";
import PortfolioModal from "../ui/PortfolioModal";
import CmsPagination from "../../admin/components/CmsPagination";
import { portfolioAction } from "../../stores/ToolkitStrore";
import { useParams } from "react-router-dom";
import Portfolio from "./Portfolio";

export default function PortfolioList() {
  const dispatch = useDispatch();

  const { data: portfolios, pagination } = useSelector(
    (state) => state.portfolio
  );

  const { currentPage = 1, itemsPerPage = 9 } = pagination || {}; // 현재 페이지와 아이템 수 설정

  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { companyId } = useParams();

  // 포트폴리오 목록이 변경될 때 자동으로 목록을 다시 조회
  useEffect(() => {
    if (companyId) {
      dispatch(getPortfolioListThunk(companyId));
    }
  }, [portfolios.length, companyId, dispatch]);

  // Redux에서 받은 포트폴리오 리스트를 콘솔로 확인.
  useEffect(() => {
    if (portfolios.length > 0) {
      console.log("서버로부터 받은 포트폴리오 리스트:", portfolios);
    } else {
      console.log("포트폴리오 리스트가 비어 있습니다.");
    }
  }, [portfolios]);

  // 현재 페이지에 따라 보여줄 데이터 계산.
  const paginatedData = portfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openPortfolioModal = (mbrPrtflId) => {
    console.log("선택된 포트폴리오 ID:", mbrPrtflId);
    setSelectedPortfolio(mbrPrtflId);
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
              if (companyId) {
                dispatch(getPortfolioListThunk(companyId));
              }
            }}
          />
        )}
        {isAddModalOpen && <AddPortfolioModal onClose={closeAddModal} />}
      </div>
    </>
  );
}
