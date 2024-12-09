import React, { useState } from "react";

const Skills = () => {
  const skillList = [
    { id: 72, name: "Java" },
    { id: 73, name: "JavaScript" },
    { id: 158, name: "Vue.js" },
    { id: 125, name: "React" },
    { id: 64, name: "HTML" },
    { id: 18, name: "C#" },
    { id: 83, name: "Kotlin" },
    { id: 6, name: "Android" },
    { id: 104, name: "Node.js" },
    { id: 120, name: "Python" },
  ];

  // 입력된 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 필터링된 결과 상태
  const [filteredSkills, setFilteredSkills] = useState(skillList);

  // 입력값 변경 시 처리하는 함수
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 검색어가 포함된 기술들만 필터링
    if (value) {
      const filtered = skillList.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills(skillList); // 검색어가 비어 있으면 모든 기술 목록 표시
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
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))
              ) : (
                <li>검색된 기술이 없습니다.</li>
              )}
            </ul>
          </div>

          {/* 추천 기술 스택 부분을 검색어가 비었을 때만 표시 */}
          {!searchTerm && (
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
