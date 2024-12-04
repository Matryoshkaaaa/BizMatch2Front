import MyApplyProjectStyle from "./MyApplyProject.module.css";

export default function MyApplyProject({ projectList }) {
  return (
    <>
      <div className={MyApplyProjectStyle.mainContainer}>
        <div className={MyApplyProjectStyle.mainContainerHeader}>
          <h1 className={MyApplyProjectStyle.mainTitle1} id="myProjectList">
            내 프로젝트 목록
          </h1>

          <h1>/</h1>

          <h1
            className={MyApplyProjectStyle.mainTitle2}
            id="myApplyProjectList"
          >
            내가 지원한 프로젝트 목록
          </h1>
        </div>
      </div>

      {/* 프로젝트 목록이 있을 때 렌더링 */}
      {projectList && projectList.length > 0 ? (
        projectList.map((project) => (
          <div
            className={MyApplyProjectStyle.projectCardContainer}
            key={project.pjId}
          >
            <div className={MyApplyProjectStyle.projectCard}>
              <div className={MyApplyProjectStyle.projectBox}>
                <div className={MyApplyProjectStyle.projectHead}>
                  <div className={MyApplyProjectStyle.projectHeadFront}>
                    <div className={MyApplyProjectStyle.statusRecruiting}>
                      모집중
                    </div>
                    <h2 id="pjttl">{project.pjTtl}</h2>
                  </div>
                  <div className={MyApplyProjectStyle.postDate}>
                    등록일자 {project.rgstrDt}
                  </div>
                </div>

                <div className={MyApplyProjectStyle.projectBody}>
                  <div className={MyApplyProjectStyle.projectBodyBox}>
                    <div className={MyApplyProjectStyle.projectBodyTitle}>
                      프로젝트 분야
                    </div>
                    <div className={MyApplyProjectStyle.projectBodyContent}>
                      IT·프로그래밍 / 웹사이트·모바일앱 개발
                    </div>
                  </div>
                  <div className={MyApplyProjectStyle.sidebar}></div>
                  <div className={MyApplyProjectStyle.projectBodyBox}>
                    <div className={MyApplyProjectStyle.projectBodyTitle}>
                      관련기술
                    </div>
                    <div className={MyApplyProjectStyle.projectBodyContent}>
                      <div className={MyApplyProjectStyle.circleBox}>
                        <div className={MyApplyProjectStyle.circle}></div>
                      </div>
                      <div className={MyApplyProjectStyle.language}>
                        Java, HTML5
                      </div>
                    </div>
                  </div>
                  <div className={MyApplyProjectStyle.sidebar}></div>
                  <div className={MyApplyProjectStyle.projectBodyBox}>
                    <div className={MyApplyProjectStyle.projectBodyTitle}>
                      모집 마감일
                    </div>
                    <div className={MyApplyProjectStyle.projectBodyContent}>
                      {project.pjRcrutEndDt}
                    </div>
                  </div>
                  <div className={MyApplyProjectStyle.sidebar}></div>
                  <div className={MyApplyProjectStyle.projectBodyBox}>
                    <div className={MyApplyProjectStyle.projectBodyTitle}>
                      프로젝트 일정
                    </div>
                    <div className={MyApplyProjectStyle.projectBodyContent}>
                      {project.strtDt} ~ {project.endDt}
                    </div>
                  </div>
                </div>

                <div className={MyApplyProjectStyle.projectFooter}>
                  <div className={MyApplyProjectStyle.buttonBox}>
                    <input
                      className={MyApplyProjectStyle.apply}
                      id="applyview"
                      data-id={project.pjId}
                      type="button"
                      value="지원서 보기"
                    />
                  </div>
                  <div className={MyApplyProjectStyle.estimatedAmount}>
                    <div>예상 금액</div>
                    <div className={MyApplyProjectStyle.halfSidebar}></div>
                    <div className={MyApplyProjectStyle.bold}>
                      {project.cntrctAccnt}
                    </div>
                    <span>원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // 프로젝트 목록이 없을 때
        <h1>지원한 프로젝트가 없습니다.</h1>
      )}
    </>
  );
}
