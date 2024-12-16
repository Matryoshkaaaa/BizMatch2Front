import React, { useState } from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";
import { editCompanyMypageInfo } from "../http/api/userApi";
import { useSelector } from "react-redux";

export default function Profilebox({ companyData, updatedData }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  // 현재 로그인한 사용자 정보 가져오기
  const loginInfo = useSelector((state) => state.auth);

  // 본인의 회사인지 여부 확인
  const isOwnCompany =
    loginInfo?.company?.cmpnyId === companyData?.companyVO?.cmpnyId;

  const handleMypageEdit = () => {
    setIsEdit(true);
    navigate(`/member/mypage/company/edit/${companyData?.companyVO?.cmpnyId}`, {
      state: { companyData },
    });
  };

  const handleMypageEditFin = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await editCompanyMypageInfo(updatedData); // 객체 리터럴 전송
      navigate(`/member/mypage/company/${companyData?.companyVO?.cmpnyId}`);
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  // 데이터가 아직 준비되지 않았다면 아무것도 렌더링하지 않음
  if (isOwnCompany === null) {
    return null; // 로딩 상태 표시 필요 시, 로딩 컴포넌트로 대체 가능
  }

  return (
    <section className={ProfileboxStyle.profile}>
      <div className={ProfileboxStyle.profileBox}>
        <div className={ProfileboxStyle.img}>
          <img src="/images/profile.svg" alt="profile-img" />
        </div>
        <div className={ProfileboxStyle.information}>
          <div className={ProfileboxStyle.name}>
            <h2>{companyData?.companyVO?.cmpnyNm}</h2>
          </div>
          {companyData?.averageRate && (
            <Stars averageRate={companyData.averageRate} />
          )}
          <div className={ProfileboxStyle.category}>
            {companyData?.industry?.mjrNm ? (
              <>
                {companyData.industry.mjrNm} {" > "}{" "}
                {companyData.industry.smjrNm || ""}
              </>
            ) : (
              <span>주요 산업 정보가 존재하지 않습니다.</span>
            )}
          </div>

          <div className={ProfileboxStyle.homepageButton}>
            <div className={ProfileboxStyle.homepage}>
              {companyData?.companyVO?.cmpnySiteUrl ? (
                <p
                  onClick={() => {
                    let url = companyData.companyVO.cmpnySiteUrl;
                    // URL에 프로토콜이 없으면 http:// 추가
                    if (!/^https?:\/\//i.test(url)) {
                      url = `http://${url}`;
                    }
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                  className={ProfileboxStyle.homepageLinkButton}
                >
                  {companyData.companyVO.cmpnySiteUrl}
                </p>
              ) : (
                <span>홈페이지 정보가 없습니다.</span>
              )}
            </div>
            {/* 본인의 회사일 때만 버튼 표시 */}
            {isOwnCompany && (
              <div className={ProfileboxStyle.buttonBox}>
                {isEdit ? (
                  <button
                    className={ProfileboxStyle.editButton}
                    id="mypageeditbutton"
                    onClick={handleMypageEditFin}
                  >
                    완료
                  </button>
                ) : (
                  <button
                    className={ProfileboxStyle.editButton}
                    id="mypageeditbutton"
                    onClick={handleMypageEdit}
                  >
                    수정
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
