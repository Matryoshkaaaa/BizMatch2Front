import projectCard from "./ProjectCard.module.css";

export default function ProjectCard() {
  return (
    <>
      <div className={projectCard.project_card_container}>
        <div className={projectCard.project_card}>
          <div className={projectCard.project_box}>
            <div className={projectCard.project_head}>
              <div className={projectCard.project_head_front}>
                <div className={projectCard.status_recruiting}>모집중</div>
                {/* <div className={projectCard.status_additional_recruiting}>추가모집중</div> 
                 <div className={projectCard.status_ing}>진행중</div> 
                <div className={projectCard.status_done}>완료</div>  */}
                <h2 id="pjttl" className={projectCard.project_title}>
                  {/* ${project.pjTtl} */}
                  프로젝트 제목
                </h2>
              </div>
              <div className={projectCard.post_date}>
                등록일자
                {/* ${project.rgstrDt} */}
              </div>
            </div>
            <div className={projectCard.project_body}>
              <div className={projectCard.project_body_box}>
                <div className={projectCard.project_body_title}>
                  프로젝트 분야
                </div>
                <div
                  className={
                    projectCard.project_body_content + " " + projectCard.bold
                  }
                >
                  {/* ${project.smjrNm } */}
                </div>
              </div>
              <div className={projectCard.sidebar}></div>
              <div className={projectCard.project_body_box}>
                <div className={projectCard.project_body_title}>관련기술</div>
                <div style={{ gap: "0.2rem" }}>
                  <div className={projectCard.circle_box}>
                    <div className={projectCard.circle}></div>
                  </div>
                  <div
                    className={projectCard.language}
                    style={{ display: "flex", gap: "0.3rem" }}
                  >
                    {/* <c:choose>
                      <c:when test="${not empty project.projectSkillList}">
                        <c:forEach
                          items="${project.projectSkillList}"
                          var="skill"
                        >
                          <span>${skill.prmStk}</span>
                          <br />
                        </c:forEach>
                      </c:when>
                      <c:otherwise> 기술 정보가 없습니다. </c:otherwise>
                    </c:choose> */}
                  </div>
                </div>
              </div>
              <div className={projectCard.sidebar}></div>
              <div className={projectCard.project_body_box}>
                <div className={projectCard.project_body_title}>
                  모집 마감일
                </div>
                <div className={projectCard.project_body_content}>
                  {/* ${project.pjRcrutEndDt} */}
                </div>
              </div>
              <div className={projectCard.sidebar}></div>
              <div className={projectCard.project_body_box}>
                <div className={projectCard.project_body_title}>
                  프로젝트 일정
                </div>
                <div className={projectCard.project_body_content}>
                  {/* ${project.strtDt} ~ ${project.endDt} */}
                </div>
              </div>
            </div>
            <div className={projectCard.project_footer}>
              <div className={projectCard.button_box}>
                <input
                  className={projectCard.apply}
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div className={projectCard.estimated_amount}>
                <div>예상 금액</div>
                <div className={projectCard.half_sidebar}></div>
                <div className={projectCard.bold}>
                  {/* ${project.cntrctAccnt} */}원
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
