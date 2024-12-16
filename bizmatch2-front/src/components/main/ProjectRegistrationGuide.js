import React from "react";
import styles from "./ProjectRegistrationGuide.module.css";

export default function ProjectRegistrationGuide() {
  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.title}>프로젝트 등록 방법 안내</h1>
      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>1. 기업 계정 로그인 후 등록</h2>
          <p className={styles.stepDescription}>
            기업 회원 페이지에서 프로젝트 등록을 클릭하여 등록을 시작합니다.
          </p>
        </div>

        <div className={styles.step}>
          <h2 className={styles.stepTitle}>2. 프로젝트 상세 입력</h2>
          <p className={styles.stepDescription}>
            프로젝트 카테고리, 상세 업무 내용, 관련 기술을 입력합니다.
          </p>
        </div>

        <div className={styles.step}>
          <h2 className={styles.stepTitle}>3. 예산 및 일정 설정</h2>
          <p className={styles.stepDescription}>
            지출 가능한 예산, 예상 시작일과 종료일을 입력합니다.
          </p>
        </div>

        <div className={styles.step}>
          <h2 className={styles.stepTitle}>4. 첨부파일 등록</h2>
          <p className={styles.stepDescription}>
            프로젝트 신청에 참고할만한 프로젝트 정보 관련 파일을 등록합니다.
          </p>
        </div>

        <div className={styles.step}>
          <h2 className={styles.stepTitle}>5. 모집 요건 입력</h2>
          <p className={styles.stepDescription}>
            지원자 모집 마감일, 모집 인원원 등을 설정합니다.
          </p>
        </div>

        <div className={styles.step}>
          <h2 className={styles.stepTitle}>6. 외주 신청 등록 완료</h2>
          <p className={styles.stepDescription}>
            모든 정보 입력이 완료되면 프로젝트트 신청 등록이 완료됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
