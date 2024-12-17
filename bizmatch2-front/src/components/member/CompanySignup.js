import React, { useRef, useState, useEffect } from "react";
import CompanySignupStyle from "./CompanySignup.module.css";
import {
  emailSend,
  emailCheck,
  authNumCheck,
  businessNumCheck,
  alreadyMemberCheck,
  signupCmpMember,
} from "../http/api/userApi";
import CategoryBar from "../common/CategoryBar";
import CategoryBar2 from "../common/CategoryBar2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignupBox = styled.div`
  max-width: 40rem;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const RedWord = styled.span`
  color: red;
`;

const AuthNumField = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  flex-grow: 1;
`;

const ConfirmAuthNumButton = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  input {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }

  p.cmpMsg {
    color: red;
    font-size: 1rem;
    margin-top: 0.4rem;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  input {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    flex-grow: 1;
  }

  button {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ComAddr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const ComDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    flex-grow: 1;
  }

  button {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Timer = styled.span`
  font-size: 1rem;
  color: #666;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 0.4rem;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddFile = styled.div`
  input[type="file"] {
    font-size: 1rem;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  border: 1px solid gray;
  padding: 1.5rem;
  border-radius: 1rem;

  p {
    font-size: 1rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
  }

  p {
    font-size: 1rem;
  }
`;

const SignupButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function CompanySignup() {
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
  const emailRef = useRef();
  const authNumRef = useRef(); // 인증번호
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const agreeOneRef = useRef();
  const agreeTwoRef = useRef();
  const agreeThreeRef = useRef();
  const businessNumRef = useRef();
  const employeeCountRef = useRef();
  const companyNameRef = useRef();
  const postcodeRef = useRef();
  const addressRef = useRef();
  const detailAddressRef = useRef();
  const extraAddressRef = useRef();
  const phoneNumRef = useRef();
  const companyCallNumRef = useRef();
  const companyUrlRef = useRef();
  const fileRef = useRef();

  const [pwdMatch, setPwdMatch] = useState(null);
  const [timer, setTimer] = useState(0);

  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  const { selectedMajorCategory2, selectedSubCategory2 } = useSelector(
    (state) => state.category2
  );

  const handleBusinessNum = async () => {
    if (!businessNumRef.current || !businessNumRef.current.value) {
      alert("사업자번호를 입력해주세요.");
      return;
    }

    try {
      // 먼저 데이터베이스에서 회원 여부 조회
      const firstResponse = await alreadyMemberCheck(
        businessNumRef.current.value
      );

      if (firstResponse && firstResponse.body) {
        // firstResponse와 firstResponse.body가 존재하는지 확인
        if (firstResponse.body.cmpnyNm) {
          // 기존 회원인 경우 회사명 및 직원 수 표시
          const cmpnyNm = firstResponse.body.cmpnyNm;
          const cmpnyEmplyCnt = firstResponse.body.cmpnyEmplyCnt;
          companyNameRef.current.value = cmpnyNm;
          companyNameRef.current.readOnly = true;

          employeeCountRef.current.value = cmpnyEmplyCnt;
          employeeCountRef.current.readOnly = true;
        } else {
          alert("사업자 번호로 조회된 회원 정보가 없습니다.");
        }
      } else {
        // 기존 회원이 아닌 경우 API 호출로 회사 정보 조회
        const response = await businessNumCheck(businessNumRef.current.value);

        const companyData = response?.items?.find((item) => item !== null);
        if (companyData && companyData.company) {
          companyNameRef.current.value = companyData.company;
          companyNameRef.current.readOnly = true;
        } else {
          alert("올바르지 않은 사업자 번호입니다.");
        }
        console.log("새로운 회원 정보:", response);
      }
    } catch (error) {
      console.error("사업자번호 확인 실패:", error);
      alert("사업자번호 확인 중 문제가 발생했습니다.");
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
    formData.append("cmpnyBrn", businessNumRef.current.value); // 회사 사업자 번호
    formData.append("emilAddrCnfrmNmbr", authNumRef.current.value); // 이메일 인증번호
    formData.append("cmpnyEmplyCnt", employeeCountRef.current.value); // 직원 수
    formData.append("cmpnyNm", companyNameRef.current.value); // 회사 이름
    formData.append("cmpnyPhnNum", companyCallNumRef.current.value); // 회사 전화번호
    formData.append("cmpnySiteUrl", companyUrlRef.current.value); // 회사 사이트 주소
    formData.append("pwd", passwordRef.current.value); // 비밀번호
    formData.append("cmpnyIndstrId.mjrId", selectedMajorCategory); // 대분류 아이디
    formData.append("cmpnyIndstrId.smjrId", selectedSubCategory); // 중분류 아이디
    formData.append("cmpnyIntrstdIndstrId.mjrId", selectedMajorCategory2);
    formData.append("cmpnyIntrstdIndstrId.smjrId", selectedSubCategory2);
    formData.append("mbrPhnNum", phoneNumRef.current.value); // 회원 전화번호
    formData.append("cmpnyAddr", postcodeRef.current.value); // 회사 주소
    formData.append("cmpnyAddr", addressRef.current.value);
    formData.append("cmpnyAddr", detailAddressRef.current.value);
    formData.append("cmpnyAddr", extraAddressRef.current.value);
    formData.append("agreeOne", agreeOneRef.current.value);
    formData.append("agreeTwo", agreeTwoRef.current.value);
    formData.append("agreeThree", agreeThreeRef.current.value);

    const respose = await signupCmpMember(formData);
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
      if (!response.body) {
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

  return (
    <>
      <SignupBox>
        <p>
          <RedWord>*</RedWord>은 필수입력사항입니다.
        </p>

        <TextBox>
          <p>
            <RedWord>*</RedWord>이용자명
          </p>
          <input
            id="mbrNm"
            type="text"
            name="mbrNm"
            placeholder="이름 입력"
            ref={nameRef}
          />
        </TextBox>

        <BtnBox>
          <p>
            <RedWord>*</RedWord>이메일주소
          </p>
          <div>
            <input
              id="emilAddr"
              type="email"
              name="emilAddr"
              placeholder="업무용 이메일 사용을 권장합니다."
              ref={emailRef}
            />
            <button type="button" onClick={handleEmailCheck}>
              이메일 주소 인증
            </button>
          </div>
        </BtnBox>

        <BtnBox>
          <p>
            <RedWord>*</RedWord>이메일 주소 인증번호
          </p>
          <div>
            <div>
              <AuthNumField
                id="authNumField"
                name="emilAddrCnfrmNmbr"
                type="text"
                placeholder="인증번호 6자리 입력"
                ref={authNumRef}
              />
              <Timer>00:00</Timer>
            </div>
            <ConfirmAuthNumButton
              id="confirm-auth-num"
              type="button"
              onClick={handleAuthNum}
            >
              인증번호 확인
            </ConfirmAuthNumButton>
          </div>
        </BtnBox>

        <div>
          {/* Password Section */}
          <TextBox>
            <p>
              <RedWord>*</RedWord>비밀번호
            </p>
            <input
              ref={passwordRef}
              type="password"
              name="pwd"
              placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
              onChange={handlePasswordValidation}
            />
          </TextBox>

          {/* Confirm Password Section */}
          <TextBox>
            <p>
              <RedWord>*</RedWord>비밀번호 확인
            </p>
            <input
              type="password"
              name="confirmPwd"
              placeholder="비밀번호 확인"
              onChange={handlePasswordValidation}
              ref={confirmPasswordRef}
            />
            {pwdMatch === false && (
              <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
            )}
          </TextBox>

          {/* Business Number Section */}
          <BtnBox>
            <p>
              <RedWord>*</RedWord>사업자 번호
            </p>
            <span></span>
            <div>
              <input
                id="cmpnyBrn"
                type="text"
                name="cmpnyBrn"
                placeholder="사업자 번호 입력"
                ref={businessNumRef}
              />
              <button id="cmpnyBrnConfirm" onClick={handleBusinessNum}>
                사업자 번호 확인
              </button>
            </div>
          </BtnBox>

          {/* Employee Count Section */}
          <TextBox>
            <p>
              <RedWord>*</RedWord>직원 수
            </p>
            <input
              id="cmpnyEmplyCnt"
              type="number"
              name="cmpnyEmplyCnt"
              placeholder="직원 수 입력"
              ref={employeeCountRef}
            />
          </TextBox>

          {/* Phone Number Section */}
          <TextBox>
            <p>
              <RedWord>*</RedWord>이용자 전화번호
            </p>
            <input
              id="cmpnyNm"
              type="text"
              name="cmpnyNm"
              placeholder="전화번호 입력"
              ref={phoneNumRef}
            />
          </TextBox>

          {/* Company Name Section */}
          <TextBox>
            <p>
              <RedWord>*</RedWord>기업명
            </p>
            <input
              id="cmpnyNm"
              type="text"
              name="cmpnyNm"
              placeholder="기업명 입력"
              ref={companyNameRef}
            />
          </TextBox>

          {/* Address Section */}
          <ComAddr>
            <p>
              <RedWord>*</RedWord>기업주소
            </p>
            <ComDiv>
              <input
                type="text"
                id="postcode"
                placeholder="우편번호 입력"
                name="addr.postcode"
                ref={postcodeRef}
              />
              <button type="button" onClick={sample6_execDaumPostcode}>
                도로명 주소 찾기
              </button>
            </ComDiv>
            <ComDiv>
              <div>
                <input
                  type="text"
                  id="addr"
                  placeholder="도로명 주소 입력"
                  name="addr.addr"
                  ref={addressRef}
                />
                <input
                  type="text"
                  id="extraAddress"
                  placeholder="참고항목"
                  name="addr.extraAddress"
                  ref={extraAddressRef}
                />
                <input
                  type="text"
                  id="detailAddress"
                  placeholder="상세주소 입력"
                  name="addr.detailAddress"
                  ref={detailAddressRef}
                />
              </div>
            </ComDiv>
          </ComAddr>
        </div>

        <TextBox>
          <p>
            <RedWord>*</RedWord>기업 전화번호
          </p>
          <input
            id="cmpnyNm"
            type="text"
            name="cmpnyNm"
            placeholder="02-000-0000"
            ref={companyCallNumRef}
          />
        </TextBox>

        {/* File Upload */}
        <BtnBox>
          <p>
            <RedWord>*</RedWord>이용자 첨부파일
          </p>
          <FileBox>
            <AddFile>
              <input
                className="fileList"
                type="file"
                name="fileList[0]"
                ref={fileRef}
                onChange={handleFileChange}
                multiple
              />
            </AddFile>
            <FileList>
              {fileList.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button type="button" onClick={() => handleFileRemove(index)}>
                    삭제
                  </button>
                </li>
              ))}
            </FileList>
          </FileBox>
        </BtnBox>

        {/* Company URL */}
        <TextBox>
          <p>
            <RedWord>*</RedWord>회사 사이트 주소
          </p>
          <input
            id="cmpnyNm"
            type="text"
            name="cmpnyNm"
            placeholder="회사 사이트 주소 입력"
            ref={companyUrlRef}
          />
        </TextBox>

        {/* Major Industry */}
        <TextBox>
          <p>
            <RedWord>*</RedWord>주요 산업분야
          </p>
          <CategoryBar />
        </TextBox>

        {/* Area of Interest */}
        <TextBox>
          <p>
            <RedWord>*</RedWord>관심 산업분야
          </p>
          <CategoryBar2 />
        </TextBox>

        {/* Checkboxes */}
        <TextBox>
          {" "}
          <p>
            <RedWord>*</RedWord>이용약관
          </p>
        </TextBox>

        <CheckBox>
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
        </CheckBox>

        {/* Signup Button */}
        <SignupButton type="submit" onClick={handleSubmit}>
          가입하기
        </SignupButton>
      </SignupBox>
    </>
  );
}
