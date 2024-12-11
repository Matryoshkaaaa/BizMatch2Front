import { NavLink } from "react-router-dom";
import MyApplyProjectStyle from "./MyApplyProject.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderProjectList } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
export default function MyOrderProject() {
  const email = JSON.parse(sessionStorage.getItem("info")).emilAddr;
  const dispatcher = useDispatch();
  const myOrderProjectList = useSelector((state) => state.project.myData);

  useEffect(() => {
    dispatcher(getOrderProjectList(email));
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
      {myOrderProjectList &&
        myOrderProjectList.map((project) => {
          return <ProjectCard key={project.pjId} project={project} />;
        })}
    </>
  );
}
