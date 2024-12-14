import MypageCompanyEditStyle from "./MypageCompanyEdit.module.css";
import React, { useEffect, useRef, useState } from "react";
import Profilebox from "./Profilebox";
import { useLocation, useParams } from "react-router-dom";
import CategoryBar from "../common/CategoryBar";
import AddressEditModal from "../ui/AddressEditModal";
import { useSelector } from "react-redux";

export default function MypageCompanyEdit() {
  const location = useLocation();
  const { cmpId } = useParams();
  console.log(location.state);

  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  console.log(
    "selectedMajorCategory",
    selectedMajorCategory,
    "selectedSubCategory",
    selectedSubCategory
  );

  // companyData 초기화 시 기본값 설정
  const initialCompanyData = location.state?.companyData || {
    companyVO: {
      cmpnyAccuuntNum: "",
      cmpnyAddr: "",
      cmpnyIntr: "",
      cmpnyNm: "",
      compnyLkIndstrMjrNm: "",
      compnyLkIndstrSmjrNm: "",
      cmpnySiteUrl: "",
    },
  };
  const [companyData, setCompanyData] = useState(initialCompanyData);
  console.log(initialCompanyData.companyVO?.cmpnyAccuuntNum);

  // const accountRef = useRef();
  const introduceRef = useRef();
  const addressRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (companyData?.companyVO) {
      // companyData가 null 또는 undefined가 아닌 경우에만 실행
      setUpdateCompanyData((prev) => ({
        ...prev,
        cmpnyAddr: companyData.companyVO.cmpnyAddr,
        cmpnyIntr: companyData.companyVO.cmpnyIntr,
        cmpnyAccuntNum: companyData.companyVO.cmpnyAccuuntNum || "", // 빈 문자열 처리
        cmpnyNm: companyData.companyVO.cmpnyNm,
        emilAddr: companyData.companyVO?.memberVO?.emilAddr || "",
        cmpnySiteUrl: companyData.companyVO.cmpnySiteUrl || "",
      }));
    }
  }, [companyData]); // companyData가 변경될 때만 실행

  // 사용자가 수정한 기업 정보
  const [updateCompanyData, setUpdateCompanyData] = useState({
    cmpnyId: cmpId,
    cmpnyAddr: companyData?.companyVO?.cmpnyAddr,
    cmpnyIntr: companyData?.companyVO?.cmpnyIntr,
    cmpnyAccuntNum: companyData?.companyVO?.cmpnyAccuuntNum,
    cmpnyNm: companyData?.companyVO?.cmpnyNm,
    mjrId: selectedMajorCategory,
    smjrId: selectedSubCategory,
    emilAddr: companyData?.companyVO?.memberVO?.emilAddr,
    cmpnySiteUrl: companyData?.companyVO?.cmpnySiteUrl,
    compnyLkIndstrMjrId: selectedMajorCategory,
    compnyLkIndstrSmjrId: selectedSubCategory,
  });

  console.log(updateCompanyData);

  // dispatcher(
  //   categoryActions.setDefaultMajorCategory(
  //     companyData?.companyVO?.compnyLkIndstrMjrNm
  //   )
  // );
  // dispatcher(
  //   categoryActions.setDefaultSubMajorCategory(
  //     companyData?.companyVO?.compnyLkIndstrSmjrNm
  //   )
  // );

  // const handleCategoryChange = ({ major, sub }) => {
  //   setUpdateCompanyData((prevData) => ({
  //     ...prevData,
  //     mjrId: major,
  //     smjrId: sub,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddressComplete = (addressData) => {
    // 업데이트된 주소 데이터를 companyData에 반영
    setCompanyData((prevData) => ({
      ...prevData,
      companyVO: {
        ...prevData.companyVO,
        cmpnyAddr: `${addressData.roadAddress} ${addressData.detailAddress}`,
      },
    }));
    handleModalClose();
  };

  return (
    <>
      <div className={MypageCompanyEditStyle.mainpageBox}>
        <Profilebox companyData={companyData} updatedData={updateCompanyData} />
        <main>
          <div className={MypageCompanyEditStyle.mainBox}>
            <section className={MypageCompanyEditStyle.sidebar}>
              <div className={MypageCompanyEditStyle.sidebarMenuList}>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#introduction"
                >
                  내 프로필
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#interesting-industry"
                >
                  관심 산업
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#holding-technology"
                >
                  보유 기술
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#account"
                >
                  계좌 번호
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#attachment"
                >
                  회사 첨부자료
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#map"
                >
                  회사 위치
                </div>
                <div className={MypageCompanyEditStyle.sidebarMenu}>
                  내 프로젝트
                </div>
              </div>
            </section>

            <section className={MypageCompanyEditStyle.myPageList}>
              <div className={MypageCompanyEditStyle.myPageListBox}>
                <div
                  className={MypageCompanyEditStyle.introduction}
                  id="introduction"
                >
                  회사 소개
                  <textarea
                    className={MypageCompanyEditStyle.introductionContent}
                    id="cmpnyIntr"
                    name="cmpnyIntr"
                    defaultValue={companyData?.companyVO?.cmpnyIntr}
                    onChange={handleInputChange}
                    ref={introduceRef}
                  />
                </div>
                <div
                  className={MypageCompanyEditStyle.interestingIndustry}
                  id="interesting-industry"
                >
                  관심 산업
                  <div>
                    <CategoryBar />
                  </div>
                </div>
                <div
                  className={MypageCompanyEditStyle.holdingTechnology}
                  id="holding-technology"
                >
                  보유 기술
                </div>
                <div className={MypageCompanyEditStyle.account} id="account">
                  <div className={MypageCompanyEditStyle.countTitle}>
                    회사 계좌 번호
                  </div>
                  <input
                    className={MypageCompanyEditStyle.accountInput}
                    type="text"
                    name="cmpnyAccuntNum"
                    defaultValue={
                      initialCompanyData?.companyVO?.cmpnyAccuuntNum
                    }
                    onChange={handleInputChange}
                  />
                </div>

                <div
                  className={MypageCompanyEditStyle.attachment}
                  id="attachment"
                >
                  회사 첨부자료
                  <button
                    className={MypageCompanyEditStyle.moreButtonSmall}
                    type="button"
                  >
                    추가하기
                  </button>
                  {/* <div className={MypageCompanyEditStyle.attachmentList}>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                  </div> */}
                </div>
                <div className={MypageCompanyEditStyle.map} id="map">
                  회사 위치
                  <div className={MypageCompanyEditStyle.mapBox}>
                    <div
                      id="kakao-map"
                      className={MypageCompanyEditStyle.kakaoMap}
                    ></div>
                    <div className={MypageCompanyEditStyle.mapDetail}>
                      <div className={MypageCompanyEditStyle.detailTitle}>
                        상세 주소
                      </div>
                      <div
                        className={MypageCompanyEditStyle.detailAddress}
                        id="cmpnyAddr"
                        ref={addressRef}
                      >
                        {companyData?.companyVO.cmpnyAddr ||
                          "주소 정보가 없습니다"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={MypageCompanyEditStyle.edit}
                    onClick={handleModalOpen}
                  >
                    변경
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <AddressEditModal
          onClose={handleModalClose}
          isOpen={isModalOpen}
          onComplete={handleAddressComplete}
        />
      )}
    </>
  );
}
