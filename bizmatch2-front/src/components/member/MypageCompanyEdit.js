import MypageCompanyEditStyle from "./MypageCompanyEdit.module.css";
import React, { useRef, useState } from "react";
import Profilebox from "./Profilebox";
import { useLocation, useParams } from "react-router-dom";
import CategoryBar from "../common/CategoryBar";
import AddressEditModal from "../ui/AddressEditModal";

export default function MypageCompanyEdit() {
  const location = useLocation();
  const [companyData, setCompanyData] = useState(location.state?.companyData);
  const accountRef = useRef();
  const introduceRef = useRef();
  const addressRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cmpId } = useParams();
  const [majorSearchValue, setMajorSearchValue] = useState();
  const [subSearchValue, setSubSearchValue] = useState();

  const formData = new FormData();
  formData.append("cmpnyId", cmpId);
  formData.append("cmpnyAddr", addressRef);
  formData.append("cmpnyIntr", introduceRef);
  formData.append("cmpnyAccuntNum", accountRef);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        <Profilebox companyData={companyData} formData={formData} />
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
                    ref={introduceRef}
                  />
                </div>
                <div
                  className={MypageCompanyEditStyle.interestingIndustry}
                  id="interesting-industry"
                >
                  관심 산업
                  <div>
                    <CategoryBar
                      majorSearchValue={majorSearchValue}
                      setMajorSearchValue={setMajorSearchValue}
                      subSearchValue={subSearchValue}
                      setSubSearchValue={setSubSearchValue}
                      defaultMajorCategory={
                        companyData?.companyVO?.compnyLkIndstrMjrNm
                      }
                      defaultSubMajorCategory={
                        companyData?.companyVO?.compnyLkIndstrSmjrNm
                      }
                    />
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
                  {companyData?.companyVO.cmpnyAccuuntNum ? (
                    <input
                      className={MypageCompanyEditStyle.accountInput}
                      id="account-input"
                      type="text"
                      defaultValue={companyData?.companyVO?.cmpnyAccuuntNum}
                      ref={accountRef}
                    />
                  ) : (
                    <input
                      className={MypageCompanyEditStyle.accountInput}
                      id="account-input"
                      type="text"
                      placeholder="계좌번호를 입력해주세요"
                    />
                  )}
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
                  <div className={MypageCompanyEditStyle.attachmentList}>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                  </div>
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
