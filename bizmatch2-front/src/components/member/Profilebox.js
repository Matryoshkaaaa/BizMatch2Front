import React from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";

export default function Profilebox({ companyData }) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

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
              <button
                className={ProfileboxStyle.editButton}
                id="mypageeditbutton"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
