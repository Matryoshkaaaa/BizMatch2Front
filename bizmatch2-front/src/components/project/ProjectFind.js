import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // NavLink import 추가
import projectFindStyle from "./ProjectFind.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
import AdditionalRecruitmentModal from "../ui/AdditionalRecruitmentModal";

export default function ProjectFind() {
  const dispatcher = useDispatch();
  const { data: projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatcher(getProjectListThunk());
  }, [dispatcher]);

  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  const testHandler = () => {
    setIsAdditionalModalOpen(true);
  };

  return (
    <>
      <div className={projectFindStyle.projectFindPage}>
        <div className={projectFindStyle.container}>
          <div className={projectFindStyle.containerBox}>
            <h1 className={projectFindStyle.containerTitle}>프로젝트 찾기</h1>
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
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    전체
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    IT·프로그래밍
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    디자인
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    마케팅
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    영상·사진·음향
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" activeClassName={projectFindStyle.activeLink}>
                    기획
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={projectFindStyle.filters}>
              <NavLink
                to="#"
                className={`${projectFindStyle.latest} ${projectFindStyle.active}`}
                activeClassName={projectFindStyle.activeLink}
              >
                최신순
              </NavLink>
              <NavLink
                to="#"
                className={projectFindStyle.deadline}
                activeClassName={projectFindStyle.activeLink}
              >
                마감임박순
              </NavLink>
              <NavLink
                to="#"
                className={projectFindStyle.amount}
                activeClassName={projectFindStyle.activeLink}
              >
                금액높은순
              </NavLink>
            </div>
          </div>
        </div>

        {/* 프로젝트 카드 리스트 */}
        <div id="result">
          {projects.map((project) => (
            <ProjectCard key={project.pjId} project={project} />
          ))}
        </div>

        <div
          className={`${projectFindStyle.pagenation} ${projectFindStyle.pagenationAjax} ${projectFindStyle.pageDiv}`}
        >
          <div className={projectFindStyle.prePageBtn}>
            {/* Add logic for conditional rendering based on searchProjectVO */}
            <div>
              <NavLink to="#" className={projectFindStyle.whiteText}>
                처음
              </NavLink>
            </div>
            <div>
              <NavLink to="#" className={projectFindStyle.whiteText}>
                이전
              </NavLink>
            </div>
          </div>
          <div className={projectFindStyle.pageNumberBtn}>
            {/* Loop through pages */}
            <div
              className={`${projectFindStyle.numberBox} ${projectFindStyle.active}`}
            >
              <NavLink to="#" className={projectFindStyle.whiteText}>
                1
              </NavLink>
            </div>
          </div>
          <div className={projectFindStyle.nextPageBtn}>
            {/* Add logic for conditional rendering based on searchProjectVO */}
            <div>
              <NavLink to="#" className={projectFindStyle.whiteText}>
                다음
              </NavLink>
            </div>
            <div>
              <NavLink to="#" className={projectFindStyle.whiteText}>
                마지막
              </NavLink>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>{/* Include footer here if needed */}</footer>
      </div>
    </>
  );
}
