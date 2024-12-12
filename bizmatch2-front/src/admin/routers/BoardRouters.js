import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import BoardList from "../../components/board/BoardList";
import BoardView from "../../components/board/BoardView";
import BoardWrite from "../../components/board/BoardWrite";
import BoardModify from "../../components/board/BoardModify"; // 위치 확인 필요

const boardRouter = createBrowserRouter([
  {
    path: "/board",
    element: <Outlet />, // 하위 라우트 출력용
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
        path: "view/:boardId", // :boardId로 URL 파라미터 받기
        element: <BoardView />,
      },
      {
        path: "modify/:boardId",
        element: <BoardModify />,
      },
    ],
  },
]);

export default function BoardRouterProvider() {
  return <RouterProvider router={boardRouter} />;
}
