import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom"; // URL에서 ID 추출
import BoardViewStyle from "./BoardView.module.css";
import { fetchBoardById } from "../../stores/thunks/boardThunk";

import BoardCommentList from "./BoardCommentList";

export default function BoardView() {
  const dispatch = useDispatch();
  const { pstId: id } = useParams();

  const { board } = useSelector((state) => ({ ...state }));

  const item = board.data || {}; // 데이터가 없을 경우 빈 객체로 초기화
  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;

  useEffect(() => {
    if (id && board?.data?.pstId !== id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id, board?.data?.pstId]);

  // 데이터 로드 상태 확인
  if (!board.data) return <div>Loading...</div>;

  return (
    <div className={BoardViewStyle.mainBox}>
      <div className={BoardViewStyle.contentBox}>
        <div className={BoardViewStyle.title}>{item.pstNm}</div>

        <div className={BoardViewStyle.postInfo}>
          <div className={BoardViewStyle.postType}>
            {item.pstCtgry === 0 && (
              <div className={BoardViewStyle.typeDeco}>공지</div>
            )}
            {item.pstCtgry === 1 && (
              <div className={BoardViewStyle.blueBox}>문의</div>
            )}

            <div className={BoardViewStyle.author}>작성자: {item.mbrNm}</div>
          </div>
          <div className={BoardViewStyle.times}>
            <div>마지막 수정일: {item.lstModDt}</div>
          </div>
        </div>
        <div className={BoardViewStyle.mainContent}>{item.pstCntnt}</div>

        {item.athrId === currUserEmail && (
          <div className={BoardViewStyle.functionLine}>
            <NavLink
              className={BoardViewStyle.modifyBtn}
              to={`/board/modify/${item.pstId}`}
            >
              수정
            </NavLink>
          </div>
        )}
      </div>

      {item.pstId && <BoardCommentList boardId={item.pstId} />}
    </div>
  );
}
