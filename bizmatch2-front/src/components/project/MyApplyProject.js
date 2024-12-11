import { NavLink } from "react-router-dom";
import MyApplyProjectStyle from "./MyApplyProject.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getApplyProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
export default function MyApplyProject() {
  const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
  const dispatcher = useDispatch();
  const myApplyProjectList = useSelector((state) => state.project.myApplyData);
  useEffect(() => {
    dispatcher(getApplyProjectList(email));
  }, [email, dispatcher]);

  return (
    <>
      <div className={MyApplyProjectStyle.mainContainer}>
        <div className={MyApplyProjectStyle.mainContainerHeader}>
          <h1 className={MyApplyProjectStyle.mainTitle1}>
            <NavLink to={"/project/myorder"}>내 프로젝트 목록</NavLink>
          </h1>

          <h1>/</h1>

          <h1 className={MyApplyProjectStyle.mainTitle2}>
            <NavLink to={"/project/myapply"}>내가 지원한 프로젝트 목록</NavLink>
          </h1>
        </div>
      </div>
      {myApplyProjectList &&
        myApplyProjectList.map((project) => {
          return (
            <ProjectCard
              key={project.projectVO.pjId}
              project={project.projectVO}
            />
          );
        })}
    </>
  );
}
