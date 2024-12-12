import React, { useRef, useState } from "react";
import ProjectRegistStyle from "./ProjectRegist.module.css";
import CategoryBar from "../common/CategoryBar";
import { useDispatch, useSelector } from "react-redux";
import { registProjectThunk } from "../../stores/thunks/projectThunk";
import { useNavigate } from "react-router-dom";

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

    dispatcher(registProjectThunk(formData));
  };

  return (
    <div>
      <div className={ProjectRegistStyle.projectRegisterPage}>
        <div className={ProjectRegistStyle.projectRegisterArea}>
          <h1 className={ProjectRegistStyle.projectRegisterTitle}>
            프로젝트 등록하기
          </h1>
          <br />
          <div className={ProjectRegistStyle.projectRegister}>
            <div className={ProjectRegistStyle.projectCategory}>
              <div className={ProjectRegistStyle.projectSectionNum}>01</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                프로젝트 카테고리
              </div>
              <CategoryBar
                majorSearchValue={majorSearchValue}
                setMajorSearchValue={setMajorSearchValue}
                subSearchValue={subSearchValue}
                setSubSearchValue={setSubSearchValue}
              />
            </div>

            <div className={ProjectRegistStyle.projectTitle}>
              <div className={ProjectRegistStyle.projectSectionNum}>02</div>
              <div className={ProjectRegistStyle.projectSectionName}>제목</div>
              <input
                type="text"
                className={ProjectRegistStyle.projectTitleInput}
                placeholder="제목을 입력하세요"
                ref={PJ_TTLRef}
              />
            </div>

            <div className={ProjectRegistStyle.projectSchedule}>
              <div className={ProjectRegistStyle.projectSectionNum}>03</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                프로젝트 일정
              </div>
              <div>
                <label htmlFor="strt-date" className={ProjectRegistStyle.label}>
                  시작일
                </label>
                <input
                  type="date"
                  id="strt-date"
                  ref={strtDtRef}
                  className={ProjectRegistStyle.dateInput}
                />
              </div>
              <div>
                <label htmlFor="end-date" className={ProjectRegistStyle.label}>
                  종료일
                </label>
                <input
                  type="date"
                  id="end-date"
                  ref={endDtRef}
                  className={ProjectRegistStyle.dateInput}
                />
              </div>
            </div>

            <div className={ProjectRegistStyle.projectContents}>
              <div className={ProjectRegistStyle.projectSectionNum}>05</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                상세 설명
              </div>
              <div className={ProjectRegistStyle.projectContentsInputArea}>
                <textarea
                  name="pjDesc"
                  ref={descriptionRef}
                  className={ProjectRegistStyle.projectContentsInput}
                  placeholder="프로젝트 내용 작성"
                />
              </div>
            </div>

            <div className={ProjectRegistStyle.projectPrice}>
              <div className={ProjectRegistStyle.projectSectionNum}>06</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                프로젝트 입찰가격
              </div>
              <input
                type="number"
                id="amount"
                ref={cntrctAccntRef}
                className={ProjectRegistStyle.projectAmount}
                min="0"
                step="100"
                placeholder="최소 1,000,000"
              />
            </div>

            <div className={ProjectRegistStyle.projectSchedule}>
              <div className={ProjectRegistStyle.projectSectionNum}>07</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                프로젝트 모집일
              </div>
              <div>
                <label
                  htmlFor="pjRcrutStrtDt"
                  className={ProjectRegistStyle.label}
                >
                  모집 시작일
                </label>
                <input
                  type="date"
                  ref={pjRcrutStrtDtRef}
                  className={ProjectRegistStyle.dateInput}
                />
              </div>
              <div>
                <label
                  htmlFor="pjRcrutEndDt"
                  className={ProjectRegistStyle.label}
                >
                  모집 종료일
                </label>
                <input
                  type="date"
                  ref={pjRcrutEndDtRef}
                  className={ProjectRegistStyle.dateInput}
                />
              </div>
            </div>

            <div className={ProjectRegistStyle.fileAttachment}>
              <div className={ProjectRegistStyle.projectSectionNum}>08</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                첨부파일
              </div>
              <div className={ProjectRegistStyle.btnBox}>
                <input
                  type="file"
                  id="fileInput"
                  name="fileList"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileChange}
                />
                <select id="fileSelect">
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
                      document.getElementById("fileSelect").value;
                    handleFileRemove(selectedFileName);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>

            <div className={ProjectRegistStyle.projectTeamSize}>
              <div className={ProjectRegistStyle.projectSectionNum}>09</div>
              <div className={ProjectRegistStyle.projectSectionName}>
                프로젝트 인원
              </div>
              <input
                type="number"
                id="people"
                ref={pjRcrutCntRef}
                min="1"
                max="100"
                step="1"
                className={ProjectRegistStyle.projectMemberCount}
                placeholder=""
              />
            </div>
          </div>

          <div className={ProjectRegistStyle.btnArea}>
            <input
              className={ProjectRegistStyle.projectRegisterBtn}
              type="button"
              value="등록"
              onClick={onClickAddButtonHandler} // 클릭 시 프로젝트 등록
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRegist;
