import MypageCompanyEditStyle from "./MypageCompanyEdit.module.css";

export default function MypageCompanyEdit({ companyVO, mbrPrmStkList }) {
  return (
    <>
      <div className={MypageCompanyEditStyle.mainpageBox}>
        <main>
          <div className={MypageCompanyEditStyle.mainBox}>
            <section className={MypageCompanyEditStyle.sidebar}>
              <div className={MypageCompanyEditStyle.sidebarMenuList}>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#introduction"
                >
                  내 프로필
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#interesting-industry"
                >
                  관심 산업
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#holding-technology"
                >
                  보유 기술
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#account"
                >
                  계좌 번호
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#attachment"
                >
                  회사 첨부자료
                </div>
                <div
                  className={MypageCompanyEditStyle.sidebarMenu}
                  data-target="#map"
                >
                  회사 위치
                </div>
                <div className={MypageCompanyEditStyle.sidebarMenu}>
                  내 프로젝트
                </div>
              </div>
            </section>

            <section className={MypageCompanyEditStyle.myPageList}>
              <div className={MypageCompanyEditStyle.myPageListBox}>
                <div
                  className={MypageCompanyEditStyle.introduction}
                  id="introduction"
                >
                  회사 소개
                  <textarea
                    className={MypageCompanyEditStyle.introductionContent}
                    id="cmpnyIntr"
                    name="cmpnyIntr"
                    defaultValue={companyVO.cmpnyIntr}
                  />
                </div>
                <div
                  className={MypageCompanyEditStyle.interestingIndustry}
                  id="interesting-industry"
                >
                  관심 산업
                  {/* Include category bar here */}
                </div>
                <div
                  className={MypageCompanyEditStyle.holdingTechnology}
                  id="holding-technology"
                >
                  보유 기술
                  <div className={MypageCompanyEditStyle.skillStackBox}>
                    <div className={MypageCompanyEditStyle.searchBox}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <input
                        className={MypageCompanyEditStyle.searchInput}
                        type="text"
                        id="searchInput"
                        placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
                        autoComplete="off"
                      />
                    </div>
                    <div className={MypageCompanyEditStyle.resultBox}>
                      <ul
                        id="results"
                        className={MypageCompanyEditStyle.results}
                      ></ul>
                    </div>

                    <div className={MypageCompanyEditStyle.recommendSkill}>
                      추천 기술 스택에서 선택해 보세요!
                      <div className={MypageCompanyEditStyle.skillBoxContainer}>
                        <div className={MypageCompanyEditStyle.skillCircleBox}>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            data-id="72"
                          >
                            Java
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            style={{ width: "5rem" }}
                            data-id="73"
                          >
                            JavaScript
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            data-id="158"
                          >
                            Vue.js
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            data-id="125"
                          >
                            React
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            data-id="64"
                          >
                            HTML
                          </div>
                        </div>
                        <div className={MypageCompanyEditStyle.skillCircleBox}>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            data-id="18"
                          >
                            C
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            style={{ width: "4rem" }}
                            data-id="83"
                          >
                            Kotlin
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            style={{ width: "5rem" }}
                            data-id="6"
                          >
                            Android
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            style={{ width: "4rem" }}
                            data-id="104"
                          >
                            Node.js
                          </div>
                          <div
                            className={MypageCompanyEditStyle.skillCircle}
                            style={{ width: "4rem" }}
                            data-id="120"
                          >
                            Python
                          </div>
                        </div>
                      </div>
                      <div className={MypageCompanyEditStyle.resultSkillAddBox}>
                        {mbrPrmStkList?.length > 0 ? (
                          mbrPrmStkList.map((tech) => (
                            <div
                              key={tech.prmStkVO.prmStkId}
                              className={MypageCompanyEditStyle.skillItem}
                              style={{
                                width: "80%",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              <label>{tech.prmStkVO.prmStk}</label>
                              <input
                                className={MypageCompanyEditStyle.selectedSkill}
                                name={tech.prmStkVO.prmStk}
                                value={tech.prmStkVO.prmStkId}
                                type="hidden"
                              />
                              <span
                                className={MypageCompanyEditStyle.removeSkill}
                                style={{ float: "right", cursor: "pointer" }}
                              >
                                x
                              </span>
                            </div>
                          ))
                        ) : (
                          <div>기술을 검색, 선택해 주세요.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={MypageCompanyEditStyle.account} id="account">
                  <div className={MypageCompanyEditStyle.countTitle}>
                    회사 계좌 번호
                  </div>
                  {companyVO.cmpnyAccuuntNum ? (
                    <input
                      className={MypageCompanyEditStyle.accountInput}
                      id="account-input"
                      type="text"
                      value={companyVO.cmpnyAccuuntNum}
                    />
                  ) : (
                    <input
                      className={MypageCompanyEditStyle.accountInput}
                      id="account-input"
                      type="text"
                      placeholder="계좌번호를 입력해주세요"
                    />
                  )}
                </div>
                <div
                  className={MypageCompanyEditStyle.attachment}
                  id="attachment"
                >
                  회사 첨부자료
                  <button
                    className={MypageCompanyEditStyle.moreButtonSmall}
                    type="button"
                  >
                    더 보기
                  </button>
                  <div className={MypageCompanyEditStyle.attachmentList}>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                    <div className={MypageCompanyEditStyle.attachmentBox}></div>
                  </div>
                </div>
                <div className={MypageCompanyEditStyle.map} id="map">
                  회사 위치
                  <div className={MypageCompanyEditStyle.mapBox}>
                    <div
                      id="kakao-map"
                      className={MypageCompanyEditStyle.kakaoMap}
                    ></div>
                    <div className={MypageCompanyEditStyle.mapDetail}>
                      <div className={MypageCompanyEditStyle.detailTitle}>
                        상세 주소
                      </div>
                      <div
                        className={MypageCompanyEditStyle.detailAddress}
                        id="cmpnyAddr"
                      >
                        {companyVO.cmpnyAddr || "주소 정보가 없습니다"}
                      </div>
                    </div>
                  </div>
                  <button type="button" className={MypageCompanyEditStyle.edit}>
                    변경
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal for address editing */}
      <div id="reportModal" className={MypageCompanyEditStyle.modal}>
        <div className={MypageCompanyEditStyle.modalContent}>
          <button className={MypageCompanyEditStyle.closeBtn}>&times;</button>
          <div className={MypageCompanyEditStyle.formGroup}>
            <div className={MypageCompanyEditStyle.comAddr} id="com_addr">
              <p>
                <span className={MypageCompanyEditStyle.redWord}>*</span>
                기업주소
              </p>
              <div className={MypageCompanyEditStyle.comDiv}>
                <input
                  className={MypageCompanyEditStyle.input}
                  type="text"
                  id="postcode"
                  placeholder="우편번호 입력"
                  name="address.postcode"
                />
                <button type="button" className={MypageCompanyEditStyle.asd}>
                  도로명 주소 찾기
                </button>
              </div>
              <div className={MypageCompanyEditStyle.comDiv}>
                <input
                  className={MypageCompanyEditStyle.input}
                  type="text"
                  id="roadAddress"
                  placeholder="도로명 주소"
                  name="address.road"
                />
                <input
                  className={MypageCompanyEditStyle.input}
                  type="text"
                  id="detailAddress"
                  placeholder="상세주소"
                  name="address.detail"
                />
              </div>
            </div>
            <button type="button" className={MypageCompanyEditStyle.saveBtn}>
              저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
