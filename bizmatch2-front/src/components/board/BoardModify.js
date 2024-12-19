import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoardById,
  modifyOneBoard,
  deleteOneBoard,
} from "../../stores/thunks/boardThunk";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BoardWriteStyle from "./BoardWrite.module.css";

export default function BoardModify() {
  const titleRef = useRef();
  const genreRef = useRef();
  const isPublicRef = useRef();
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board } = useSelector((state) => ({ ...state }));
  const jwt = useSelector((state) => state.member);
  const { pstId: id } = useParams();

  const item = board.data || {};
  const currUserEmail = jwt.info?.emilAddr;

  useEffect(() => {
    if (id && board?.data?.pstId !== id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id, board?.data?.pstId]);

  useEffect(() => {
    setContent(item.pstCntnt);
  }, [item.pstCntnt]);

  const submitButtonHandler = () => {
    const title = titleRef.current.value.trim();
    const genre = genreRef.current.value;
    const isPublic = isPublicRef.current.checked;

    if (!title || !content.trim()) {
      alert("제목과 본문을 공백 없이 작성해주세요.");
      return;
    }

    const fixedBoard = {
      pstId: item.pstId,
      pstCtgry: genre,
      pstNm: title,
      pstCntnt: content,
      isPstOpn: isPublic ? "1" : "0",
    };

    dispatch(modifyOneBoard(fixedBoard))
      .then(() => {
        alert("게시글이 성공적으로 수정되었습니다.");
        navigate("/board");
      })
      .catch(() => {
        alert("게시글 수정에 실패했습니다.");
      });
  };

  const deleteButtonHandler = () => {
    dispatch(deleteOneBoard(item.pstId))
      .then(() => {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/board");
      })
      .catch(() => {
        alert("게시글 삭제에 실패했습니다.");
      });
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
        <div className={BoardWriteStyle.title}>게시글 수정</div>
        <div className={BoardWriteStyle.functionLine}>
          <button
            className={BoardWriteStyle.buttonColor}
            onClick={deleteButtonHandler}
          >
            <img
              className={BoardWriteStyle.buttonImage}
              src="/images/delete.png"
              alt="delete"
            />
            삭제
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
              defaultValue={item.pstCtgry}
            >
              {currUserEmail === "test@test" && <option value="0">공지</option>}
              <option value="1">문의</option>
            </select>

            <div className={BoardWriteStyle.isPublic}>
              <input
                id="ck-box"
                type="checkbox"
                ref={isPublicRef}
                defaultChecked={item.isPstOpn}
              />
              <label>비공개</label>
            </div>

            <input
              type="text"
              placeholder="제목을 입력해주세요"
              defaultValue={item.pstNm || ""}
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
