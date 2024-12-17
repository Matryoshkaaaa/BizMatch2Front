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

  // 필터 상태와 검색 상태 추가
  const [selectedFilter, setSelectedFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("entire");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  // 처음 로드 시 기본적으로 프로젝트 리스트를 필터링해서 보여주기
  useEffect(() => {
    if (projects.length > 0) {
      searchProjects(); // 검색이 필요 없지만 처음에는 전체 프로젝트를 표시하도록
    }
  }, [projects]); // projects 데이터가 로딩될 때마다

  // 검색 처리 함수
  const searchProjects = () => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = projects.filter((project) => {
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
    setFilteredProjects(filtered); // 필터링된 결과를 상태에 저장
  };

  // 필터링 및 검색 함수
  const sortProjects = (filteredProjects, filter) => {
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

  // 검색된 프로젝트를 필터링하고 정렬하는 과정
  const sortedProjects = sortProjects(filteredProjects, selectedFilter);

  // 페이지네이션 처리
  const paginatedData = sortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 시 엔터키를 눌렀을 때 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출을 방지
      searchProjects(); // 엔터키를 눌렀을 때 검색 실행
    }
  };

  // 검색 버튼 클릭 시 처리
  const handleSearch = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    searchProjects(); // 검색 버튼 클릭 시 검색 실행
  };

  return (
    <PageContainer>
      <Title>프로젝트 찾기</Title>

      <SearchForm
        onSubmit={handleSearch} // 버튼 클릭 시 검색 실행
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
          onKeyDown={handleKeyDown} // 엔터키 입력 처리
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
        {/* 검색된 프로젝트가 없다면 메시지 표시 */}
        {paginatedData.length === 0 ? (
          <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
        ) : (
          paginatedData.map((project) => (
            <ProjectCard key={project.pjId} project={project} />
          ))
        )}
      </div>

      <PaginationContainer>
        <CmsPagination
          totalItems={filteredProjects.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(projectActions.setCurrentPage(page))}
        />
      </PaginationContainer>
    </PageContainer>
  );
}
