import React, { useRef } from "react";
import BoardWriteStyle from "./BoardWrite.module.css";
import { useDispatch } from "react-redux";
import { createBoard } from "../../stores/thunks/boardThunk";

export default function BoardModify({ loginMemberVO, boardId }) {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const genreRef = useRef("1");
  const isPublicRef = useRef(false);
  const BoardDispatcher = useDispatch();

  const submitButtonHandler = () => {
    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();
    const genre = genreRef.current.value;
    const isPublic = isPublicRef.current.checked;

    if (!title || !content) {
      alert("제목과 본문을 공백 없이 작성해주세요.");
      return;
    }

    const newBoard = {
      athrId: loginMemberVO?.emilAddr,
      pstCtgry: genre,
      pstNm: title,
      pstCntnt: content,
      isPstOpn: isPublic ? "1" : "0",
    };
    BoardDispatcher(createBoard(newBoard));
    alert("게시글이 성공적으로 수정되었습니다.");
    titleRef.current.value = "";
    contentRef.current.value = "";
    genreRef.current.value = "1";
    isPublicRef.current.checked = false;
  };

  return (
    <div className={BoardWriteStyle.mainBox}>
      <div className={BoardWriteStyle.contentBox}>
        <div className={BoardWriteStyle.title}>게시글 수정</div>
        <div className={BoardWriteStyle.functionLine}>
          <button onClick={() => console.log("Post deleted.")}>
            <img
              className={BoardWriteStyle.buttonImage}
              src="/img/delete.png"
              alt="delete"
            />
            <div className={BoardWriteStyle.whiteText}>삭제</div>
          </button>

          <button id="submit" onClick={submitButtonHandler}>
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
              ref={genreRef}
              defaultValue="1"
            >
              {loginMemberVO?.emilAddr === "test@test" && (
                <option value="0">공지</option>
              )}
              <option value="1">문의</option>
            </select>

            <div className={BoardWriteStyle.isPublic}>
              <input id="ck-box" type="checkbox" ref={isPublicRef} />
              <label>비공개</label>
            </div>

            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="title"
              className={BoardWriteStyle.empty}
              ref={titleRef}
            />
          </div>

          <textarea
            className={BoardWriteStyle.writingPlace}
            id="content"
            placeholder="본문 작성"
            ref={contentRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
