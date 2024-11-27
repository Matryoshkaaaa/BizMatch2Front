export default function ProjectCard() {
  return (
    <>
      <div className="project-card-container">
        <div className="project-card">
          <div className="project-box">
            <div className="project-head">
              <div className="project-head-front">
                <div className="status-recruiting">모집중</div>
                {/* <!-- <div className="status-additional-recruiting">추가모집중</div> --> */}
                {/* <!-- <div className="status-ing">진행중</div> --> */}
                {/* <!-- <div className="status-done">완료</div> --> */}
                <h2 id="pjttl" className="project-title">
                  프로젝트제목
                </h2>
              </div>
              <div className="post-date">등록일자 </div>
            </div>
            <div className="project-body">
              <div className="project-body-box">
                <div className="project-body-title">프로젝트 분야</div>
              </div>
              <div className="sidebar"></div>
              <div className="project-body-box">
                <div className="project-body-title">관련기술</div>
                <div className="project-body-content">
                  <div className="circle-box">
                    <div className="circle"></div>
                  </div>
                  <div className="language"></div>
                </div>
              </div>
              <div className="sidebar"></div>
              <div className="project-body-box">
                <div className="project-body-title">모집 마감일</div>
              </div>
              <div className="sidebar"></div>
              <div className="project-body-box">
                <div className="project-body-title">프로젝트 일정</div>
              </div>
            </div>
            <div className="project-footer">
              <div className="button-box">
                <input
                  className="apply"
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div className="estimated-amount">
                <div>예상 금액</div>
                <div className="half-sidebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
