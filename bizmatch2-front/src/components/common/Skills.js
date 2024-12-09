import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkilList } from "../../stores/thunks/projectThunk";

const Skills = () => {
  const dispatcher = useDispatch();
  const { data: skillList } = useSelector((state) => state.skill);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSkills, setDisplayedSkills] = useState([]);

  // 데이터 로드 후 초기 5개 기술만 보여주기
  useEffect(() => {
    dispatcher(getSkilList());
  }, [dispatcher]);

  useEffect(() => {
    // 초기 skillList가 로드되면 5개만 보여줌
    if (skillList.length > 0) {
      setDisplayedSkills(skillList.slice(0, 5)); // 처음 5개만 표시
    }
  }, [skillList]);

  // 입력값 변경 시 처리하는 함수
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = skillList.filter((skill) =>
        skill.prmStk.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedSkills(filtered);
    } else {
      setDisplayedSkills(skillList.slice(0, 5)); // 검색어가 비면 초기 5개만 표시
    }
  };

  return (
    <div>
      <div>
        <div className="skillStack-box">
          <div className="searchBox">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              className="searchInput"
              type="text"
              id="searchInput"
              placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
              value={searchTerm}
              onChange={handleSearchChange} // 입력값 변경 시 실행
            />
          </div>

          <div className="resultBox">
            <ul id="results" className="results">
              {displayedSkills.length > 0 ? (
                displayedSkills.map((skill) => (
                  <li key={skill.prmStkId}>{skill.prmStk}</li>
                ))
              ) : (
                <li>검색된 기술이 없습니다.</li>
              )}
            </ul>
          </div>

          {/* 추천 기술 스택 부분을 검색어가 비었을 때만 표시 */}
          {!searchTerm && skillList.length > 5 && (
            <div className="recommendSkill">
              추천 기술 스택에서 선택해 보세요!
              <div className="skill-box-container"></div>
              <div className="result-skill-add-box">
                <div>기술을 검색, 선택해 주세요.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
