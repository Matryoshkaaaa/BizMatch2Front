import React from "react";
import styles from "./ProjectParticipationGuide.module.css";

export default function ProjectParticipationGuide() {
  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.title}>프로젝트 참여 방법 안내</h1>
      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>1. 외주 찾기</h2>
          <p className={styles.stepDescription}>
            필터링 및 검색을 활용해 원하는 프로젝트 카테고리를 선택합니다.
          </p>
        </div>

        {/* Step 2 */}
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>2. 외주 리스트 확인</h2>
          <p className={styles.stepDescription}>
            등록된 외주 리스트를 확인하고, 관심 있는 프로젝트를 클릭하면
            상세페이지로 이동합니다.
          </p>
        </div>

        {/* Step 3 */}
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>3. 외주 지원 여부 선택</h2>
          <p className={styles.stepDescription}>
            상세페이지에서 프로젝트 정보를 확인한 후, 외주 지원 여부를
            결정합니다.
          </p>
        </div>

        {/* Step 4 */}
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>4. 외주 신청서 작성</h2>
          <p className={styles.stepDescription}>
            외주 신청 페이지로 이동하여 필요한 서류 및 정보를 입력합니다.
          </p>
        </div>

        {/* Step 5 */}
        <div className={styles.step}>
          <h2 className={styles.stepTitle}>5. 프로젝트 진행</h2>
          <p className={styles.stepDescription}>
            클라이언트의 승인이 완료되면 프로젝트가 시작됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
