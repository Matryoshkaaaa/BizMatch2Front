import React from "react";
import MypageCompanyEditStyle from "../member/MypageCompanyEdit.module.css";

const AddressEditModal = ({ onClose }) => {
  return (
    <div>
      <div id="reportModal" className={MypageCompanyEditStyle.modal}>
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
                  id="postcode"
                  placeholder="우편번호 입력"
                  name="address.postcode"
                />
                <button type="button" className={MypageCompanyEditStyle.asd}>
                  도로명 주소 찾기
                </button>
              </div>
              <div className={MypageCompanyEditStyle.comDiv}>
                <input
                  className={MypageCompanyEditStyle.input}
                  type="text"
                  id="roadAddress"
                  placeholder="도로명 주소"
                  name="address.road"
                />
                <input
                  className={MypageCompanyEditStyle.input}
                  type="text"
                  id="detailAddress"
                  placeholder="상세주소"
                  name="address.detail"
                />
              </div>
            </div>
            <button type="button" className={MypageCompanyEditStyle.saveBtn}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
