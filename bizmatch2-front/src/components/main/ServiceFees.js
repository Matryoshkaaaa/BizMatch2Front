import React from "react";
import styles from "./ServiceFees.module.css";

export default function ServiceFees() {
  return (
    <div className={styles.feesContainer}>
      <h1 className={styles.title}>이용 요금 안내</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>기본 이용 요금</h2>
          <p>
            플랫폼 이용 시 <strong>회원가입 및 프로젝트 등록은 무료</strong>
            입니다. 단, 프로젝트 완료 후 거래 성사 시 일정 수수료가 부과됩니다.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>기업회원</strong>: 프로젝트 계약 금액의{" "}
              <span className={styles.highlight}>10%</span>
            </li>
            <li>
              <strong>프리랜서 회원</strong>: 수수료{" "}
              <span className={styles.highlight}>무료</span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>보증금 정책</h2>
          <p>
            프로젝트 진행을 위해 클라이언트는{" "}
            <span className={styles.highlight}>보증금</span>을 결제해야 하며,
            이는 안전 거래를 보장하기 위해 플랫폼에서 관리합니다.
          </p>
          <ul className={styles.list}>
            <li>
              보증금은 거래 금액의 <strong>10%</strong>로 책정됩니다.
            </li>
            <li>
              프로젝트 완료 후, 보증금은 클라이언트에게{" "}
              <strong>전액 반환</strong>됩니다.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>수수료 반환 규정</h2>
          <p>거래 취소 및 중단 시 수수료 반환은 다음과 같이 적용됩니다:</p>
          <ul className={styles.list}>
            <li>
              <strong>프로젝트 시작 전 취소</strong>: 보증금 및 수수료{" "}
              <strong>100% 반환</strong>
            </li>
            <li>
              <strong>프로젝트 중단</strong>: 수수료의 <strong>50%</strong>는
              반환되지 않습니다.
            </li>
            <li>
              <strong>완료된 프로젝트</strong>: 수수료 반환 불가
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>결제 방법</h2>
          <p>
            결제는 안전한 전자 결제 시스템을 통해 처리되며, 다음 방법을
            지원합니다:
          </p>
          <ul className={styles.list}>
            <li>신용/체크카드</li>
            <li>가상계좌</li>
            <li>계좌이체</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
