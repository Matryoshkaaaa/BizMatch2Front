import React from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";

export default function Profilebox({ freelancerData }) {
  // console.log(freelancerData);

  return (
    <section className={ProfileboxStyle.profile}>
      <div className={ProfileboxStyle.profileBox}>
        <div className={ProfileboxStyle.img}>
          <img src="/images/profile.svg" alt="profile-img" />
        </div>
        <div className={ProfileboxStyle.information}>
          <div className={ProfileboxStyle.name}>
            <h2>{freelancerData?.memberVO?.mbrNm}</h2>
          </div>
          <Stars averageRate={freelancerData?.averageRate} />
          <div className={ProfileboxStyle.category}>
            {freelancerData?.memberMyPageIndsryVO?.mjrNm ? (
              <>
                {freelancerData.memberMyPageIndsryVO.mjrNm} {" > "}{" "}
                {freelancerData.memberMyPageIndsryVO.smjrNm || ""}
              </>
            ) : (
              <span>주요 산업 정보가 존재하지 않습니다.</span>
            )}
          </div>
          <div className={ProfileboxStyle.homepageButton}>
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
