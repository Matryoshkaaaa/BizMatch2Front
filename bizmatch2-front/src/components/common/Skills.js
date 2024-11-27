import React from "react";

const Skills = () => {
  return (
    <div>
      <div style="padding-top: 1.3rem">
        <div class="skillStack-box">
          <div class="searchBox">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              class="searchInput"
              type="text"
              id="searchInput"
              placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
              autocomplete="off"
            />
          </div>
          <div class="resultBox">
            <ul id="results" class="results"></ul>
          </div>

          <div class="recommendSkill">
            추천 기술 스택에서 선택해 보세요!
            <div class="skill-box-container">
              <div class="skill-circle-box">
                <div class="skill-circle" data-id="72">
                  Java
                </div>
                <div class="skill-circle" style="width: 5rem" data-id="73">
                  JavaScript
                </div>
                <div class="skill-circle" data-id="158">
                  Vue.js
                </div>
                <div class="skill-circle" data-id="125">
                  React
                </div>
                <div class="skill-circle" data-id="64">
                  HTML
                </div>
              </div>
              <div class="skill-circle-box">
                <div class="skill-circle" data-id="18">
                  C#
                </div>
                <div class="skill-circle" style="width: 4rem" data-id="83">
                  Kotlin
                </div>
                <div class="skill-circle" style="width: 5rem" data-id="6">
                  Android
                </div>
                <div class="skill-circle" style="width: 4rem" data-id="104">
                  Node.js
                </div>
                <div class="skill-circle" style="width: 4rem" data-id="120">
                  Python
                </div>
              </div>
            </div>
            <div class="result-skill-add-box">
              <div>기술을 검색, 선택해 주세요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
