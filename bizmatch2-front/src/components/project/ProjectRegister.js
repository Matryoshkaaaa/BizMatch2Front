import React from "react";

const ProjectRegister = () => {
  return (
    <div>
      <div className="project-register-page">
        <div className="project-register-area">
          <h1 className="project-register-title">프로젝트 등록하기</h1>
          <br />
          <div className="project-register">
            <div className="project-category">
              <div className="project-section-num">01</div>
              <div className="project-section-name">프로젝트 카테고리</div>
            </div>

            <div className="project-title">
              <div className="project-section-num">02</div>
              <div className="project-section-name">제목</div>
              <input
                type="text"
                className="project-title-input"
                placeholder="제목을 입력하세요"
                name="pjTtl"
              />
            </div>
            <div className="project-schedule">
              <div className="project-section-num">03</div>
              <div className="project-section-name">프로젝트 일정</div>
              <div>
                <label htmlFor="date" className="label">
                  시작일
                </label>
                <input
                  type="date"
                  id="strt-date"
                  name="strtDt"
                  className="date-input"
                />
              </div>
              <div>
                <label htmlFor="date" className="label" id="finish-date">
                  종료일
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="endDt"
                  className="date-input"
                />
              </div>
            </div>
            <div className="project-skill-size">
              <div className="project-section-num">04</div>

              <div className="project-section-name">보유 기술</div>
              <div>
                <div className="skillStack-box">
                  <div className="searchBox">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                      className="searchInput"
                      type="text"
                      id="searchInput"
                      placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
                      autoComplete="off"
                    />
                  </div>
                  <div className="resultBox">
                    <ul id="results" className="results"></ul>
                  </div>

                  <div className="recommendSkill">
                    추천 기술 스택에서 선택해 보세요!
                    <div className="skill-box-container">
                      <div className="skill-circle-box">
                        <div className="skill-circle" data-id="72">
                          Java
                        </div>
                        <div className="skill-circle" data-id="73">
                          JavaScript
                        </div>
                        <div className="skill-circle" data-id="158">
                          Vue.js
                        </div>
                        <div className="skill-circle" data-id="125">
                          React
                        </div>
                        <div className="skill-circle" data-id="64">
                          HTML
                        </div>
                      </div>
                      <div className="skill-circle-box">
                        <div className="skill-circle" data-id="18">
                          C#
                        </div>
                        <div className="skill-circle" data-id="83">
                          Kotlin
                        </div>
                        <div className="skill-circle" data-id="6">
                          Android
                        </div>
                        <div className="skill-circle" data-id="104">
                          Node.js
                        </div>
                        <div className="skill-circle" data-id="120">
                          Python
                        </div>
                      </div>
                    </div>
                    <div className="result-skill-add-box">
                      <div>기술을 검색, 선택해 주세요.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-contents">
              <div className="project-section-num">05</div>
              <div className="project-section-name">상세 설명</div>
              <div className="project-contents-input-area">
                <div>
                  <textarea
                    id=""
                    name="pjDesc"
                    className="project-contents-input"
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
            <div className="project-price">
              <div className="project-section-num">06</div>
              <div className="project-section-name">프로젝트 입찰가격</div>
              <div>
                <label htmlFor="amount"></label>
                <input
                  type="number"
                  id="amount"
                  name="cntrctAccnt"
                  min="0"
                  step="100"
                  className="project-amount"
                  placeholder="최소 1,000,000"
                />
                <span>원</span>
              </div>
            </div>
            <div>
              <div className="project-schedule">
                <div className="project-section-num">07</div>
                <div className="project-section-name">프로젝트 모집일</div>
                <div>
                  <label htmlFor="date" className="label">
                    모집일
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="pjRcrutStrtDt"
                    className="date-input"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="label" id="finish-date">
                    종료일
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="pjRcrutEndDt"
                    className="date-input"
                  />
                </div>
              </div>
            </div>
            <div className="important-message-area">
              <div className="important-message">
                프로젝트 모집 기간은 최소 7일입니다.
              </div>
            </div>
            <div className="file-attatchment">
              <div className="project-section-num">08</div>
              <div className="project-section-name">첨부파일</div>
              <div className="btn-box">
                <p>
                  <span className="red-word">*</span>
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

            <div className="important-message-area">
              <div className="important-message">
                기획서, 요구사항 정의서, 참고 자료 등
              </div>
            </div>
            <div className="project-team-size">
              <div className="project-section-num">09</div>
              <div className="project-section-name">프로젝트 인원</div>
              <div>
                <label htmlFor="people"></label>
                <input
                  type="number"
                  id="people"
                  name="pjRcrutCnt"
                  min="1"
                  max="100"
                  step="1"
                  className="project-member-count"
                  placeholder=""
                />
                <span>명</span>
              </div>
            </div>
          </div>
          <div className="btn-area">
            <input className="project-register-btn" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegister;
