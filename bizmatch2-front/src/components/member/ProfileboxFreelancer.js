import React from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";

export default function Profilebox({ companyData }) {
  console.log(companyData);
  // const openHomepage = (url) => {
  //   if (!url) {
  //     alert("홈페이지 URL이 존재하지 않습니다.");
  //     return;
  //   }
  //   if (!/^https?:\/\//i.test(url)) {
  //     url = "https://" + url;
  //   }
  //   window.open(url, "_blank");
  // };

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
            {/* {isCompany
              ? member?.mjrId + " > " + member?.smjrId
              : company?.cmpnyNm || "소속 산업 정보가 없습니다."} */}
          </div>
          <div className={ProfileboxStyle.homepageButton}>
            <div
              className={ProfileboxStyle.homepage}
              // data-url={company?.cmpnySiteUrl || ""}
              // onClick={() => openHomepage(company?.cmpnySiteUrl)}
            >
              {/* {company?.cmpnySiteUrl || "홈페이지 정보가 없습니다."} */}
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
