import React, { useEffect, useRef, useState } from "react";
import ProjectApplyStyle from "./ProjectApply.module.css";
import { useDispatch, useSelector } from "react-redux";
import { applyProjectThunk } from "../../stores/thunks/projectThunk";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

export const FileAttachment = styled.div`
  .btn-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  input[type="file"] {
    display: none;
  }
  label {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background: #4758ee;
    color: white;
    border-radius: 4px;
    font-size: 0.9rem;
    &:hover {
      background: #3749d9;
    }
  }
  select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background: #ff6b6b;
    color: white;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      background: #d9534f;
    }
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Error = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export const SubmitButton = styled.input`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: #4758ee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3749d9;
  }
`;

export default function ProjectApply() {
  const loginState = useSelector((state) => ({ ...state.member }));
  const [isProjectApplyed, setIsProjectApplyed] = useState(false);

  const { pjId } = useParams();
  const navigate = useNavigate();

  const dispatcher = useDispatch();

  useEffect(() => {
    if (isProjectApplyed) {
      navigate("/project/findpage");
    }
  }, [isProjectApplyed, navigate]);

  // 파일 관리 상태
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  // 제목 및 내용 입력 필드 참조
  const pjApplyTtlRef = useRef();
  const pjApplyDescRef = useRef();

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // 기존 파일에 새 파일 추가
    fileInputRef.current.value = ""; // 같은 파일을 다시 선택 가능하도록 초기화
    //console.log(files);
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName)); // 선택된 파일 삭제
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // FormData 생성
    const formData = new FormData();
    formData.append("pjApplyTtl", pjApplyTtlRef.current.value);
    formData.append("pjApplyDesc", pjApplyDescRef.current.value);
    formData.append("pjId", pjId);
    formData.append("emilAddr", loginState?.info?.emilAddr);

    files.forEach((file) => formData.append("fileList", file)); // 파일 추가

    dispatcher(applyProjectThunk(formData))
      .then(() => {
        alert("프로젝트 지원서가 성공적으로 등록되었습니다.");
        setIsProjectApplyed(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={ProjectApplyStyle.projectRegisterPage}>
      <div className={ProjectApplyStyle.projectRegisterArea}>
        <h1>프로젝트 지원하기</h1>

        <div className={ProjectApplyStyle.projectTitle}>
          <div className={ProjectApplyStyle.projectSectionNum}>01</div>
          <div className={ProjectApplyStyle.projectSectionName}>제목</div>
          <input
            type="text"
            className={ProjectApplyStyle.projectTitleInput}
            placeholder="제목을 입력하세요"
            name="pjApplyTtl"
            ref={pjApplyTtlRef}
          />
        </div>

        <div className={ProjectApplyStyle.importantMessageArea}>
          <div
            id="error-title"
            className={ProjectApplyStyle.errorMessage}
          ></div>
        </div>

        <div className={ProjectApplyStyle.projectContents}>
          <div className={ProjectApplyStyle.projectSectionNum}>02</div>
          <div className={ProjectApplyStyle.projectSectionName}>지원 내용</div>

          <div className={ProjectApplyStyle.projectContentsInputArea}>
            <div className={ProjectApplyStyle.importantMessage}>
              전화번호, 이메일 등 개인정보 입력 금지
            </div>
            <textarea
              name="pjApplyDesc"
              className={ProjectApplyStyle.projectContentsInput}
              placeholder={`프로젝트 내용 작성 추천 예시\n
                  프로젝트 목표: 특정 목표를 달성하기 위한 시스템 또는 플랫폼 개발\n
                  예: 재고 관리 자동화 시스템 개발, 고객 피드백 분석 툴 제작 등\n
                  필요사항: 프로젝트 수행에 필요한 기술과 작업\n
                  예: 기획, UI/UX 디자인, 프론트엔드 및 백엔드 개발, 데이터베이스 설계, API 연동, QA 테스트 \n
                  주요 기능: 프로젝트에서 구현될 주요 기능 및 특징\n
                  예: 사용자 로그인/회원가입, 실시간 알림 기능, 데이터 시각화 대시보드, 관리자 페이지 등\n
                  산출물: 프로젝트 완료 시 제공될 결과물\n
                  예: 소스 코드, 디자인 파일 (Adobe XD, Figma 등), 시스템 매뉴얼, 테스트 결과 보고서 등\n
                  필수 조건: 프로젝트 수행 시 반드시 충족해야 할 사항\n
                  예: 반응형 웹 디자인, 성능 최적화, 다국어 지원, 보안 인증 등\n
                  기대 효과: 프로젝트 완료 후 예상되는 효과\n
                  예: 업무 효율성 향상, 비용 절감, 사용자 경험 개선 등\n
                  기타 요청 사항: 추가적으로 고려할 특수 요구사항\n
                  예: 특정 기술 스택 사용, 유지보수 계획, 협업 툴 사용 (Jira, Trello 등)`}
              ref={pjApplyDescRef}
            ></textarea>
          </div>
        </div>

        <div className={ProjectApplyStyle.importantMessageArea}>
          <div
            id="error-description"
            className={ProjectApplyStyle.errorMessage}
          ></div>
        </div>

        <div className={ProjectApplyStyle.fileAttachment}>
          <div className={ProjectApplyStyle.projectSectionNum}>03</div>
          <div className={ProjectApplyStyle.projectSectionName}>첨부파일</div>
          <div className={ProjectApplyStyle.btnBox}>
            <div className={ProjectApplyStyle.importantMessage}>
              기획서, 요구사항 정의서, 참고 자료 등
            </div>
            <FileAttachment>
              <div className="btn-box">
                <input
                  type="file"
                  id="fileInput"
                  name="fileList"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">파일 선택</label>
                <select>
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <option key={index} value={file.name}>
                        {file.name}
                      </option>
                    ))
                  ) : (
                    <option>파일을 선택하세요</option>
                  )}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const selectedFileName =
                      document.querySelector("select").value;
                    handleFileRemove(selectedFileName);
                  }}
                >
                  삭제
                </button>
              </div>
            </FileAttachment>
          </div>
        </div>

        <div className={ProjectApplyStyle.importantMessageArea}>
          <div id="error-file" className={ProjectApplyStyle.errorMessage}></div>
        </div>

        <ButtonArea>
          <SubmitButton type="submit" value="지원하기" onClick={handleSubmit} />
        </ButtonArea>
      </div>
    </div>
  );
}
