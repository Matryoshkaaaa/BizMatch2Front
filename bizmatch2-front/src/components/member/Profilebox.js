import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stars from "./Stars";

export default function Profilebox() {
  const dispatch = useDispatch();
  const { member, company, averageRate } = useSelector((state) => ({
    member: state.member.info,
    company: state.company.info,
    averageRate: state.rating.averageRate,
  }));

  const isCompany = !!member?.cmpId;

  useEffect(() => {
    dispatch(fetchMemberData());
  }, [dispatch]);

  const openHomepage = (url) => {
    if (!url) {
      alert("홈페이지 URL이 존재하지 않습니다.");
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    window.open(url, "_blank");
  };
  return (
    <section className="profile">
      <div className="profile-box">
        <div className="img">
          <img src="/img/profile.svg" alt="profile-img" />
        </div>
        <div className="information">
          <div className="name">
            <h2>{isCompany ? company?.cmpnyNm : member?.mbrNm}</h2>
          </div>
          <Stars averageRate={averageRate} />
          <div className="category">
            {isCompany
              ? member?.mjrId + " > " + member?.smjrId
              : company?.cmpnyNm || "소속 산업 정보가 없습니다."}
          </div>
          <div className="homepage-button">
            <div
              className="homepage"
              data-url={company?.cmpnySiteUrl || ""}
              onClick={() => openHomepage(company?.cmpnySiteUrl)}
            >
              {company?.cmpnySiteUrl || "홈페이지 정보가 없습니다."}
            </div>
            <div className="button-box">
              <button className="edit-button" id="mypageeditbutton">
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
