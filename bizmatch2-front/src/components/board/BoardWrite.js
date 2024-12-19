import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../stores/thunks/boardThunk";
import { NavLink, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 기본 테마
import BoardWriteStyle from "./BoardWrite.module.css";

export default function BoardWrite() {
  const titleRef = useRef("");
  const genreRef = useRef("1");
  const isPublicRef = useRef(false);
  const [content, setContent] = useState("");

  const BoardDispatcher = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state) => ({ ...state.member }));
  const currUserEmail = jwt.info?.emilAddr;

  // eslint-disable-next-line no-unused-vars
  const handleContentChange = (value) => {
    setContent(value);
  };

  const submitButtonHandler = () => {
    const title = titleRef.current.value.trim();
    const genre = genreRef.current.value;
    const isPublic = isPublicRef.current.checked;

    if (!title || !content.trim()) {
      alert("제목과 본문을 공백 없이 작성해주세요.");
      return;
    }

    const newBoard = {
      athrId: currUserEmail,
      pstCtgry: genre,
      pstNm: title,
      pstCntnt: content,
      isPstOpn: isPublic ? "1" : "0",
    };
    console.log(newBoard);

    BoardDispatcher(createBoard(newBoard))
      .then(() => {
        alert("게시글이 성공적으로 등록되었습니다.");
        navigate("/board");
      })
      .catch(() => {
        alert("게시글 등록에 실패했습니다.");
      });

    // 입력 값 초기화
    titleRef.current.value = "";
    setContent("");
    genreRef.current.value = "1";
    isPublicRef.current.checked = false;
  };
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["blockquote", "code-block", "link", "image"],
  ];

  const quillModules = {
    toolbar: toolbarOptions,
  };
  return (
    <div className={BoardWriteStyle.mainBox}>
      <div className={BoardWriteStyle.contentBox}>
        <div className={BoardWriteStyle.title}>게시글 작성</div>
        <div className={BoardWriteStyle.functionLine}>
          <button className={BoardWriteStyle.buttonColor}>
            <img
              className={BoardWriteStyle.buttonImage}
              src="/images/delete.png"
              alt="delete"
            />
            <NavLink className={BoardWriteStyle.whiteText} to={"/board"}>
              삭제
            </NavLink>
          </button>

          <button
            className={BoardWriteStyle.buttonColor}
            id="submit"
            onClick={submitButtonHandler}
          >
            <img
              className={BoardWriteStyle.buttonImage}
              src="/images/upload.png"
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
              {currUserEmail === "test@test" && <option value="0">공지</option>}
              <option value="1">문의</option>
            </select>

            <div className={BoardWriteStyle.togleBtn}>
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

          <ReactQuill
            className={BoardWriteStyle.writingPlace}
            value={content}
            onChange={setContent}
            modules={quillModules}
          />
        </div>
      </div>
    </div>
  );
}
