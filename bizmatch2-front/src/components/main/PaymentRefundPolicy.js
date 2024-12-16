import React from "react";
import styles from "./PaymentRefundPolicy.module.css";

export default function PaymentRefundPolicy() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.title}>결제 및 환불 정책</h1>
      <div className={styles.policyContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>결제 절차</h2>
          <ul className={styles.list}>
            <li>프로젝트 지원 후, 보증금을 결제해야 합니다 (1차 결제).</li>
            <li>
              클라이언트가 프로젝트 진행 여부를 최종 결정하면 프로젝트가
              승인됩니다.
            </li>
            <li>
              프로젝트가 승인되면{" "}
              <span className={styles.highlight}>거래 대금의 2차 결제</span>가
              진행됩니다.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>환불 정책</h2>
          <p>환불은 다음의 경우에만 진행됩니다:</p>
          <ul className={styles.list}>
            <li>프로젝트가 중단되거나 취소된 경우</li>
            <li>수수료는 일부 반환 및 보증금은 전부 반환됩니다.</li>
            <li>
              플랫폼 정책에 따라 수수료의 <strong>50%</strong>는 의뢰자에게
              반환되며, 나머지 <strong>50%</strong>는 플랫폼 수수료로
              처리됩니다.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>패널티 규정</h2>
          <p>
            프로젝트 진행 중 불이행이 발생할 경우, 아래와 같은 패널티가
            부과됩니다:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>1회 위반</strong>: 거래 정지 3개월
            </li>
            <li>
              <strong>2회 위반</strong>: 거래 정지 6개월 및 수수료 2%p 인상
            </li>
            <li>
              <strong>3회 위반</strong>: 영구 정지 및 제명
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>추가 정보</h2>
          <p>
            보증금 및 결제 관리는 안전한 거래 환경을 위해{" "}
            <span className={styles.highlight}>플랫폼 중재 시스템</span>을 통해
            처리됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
