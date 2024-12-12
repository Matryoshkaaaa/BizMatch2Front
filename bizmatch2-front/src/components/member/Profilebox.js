import React, { useState } from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";
import { editCompanyMypageInfo } from "../http/api/userApi";

export default function Profilebox({ companyData, formData }) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  console.log(companyData);

  // 마이페이지 수정페이지로 이동하는 메서드.
  const handleMypageEdit = () => {
    setIsEdit(true);
    console.log(isEdit);
    navigate(`/member/mypage/company/edit/${companyData?.companyVO?.cmpnyId}`, {
      state: { companyData },
    });
  };

  const handleMypageEditFin = async () => {
    try {
      const result = editCompanyMypageInfo(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Stars averageRate={companyData?.averageRate} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
