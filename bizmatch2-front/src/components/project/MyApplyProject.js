import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getApplyProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const MainContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const MainTitle = styled.h1`
  padding-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
  margin: 0;
  text-align: center;
  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;
export default function MyApplyProject() {
  const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
  const mbrCtgry = JSON.parse(sessionStorage.getItem("info")).mbrCtgry;
  const dispatcher = useDispatch();
  const myApplyProjectList = useSelector((state) => state.project.myApplyData);
  useEffect(() => {
    dispatcher(getApplyProjectList(email));
  }, [email, dispatcher]);
  const ctgrtView = (mbrCtgry) => {
    if (mbrCtgry === 0 || mbrCtgry === 2) {
      return (
        <MainContainer>
          <MainContainerHeader>
            <MainTitle>
              <NavLink to={"/project/myapply"}>
                내가 지원한 프로젝트 목록
              </NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/myorder"}>내 프로젝트 목록</NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/scrap"}>즐겨찾는 프로젝트</NavLink>
            </MainTitle>
          </MainContainerHeader>
        </MainContainer>
      );
    } else if (mbrCtgry === 1) {
      return (
        <MainContainer>
          <MainContainerHeader>
            <MainTitle>
              <NavLink to={"/project/myapply"}>
                내가 지원한 프로젝트 목록
              </NavLink>
            </MainTitle>

            <MainTitle>/</MainTitle>

            <MainTitle>
              <NavLink to={"/project/scrap"}>즐겨찾는 프로젝트</NavLink>
            </MainTitle>
          </MainContainerHeader>
        </MainContainer>
      );
    }
  };

  return (
    <>
      {ctgrtView(mbrCtgry)}
      {myApplyProjectList?.length === 0 ? (
        <MainTitle>지원서가 없습니다.</MainTitle>
      ) : (
        myApplyProjectList?.map((project) => (
          <ProjectCard
            key={`${project.pjId}-${project?.pjApplyId}`}
            project={project?.projectVO}
            pjApplyId={project?.pjApplyId}
          />
        ))
      )}
    </>
  );
}
