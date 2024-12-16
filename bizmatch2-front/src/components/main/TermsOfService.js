import React from "react";
import styles from "./TermsOfService.module.css";

export default function TermsOfService() {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.title}>BizMatch 이용약관</h1>
      <div className={styles.termsContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제1조 (목적)</h2>
          <p>
            본 약관은 BizMatch 플랫폼(이하 &quot;플랫폼&quot;)을 이용함에 있어
            회사와 이용자 간의 권리, 의무 및 책임사항과 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제2조 (용어의 정의)</h2>
          <p>
            1. &quot;이용자&quot;란 플랫폼에 접속하여 본 약관에 따라 서비스를
            이용하는 개인 또는 법인을 말합니다.
          </p>
          <p>
            2. &quot;회원&quot;이란 플랫폼에 가입하여 지속적으로 서비스를 이용할
            수 있는 자를 말합니다.
          </p>
          <p>
            3. &quot;서비스&quot;란 플랫폼에서 제공하는 중소기업 간 외주 및 협업
            프로젝트 중개, 검증 시스템, 리뷰 및 평점 기능을 포함한 모든 기능을
            의미합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제3조 (약관의 게시 및 개정)</h2>
          <p>1. 본 약관은 플랫폼의 초기 화면 또는 연결 화면에 게시됩니다.</p>
          <p>
            2. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수
            있으며, 개정 시 변경사항을 공지합니다.
          </p>
          <p>
            3. 이용자는 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
            회원 탈퇴를 요청할 수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            제4조 (서비스 이용계약의 체결)
          </h2>
          <p>
            1. 서비스 이용계약은 이용자가 플랫폼에서 제공하는 가입 양식을
            작성하고 회사가 이를 승인함으로써 성립합니다.
          </p>
          <p>2. 회사는 다음의 경우 이용계약 승인을 거절할 수 있습니다:</p>
          <ul className={styles.list}>
            <li>허위 정보를 기재한 경우</li>
            <li>타인의 명의를 도용한 경우</li>
            <li>기타 회사가 정한 요건을 충족하지 못한 경우</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제5조 (서비스의 내용 및 변경)</h2>
          <p>
            1. 회사는 서비스의 내용과 관련 사항을 플랫폼에 게시하며, 이용자는
            이를 숙지하여야 합니다.
          </p>
          <p>
            2. 회사는 운영상, 기술상 필요에 따라 서비스 내용을 변경할 수 있으며,
            이 경우 변경사항을 사전에 공지합니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제6조 (회원의 의무)</h2>
          <p>
            1. 회원은 본 약관, 회사의 공지사항, 서비스 이용안내 등을 준수하여야
            하며, 회사의 업무에 방해되는 행위를 해서는 안 됩니다.
          </p>
          <p>2. 회원은 아래와 같은 행위를 하여서는 안 됩니다:</p>
          <ul className={styles.list}>
            <li>타인의 정보를 도용하거나 허위 정보를 기재하는 행위</li>
            <li>서비스를 이용하여 불법적인 활동을 하는 행위</li>
            <li>
              회사의 사전 승인 없이 상업적인 목적으로 서비스를 이용하는 행위
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제7조 (서비스의 중단 및 제한)</h2>
          <p>
            1. 회사는 다음의 경우 서비스 제공을 일시적으로 중단할 수 있습니다:
          </p>
          <ul className={styles.list}>
            <li>시스템 유지보수 또는 점검이 필요한 경우</li>
            <li>천재지변 등 불가항력적인 사유가 있는 경우</li>
            <li>기타 회사가 필요하다고 인정하는 경우</li>
          </ul>
          <p>
            2. 회사는 중단 사유를 사전에 공지하며, 불가피한 경우 사후에 통지할
            수 있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제8조 (손해배상)</h2>
          <p>
            회사는 이용자의 고의 또는 과실로 인하여 발생한 손해에 대해 책임지지
            않습니다. 다만, 회사의 고의 또는 중과실로 인한 손해는 배상할 수
            있습니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제9조 (분쟁 해결)</h2>
          <p>
            1. 회사와 이용자 간의 분쟁은 상호 협의를 통해 해결하는 것을 원칙으로
            합니다.
          </p>
          <p>
            2. 협의가 이루어지지 않을 경우 관할 법원은 회사의 본사 소재지에 따라
            결정됩니다.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>제10조 (기타 조항)</h2>
          <p>본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.</p>
        </section>
      </div>
    </div>
  );
}
