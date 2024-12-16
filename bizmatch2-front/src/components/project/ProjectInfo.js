import React from "react";
import ProjectInfoStyle from "./ProjectInfo.module.css";
import { useParams } from "react-router-dom";
import { getOneProjectThunk } from "../../stores/thunks/projectThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import ProjectCommmentList from "./pjComment/ProjectCommentList";

export default function ProjectInfo() {
  const { pjId } = useParams();
  const dispatch = useDispatch();

  const project = useSelector((state) => state.project.details);
  useEffect(() => {
    dispatch(getOneProjectThunk(pjId));
  }, [dispatch, pjId]);
  if (project) {
  }

  return (
    <>
      {project === null ? (
        <div>로딩 중...</div>
      ) : (
        <ProjectCard project={project} />
      )}

      <div className={ProjectInfoStyle.cardInclude}></div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>업무내용</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}>
            {project?.pjDesc}
          </div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>모집요건</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}></div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>근무환경</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}></div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>프로젝트 문의</h1>
            <div className={ProjectInfoStyle.createNewComment}>
              <ProjectCommmentList pjId={pjId} />
            </div>
          </div>
        </div>
      </div>

      <footer>{/* Include footer component here */}</footer>
    </>
  );
}
