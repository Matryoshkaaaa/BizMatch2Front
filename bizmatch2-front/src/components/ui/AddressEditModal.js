import React, { useEffect, useState } from "react";
import MypageCompanyEditStyle from "../member/MypageCompanyEdit.module.css";

const AddressEditModal = ({ onClose, isOpen, onComplete }) => {
  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");

  function sample6_execDaumPostcode() {
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete: function (data) {
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = ` (${extraAddr})`;
          }
        }

        setPostcode(data.zonecode);
        setRoadAddress(addr);
        setExtraAddress(extraAddr);
      },
    }).open();
  }

  const handleSave = () => {
    const addressData = {
      postcode,
      roadAddress,
      detailAddress,
      extraAddress,
    };
    onComplete(addressData); // 상위 컴포넌트로 데이터 전달
    onClose(); // 모달 닫기
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        //console.log("ESC 키 눌림 - 모달 닫기");
        onClose(); // ESC 키를 누르면 onClose 호출
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 이벤트 리스너 정리
    };
  }, [onClose]);

  return (
    <div
      className={`${MypageCompanyEditStyle.modal} ${
        isOpen ? MypageCompanyEditStyle.open : ""
      }`}
    >
      <div className={MypageCompanyEditStyle.modalContent}>
        <button className={MypageCompanyEditStyle.closeBtn} onClick={onClose}>
          &times;
        </button>
        <div className={MypageCompanyEditStyle.formGroup}>
          <div className={MypageCompanyEditStyle.comAddr} id="com_addr">
            <p>
              <span className={MypageCompanyEditStyle.redWord}>*</span>
              기업주소
            </p>
            <div className={MypageCompanyEditStyle.comDiv}>
              <input
                className={MypageCompanyEditStyle.input}
                type="text"
                value={postcode}
                placeholder="우편번호 입력"
                readOnly
              />
              <button
                type="button"
                className={MypageCompanyEditStyle.asd}
                onClick={sample6_execDaumPostcode}
              >
                도로명 주소 찾기
              </button>
            </div>
            <div className={MypageCompanyEditStyle.comDiv}>
              <input
                className={MypageCompanyEditStyle.input}
                type="text"
                value={roadAddress}
                placeholder="도로명 주소"
                readOnly
              />
              <input
                className={MypageCompanyEditStyle.input}
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세주소"
              />
            </div>
          </div>
          <button
            type="button"
            className={MypageCompanyEditStyle.saveBtn}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
