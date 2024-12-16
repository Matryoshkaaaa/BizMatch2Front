import React, { useEffect, useRef, useState } from "react";
import FreelancerSignupStyle from "./FreelancerSignup.module.css";
import {
  postEditMemberInfo,
  emailCheck,
  emailSend,
  authNumCheck,
} from "../http/api/userApi";
import { useNavigate } from "react-router-dom";
export default function MemberInfo() {
  const navigate = useNavigate();
  const memberNameRef = useRef();
  const memberPhoneNumRef = useRef();
  const memberEmailAddrRef = useRef();
  const emailAddrConfirmNumRef = useRef();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleEmailCheck = async () => {
    const email = memberEmailAddrRef.current.value;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await emailCheck(email);
      console.log(response);
      if (!response) {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }
      await emailSend(email);
      alert("인증번호가 발송되었습니다.");
      setTimer(300); // Set 5-minute timer
    } catch (error) {
      console.error("Error during email check:", error);
    }
  };

  const handleAuthNum = async () => {
    try {
      const authNum = emailAddrConfirmNumRef.current.value;
      const email = memberEmailAddrRef.current.value;
      const response = await authNumCheck(email, authNum);
      if (!response) {
        alert("인증번호가 일치하지 않습니다.");
        return;
      }
      alert("인증 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMenberInfo = async () => {
    try {
      const updateData = {
        newEmilAddr: memberEmailAddrRef.current.value,
        mbrNm: memberNameRef.current.value,
        mbrPhnNum: memberPhoneNumRef.current.value,
        emilAddrCnfrmNmbr: emailAddrConfirmNumRef.current.value,
      };
      const response = await postEditMemberInfo(updateData);
      if (response) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <div>
      <div className={FreelancerSignupStyle.signupBox}>
        <div className={FreelancerSignupStyle.textBox}>
          <p>이용자명</p>
          <input
            id="mbrNm"
            type="text"
            placeholder="이름 입력"
            ref={memberNameRef}
          />
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>이용자 전화번호</p>
          <input
            id="mbrPhnNum"
            type="text"
            placeholder="010-0000-0000"
            ref={memberPhoneNumRef}
          />
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>이메일주소</p>
          <div>
            <input
              id="newEmilAddr"
              type="text"
              placeholder="업무용 이메일 사용을 권장합니다"
              ref={memberEmailAddrRef}
            />
            <button type="button" onClick={handleEmailCheck}>
              이메일 주소 인증
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>이메일 주소 인증번호</p>
          <div>
            <div className="input-container">
              <input
                className="authNumField"
                type="text"
                placeholder="인증번호 6자리 입력 "
                ref={emailAddrConfirmNumRef}
              />
              <span className="timer"></span>
            </div>
            <button id="confirm-auth-num" type="button" onClick={handleAuthNum}>
              인증번호 확인
            </button>
          </div>
        </div>
        <button
          className={FreelancerSignupStyle.signupBtn}
          onClick={handleEditMenberInfo}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
