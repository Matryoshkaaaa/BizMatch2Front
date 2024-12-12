import React, { useRef, useState } from "react";
import ProjectRegistStyle from "./ProjectRegist.module.css";
import CategoryBar from "../common/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import { registProjectThunk } from "../../stores/thunks/projectThunk";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ProjectRegisterPage = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const ProjectRegisterArea = styled.div`
  width: 80%;
  max-width: 1200px;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const ProjectRegisterTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
`;

export const ProjectRegister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProjectCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ProjectSectionNum = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2d3e50;
`;

export const ProjectSectionName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #2d3e50;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Textarea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 120px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #2d3e50;
`;

export const FileAttachment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 20px;
`;

export const FileInput = styled.input`
  font-size: 16px;
`;

export const FileSelect = styled.select`
  font-size: 16px;
  padding: 8px;
`;

export const FileDeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4f5c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e94c52;
  }
`;

export const ProjectTeamSize = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const RegisterButton = styled.input`
  background-color: #4caf50;
  color: white;
  padding: 12px 30px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ProjectRegist = () => {
  const loginState = useSelector((state) => ({ ...state.member }));
  console.log(loginState.info?.emilAddr);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [majorSearchValue, setMajorSearchValue] = useState("");
  const [subSearchValue, setSubSearchValue] = useState("");
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

  // 파일 처리
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // 기존 파일에 새 파일 추가
    fileInputRef.current.value = ""; // 같은 파일을 다시 선택 가능하도록 초기화
    console.log(files);
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

    console.log("pjTtl:", pjTtl);
    console.log("pjDesc:", pjDesc);
    console.log("strtDt:", strtDt);
    console.log("endDt:", endDt);
    console.log("cntrctAccnt:", cntrctAccnt);
    console.log("pjRcrutCnt:", pjRcrutCnt);
    console.log("pjRcrutStrtDt:", pjRcrutStrtDt);
    console.log("pjRcrutEndDt:", pjRcrutEndDt);
    console.log("firstIndstrId:", firstIndstrId);
    console.log("secondIndstrId:", secondIndstrId);
    console.log("emilAddr:", emilAddr);

    console.log("파일 이름들:", files);

    const fileList = files;
    console.log(fileList);
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

    console.log(formData);

    dispatcher(registProjectThunk(formData))
      .then(() => {
        alert("프로젝트가 성공적으로 등록되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error("프로젝트 등록 중 오류 발생:", error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  return (
    <ProjectRegisterPage>
      <ProjectRegisterArea>
        <ProjectRegisterTitle>프로젝트 등록하기</ProjectRegisterTitle>
        <ProjectRegister>
          <ProjectCategory>
            <ProjectSectionNum>01</ProjectSectionNum>
            <ProjectSectionName>프로젝트 카테고리</ProjectSectionName>
            {/* CategoryBar 컴포넌트 삽입 */}
          </ProjectCategory>

          <InputGroup>
            <ProjectSectionNum>02</ProjectSectionNum>
            <ProjectSectionName>제목</ProjectSectionName>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              ref={PJ_TTLRef}
            />
          </InputGroup>

          <InputGroup>
            <ProjectSectionNum>03</ProjectSectionNum>
            <ProjectSectionName>프로젝트 일정</ProjectSectionName>
            <Label htmlFor="strt-date">시작일</Label>
            <Input type="date" id="strt-date" ref={strtDtRef} />
            <Label htmlFor="end-date">종료일</Label>
            <Input type="date" id="end-date" ref={endDtRef} />
          </InputGroup>

          <InputGroup>
            <ProjectSectionNum>05</ProjectSectionNum>
            <ProjectSectionName>상세 설명</ProjectSectionName>
            <Textarea ref={descriptionRef} placeholder="프로젝트 내용 작성" />
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
