import React, { useState, useEffect } from "react";
import DraggableModal from "./DraggableModal";
import styles from "./AdditionalRecruitmentModal.module.css";

export default function AdditionalRecruitmentModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const [recruitmentDays, setRecruitmentDays] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const days = parseInt(recruitmentDays, 10);

    if (!recruitmentDays || isNaN(days)) {
      setError("추가 모집 기간을 입력하세요.");
      return;
    }

    if (days < 7) {
      setError("추가 모집 기간은 최소 7일 이상이어야 합니다.");
      return;
    }

    if (days > 14) {
      setError("추가 모집 기간은 최대 14일 이하여야 합니다.");
      return;
    }

    setError("");
    onConfirm(days); // 부모 컴포넌트로 모집 기간 전달
    onClose();
  };

  useEffect(() => {
    setError("");
    setRecruitmentDays("");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // ESC 키를 누르면 onClose 호출
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 이벤트 리스너 정리
    };
  }, [onClose]);

  return (
    <DraggableModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>추가 모집 기간 설정</h2>
        <div className={styles.formGroup}>
          <label htmlFor="recruitmentDays">추가 모집 기간 (일)</label>
          <input
            type="number"
            id="recruitmentDays"
            min="7"
            max="14"
            value={recruitmentDays}
            onChange={(e) => setRecruitmentDays(e.target.value)}
          />
          {recruitmentDays && (recruitmentDays < 7 || recruitmentDays > 14) && (
            <span className={styles.warning}>
              모집 기간은 7일 이상, 14일 이하만 가능합니다.
            </span>
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            제출
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </DraggableModal>
  );
}
