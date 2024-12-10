import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"; // URL에서 ID 추출
import BoardViewStyle from "./BoardView.module.css";
import { fetchBoardById } from "../../stores/thunks/boardThunk";

import BoardCommentList from "./BoardCommentList";

export default function BoardView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const board = useSelector((state) => state.board.data);

  // JWT에서 이메일 추출
  const token = sessionStorage.getItem("token");
  let loginInfo = null;
  try {
    loginInfo = token ? jwt_decode(token) : null;
  } catch (error) {
    console.error("Invalid token:", error.message);
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id)); // 게시글 ID로 데이터 요청
    }
  }, [dispatch, id]);

  if (!board) return <div>Loading...</div>;

  return (
    <div className={BoardViewStyle.mainBox}>
      <div className={BoardViewStyle.contentBox}>
        <div className={BoardViewStyle.title}>{board.pstNm}</div>

        <div className={BoardViewStyle.postInfo}>
          <div className={BoardViewStyle.postType}>
            {board.pstCtgry === "0" && (
              <div className={BoardViewStyle.typeDeco}>공지</div>
            )}
            {board.pstCtgry === "1" && (
              <div className={BoardViewStyle.blueBox}>문의</div>
            )}

            <div className={BoardViewStyle.author}>작성자: {board.mbrNm}</div>
          </div>
          <div className={BoardViewStyle.times}>
            <div>마지막 수정일: {board.lstModDt}</div>
          </div>
        </div>
        <div className={BoardViewStyle.mainContent}>{board.pstCntnt}</div>

        {board.athrId === loginInfo?.email && (
          <div className={BoardViewStyle.functionLine}>
            <NavLink
              className={BoardViewStyle.modifyBtn}
              to={`/board/modify/${board.pstId}`}
              board
            >
              수정
            </NavLink>
          </div>
        )}
      </div>
      <div>
        <BoardCommentList boardId={board.pstId} />
      </div>
    </div>
  );
}
