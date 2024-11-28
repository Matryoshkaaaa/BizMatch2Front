export default function ProjectCard() {
  return (
    <>
      <div classNameName="project-card-container">
        <div classNameName="project-card">
          <div classNameName="project-box">
            <div classNameName="project-head">
              <div classNameName="project-head-front">
                <div classNameName="status-recruiting">모집중</div>
                {/* <!-- <div classNameName="status-additional-recruiting">추가모집중</div> --> */}
                {/* <!-- <div classNameName="status-ing">진행중</div> --> */}
                {/* <!-- <div classNameName="status-done">완료</div> --> */}
                <h2 id="pjttl" classNameName="project-title">
                  프로젝트제목
                </h2>
              </div>
              <div classNameName="post-date">등록일자 </div>
            </div>
            <div classNameName="project-body">
              <div classNameName="project-body-box">
                <div classNameName="project-body-title">프로젝트 분야</div>
              </div>
              <div classNameName="sidebar"></div>
              <div classNameName="project-body-box">
                <div classNameName="project-body-title">관련기술</div>
                <div classNameName="project-body-content">
                  <div classNameName="circle-box">
                    <div classNameName="circle"></div>
                  </div>
                  <div classNameName="language"></div>
                </div>
              </div>
              <div classNameName="sidebar"></div>
              <div classNameName="project-body-box">
                <div classNameName="project-body-title">모집 마감일</div>
              </div>
              <div classNameName="sidebar"></div>
              <div classNameName="project-body-box">
                <div classNameName="project-body-title">프로젝트 일정</div>
              </div>
            </div>
            <div classNameName="project-footer">
              <div classNameName="button-box">
                <input
                  classNameName="apply"
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div classNameName="estimated-amount">
                <div>예상 금액</div>
                <div classNameName="half-sidebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
