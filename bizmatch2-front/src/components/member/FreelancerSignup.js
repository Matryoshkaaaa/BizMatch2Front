import React, { useRef, useState, useEffect } from "react";
import FreelancerSignupStyle from "./FreelancerSignup.module.css";
import {
  emailSend,
  emailCheck,
  authNumCheck,
  signupFreelancerMember,
} from "../http/api/userApi";
import CategoryBar from "../common/CategoryBar";
import CategoryBar2 from "../common/CategoryBar2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FreelancerSignup() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]); // 파일 목록 상태 관리

  // 파일 추가
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList((prevList) => [...prevList, ...files]); // 이전 파일 목록에 새 파일 추가
  };

  // 파일 삭제
  const handleFileRemove = (index) => {
    setFileList((prevList) => prevList.filter((_, i) => i !== index)); // 해당 인덱스 파일 제거
  };

  const nameRef = useRef();
  const birthDtRef = useRef();
  const emailRef = useRef();
  const authNumRef = useRef();
  const phoneNumRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const agreeOneRef = useRef();
  const agreeTwoRef = useRef();
  const agreeThreeRef = useRef();
  const postcodeRef = useRef();
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const extraAddressRef = useRef();
  const fileRef = useRef();

  const [pwdMatch, setPwdMatch] = useState(null);
  const [timer, setTimer] = useState(0);

  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  const { selectedMajorCategory2, selectedSubCategory2 } = useSelector(
    (state) => state.category2
  );

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handlePasswordValidation = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(password);

    setPwdMatch(isValid && password === confirmPassword);
  };

  const handleEmailCheck = async () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await emailCheck(email);
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
      const authNum = authNumRef.current.value;
      const email = emailRef.current.value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !agreeOneRef.current.checked ||
      !agreeTwoRef.current.checked ||
      !agreeThreeRef.current.checked
    ) {
      alert("모든 약관에 동의해주세요.");
      return;
    }
    if (pwdMatch === false) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const files = fileRef.current.files;
    const formData = new FormData(); // FormData 객체 생성

    fileList.forEach((file) => formData.append("fileList", file)); // 파일 추가

    if (files.length === 0) {
      alert("첨부파일은 필수 입력란입니다.");
      return;
    }

    formData.append("mbrNm", nameRef.current.value); // 회원 이름.
    formData.append("emilAddr", emailRef.current.value); // 이메일 주소
    formData.append("emilAddrCnfrmNmbr", authNumRef.current.value); // 이메일 인증번호
    formData.append("brthDt", birthDtRef.current.value);
    formData.append("pwd", passwordRef.current.value); // 비밀번호
    formData.append("mjrId", selectedMajorCategory); // 대분류 아이디
    formData.append("smjrId", selectedSubCategory); // 중분류 아이디
    formData.append("lkInSdstrId.mjrId", selectedMajorCategory2);
    formData.append("lkInSdstrId.smjrId", selectedSubCategory2);
    formData.append("mbrPhnNum", phoneNumRef.current.value); // 회원 전화번호
    formData.append("addr.postcode", postcodeRef.current.value); // 주소
    formData.append("addr.addr", addressRef.current.value);
    formData.append("addr.detailAddress", detailAddressRef.current.value);
    formData.append("addr.extraAddress", extraAddressRef.current.value);
    formData.append("agree1", agreeOneRef.current.value);
    formData.append("agree2", agreeTwoRef.current.value);
    formData.append("agree3", agreeThreeRef.current.value);

    const respose = await signupFreelancerMember(formData);
    if (respose) {
      alert("회원가입이 완료되었습니다.");
      // 메인화면으로 link
      navigate("/");
    } else if (!respose) {
      console.log(respose.error);
      return;
    }
  };

  function sample6_execDaumPostcode() {
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ""; // 주소 변수
        var extraAddr = ""; // 참고항목 변수
        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
          document.getElementById("extraAddress").value = extraAddr;
        } else {
          document.getElementById("extraAddress").value = "";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("addr").value = addr;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("detailAddress").focus();
      },
    }).open();
  }

  return (
    <div>
      <div className={FreelancerSignupStyle.signupBox}>
        <p className={FreelancerSignupStyle.redWord}>*은 필수입력사항입니다.</p>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자명
          </p>
          <input
            id="mbrNm"
            type="text"
            name="mbrNm"
            placeholder="이름 입력"
            ref={nameRef}
          />
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>생년월일
          </p>
          <input id="brthDt" type="date" name="brthDt" ref={birthDtRef} />
        </div>

        <div className={FreelancerSignupStyle.comAddr}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>주소
          </p>
          <div className={FreelancerSignupStyle.comDiv}>
            <input
              type="text"
              id="postcode"
              placeholder="우편번호 입력"
              name="addr.postcode"
              ref={postcodeRef}
            />
            <button type="button" id="asd" onClick={sample6_execDaumPostcode}>
              도로명 주소 찾기
            </button>
          </div>
          <div className={FreelancerSignupStyle.comDiv}>
            <input
              type="text"
              id="addr"
              placeholder="도로명 주소 입력"
              name="addr.addr"
              ref={addressRef}
            />
            <input
              type="text"
              id="detailAddress"
              placeholder="상세주소 입력"
              name="addr.detailAddress"
              ref={detailAddressRef}
            />
            <input
              type="text"
              id="extraAddress"
              placeholder="참고항목"
              name="addr.extraAddress"
              ref={extraAddressRef}
            />
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자
            전화번호
          </p>
          <div>
            <input
              id="mbrPhnNum"
              type="tel"
              name="mbrPhnNum"
              placeholder="전화번호 입력"
              ref={phoneNumRef}
            />
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이메일주소
          </p>
          <div>
            <input
              id="emilAddr"
              type="email"
              name="emilAddr"
              placeholder="업무용 이메일 사용을 권장합니다."
              ref={emailRef}
            />
            <button
              type="button"
              id="confirm-email"
              className={FreelancerSignupStyle.emailSubmit}
              onClick={handleEmailCheck}
            >
              이메일 주소 인증
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이메일 주소
            인증번호
          </p>
          <div>
            <div className={FreelancerSignupStyle.inputContainer}>
              <input
                id="authNumField"
                className={FreelancerSignupStyle.authNumField}
                type="text"
                placeholder="인증번호 6자리 입력 "
                name="emilAddrCnfrmNmbr"
                ref={authNumRef}
              />
              <span className={FreelancerSignupStyle.timer}></span>
            </div>
            <button
              id="confirm-auth-num"
              className={FreelancerSignupStyle.confirmAuthNum}
              type="button"
              onClick={handleAuthNum}
            >
              인증번호 확인
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>비밀번호
          </p>
          <div id="errorPwd"></div>
          <input
            id="pwd"
            type="password"
            name="pwd"
            placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
            onChange={handlePasswordValidation}
            ref={passwordRef}
          />
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>비밀번호
            확인
          </p>
          <input
            type="password"
            name="confirmPwd"
            placeholder="비밀번호 확인"
            onChange={handlePasswordValidation}
            ref={confirmPasswordRef}
          />
          {pwdMatch === false && (
            <p className={FreelancerSignupStyle.cmpMsg}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자
            첨부파일
          </p>
          <div className={FreelancerSignupStyle.fileBox}>
            <div className={FreelancerSignupStyle.addfile}>
              <input
                className={FreelancerSignupStyle.fileList}
                type="file"
                name="fileList[0]"
                ref={fileRef}
                onChange={handleFileChange}
                multiple
              />
            </div>
            <ul className={FreelancerSignupStyle.fileList}>
              {fileList.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)} // 파일 삭제 핸들러
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>주요
            산업분야
          </p>
          <CategoryBar />
        </div>
        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>관심
            산업분야
          </p>
          <CategoryBar2 />
        </div>
        <div className={FreelancerSignupStyle.checkBox}>
          <p className="checkbox1">이용약관</p>
          <div>
            <input
              id="ageCheck"
              type="checkbox"
              name="agreeOne"
              ref={agreeOneRef}
            />
            <p>만 14세 이상입니다.</p>
          </div>
          <div>
            <input
              id="termsCheck"
              type="checkbox"
              name="agreeTwo"
              ref={agreeTwoRef}
            />
            <p>서비스 이용약관에 동의합니다.</p>
          </div>
          <div>
            <input
              id="privacyCheck"
              type="checkbox"
              name="agreeThree"
              ref={agreeThreeRef}
            />
            <p>개인정보 수집 및 이용에 동의합니다.</p>
          </div>
        </div>
        <input
          className={FreelancerSignupStyle.signupBtn}
          type="submit"
          value="가입하기"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
