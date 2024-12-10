import React, { useRef } from "react";
import BoardWriteStyle from "./BoardWrite.module.css";
import { useDispatch } from "react-redux";
import { deleteOneBoard, modifyOneBoard } from "../../stores/thunks/boardThunk";

export default function BoardModify({ board, loginMemberVO }) {
  const titleRef = useRef(board?.title || "");
  const contentRef = useRef(board?.content || "");
  const genreRef = useRef(board?.genre || "1");
  const isPublicRef = useRef(board?.isPublic || false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();
    const genre = genreRef.current.value;
    const isPublic = isPublicRef.current.checked;

    if (!title || !content) {
      alert("제목과 본문을 작성해주세요.");
      return;
    }

    const updatedPost = {
      id: board?.id, // Include the ID if modifying an existing post
      title,
      content,
      genre,
      isPublic,
    };

    dispatch(modifyOneBoard(updatedPost));
    alert("게시글이 수정되었습니다.");
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteOneBoard(board.boardId));
      alert("게시글이 삭제되었습니다.");
    }
  };

  return (
    <div className={BoardWriteStyle.mainBox}>
      <div className={BoardWriteStyle.contentBox}>
        <div className={BoardWriteStyle.title}>게시글 수정</div>
        <div className={BoardWriteStyle.functionLine}>
          <button onClick={handleDelete}>
            <img
              className={BoardWriteStyle.buttonImage}
              src="/img/delete.png"
              alt="delete"
            />
            <div className={BoardWriteStyle.whiteText}>삭제</div>
          </button>
          <button id="submit" onClick={handleSubmit}>
            <img
              className={BoardWriteStyle.buttonImage}
              src="/img/upload.png"
              alt="upload"
            />
            <div className={BoardWriteStyle.whiteText}>등록</div>
          </button>
        </div>
        <div className={BoardWriteStyle.postWritingBox}>
          <div className={BoardWriteStyle.firstLine}>
            <select
              id="genre"
              name="genreSection"
              defaultValue={board?.genre || "1"}
              ref={genreRef}
            >
              {loginMemberVO?.emailAddr === "test@test" && (
                <option value="0">공지</option>
              )}
              <option value="1">문의</option>
            </select>
            <div className={BoardWriteStyle.isPublic}>
              <input
                id="ck-box"
                type="checkbox"
                defaultChecked={board?.isPublic || false}
                ref={isPublicRef}
              />
              <label>비공개</label>
            </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="title"
              className={BoardWriteStyle.empty}
              defaultValue={board?.title || ""}
              ref={titleRef}
            />
          </div>
          <textarea
            className={BoardWriteStyle.writingPlace}
            id="content"
            placeholder="본문 작성"
            defaultValue={board?.content || ""}
            ref={contentRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
