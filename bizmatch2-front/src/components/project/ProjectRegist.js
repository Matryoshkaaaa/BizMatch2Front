import React, { useRef, useState } from "react";
import CategoryBar from "../common/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import { registProjectThunk } from "../../stores/thunks/projectThunk";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ProjectRegisterPage = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.25rem; /* 20px → 1.25rem */
  background-color: #f9f9f9;
`;

export const ProjectRegisterArea = styled.div`
  width: 80%;
  max-width: 75rem; /* 1200px → 75rem */
  background-color: white;
  padding: 1.875rem; /* 30px → 1.875rem */
  border-radius: 0.5rem; /* 8px → 0.5rem */
  box-shadow: 0 0 0.9375rem rgba(0, 0, 0, 0.1); /* 15px → 0.9375rem */
`;

export const ProjectRegisterTitle = styled.h1`
  text-align: center;
  font-size: 1.75rem; /* 28px → 1.75rem */
  margin-bottom: 1.875rem; /* 30px → 1.875rem */
`;

export const ProjectRegister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* 20px → 1.25rem */
`;

export const ProjectCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem; /* 20px → 1.25rem */
`;

export const ProjectSectionNum = styled.div`
  font-size: 1.5rem; /* 24px → 1.5rem */
  font-weight: bold;
  color: #2d3e50;
`;

export const ProjectSectionName = styled.div`
  font-size: 1.125rem; /* 18px → 1.125rem */
  font-weight: bold;
  color: #2d3e50;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem; /* 10px → 0.625rem */
`;

export const Input = styled.input`
  padding: 0.75rem; /* 12px → 0.75rem */
  font-size: 1rem; /* 16px → 1rem */
  border: 1px solid #ccc;
  border-radius: 0.25rem; /* 4px → 0.25rem */
  width: 100%;
  max-width: 30rem; /* 적당히 길이를 설정 */
`;

export const Textarea = styled.textarea`
  padding: 0.75rem; /* 12px → 0.75rem */
  font-size: 1rem; /* 16px → 1rem */
  border: 1px solid #ccc;
  border-radius: 0.25rem; /* 4px → 0.25rem */
  min-height: 20rem; /* 120px → 7.5rem */
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1rem; /* 16px → 1rem */
  color: #2d3e50;
`;

export const FileAttachment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem; /* 10px → 0.625rem */
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 1.25rem; /* 20px → 1.25rem */
`;

export const FileInput = styled.input`
  font-size: 1rem; /* 16px → 1rem */
`;

export const FileSelect = styled.select`
  font-size: 1rem; /* 16px → 1rem */
  padding: 0.5rem; /* 8px → 0.5rem */
  width: 100%;
  max-width: 20rem; /* 적당한 너비 설정 */
`;

export const FileDeleteButton = styled.button`
  padding: 0.625rem 1.25rem; /* 10px 20px → 0.625rem 1.25rem */
  background-color: #ff4f5c;
  color: white;
  border: none;
  border-radius: 0.25rem; /* 4px → 0.25rem */
  cursor: pointer;

  &:hover {
    background-color: #e94c52;
  }
`;

export const ProjectTeamSize = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem; /* 10px → 0.625rem */
`;

export const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.875rem; /* 30px → 1.875rem */
`;

export const RegisterButton = styled.input`
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.875rem; /* 12px 30px → 0.75rem 1.875rem */
  font-size: 1.125rem; /* 18px → 1.125rem */
  border: none;
  border-radius: 0.25rem; /* 4px → 0.25rem */
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ProjectRegist = () => {
  const loginState = useSelector((state) => ({ ...state.member }));
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  // const [majorSearchValue, setMajorSearchValue] = useState("");
  // const [subSearchValue, setSubSearchValue] = useState("");
  const fileInputRef = useRef(null);
  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  const PJ_TTLRef = useRef();
  const descriptionRef = useRef();
  const strtDtRef = useRef();
  const endDtRef = useRef();
  const cntrctAccntRef = useRef();
  const pjRcrutStrtDtRef = useRef();
  const pjRcrutEndDtRef = useRef();
  const pjRcrutCntRef = useRef();

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // 기존 파일에 새 파일 추가
    fileInputRef.current.value = ""; // 같은 파일을 다시 선택 가능하도록 초기화
  };

  const handleFileRemove = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName)); // 선택된 파일 삭제
  };

  const onClickAddButtonHandler = async () => {
    const firstIndstrId = selectedMajorCategory;
    const secondIndstrId = selectedSubCategory;
    const pjTtl = PJ_TTLRef.current.value;
    const pjDesc = descriptionRef.current.value;
    const strtDt = strtDtRef.current.value;
    const endDt = endDtRef.current.value;
    const cntrctAccnt = cntrctAccntRef.current.value;
    const pjRcrutCnt = pjRcrutCntRef.current.value;
    const pjRcrutStrtDt = pjRcrutStrtDtRef.current.value;
    const pjRcrutEndDt = pjRcrutEndDtRef.current.value;
    const emilAddr = loginState.info?.emilAddr;

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

    fileList.forEach((file) => {
      formData.append("fileList", file);
    });

    dispatcher(registProjectThunk(formData))
      .then(() => {
        alert("프로젝트가 성공적으로 등록되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("등록 중 오류가 발생했습니다.");
      });
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

          <InputGroup>
            <ProjectSectionNum>05</ProjectSectionNum>
            <ProjectSectionName>상세 설명</ProjectSectionName>
            <Textarea
              ref={descriptionRef}
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
            />
          </InputGroup>

          <InputGroup>
            <ProjectSectionNum>06</ProjectSectionNum>
            <ProjectSectionName>프로젝트 입찰가격</ProjectSectionName>
            <Input
              type="number"
              placeholder="최소 1,000,000"
              ref={cntrctAccntRef}
            />
          </InputGroup>

          <InputGroup>
            <ProjectSectionNum>07</ProjectSectionNum>
            <ProjectSectionName>프로젝트 모집일</ProjectSectionName>
            <Label htmlFor="pjRcrutStrtDt">모집 시작일</Label>
            <Input type="date" ref={pjRcrutStrtDtRef} />
            <Label htmlFor="pjRcrutEndDt">모집 종료일</Label>
            <Input type="date" ref={pjRcrutEndDtRef} />
          </InputGroup>

          <FileAttachment>
            <ProjectSectionNum>08</ProjectSectionNum>
            <ProjectSectionName>첨부파일</ProjectSectionName>
            <BtnBox>
              <FileInput
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
              />
              <FileSelect>
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <option key={index} value={file.name}>
                      {file.name}
                    </option>
                  ))
                ) : (
                  <option>파일을 선택하세요</option>
                )}
              </FileSelect>
              <FileDeleteButton
                onClick={() => {
                  const selectedFileName =
                    document.getElementById("fileSelect").value;
                  handleFileRemove(selectedFileName);
                }}
              >
                삭제
              </FileDeleteButton>
            </BtnBox>
          </FileAttachment>

          <InputGroup>
            <ProjectSectionNum>09</ProjectSectionNum>
            <ProjectSectionName>프로젝트 인원</ProjectSectionName>
            <Input type="number" placeholder="최소 1명" ref={pjRcrutCntRef} />
          </InputGroup>

          <BtnArea>
            <RegisterButton
              type="button"
              value="등록"
              onClick={onClickAddButtonHandler}
            />
          </BtnArea>
        </ProjectRegister>
      </ProjectRegisterArea>
    </ProjectRegisterPage>
  );
};

export default ProjectRegist;
