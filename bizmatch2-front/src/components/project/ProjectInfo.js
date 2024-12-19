import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteProjectThunk,
  getOneProjectThunk,
} from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";
import ProjectCommmentList from "./pjComment/ProjectCommentList";
import ReactQuill from "react-quill";
import ProjectAtt from "./ProjectAtt";

const Container = styled.div`
  margin: 0 auto;
  padding: 1.25rem;
  width: 47%;
`;

const LoadingMessage = styled.div`
  font-size: 1.125rem;
  text-align: center;
  color: #777;
`;

const Section = styled.div`
  margin-bottom: 1.875rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h1`
  font-size: 1.375rem;
  color: #333;
  margin-bottom: 0.625rem;
  border-bottom: 0.125rem solid #ddd;
  padding-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: #555;
`;

// eslint-disable-next-line no-unused-vars
const CommentSection = styled.div`
  margin-top: 0.9375rem;
`;

const NewCommentButton = styled.button`
  padding: 0.625rem 0.9375rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// eslint-disable-next-line no-unused-vars
const CommentsContainer = styled.div`
  margin-top: 0.9375rem;
`;

// eslint-disable-next-line no-unused-vars
const Comment = styled.div`
  padding: 0.625rem;
  background-color: #f1f1f1;
  border-radius: 0.3125rem;
  margin-bottom: 0.625rem;
`;

// eslint-disable-next-line no-unused-vars
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3125rem;
`;

// eslint-disable-next-line no-unused-vars
const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
`;

// eslint-disable-next-line no-unused-vars
const CommentDate = styled.div`
  font-size: 0.75rem;
  color: #777;
`;

// eslint-disable-next-line no-unused-vars
const CommentContent = styled.div`
  font-size: 0.875rem;
  color: #444;
`;

// eslint-disable-next-line no-unused-vars
const DeletedComment = styled.div`
  font-size: 0.875rem;
  color: #aaa;
  font-style: italic;
`;

// eslint-disable-next-line no-unused-vars
const NoComments = styled.div`
  font-size: 0.875rem;
  color: #777;
  text-align: center;
  margin-top: 0.9375rem;
`;

export default function ProjectInfo() {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const project = useSelector((state) => state.project.details);
  const loginState = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(getOneProjectThunk(pjId));
  }, [dispatch, pjId]);

  const gotoProjectEditPage = () => {
    navigate(`/project/edit/${pjId}`);
  };
  const projectAttList = project?.projectAtt || [];
  console.log(projectAttList);
  const onLoadEditButton = (project) => {
    if (project && (project?.pjStt === 0 || project?.pjStt === 3)) {
      return (
        <>
          {loginState?.info?.emilAddr === project?.ordrId && (
            <div style={{ float: "right", padding: "1rem" }}>
              <NewCommentButton onClick={gotoProjectEditPage}>
                수정하기
              </NewCommentButton>
            </div>
          )}
        </>
      );
    } else {
      return <></>;
    }
  };

  const deleteHanlder = () => {
    dispatch(deleteProjectThunk(pjId));
    navigate("/project/myorder");
  };
  return (
    <>
      {project === null ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <>
          {loginState?.info?.emilAddr === project?.ordrId ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "45%",
                margin: "0 auto",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  border: "1px black solid",
                  color: "white",
                  background: "#ff3939",
                  fontSize: "1.2rem",
                  fontWeight: "900",
                  padding: "0.6rem",
                  paddingTop: "0.2rem",
                  paddingBottom: "0.2rem",
                  marginRight: "0.7rem",
                  borderRadius: "0.6rem",
                }}
                onClick={deleteHanlder}
              >
                프로젝트 삭제하기
              </div>
            </div>
          ) : (
            <></>
          )}

          <ProjectCard project={project} />
        </>
      )}
      <Container>
        {onLoadEditButton(project)}
        <Section>
          <SectionTitle>업무내용</SectionTitle>
          {/* Using ReactQuill to display the description */}
          <ReactQuill
            value={project?.pjDesc || ""}
            readOnly={true}
            theme="snow"
            modules={{
              toolbar: false,
            }}
          />
        </Section>

        <Section>
          <SectionTitle>첨부파일 목록</SectionTitle>
          <SectionContent>
            {projectAttList.length > 0 ? (
              projectAttList.map((item) => (
                <ProjectAtt key={item.pjAttId} data={item} />
              ))
            ) : (
              <div>첨부파일이 존재하지 않습니다.</div>
            )}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>프로젝트 문의</SectionTitle>
          <ProjectCommmentList pjId={pjId} />
        </Section>
      </Container>
    </>
  );
}
