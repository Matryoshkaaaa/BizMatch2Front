import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectListThunk } from "../../stores/thunks/projectThunk";
import { projectActions } from "../../stores/ToolkitStrore";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import CmsPagination from "../../admin/components/CmsPagination";

const PageContainer = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  font-family: "Roboto", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 300px;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
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

// eslint-disable-next-line no-unused-vars
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function ProjectFind() {
  const dispatch = useDispatch();
  const { data: projects, pagination } = useSelector((state) => state.project);
  const { currentPage = 1, itemsPerPage = 6 } = pagination || {};

  // 필터 상태와 검색 상태 추가
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("entire");

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  // 검색 처리 함수
  const searchProjects = () => {
    return projects.filter((project) => {
      const keyword = searchKeyword.toLowerCase();
      if (searchType === "entire") {
        return (
          project.pjTtl.toLowerCase().includes(keyword) ||
          project.pjDesc.toLowerCase().includes(keyword)
        );
      } else if (searchType === "pjTtl") {
        return project.pjTtl.toLowerCase().includes(keyword);
      } else if (searchType === "pjDesc") {
        return project.pjDesc.toLowerCase().includes(keyword);
      }
      return true;
    });
  };

  // 필터링 및 검색 함수
  const sortProjects = (filter) => {
    const filteredProjects = searchProjects(); // 검색 필터링 적용

    const sortedProjects = [...filteredProjects]; // 배열을 복사하여 새로운 배열 생성

    switch (filter) {
      case "latest":
        return sortedProjects.sort(
          (a, b) => new Date(b.rgstrDt) - new Date(a.rgstrDt)
        ); // 최신순
      case "deadline":
        return sortedProjects.sort(
          (a, b) => new Date(a.pjRcrutEndDt) - new Date(b.pjRcrutEndDt)
        ); // 마감임박순
      case "budget":
        return sortedProjects.sort((a, b) => b.cntrctAccnt - a.cntrctAccnt); // 금액높은순
      default:
        return sortedProjects;
    }
  };

  // 페이지네이션 처리
  // eslint-disable-next-line no-unused-vars
  const filteredProjects = sortProjects(selectedFilter); // 필터링된 데이터
  const filteredAndSearchedProjects = searchProjects(); // 검색 필터링 적용

  const paginatedData = filteredAndSearchedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <PageContainer>
      <Title>프로젝트 찾기</Title>

      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          // 검색 폼 제출시 상태 업데이트
        }}
      >
        <Select
          name="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="entire">전체</option>
          <option value="pjTtl">제목</option>
          <option value="pjDesc">내용</option>
        </Select>
        <Input
          type="text"
          name="searchKeyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="어떤 프로젝트를 찾으시나요?"
        />
        <Button type="submit">검색</Button>
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
        {paginatedData.map((project) => (
          <ProjectCard key={project.pjId} project={project} />
        ))}
      </div>

      <PaginationContainer>
        <CmsPagination
          totalItems={filteredAndSearchedProjects.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(projectActions.setCurrentPage(page))}
        />
      </PaginationContainer>
    </PageContainer>
  );
}
