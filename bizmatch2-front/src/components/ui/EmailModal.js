import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmailThunk } from "../../admin/features/users/userThunks";
import EmailModalStyle from "./EmailModal.module.css";

export default function EmailModal({ isOpen, isClose, recipientEmail }) {
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const handleSendEmail = () => {
    if (!content.trim()) {
      alert("이메일 내용을 입력하세요.");
      return;
    }

    const emailVO = {
      emilAddr: recipientEmail,
      content,
    };

    dispatch(sendEmailThunk(emailVO));
    isClose();
  };

  if (!isOpen) return null;

  return (
    <div className={EmailModalStyle.modal}>
      <div className={EmailModalStyle.mailWrapper}>
        <div className={EmailModalStyle.mail}>
          <h3 className={EmailModalStyle.mailTitle}>이메일 발송</h3>
          <div>
            <label>수신자</label>
            <input type="text" value={recipientEmail} readOnly />
          </div>
          <div>
            <label>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />
          </div>
          <div className={EmailModalStyle.btnSection}>
            <button
              className={EmailModalStyle.emailBtn}
              onClick={handleSendEmail}
            >
              발송
            </button>
            <button className={EmailModalStyle.emailBtn} onClick={isClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
