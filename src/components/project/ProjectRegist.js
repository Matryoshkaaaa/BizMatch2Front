import React from "react";
import Skills from "../common/Skills";

const ProjectRegist = () => {
  return (
    <div>
      <div classNameName="project-register-page">
        <div classNameName="project-register-area">
          <h1 classNameName="project-register-title">프로젝트 등록하기</h1>
          <br />
          <div classNameName="project-register">
            <div classNameName="project-category">
              <div classNameName="project-section-num">01</div>
              <div classNameName="project-section-name">프로젝트 카테고리</div>
            </div>

            <div classNameName="project-title">
              <div classNameName="project-section-num">02</div>
              <div classNameName="project-section-name">제목</div>
              <input
                type="text"
                classNameName="project-title-input"
                placeholder="제목을 입력하세요"
                name="pjTtl"
              />
            </div>
            <div classNameName="project-schedule">
              <div classNameName="project-section-num">03</div>
              <div classNameName="project-section-name">프로젝트 일정</div>
              <div>
                <label htmlFor="date" classNameName="label">
                  시작일
                </label>
                <input
                  type="date"
                  id="strt-date"
                  name="strtDt"
                  classNameName="date-input"
                />
              </div>
              <div>
                <label htmlFor="date" classNameName="label" id="finish-date">
                  종료일
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="endDt"
                  classNameName="date-input"
                />
              </div>
            </div>
            
            <div classNameName="project-contents">
              <div classNameName="project-section-num">05</div>
              <div classNameName="project-section-name">상세 설명</div>
              <div classNameName="project-contents-input-area">
                <div>
                  <textarea
                    id=""
                    name="pjDesc"
                    classNameName="project-contents-input"
                    placeholder="프로젝트 내용 작성 추천 예시.
                프로젝트 목표: 특정 목표를 달성하기 위한 시스템 또는 플랫폼 개발
                예: 재고 관리 자동화 시스템 개발, 고객 피드백 분석 툴 제작 등
                필요사항: 프로젝트 수행에 필요한 기술과 작업
                예: 기획, UI/UX 디자인, 프론트엔드 및 백엔드 개발, 데이터베이스 설계, API 연동, QA 테스트 등
                주요 기능: 프로젝트에서 구현될 주요 기능 및 특징
                예: 사용자 로그인/회원가입, 실시간 알림 기능, 데이터 시각화 대시보드, 관리자 페이지 등
                산출물: 프로젝트 완료 시 제공될 결과물
                예: 소스 코드, 디자인 파일 (Adobe XD, Figma 등), 시스템 매뉴얼, 테스트 결과 보고서 등
                필수 조건: 프로젝트 수행 시 반드시 충족해야 할 사항
                예: 반응형 웹 디자인, 성능 최적화, 다국어 지원, 보안 인증 등
                기대 효과: 프로젝트 완료 후 예상되는 효과
                예: 업무 효율성 향상, 비용 절감, 사용자 경험 개선 등
                기타 요청 사항: 추가적으로 고려할 특수 요구사항
                예: 특정 기술 스택 사용, 유지보수 계획, 협업 툴 사용 (Jira, Trello 등)"
                  ></textarea>
                </div>
              </div>
            </div>
            <Skills />
            <div classNameName="project-price">
              <div classNameName="project-section-num">06</div>
              <div classNameName="project-section-name">프로젝트 입찰가격</div>
              <div>
                <label htmlFor="amount"></label>
                <input
                  type="number"
                  id="amount"
                  name="cntrctAccnt"
                  min="0"
                  step="100"
                  classNameName="project-amount"
                  placeholder="최소 1,000,000"
                />
                <span>원</span>
              </div>
            </div>
            <div>
              <div classNameName="project-schedule">
                <div classNameName="project-section-num">07</div>
                <div classNameName="project-section-name">프로젝트 모집일</div>
                <div>
                  <label htmlFor="date" classNameName="label">
                    모집일
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="pjRcrutStrtDt"
                    classNameName="date-input"
                  />
                </div>
                <div>
                  <label htmlFor="date" classNameName="label" id="finish-date">
                    종료일
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="pjRcrutEndDt"
                    classNameName="date-input"
                  />
                </div>
              </div>
            </div>
            <div classNameName="important-message-area">
              <div classNameName="important-message">
                프로젝트 모집 기간은 최소 7일입니다.
              </div>
            </div>
            <div classNameName="file-attatchment">
              <div classNameName="project-section-num">08</div>
              <div classNameName="project-section-name">첨부파일</div>
              <div classNameName="btn-box">
                <p>
                  <span classNameName="red-word">*</span>
                </p>
                <div>
                  <input type="file" id="fileInput" name="fileList" multiple />
                  <label htmlFor="fileSelect">선택한 파일:</label>
                  <select id="fileSelect"></select>
                  <button id="removeButton" type="button">
                    삭제
                  </button>
                </div>
              </div>
            </div>

            <div classNameName="important-message-area">
              <div classNameName="important-message">
                기획서, 요구사항 정의서, 참고 자료 등
              </div>
            </div>
            <div classNameName="project-team-size">
              <div classNameName="project-section-num">09</div>
              <div classNameName="project-section-name">프로젝트 인원</div>
              <div>
                <label htmlFor="people"></label>
                <input
                  type="number"
                  id="people"
                  name="pjRcrutCnt"
                  min="1"
                  max="100"
                  step="1"
                  classNameName="project-member-count"
                  placeholder=""
                />
                <span>명</span>
              </div>
            </div>
          </div>
          <div classNameName="btn-area">
            <input classNameName="project-register-btn" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegist;
