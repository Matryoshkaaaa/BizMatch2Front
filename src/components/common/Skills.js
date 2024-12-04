import React from "react";

const Skills = () => {
  return (
    <div>
      <div>
        <div classNameName="skillStack-box">
          <div classNameName="searchBox">
            <i classNameName="fa-solid fa-magnifying-glass"></i>
            <input
              classNameName="searchInput"
              type="text"
              id="searchInput"
              placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
            />
          </div>
          <div classNameName="resultBox">
            <ul id="results" classNameName="results"></ul>
          </div>

          <div classNameName="recommendSkill">
            추천 기술 스택에서 선택해 보세요!
            <div classNameName="skill-box-container">
              <div classNameName="skill-circle-box">
                <div classNameName="skill-circle" data-id="72">
                  Java
                </div>
                <div classNameName="skill-circle" data-id="73">
                  JavaScript
                </div>
                <div classNameName="skill-circle" data-id="158">
                  Vue.js
                </div>
                <div classNameName="skill-circle" data-id="125">
                  React
                </div>
                <div classNameName="skill-circle" data-id="64">
                  HTML
                </div>
              </div>
              <div classNameName="skill-circle-box">
                <div classNameName="skill-circle" data-id="18">
                  C#
                </div>
                <div classNameName="skill-circle" data-id="83">
                  Kotlin
                </div>
                <div classNameName="skill-circle" data-id="6">
                  Android
                </div>
                <div classNameName="skill-circle" data-id="104">
                  Node.js
                </div>
                <div classNameName="skill-circle" data-id="120">
                  Python
                </div>
              </div>
            </div>
            <div classNameName="result-skill-add-box">
              <div>기술을 검색, 선택해 주세요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
