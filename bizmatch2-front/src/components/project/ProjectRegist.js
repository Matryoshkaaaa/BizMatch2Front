import React, { useEffect, useRef, useState } from "react";
import CategoryBar from "../common/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import { registProjectThunk } from "../../stores/thunks/projectThunk";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProjectSkill from "./ProjectSkill";
import ReactQuill from "react-quill";
import "./customStyles.css";
import "react-quill/dist/quill.snow.css"; // 기본 스타일
import { categoryActions, skillActions } from "../../stores/ToolkitStrore";
export const ProjectRegister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ProjectRegisterPage = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

export const ProjectRegisterArea = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ProjectRegisterTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ProjectCategory = styled.div`
  margin-bottom: 2rem;
`;

export const ProjectSectionNum = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

export const ProjectSectionName = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 30rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

export const FileAttachment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileSelect = styled.button`
  padding: 0.8rem;
  background-color: #4758ee;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: rgb(49, 68, 240);
  }
`;

export const FileDeleteButton = styled.button`
  background: transparent;
  color: #ff4d4f;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const BtnArea = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const RegisterButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: #4758ee;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background-color: rgb(49, 68, 240);
  }
`;

const ProjectRegist = () => {
  const loginState = useSelector((state) => ({ ...state.member }));
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const selectedSkills = useSelector((state) => state.skill.selectedSkills);
  console.log("selectedSkills", selectedSkills);

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  console.log(files);
  const PJ_TTLRef = useRef();
  const descriptionRef = useRef();
  const strtDtRef = useRef();
  const endDtRef = useRef();
  const cntrctAccntRef = useRef();
  const pjRcrutStrtDtRef = useRef();
  const pjRcrutEndDtRef = useRef();
  const pjRcrutCntRef = useRef();
  const [content, setContent] = useState("");
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    fileInputRef.current.value = "";
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName)); // 선택된 파일 삭제
  };

  const onClickAddButtonHandler = async () => {
    const firstIndstrId = selectedMajorCategory;
    const secondIndstrId = selectedSubCategory;
    const pjTtl = PJ_TTLRef.current.value;
    const pjDesc = content;
    const strtDt = strtDtRef.current.value;
    const endDt = endDtRef.current.value;
    const cntrctAccnt = cntrctAccntRef.current.value;
    const pjRcrutCnt = pjRcrutCntRef.current.value;
    const pjRcrutStrtDt = pjRcrutStrtDtRef.current.value;
    const pjRcrutEndDt = pjRcrutEndDtRef.current.value;
    const emilAddr = loginState.info?.emilAddr;
    const skillList = selectedSkills;

    const fileList = files;
    const formData = new FormData();
    // 다른 필드 추가
    formData.append("pjTtl", pjTtl);
    formData.append("pjDesc", pjDesc);
    formData.append("strtDt", strtDt);
    formData.append("endDt", endDt);
    formData.append("cntrctAccnt", cntrctAccnt);
    formData.append("pjRcrutCnt", pjRcrutCnt);
    formData.append("pjRcrutStrtDt", pjRcrutStrtDt);
    formData.append("pjRcrutEndDt", pjRcrutEndDt);
    formData.append("emilAddr", emilAddr);
    formData.append("firstIndstrId", firstIndstrId);
    formData.append("secondIndstrId", secondIndstrId);

    console.log(formData);
    fileList.forEach((file) => {
      formData.append("fileList", file);
    });

    skillList.forEach((skill) => {
      formData.append("prmStkId", skill.prmStkId);
    });

    dispatcher(registProjectThunk(formData))
      .then(() => {
        alert("프로젝트가 성공적으로 등록되었습니다.");
        navigate("/");
        console.log("!");
        dispatcher(categoryActions.clear());
        dispatcher(skillActions.clear());
      })
      .catch((error) => {
        console.log(error);
        alert("등록 중 오류가 발생했습니다.");
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
    <ProjectRegisterPage>
      <ProjectRegisterArea>
        <ProjectRegisterTitle>프로젝트 등록하기</ProjectRegisterTitle>
        <ProjectRegister>
          <ProjectCategory>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <ProjectSectionNum>01</ProjectSectionNum>
                <ProjectSectionName>프로젝트 카테고리</ProjectSectionName>
              </div>
              <CategoryBar />
            </div>
          </ProjectCategory>

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>02</ProjectSectionNum>
              <ProjectSectionName>제목</ProjectSectionName>
            </div>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              ref={PJ_TTLRef}
            />
          </InputGroup>

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>03</ProjectSectionNum>
              <ProjectSectionName>프로젝트 일정</ProjectSectionName>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div>
                <Label htmlFor="strt-date">시작일</Label>
                <Input type="date" id="strt-date" ref={strtDtRef} />
              </div>

              <div>
                <Label htmlFor="end-date">종료일</Label>
                <Input type="date" id="end-date" ref={endDtRef} />
              </div>
            </div>
          </InputGroup>

          <div style={{ display: "flex", gap: "1rem" }}>
            <ProjectSectionNum>04</ProjectSectionNum>
            <ProjectSectionName>보유기술</ProjectSectionName>
          </div>
          <ProjectSkill />

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>05</ProjectSectionNum>
              <ProjectSectionName>상세 설명</ProjectSectionName>
            </div>

            <ReactQuill
              // style={{ minHeight: "30vh" }}
              value={content}
              onChange={setContent}
              placeholder="프로젝트 내용 작성 추천 예시.
                    프로젝트 목표: 특정 목표를 달성하기 위한 시스템 또는 플랫폼 개발
                    예: 재고 관리 자동화 시스템 개발, 고객 피드백 분석 툴 제작 등
                    필요사항: 프로젝트 수행에 필요한 기술과 작업
                    예: 기획, UI/UX 디자인, 프론트엔드 및 백엔드 개발, 데이터베이스 설계, API 연동, QA 테스트 등
                    주요 기능: 프로젝트에서 구현될 주요 기능 및 특징
                    예: 사용자 로그인/회원가입, 실시간 알림 기능, 데이터 시각화 대시보드, 관리자 페이지 등
                    산출물: 프로젝트 완료 시 제공될 결과물
                    예: 소스 코드, 디자인 파일 (Adobe XD, Figma 등), 시스템 매뉴얼, 테스트 결과 보고서 등
                    필수 조건: 프로젝트 수행 시 반드시 충족해야 할 사항
                    예: 반응형 웹 디자인, 성능 최적화, 다국어 지원, 보안 인증 등
                    기대 효과: 프로젝트 완료 후 예상되는 효과
                    예: 업무 효율성 향상, 비용 절감, 사용자 경험 개선 등
                    기타 요청 사항: 추가적으로 고려할 특수 요구사항
                    예: 특정 기술 스택 사용, 유지보수 계획, 협업 툴 사용 (Jira, Trello 등)"
              modules={quillModules}
              className="custom-quill-container"
              theme="snow"
            />
          </InputGroup>

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>06</ProjectSectionNum>
              <ProjectSectionName>프로젝트 입찰가격</ProjectSectionName>
            </div>
            <Input
              type="number"
              placeholder="최소 1,000,000"
              ref={cntrctAccntRef}
            />
          </InputGroup>

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>07</ProjectSectionNum>
              <ProjectSectionName>프로젝트 모집일</ProjectSectionName>
            </div>
            <Label htmlFor="pjRcrutStrtDt">모집 시작일</Label>
            <Input type="date" ref={pjRcrutStrtDtRef} />
            <Label htmlFor="pjRcrutEndDt">모집 종료일</Label>
            <Input type="date" ref={pjRcrutEndDtRef} />
          </InputGroup>

          <FileAttachment>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>08</ProjectSectionNum>
              <ProjectSectionName>첨부파일</ProjectSectionName>
            </div>

            <InputGroup>
              <FileInput
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <FileSelect onClick={() => fileInputRef.current.click()}>
                파일 선택
              </FileSelect>
              <div style={{ marginTop: "10px" }}>
                {files.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span>{file.name}</span>
                    <FileDeleteButton
                      onClick={() => handleFileRemove(file.name)}
                    >
                      삭제
                    </FileDeleteButton>
                  </div>
                ))}
              </div>
            </InputGroup>
          </FileAttachment>

          <InputGroup>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ProjectSectionNum>09</ProjectSectionNum>
              <ProjectSectionName>프로젝트 인원</ProjectSectionName>
            </div>
            <Input
              type="number"
              placeholder="최소 1명"
              ref={pjRcrutCntRef}
              min={0}
            />
          </InputGroup>

          <BtnArea>
            <RegisterButton type="button" onClick={onClickAddButtonHandler}>
              등록하기
            </RegisterButton>
          </BtnArea>
        </ProjectRegister>
      </ProjectRegisterArea>
    </ProjectRegisterPage>
  );
};

export default ProjectRegist;
