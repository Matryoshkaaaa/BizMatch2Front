import React, { useEffect, useState } from "react";
// import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import BoardViewStyle from "./BoardView.module.css";
import {
  fetchBoardById,
  increaseViewCount,
} from "../../stores/thunks/boardThunk";
import BoardCommentList from "./BoardCommentList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 퀼 스타일 불러오기

export default function BoardView() {
  const dispatch = useDispatch();
  const { pstId: id } = useParams();
  const { board } = useSelector((state) => ({ ...state }));
  const [content, setContent] = useState(""); // 퀼에 렌더링할 콘텐츠 상태
  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;

  const item = board.data || {}; // 데이터가 없을 경우 빈 객체로 초기화

  const error = board?.error;

  useEffect(() => {
    if (id && board?.data?.pstId !== id) {
      dispatch(fetchBoardById(id));
      dispatch(increaseViewCount(id));
    }
  }, [dispatch, id, board?.data?.pstId]);

  // 데이터 로드 상태 확인
  useEffect(() => {
    if (item.pstCntnt) {
      setContent(item.pstCntnt); // 서버에서 받아온 HTML을 ReactQuill에 설정
    }
  }, [item.pstCntnt]);

  if (!board.data) return <div>Loading...</div>;

  const name = maskName(item.mbrNm);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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

            <div className={BoardViewStyle.author}>작성자: {name}</div>
          </div>
          <div className={BoardViewStyle.times}>
            <div>마지막 수정일: {item.lstModDt}</div>
          </div>
        </div>

        <div className={BoardViewStyle.mainContent}>
          {/* ReactQuill 사용해서 콘텐츠 렌더링 */}
          <ReactQuill
            value={content}
            readOnly={true}
            theme="snow"
            modules={{
              toolbar: false, // 툴바 숨김 처리
            }}
          />
        </div>

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
        {item.pstId && <BoardCommentList boardId={item.pstId} />}
      </div>
    </div>
  );
}

function maskName(name) {
  if (!name) return "";

  if (name.length === 1) {
    return name;
  }

  const firstChar = name.substring(0, 1);
  const lastChar = name.substring(name.length - 1);
  const middleMask = "*".repeat(name.length - 2);

  return firstChar + middleMask + lastChar;
}
