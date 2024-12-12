import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOrderProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";

// Styled Components
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

export default function MyOrderProject() {
  const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
  const dispatcher = useDispatch();
  const myOrderProjectList = useSelector((state) => state.project.myData);

  useEffect(() => {
    dispatcher(getOrderProjectList(email));
  }, [email, dispatcher]);

  return (
    <>
      <MainContainer>
        <MainContainerHeader>
          <MainTitle>
            <NavLink to={"/project/myorder"}>내 프로젝트 목록</NavLink>
          </MainTitle>

          <MainTitle>/</MainTitle>

          <MainTitle>
            <NavLink to={"/project/myapply"}>내가 지원한 프로젝트 목록</NavLink>
          </MainTitle>
        </MainContainerHeader>
      </MainContainer>
      {myOrderProjectList &&
        myOrderProjectList.map((project) => {
          return <ProjectCard key={project.pjId} project={project} />;
        })}
    </>
  );
}
