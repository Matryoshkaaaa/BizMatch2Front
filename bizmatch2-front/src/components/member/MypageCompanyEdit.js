import MypageCompanyEditStyle from "./MypageCompanyEdit.module.css";
import React, { useEffect, useRef, useState } from "react";
import Profilebox from "./Profilebox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CategoryBar from "../common/CategoryBar";
import AddressEditModal from "../ui/AddressEditModal";
import { useDispatch, useSelector } from "react-redux";
import ProjectSkill from "../../components/project/ProjectSkill";
import { categoryActions } from "../../stores/ToolkitStrore";

export default function MypageCompanyEdit() {
  const location = useLocation();
  const { cmpId } = useParams();
  const dispatch = useDispatch();
  const selectedSkills = useSelector((state) => state.skill.selectedSkills);
  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );
  const navigate = useNavigate();

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

  const introduceRef = useRef();
  const addressRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 각 섹션에 대한 ref 생성
  const introductionRef = useRef(null);
  const industryRef = useRef(null);
  const technologyRef = useRef(null);
  const accountRef = useRef(null);
  const mapRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop; // 요소의 상단 위치
      const customOffset = -window.innerHeight * 0.2; // 10vh 만큼 조정
      window.scrollTo({
        top: offsetTop + customOffset,
        behavior: "smooth",
      });
    }
  };

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
        compnyLkIndstrMjrId: selectedMajorCategory || "",
        compnyLkIndstrSmjrId: selectedSubCategory || "",
        mjrId: selectedMajorCategory || "",
        smjrId: selectedSubCategory || "",
      }));
    }
  }, [companyData, selectedMajorCategory, selectedSubCategory]); // companyData가 변경될 때만 실행

  dispatch(
    categoryActions.setMajorCategory(
      companyData?.companyVO?.compnyLkIndstrMjrId
    )
  );
  dispatch(
    categoryActions.setSubCategory(companyData?.companyVO?.compnyLkIndstrSmjrId)
  );

  // 사용자가 수정한 기업 정보
  const [updateCompanyData, setUpdateCompanyData] = useState({
    cmpnyId: cmpId,
    cmpnyAddr: companyData?.companyVO?.cmpnyAddr,
    cmpnyIntr: companyData?.companyVO?.cmpnyIntr,
    cmpnyAccuntNum: companyData?.companyVO?.cmpnyAccuuntNum,
    cmpnyNm: companyData?.companyVO?.cmpnyNm,
    mjrId: selectedMajorCategory,
    smjrId: selectedSubCategory,
    compnyLkIndstrMjrId: selectedMajorCategory,
    compnyLkIndstrSmjrId: selectedSubCategory,
    emilAddr: companyData?.companyVO?.memberVO?.emilAddr,
    cmpnySiteUrl: companyData?.companyVO?.cmpnySiteUrl,
    mbrPrmStkList: selectedSkills,
  });

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

  const handlerProjectOnClick = () => {
    navigate("/project/myapply");
  };

  return (
    <>
      <div className={MypageCompanyEditStyle.mainpageBox}>
        <Profilebox companyData={companyData} updatedData={updateCompanyData} />
        <main>
          <div className={MypageCompanyEditStyle.mainBox}>
            <section className={MypageCompanyEditStyle.sidebar}>
              <div className={MypageCompanyEditStyle.sidebarMenulist}>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={() => scrollToSection(introductionRef)}
                >
                  내 프로필
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={() => scrollToSection(industryRef)}
                >
                  관심 산업
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={() => scrollToSection(technologyRef)}
                >
                  보유 기술
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={() => scrollToSection(accountRef)}
                >
                  계좌 번호
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={() => scrollToSection(mapRef)}
                >
                  회사 위치
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  onClick={handlerProjectOnClick}
                >
                  내 프로젝트
                </div>
              </div>
            </section>

            <section className={MypageCompanyEditStyle.myPageList}>
              <div className={MypageCompanyEditStyle.myPageListBox}>
                <div
                  className={MypageCompanyEditStyle.introduction}
                  id="introduction"
                  ref={introductionRef}
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
                  ref={industryRef}
                >
                  관심 산업
                  <div>
                    <CategoryBar />
                  </div>
                </div>
                <div
                  className={MypageCompanyEditStyle.holdingTechnology}
                  id="holding-technology"
                  ref={technologyRef}
                >
                  보유 기술
                </div>
                <div>
                  <ProjectSkill />
                </div>
                <div className={MypageCompanyEditStyle.account} id="account">
                  <div
                    className={MypageCompanyEditStyle.countTitle}
                    ref={accountRef}
                  >
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
                  className={MypageCompanyEditStyle.map}
                  id="map"
                  ref={mapRef}
                >
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
