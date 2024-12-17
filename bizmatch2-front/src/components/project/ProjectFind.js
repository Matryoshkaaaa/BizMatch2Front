import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getProjectListThunk());
  }, [dispatch]);

  const paginatedData = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PageContainer>
      <Title>프로젝트 찾기</Title>

      <SearchForm action="/project/find" method="get">
        <Select name="searchType">
          <option value="entire">전체</option>
          <option value="pjTtl">제목</option>
          <option value="pjDesc">내용</option>
        </Select>
        <Input
          type="text"
          name="searchKeyword"
          placeholder="어떤 프로젝트를 찾으시나요?"
        />
        <input type="hidden" name="orderBy" id="orderBy" value="latest" />
        <Button type="submit">검색</Button>
      </SearchForm>

      <Filters>
        <FilterLink to="#" activeClassName="active">
          최신순
        </FilterLink>
        <FilterLink to="#" activeClassName="active">
          마감임박순
        </FilterLink>
        <FilterLink to="#" activeClassName="active">
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
          totalItems={projects.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(projectActions.setCurrentPage(page))}
        />
      </PaginationContainer>
    </PageContainer>
  );
}
