import React from "react";
import { Link } from "react-router-dom";
import projectCardStyle from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
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
                <h2 id="pjttl" className={projectCardStyle.projectTitle}>
                  <Link to={`/project/info/${project.pjId}`}>
                    {project.pjTtl}
                  </Link>
                </h2>
              </div>
              <div className={projectCardStyle.postDate}>
                {project.rgstrDt}{" "}
              </div>
            </div>
            <div className={projectCardStyle.projectBody}>
              <div className={projectCardStyle.projectBodyBox}>
                <div className={projectCardStyle.projectBodyTitle}>
                  프로젝트 분야
                </div>
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
                <input
                  className={projectCardStyle.apply}
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div className={projectCardStyle.estimatedAmount}>
                <div>예상 금액</div>
                <div className={projectCardStyle.halfSidebar}>
                  {project.cntrctAccnt}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
