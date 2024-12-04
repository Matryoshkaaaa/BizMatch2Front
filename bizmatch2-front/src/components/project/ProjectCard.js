import projectCardStyle from "./ProjectCard.module.css";

export default function ProjectCard() {
  return (
    <>
      <div className={projectCardStyle.projectCardContainer}>
        <div className="projectCard">
          <div className="projectBox">
            <div className="projectHead">
              <div className="projectHeadFront">
                <div className="statusRecruiting">모집중</div>
                {/* <!-- <div className="statusAdditionalRecruiting">추가모집중</div> --> */}
                {/* <!-- <div className="statusIng">진행중</div> --> */}
                {/* <!-- <div className="statusDone">완료</div> --> */}
                <h2 id="pjttl" className="projectTitle">
                  프로젝트제목
                </h2>
              </div>
              <div className="postDate">등록일자 </div>
            </div>
            <div className="projectBody">
              <div className="projectBodyBox">
                <div className="projectBodyTitle">프로젝트 분야</div>
              </div>
              <div className="sidebar"></div>
              <div className="projectBodyBox">
                <div className="projectBodyTitle">관련기술</div>
                <div className="projectBodyContent">
                  <div className="circleBox">
                    <div className="circle"></div>
                  </div>
                  <div className="language"></div>
                </div>
              </div>
              <div className="sidebar"></div>
              <div className="projectBodyBox">
                <div className="projectBodyTitle">모집 마감일</div>
              </div>
              <div className="sidebar"></div>
              <div className="projectBodyBox">
                <div className="projectBodyTitle">프로젝트 일정</div>
              </div>
            </div>
            <div className="projectFooter">
              <div className="buttonBox">
                <input
                  className="apply"
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div className="estimatedAmount">
                <div>예상 금액</div>
                <div className="halfSidebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
