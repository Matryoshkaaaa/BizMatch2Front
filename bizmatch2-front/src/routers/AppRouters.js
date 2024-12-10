import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../components/ui/AdminLayout";
import ProjectLayout from "../components/ui/ProjectLayout";
import MemberLayout from "../components/ui/MemberLayout";
import BoardLayout from "../components/ui/BoardLayout";
// import UserManagement from "../admin/pages/UserManagement";
import UserTable from "../admin/components/UserTable";
import ReviewTable from "../admin/components/ReviewTable";
import ProjectTable from "../admin/components/ProjectTable";
import ProjectFind from "../components/project/ProjectFind";
import ProjectInfo from "../components/project/ProjectInfo";
import ProjectApply from "../components/project/ProjectApply";
import ProjectRegist from "../components/project/ProjectRegist";
import MainLayout from "../components/ui/MainLayout";
import MainView from "../components/main/MainView";
import CompanySignup from "../components/member/CompanySignup";
import FreelancerSignup from "../components/member/FreelancerSignup";
import MemberType from "../components/member/MemberType"; // 회원가입 컴포넌트 가져오기
import AlarmTest from "../alarm/AlarmTest";

export default function AppRouterProvider() {
  const router = createBrowserRouter([
    {
      path: "/", // 메인
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MainView />,
        },
      ],
    },

    {
      path: "/admin", // 관리자
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <UserTable />,
        },
        {
          path: "members",
          element: <UserTable />,
        },
        {
          path: "reviews",
          element: <ReviewTable />,
        },
        {
          path: "projects",
          element: <ProjectTable />,
        },
      ],
    },

    {
      path: "/project", // 프로젝트
      element: <ProjectLayout />,
      children: [
        { index: true, element: <ProjectFind /> },
        { path: ":projectId", element: <ProjectInfo /> },
        { path: "apply", element: <ProjectApply /> },
        { path: "regist", element: <ProjectRegist /> },
      ],
    },

    {
      path: "/member", // 회원
      element: <MemberLayout />,
      children: [
        {
          path: "select/membertype",
          element: <MemberType />,
        },
        {
          path: "company/signup",
          element: <CompanySignup />,
        },
        {
          path: "freelancer/signup",
          element: <FreelancerSignup />,
        },
      ],
    },

    {
      path: "/board", // 게시판
      element: <BoardLayout />,
      children: [
        // { index: true, element: <BoardList /> },
        // { path: ":articleId", element: <ArticleDetail /> },
      ],
    },

    {
      path: "*", // 404 에러 페이지
      // element: <Error />,  // 오류 페이지 추가
    },
    {
      path: "/alarmtest",
      element: <AlarmTest />,
    },
  ]);

  return <RouterProvider router={router} />;
}
