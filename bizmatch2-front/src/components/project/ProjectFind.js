import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import { projectActions } from "../../stores/ToolkitStrore";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import CmsPagination from "../../admin/components/CmsPagination";
import Pagination from "../pagenationApi/Pagination"; // 기존 Pagination 사용

const PageContainer = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const SearchForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 300px;
`;

const Filters = styled.div`
  width: 45%;
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
  gap: 1rem;
  margin: 0 auto;
  padding-bottom: 1rem;
`;

const FilterLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  &.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #666;
  margin-top: 2rem;
`;

export default function ProjectFind() {
  const dispatch = useDispatch();
  const { data: projects, pagination } = useSelector((state) => state.project);
  const { currentPage = 1, itemsPerPage = 6 } = pagination || {};

  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      searchProjects(); // 검색이 필요 없지만 처음에는 전체 프로젝트를 표시하도록
    }
  }, [projects]);

  const searchProjects = () => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = projects?.filter((project) => {
      return (
        project?.pjTtl?.toLowerCase().includes(keyword) ||
        project?.pjDesc?.toLowerCase().includes(keyword)
      );
    });
    setFilteredProjects(filtered);
  };

  const sortProjects = (filteredProjects, filter) => {
    const sortedProjects = [...filteredProjects];
    switch (filter) {
      case "latest":
        return sortedProjects.sort(
          (a, b) => new Date(b.rgstrDt) - new Date(a.rgstrDt)
        );
      case "deadline":
        return sortedProjects.sort(
          (a, b) => new Date(a.pjRcrutEndDt) - new Date(b.pjRcrutEndDt)
        );
      case "budget":
        return sortedProjects.sort((a, b) => b.cntrctAccnt - a.cntrctAccnt);
      default:
        return sortedProjects;
    }
  };

  const sortedProjects = sortProjects(filteredProjects, selectedFilter);
  console.log(sortedProjects.length + "개의 데이터");
  const handlePageChange = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentPageItems = sortedProjects.slice(startIdx, endIdx);
    dispatch(projectActions.setCurrentPage(page)); // 페이지 변경
  };

  useEffect(() => {
    if (sortedProjects.length > 0) {
      handlePageChange(currentPage); // 페이지 변경 시 items 업데이트
    }
  }, [sortedProjects, currentPage]);

  return (
    <PageContainer>
      <Title>프로젝트 찾기</Title>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          searchProjects();
        }}
      >
        <Input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="어떤 프로젝트를 찾으시나요?"
        />
      </SearchForm>

      <Filters>
        <FilterLink
          to="#"
          className={selectedFilter === "latest" ? "active" : ""}
          onClick={() => setSelectedFilter("latest")}
        >
          최신순
        </FilterLink>
        <FilterLink
          to="#"
          className={selectedFilter === "deadline" ? "active" : ""}
          onClick={() => setSelectedFilter("deadline")}
        >
          마감임박순
        </FilterLink>
        <FilterLink
          to="#"
          className={selectedFilter === "budget" ? "active" : ""}
          onClick={() => setSelectedFilter("budget")}
        >
          금액높은순
        </FilterLink>
      </Filters>

      <div>
        {filteredProjects.length === 0 ? (
          <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
        ) : (
          sortedProjects
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((project) => (
              <ProjectCard key={project.pjId} project={project} />
            ))
        )}
      </div>

      <Pagination
        items={sortedProjects}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} // 페이지 변경 핸들러
        currentPage={currentPage} // 현재 페이지 전달
      />
    </PageContainer>
  );
}
