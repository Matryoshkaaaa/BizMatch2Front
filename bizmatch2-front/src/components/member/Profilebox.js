import React, { useState } from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";
import { editCompanyMypageInfo } from "../http/api/userApi";

export default function Profilebox({ companyData }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    cmpnyId: companyData?.companyVO?.cmpnyId,
    cmpnyAddr: companyData?.companyVO?.cmpnyAddr,
    cmpnyIntr: companyData?.companyVO?.cmpnyIntr,
    cmpnyAccuntNum: companyData?.companyVO?.cmpnyAccuuntNum,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMypageEdit = () => {
    setIsEdit(true);
    navigate(`/member/mypage/company/edit/${companyData?.companyVO?.cmpnyId}`, {
      state: { companyData },
    });
  };

  const handleMypageEditFin = async () => {
    try {
      const result = await editCompanyMypageInfo(updatedData); // 객체 리터럴 전송
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error during update:", error);
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
              {companyData?.companyVO?.cmpnySiteUrl}
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

      {/* Input fields for edit mode */}
      {isEdit && (
        <div className={ProfileboxStyle.editForm}>
          <label>
            회사 주소:
            <input
              name="cmpnyAddr"
              type="text"
              value={updatedData.cmpnyAddr}
              onChange={handleInputChange}
            />
          </label>
          <label>
            회사 소개:
            <textarea
              name="cmpnyIntr"
              value={updatedData.cmpnyIntr}
              onChange={handleInputChange}
            />
          </label>
          <label>
            계좌 번호:
            <input
              name="cmpnyAccuntNum"
              type="text"
              value={updatedData.cmpnyAccuntNum}
              onChange={handleInputChange}
            />
          </label>
        </div>
      )}
    </section>
  );
}
