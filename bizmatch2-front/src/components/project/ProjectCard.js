import { Link, useLocation, useNavigate } from "react-router-dom";
import projectCardStyle from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  const location = useLocation();
  const navigate = useNavigate();
  // 신청하기 버튼 눌렀을 때
  const handleApplyButtonClick = (project) => {
    navigate(`/project/apply/${project.pjId}`);
  };
  // 지원자 보기 버튼 눌렀을 때
  const handleApplyMemberButtonClick = () => {
    navigate("");
  };
  // 지원서 보기 눌렀을 때
  const handleApplyScriptButtonClick = () => {
    navigate(`/project/myapply/view/${project.pjApplyId}`);
  };
  //d
  return (
    <>
      <div className={projectCardStyle.projectCardContainer}>
        <div className={projectCardStyle.projectCard}>
          <div className={projectCardStyle.projectBox}>
            <div className={projectCardStyle.projectHead}>
              <div className={projectCardStyle.projectHeadFront}>
                <div className={projectCardStyle.statusRecruiting}>모집중</div>
                {/* <!-- <div className="statusAdditionalRecruiting">추가모집중</div> --> */}
                {/* <!-- <div className="statusIng">진행중</div> --> */}
                {/* <!-- <div className="statusDone">완료</div> --> */}
                <div></div>
                <h2 id="pjttl" className={projectCardStyle.projectTitle}>
                  <Link to={`/project/info/${project.pjId}`}>
                    {project.pjTtl}
                  </Link>
                </h2>
                <div></div>
                <div className={projectCardStyle.postDate}>
                  {project.rgstrDt}{" "}
                </div>
              </div>
            </div>
            <div className={projectCardStyle.projectBody}>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  프로젝트 분야
                </div>
                {project.projectIndustryVO?.indstrInfoVO?.indstrNm}
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  관련기술
                </div>
                <div className={projectCardStyle.projectBodyContent}>
                  <div className={projectCardStyle.circleBox}>
                    <div className={projectCardStyle.circle}></div>
                  </div>
                  <div className={projectCardStyle.language}></div>
                </div>
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  모집 마감일
                </div>
                {project.pjRcrutEndDt}
              </div>
              <div className={projectCardStyle.sidebar}></div>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  프로젝트 일정
                </div>
                {project.strtDt}~{project.endDt}
              </div>
            </div>
            <div className={projectCardStyle.projectFooter}>
              <div className={projectCardStyle.buttonBox}>
                {location.pathname === "/project/findpage" ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyButtonClick(project)}
                    value="신청하기"
                  />
                ) : location.pathname === "/project/myorder" ? (
                  <input
                    className={projectCardStyle.apply}
                    onClick={handleApplyMemberButtonClick}
                    type="button"
                    value="지원자 보기"
                  />
                ) : (
                  <input
                    className={projectCardStyle.apply}
                    onClick={handleApplyScriptButtonClick}
                    type="button"
                    value="지원서 보기"
                  />
                )}
              </div>

              <div className={projectCardStyle.estimatedAmount}>
                <div className={projectCardStyle.halfSidebar}>
                  <div>예상 금액</div>
                </div>
                {project.cntrctAccnt}원
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
