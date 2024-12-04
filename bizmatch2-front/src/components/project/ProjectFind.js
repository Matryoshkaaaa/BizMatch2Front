import projectFindStyle from "./ProjectFind.module.css";

export default function ProjectFind() {
  return (
    <>
      <div className={projectFindStyle.projectFindPage}>
        <div className={projectFindStyle.container}>
          <div className={projectFindStyle.containerBox}>
            <h1 className={projectFindStyle.containerTitle}>프로젝트 찾기</h1>
            {/* <div className={projectFindStyle.borderLine}></div> */}
            <form action="/project/find" method="get">
              <div className={projectFindStyle.projectFind}>
                <div className={projectFindStyle.searchBox}>
                  <select
                    className={projectFindStyle.searchType}
                    name="searchType"
                  >
                    <option value="entire">전체</option>
                    <option value="pjTtl">제목</option>
                    <option value="pjDesc">내용</option>
                  </select>
                  <input
                    type="text"
                    name="searchKeyword"
                    className={projectFindStyle.searchKeyword}
                    placeholder="어떤 프로젝트를 찾으시나요?"
                  />
                  <input
                    type="hidden"
                    name="orderBy"
                    id="orderBy"
                    value="latest"
                  />
                  <button type="submit" className={projectFindStyle.searchBtn}>
                    검색
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={projectFindStyle.menu}>
              <ul className={projectFindStyle.categories}>
                <li>
                  <a href="#">전체</a>
                </li>
                <li>
                  <a href="#">IT·프로그래밍</a>
                </li>
                <li>
                  <a href="#">디자인</a>
                </li>
                <li>
                  <a href="#">마케팅</a>
                </li>
                <li>
                  <a href="#">영상·사진·음향</a>
                </li>
                <li>
                  <a href="#">기획</a>
                </li>
              </ul>
            </div>
            <div className={projectFindStyle.filters}>
              <span
                id="latest"
                data-order="latest"
                className={`${projectFindStyle.latest} ${projectFindStyle.active}`}
              >
                최신순
              </span>
              <span
                id="deadline"
                data-order="deadline"
                className={projectFindStyle.deadline}
              >
                마감임박순
              </span>
              <span
                id="amount"
                data-order="amount"
                className={projectFindStyle.amount}
              >
                금액높은순
              </span>
            </div>
          </div>
        </div>

        {/* 여기에 모든 프로젝트 카드 리스트 나올꺼임. */}
        <div id="result"></div>

        <div
          className={`${projectFindStyle.pagenation} ${projectFindStyle.pagenationAjax} ${projectFindStyle.pageDiv}`}
        >
          {/*searchProjectVO */}
          <div className={projectFindStyle.prePageBtn}>
            {/* Add logic for conditional rendering based on searchProjectVO */}
            <div>
              <a
                className={projectFindStyle.whiteText}
                href="javascript:void(-1)"
              >
                처음
              </a>
            </div>
            <div>
              <a
                className={projectFindStyle.whiteText}
                href="javascript:void(-1)"
              >
                이전
              </a>
            </div>
          </div>
          <div className={projectFindStyle.pageNumberBtn}>
            {/* Loop through pages */}
            <div
              className={`${projectFindStyle.numberBox} ${projectFindStyle.active}`}
            >
              <a
                className={projectFindStyle.whiteText}
                href="javascript:void(-1)"
              >
                1
              </a>
            </div>
          </div>
          <div className={projectFindStyle.nextPageBtn}>
            {/* Add logic for conditional rendering based on searchProjectVO */}
            <div>
              <a
                className={projectFindStyle.whiteText}
                href="javascript:void(-1)"
              >
                다음
              </a>
            </div>
            <div>
              <a
                className={projectFindStyle.whiteText}
                href="javascript:void(-1)"
              >
                마지막
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>{/* Include footer here if needed */}</footer>
      </div>
    </>
  );
}
