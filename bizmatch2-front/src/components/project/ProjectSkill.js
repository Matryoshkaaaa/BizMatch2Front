import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSkilList } from "../../stores/thunks/projectThunk";
import { skillActions } from "../../stores/ToolkitStrore";

const Container = styled.div`
  margin-top: 1.2rem;
`;

// eslint-disable-next-line no-unused-vars
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.3rem;
`;

// eslint-disable-next-line no-unused-vars
const SectionNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1rem;
`;

// eslint-disable-next-line no-unused-vars
const SectionName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const SkillStackBox = styled.div`
  width: 30rem;
`;

const SearchBox = styled.div`
  align-items: center;
  border: 1px solid #b0babf;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
`;

const RecommendSkill = styled.div`
  border: 1px solid #b0babf;
  background-color: white;
  padding: 1rem;
`;

const SkillBoxContainer = styled.div`
  padding: 1rem 0;
`;

const SkillCircleBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
`;

const SkillCircle = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 0.3rem 0.5rem;
  background-color: ${(props) => (props.selected ? "#66ccff" : "#dfdddd")};
  text-align: center;
  color: ${(props) => (props.selected ? "white" : "rgb(102, 101, 101)")};
  cursor: pointer;
`;

const ResultSkillAddBox = styled.div`
  padding-top: 1rem;
  border: 1px solid gray;
  height: 13rem;
  color: gray;
  overflow-y: auto;
`;

const SkillItem = styled.div`
  width: 80%;
  background-color: #ffffff;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveSkill = styled.span`
  float: right;
  cursor: pointer;
  color: red;
`;

const SkillSelection = () => {
  const dispatch = useDispatch();

  const { searchResults, selectedSkills, query } = useSelector(
    (state) => state.skill
  );
  const skills = useSelector((state) => state.skill.data);

  useEffect(() => {
    dispatch(getSkilList());
  }, [dispatch]);

  const handleInputFocus = () => {
    const filteredData = skills.filter(
      (item) => !selectedSkills.some((s) => s.prmStkId === item.prmStkId)
    );
    dispatch(skillActions.setSearchResults(filteredData));
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    dispatch(skillActions.setQuery(query));

    const filteredData = skills.filter(
      (skill) =>
        skill.prmStk.toLowerCase().includes(query) &&
        !selectedSkills.some((s) => s.prmStkId === skill.prmStkId)
    );
    dispatch(skillActions.setSearchResults(filteredData));
  };

  const handleAddSkill = (skill) => {
    if (selectedSkills.some((s) => s.prmStkId === skill.prmStkId)) {
      alert(`${skill.prmStk}은(는) 이미 추가되어 있습니다.`);
      return;
    }
    dispatch(skillActions.setSelectedSkills([...selectedSkills, skill]));
    //console.log(skill);
    dispatch(skillActions.setQuery(""));
    dispatch(skillActions.setSearchResults([]));
  };

  const handleRemoveSkill = (skillId) => {
    dispatch(
      skillActions.setSelectedSkills(
        selectedSkills.filter((s) => s.prmStkId !== skillId)
      )
    );
  };

  return (
    <Container>
      {/* <SectionHeader>
        <SectionNumber>04</SectionNumber>
        <SectionName>보유 기술</SectionName>
      </SectionHeader> */}

      <SkillStackBox>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="검색할 기술명을 입력해주세요. 예) JAVA"
            value={query || ""}
            onChange={handleSearch}
            onFocus={handleInputFocus}
          />
          <ul
            style={{
              display: searchResults?.length ? "block" : "none",
              height: "10rem",
              overflow: "auto",
            }}
          >
            {searchResults?.map((item) => (
              <li
                key={item.prmStkId}
                style={{ cursor: "pointer" }}
                onClick={() => handleAddSkill(item)}
              >
                {item.prmStk}
              </li>
            ))}
          </ul>
        </SearchBox>

        <RecommendSkill>
          추천 기술 스택에서 선택해 보세요!
          <SkillBoxContainer>
            <SkillCircleBox>
              {skills?.slice(0, 5).map((skill) => (
                <SkillCircle
                  key={skill.prmStkId}
                  selected={selectedSkills.some(
                    (s) => s.prmStkId === skill.prmStkId
                  )}
                  onClick={() => handleAddSkill(skill)}
                >
                  {skill.prmStk}
                </SkillCircle>
              ))}
            </SkillCircleBox>
          </SkillBoxContainer>
        </RecommendSkill>

        <ResultSkillAddBox>
          {selectedSkills?.map((skill) => (
            <SkillItem key={skill.prmStkId}>
              <label>{skill.prmStk}</label>
              <RemoveSkill onClick={() => handleRemoveSkill(skill.prmStkId)}>
                x
              </RemoveSkill>
            </SkillItem>
          ))}
        </ResultSkillAddBox>
      </SkillStackBox>
    </Container>
  );
};

export default SkillSelection;
