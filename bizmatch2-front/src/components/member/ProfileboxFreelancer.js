import React from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";

export default function ProfileboxFreelancer({
  freelancerData,
  updatedData,
  emilAddr,
}) {
  const navigate = useNavigate();
  const userData = sessionStorage.getItem("info");
  const parsedData = JSON.parse(userData);

  const isMe = parsedData.emilAddr === emilAddr;

  const handleMypageEdit = () => {
    navigate(
      `/member/mypage/freelancer/edit/${freelancerData?.memberVO?.emilAddr}`,
      {
        state: { freelancerData, isEdit: true }, // 상태 전달
      }
    );
  };

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

          {isMe && (
            <div className={ProfileboxStyle.homepageButton}>
              <div className={ProfileboxStyle.buttonBox}>
                <button
                  className={ProfileboxStyle.editButton}
                  onClick={handleMypageEdit}
                >
                  수정
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
