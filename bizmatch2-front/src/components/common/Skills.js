import React from "react";

const Skills = () => {
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
            />
          </div>
          <div className="resultBox">
            <ul id="results" className="results"></ul>
          </div>

          <div className="recommendSkill">
            추천 기술 스택에서 선택해 보세요!
            <div className="skill-box-container">
              <div className="skill-circle-box">
                <div className="skill-circle" data-id="72">
                  Java
                </div>
                <div className="skill-circle" data-id="73">
                  JavaScript
                </div>
                <div className="skill-circle" data-id="158">
                  Vue.js
                </div>
                <div className="skill-circle" data-id="125">
                  React
                </div>
                <div className="skill-circle" data-id="64">
                  HTML
                </div>
              </div>
              <div className="skill-circle-box">
                <div className="skill-circle" data-id="18">
                  C#
                </div>
                <div className="skill-circle" data-id="83">
                  Kotlin
                </div>
                <div className="skill-circle" data-id="6">
                  Android
                </div>
                <div className="skill-circle" data-id="104">
                  Node.js
                </div>
                <div className="skill-circle" data-id="120">
                  Python
                </div>
              </div>
            </div>
            <div className="result-skill-add-box">
              <div>기술을 검색, 선택해 주세요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
