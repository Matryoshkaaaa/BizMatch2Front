import React from "react";
import { NavLink } from "react-router-dom";
import MyApplyProjectStyle from "./MyApplyProject.module.css";
export default function MyApplyProject() {
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
    </>
  );
}
