import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOneProjectThunk } from "../../stores/thunks/projectThunk";
import ProjectCard from "./ProjectCard";

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

const CommentsContainer = styled.div`
  margin-top: 0.9375rem;
`;

const Comment = styled.div`
  padding: 0.625rem;
  background-color: #f1f1f1;
  border-radius: 0.3125rem;
  margin-bottom: 0.625rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3125rem;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #333;
`;

const CommentDate = styled.div`
  font-size: 0.75rem;
  color: #777;
`;

const CommentContent = styled.div`
  font-size: 0.875rem;
  color: #444;
`;

const DeletedComment = styled.div`
  font-size: 0.875rem;
  color: #aaa;
  font-style: italic;
`;

const NoComments = styled.div`
  font-size: 0.875rem;
  color: #777;
  text-align: center;
  margin-top: 0.9375rem;
`;

export default function ProjectInfo() {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.details);
  const loginState = useSelector((state) => state.member);
  const navigate = useNavigate();

  console.log("loginState", loginState?.info?.emilAddr);
  console.log("project", project?.ordrId);

  useEffect(() => {
    dispatch(getOneProjectThunk(pjId));
  }, [dispatch, pjId]);

  const gotoProjectEditPage = () => {
    navigate(`/project/edit/${pjId}`);
  };

  return (
    <>
      {project === null ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <ProjectCard project={project} />
      )}
      <Container>
        {loginState?.info?.emilAddr === project?.ordrId && (
          <div style={{ float: "right", padding: "1rem" }}>
            <NewCommentButton onClick={gotoProjectEditPage}>
              수정하기
            </NewCommentButton>
          </div>
        )}

        <Section>
          <SectionTitle>업무내용</SectionTitle>
          <SectionContent>{project?.pjDesc}</SectionContent>
        </Section>

        <Section>
          <SectionTitle>모집요건</SectionTitle>
          <SectionContent>모집 요건 관련 내용 추가</SectionContent>
        </Section>

        <Section>
          <SectionTitle>근무환경</SectionTitle>
          <SectionContent>근무 환경 관련 내용 추가</SectionContent>
        </Section>

        <Section>
          <SectionTitle>프로젝트 문의</SectionTitle>
          <CommentSection>
            <NewCommentButton>새 문의 작성하기</NewCommentButton>
            <CommentsContainer>
              {project?.projectCommentList?.length ? (
                project.projectCommentList.map((comment) =>
                  comment.isDlt === "0" ? (
                    <Comment key={comment.pjCmmntId}>
                      <CommentHeader>
                        <CommentAuthor>
                          {comment.mbrNm} ({comment.athrId})
                        </CommentAuthor>
                        <CommentDate>작성일: {comment.crtdDt}</CommentDate>
                      </CommentHeader>
                      <CommentContent>{comment.cmmntCntnt}</CommentContent>
                    </Comment>
                  ) : (
                    <DeletedComment key={comment.pjCmmntId}>
                      삭제된 댓글입니다.
                    </DeletedComment>
                  )
                )
              ) : (
                <NoComments>등록된 문의가 존재하지 않습니다.</NoComments>
              )}
            </CommentsContainer>
          </CommentSection>
        </Section>
      </Container>
    </>
  );
}
