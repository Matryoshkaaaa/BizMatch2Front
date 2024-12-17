import React, { useEffect, useRef, useState } from "react";
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

//////////////////////////////////////

const Container = styled.div`
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Finder = styled.div`
  border: 1px solid #fff;
  background-color: #f6f5f0;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
`;

const FinderOuter = styled.div`
  display: flex;
  width: 600px;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: inset 10px 10px 15px -10px #c3c3c3,
    inset -10px -10px 15px -10px #ffffff;
`;

const FinderInner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const FinderInput = styled.input`
  height: calc(100% + 3rem);
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 1.5rem;
  letter-spacing: 0.75px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &.active {
    border-color: #2c3e50;
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;

const FinderIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  transition: all 0.2s;
  box-shadow: inset 0 0 0 20px #292929;
  border-radius: 50%;
  position: relative;

  &::after,
  &::before {
    display: block;
    content: "";
    position: absolute;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &::after {
    width: 10px;
    height: 10px;
    background-color: #292929;
    border: 3px solid #f6f5f0;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    left: 0px;
    right: 0;
    margin: auto;
    border-radius: 50%;
  }

  &.active::after {
    border-width: 10px;
    background-color: #f6f5f0;
  }

  &::before {
    width: 4px;
    height: 13px;
    background-color: #f6f5f0;
    top: 50%;
    left: 20px;
    transform: rotateZ(45deg) translate(-50%, 0);
    transform-origin: 0 0;
    border-radius: 4px;
  }

  &.active::before {
    background-color: #292929;
    width: 6px;
    transform: rotateZ(45deg) translate(-50%, 25px);
  }

  &.processing {
    transform-origin: 50%;
    animation: spinner 0.3s linear infinite;
    animation-delay: 0.5s;
  }

  &.active {
    transform: translateY(-5px);
  }

  @keyframes spinner {
    0% {
      transform: rotateZ(45deg);
    }
    100% {
      transform: rotateZ(405deg);
    }
  }
`;

export default function ProjectFind() {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);
  const finderRef = useRef(null);

  // Handle focus and blur events
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (inputRef.current.value.length === 0) {
      setIsActive(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsActive(false);
    setIsDisabled(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsDisabled(false);

      if (inputRef.current.value.length > 0) {
        setIsActive(true);
      }
    }, 1000);
  };

  // ///////////////////////////////////////
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
        {/* <Input
          type="text"
          name="searchKeyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="어떤 프로젝트를 찾으시나요?"
        /> */}

        <Container>
          <Finder>
            <FinderOuter>
              <FinderInner>
                <FinderIcon
                  className={isActive ? "active" : ""}
                  ref={finderRef}
                />
                <FinderInput
                  ref={inputRef}
                  className={isActive ? "active" : ""}
                  type="text"
                  name="q"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isDisabled}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="어떤 프로젝트를 찾으시나요?"
                  value={searchKeyword}
                />
              </FinderInner>
            </FinderOuter>
          </Finder>
          {/* <SubmitButton onClick={handleSubmit} disabled={isDisabled}>
            Submit
          </SubmitButton> */}
        </Container>
        <Button onClick={handleSubmit} disabled={isDisabled}>
          검색
        </Button>
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
