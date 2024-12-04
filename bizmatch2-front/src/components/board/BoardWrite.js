import React from "react";
import BoardWriteStyle from "./BoardWrite.module.css";

export default function BoardWrite({ loginMemberVO }) {
  return (
    <div className={BoardWriteStyle.mainBox}>
      <div className={BoardWriteStyle.contentBox}>
        <div className={BoardWriteStyle.title}>게시글 작성</div>
        <div className={BoardWriteStyle.functionLine}>
          <button>
            <img
              className={BoardWriteStyle.buttonImage}
              src="/img/delete.png"
              alt="delete"
            />
            <div className={BoardWriteStyle.whiteText}>삭제</div>
          </button>
          {/* 
          <button>
            <img className={BoardWriteStyle.buttonImage} id="save" src="/img/Save.png" alt="save" />
            <div className={BoardWriteStyle.whiteText}>임시저장</div>
          </button>
          */}
          <button id="submit">
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
            <select id="genre" name="genreSection">
              {loginMemberVO.emilAddr === "test@test" && (
                <option value="0">공지</option>
              )}
              <option value="1">문의</option>
              {/* 
              <option value="report">신고</option>
              */}
            </select>

            <div className={BoardWriteStyle.isPublic}>
              <input id="ck-box" type="checkbox" />
              <label>비공개</label>
            </div>

            <input
              type="text"
              placeholder="제목을 입력해주세요"
              id="title"
              className={BoardWriteStyle.empty}
            />
          </div>

          <textarea
            contentEditable="true"
            className={BoardWriteStyle.writingPlace}
            id="content"
            placeholder="본문 작성"
          ></textarea>
        </div>
        {/* 
        <div className={BoardWriteStyle.functionLine}>
          <button>
            <img className={BoardWriteStyle.buttonImage} src="/img/attach_file.png" alt="attach file" />
            <div className={BoardWriteStyle.whiteText}>첨부파일</div>
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
