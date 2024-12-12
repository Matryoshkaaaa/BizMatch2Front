import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../components/ui/AdminLayout";
import ProjectLayout from "../components/ui/ProjectLayout";
import MemberLayout from "../components/ui/MemberLayout";
import BoardLayout from "../components/ui/BoardLayout";
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
import FindPwd from "../components/member/FindPwd";
import MypageCompany from "../components/member/MypageCompany";
import MypageCompanyEdit from "../components/member/MypageCompanyEdit";
import PaymentLayout from "../components/ui/PaymentLayout";
import DepositList from "../components/payment/DepositList";
import DownpaymentList from "../components/payment/DownpaymentList";
import MoreReviewList from "../components/review/MoreReviewList";
import MyApplyProject from "../components/project/MyApplyProject";
import MyOrderProject from "../components/project/MyOrderProject";
import PortfolioList from "../components/member/PortfolioList";
import ProjectApplyView from "../components/project/ProjectApplyView";
import BoardList from "../components/board/BoardList";
import BoardWrite from "../components/board/BoardWrite";
import BoardView from "../components/board/BoardView";
import BoardModify from "../components/board/BoardModify";
import MypageFreelancer from "../components/member/MypageFreelancer";
import MoreReviewListFreelancer from "../components/review/MoreReviewListFreelancer";
import PaymentPageDeposit from "../components/payment/PaymentPageDeposit";
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
        { path: "findpage", index: true, element: <ProjectFind /> },
        { path: "info/:pjId", element: <ProjectInfo /> },
        { path: "apply/:pjId", element: <ProjectApply /> },
        { path: "regist", element: <ProjectRegist /> },
        {
          path: "myapply",
          element: <MyApplyProject />,
        },
        {
          path: "myapply/view/:pjApplyId",
          element: <ProjectApplyView />,
        },
        { path: "myorder", element: <MyOrderProject /> },
        { path: "myapply/view", element: <ProjectApplyView /> },
        { path: "apply/write", element: <ProjectApplyView /> },
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
        {
          path: "findpwd",
          element: <FindPwd />,
        },
        {
          path: "mypage/company",
          element: <MypageCompany />,
        },
        {
          path: "mypage/freelancer",
          element: <MypageFreelancer />,
        },
        {
          path: "mypage/company/edit",
          element: <MypageCompanyEdit />,
        },
        {
          path: "review",
          element: <MoreReviewList />,
        },
        {
          path: "review/freelancer",
          element: <MoreReviewListFreelancer />,
        },
        {
          path: "mypage/company/portfolio/:companyId",
          element: <PortfolioList />,
        },
      ],
    },

    {
      path: "/board", // 게시판
      element: <BoardLayout />,
      children: [
        {
          index: true, // 기본 경로에 매칭
          element: <BoardList />,
        },
        {
          path: "write",
          element: <BoardWrite />,
        },
        {
          path: "view/:pstId", // :boardId로 URL 파라미터 받기
          element: <BoardView />,
        },
        {
          path: "modify/:boardId",
          element: <BoardModify />,
        },
      ],
    },

    {
      path: "/payment", // 결제
      element: <PaymentLayout />,
      children: [
        {
          path: "deposit",
          element: <DepositList />,
        },
        {
          path: "downpayment",
          element: <DownpaymentList />,
        },
        {
          path: "depositPage",
          element: <PaymentPageDeposit />,
        },
        {
          path: "downpaymentPage",
          element: "",
        },
      ],
    },

    {
      path: "*", // 404 에러 페이지
      // element: <Error />,  // 오류 페이지 추가
    },
  ]);

  return <RouterProvider router={router} />;
}
