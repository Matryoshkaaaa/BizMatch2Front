import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import projectCardStyle from "./ProjectCard.module.css";

export default function ProjectCard({ project, pjApplyId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
  const applyEmail = project.applyProjectVOList;
  const foundEmail = applyEmail?.find((item) => item === email);

  // 신청하기 버튼 눌렀을 때
  const handleApplyButtonClick = (project) => {
    navigate(`/project/apply/${project.pjId}`);
  };
  // 지원자 보기 버튼 눌렀을 때

  const handleApplyMemberButtonClick = (project) => {
    console.log(project);
    navigate("/payment/depositPage");
  };
  // 지원서 보기 눌렀을 때
  const handleApplyScriptButtonClick = () => {
    navigate(`/project/myapply/view/${project.pjApplyId}`);
  };
  const getProjectStatusText = (pjStt) => {
    switch (pjStt) {
      case 0:
        return <div className={projectCardStyle.statusRecruiting}>모집중</div>;
      case 1:
        return <div className={projectCardStyle.statusDone}>완료</div>;
      case 2:
        return <div className={projectCardStyle.statusIng}>진행중</div>;
      case 3:
        return (
          <div className={projectCardStyle.statusAdditionalRecruiting}>
            추가 모집중
          </div>
        );
      case 4:
        return <div className={projectCardStyle.statusDone}>완료</div>;
      default:
        return "모집중";
    }
  };
  const getProjectStatusTextButton = (pjStt) => {
    switch (pjStt) {
      case 0:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)}
            value="지원 기업 보기"
          />
        );
      case 1:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)} // 리뷰쓰기 클릭이벤트 만들기
            value="리뷰 쓰기"
          />
        );
      case 2:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)} // 계약금 결제 클릭이벤트 만들기
            value="완료하기"
          />
        );
      case 3:
        return (
          <input
            className={projectCardStyle.apply}
            type="button"
            onClick={() => handleApplyMemberButtonClick(project)}
            value="지원 기업 보기"
          />
        );

      default:
        return;
    }
  };
  //d
  return (
    <>
      <div className={projectCardStyle.projectCardContainer}>
        <div className={projectCardStyle.projectCard}>
          <div className={projectCardStyle.projectBox}>
            <div className={projectCardStyle.projectHead}>
              <div className={projectCardStyle.projectHeadFront}>
                {getProjectStatusText(project.pjStt)}
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
                {location.pathname === "/project/findpage" &&
                !foundEmail &&
                project.ordrId !== email ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyButtonClick(project)}
                    value="신청하기"
                  />
                ) : location.pathname === "/project/findpage" &&
                  project.ordrId === email ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={() => handleApplyMemberButtonClick(project)}
                    value="지원기업 보기"
                  />
                ) : location.pathname === "/project/myorder" &&
                  project.ordrId === email ? (
                  getProjectStatusTextButton(project.pjStt)
                ) : location.pathname === "/project/myapply" && pjApplyId ? (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    onClick={handleApplyScriptButtonClick}
                    value="지원서 수정하기"
                  />
                ) : (
                  <input
                    className={projectCardStyle.apply}
                    type="button"
                    value="지원서 수정하기"
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
