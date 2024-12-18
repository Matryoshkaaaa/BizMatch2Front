import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmailThunk } from "../../admin/features/users/userThunks";
import EmailModalStyle from "./EmailModal.module.css";
import DraggableModal from "./DraggableModal";

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        //console.log("ESC 키 눌림 - 모달 닫기");
        isClose(); // ESC 키를 누르면 onClose 호출
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 이벤트 리스너 정리
    };
  }, [isClose]);

  if (!isOpen) return null;

  return (
    <DraggableModal isOpen={isOpen} onClose={isClose}>
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
    </DraggableModal>
  );
}
