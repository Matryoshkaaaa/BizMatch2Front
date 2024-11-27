export default function ProjectCard() {
  return (
    <>
      <div class="project-card-container">
        <div class="project-card">
          <div class="project-box">
            <div class="project-head">
              <div class="project-head-front">
                <div class="status-recruiting">모집중</div>
                {/* <!-- <div class="status-additional-recruiting">추가모집중</div> --> */}
                {/* <!-- <div class="status-ing">진행중</div> --> */}
                {/* <!-- <div class="status-done">완료</div> --> */}
                <h2 id="pjttl" class="project-title">
                  프로젝트제목
                </h2>
              </div>
              <div class="post-date">등록일자 </div>
            </div>
            <div class="project-body">
              <div class="project-body-box">
                <div class="project-body-title">프로젝트 분야</div>
              </div>
              <div class="sidebar"></div>
              <div class="project-body-box">
                <div class="project-body-title">관련기술</div>
                <div class="project-body-content">
                  <div class="circle-box">
                    <div class="circle"></div>
                  </div>
                  <div class="language"></div>
                </div>
              </div>
              <div class="sidebar"></div>
              <div class="project-body-box">
                <div class="project-body-title">모집 마감일</div>
              </div>
              <div class="sidebar"></div>
              <div class="project-body-box">
                <div class="project-body-title">프로젝트 일정</div>
              </div>
            </div>
            <div class="project-footer">
              <div class="button-box">
                <input
                  class="apply"
                  id="apply"
                  type="button"
                  value="신청하기"
                />
              </div>
              <div class="estimated-amount">
                <div>예상 금액</div>
                <div class="half-sidebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
