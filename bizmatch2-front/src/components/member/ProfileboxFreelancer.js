import React, { useState } from "react";
import Stars from "./Stars";
import ProfileboxStyle from "./Profilebox.module.css";
import { useNavigate } from "react-router-dom";
import { editFreelancerMypageInfo } from "../http/api/userApi";

export default function ProfileboxFreelancer({
  freelancerData,
  updatedData,
  emilAddr,
}) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const userData = sessionStorage.getItem("info");
  const parsedData = JSON.parse(userData);

  const handleMypageEdit = () => {
    setIsEdit(true);
    navigate(
      `/member/mypage/freelancer/edit/${freelancerData?.memberVO?.emilAddr}`,
      {
        state: { freelancerData, isEdit: true }, // 상태 전달
      }
    );
  };

  const handleMypageEditFin = async () => {
    try {
      const result = await editFreelancerMypageInfo(updatedData);
      setIsEdit(false);
      navigate(
        `/member/mypage/freelancer/${freelancerData?.memberVO?.emilAddr}`
      );
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
          {parsedData.emilAddr === emilAddr && (
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
    </section>
  );
}
