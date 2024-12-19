import { projectNewReply } from "../../alarm/socketSender";
import {
  getProjectCommentList,
  writeProjectComment,
  deleteProjectComment,
  modifyProjectComment,
} from "../../components/http/api/projectCommentApi";
import { projectCommentActions } from "../ToolkitStrore";

// 특정 게시글의 모든 댓글 가져오기
export const fetchAllProjectComments = (pjId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());

  const pjComments = await getProjectCommentList(pjId);

  if (pjComments.status === 400) {
    dispatch(projectCommentActions.setError(pjComments.body));
  } else {
    dispatch(projectCommentActions.readProjectCommentSlice(pjComments)); // Redux 액션으로 데이터 전달
  }
  dispatch(projectCommentActions.endRequest());
};

// 댓글 작성
export const createProjectComment = (newComment, pjId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  const createdComment = await writeProjectComment(newComment);

  if (createdComment.status === 400) {
    dispatch(projectCommentActions.setError(createdComment.body));
  } else {
    dispatch(projectCommentActions.writeProjectCommentSlice(createdComment));
  }
  dispatch(projectCommentActions.endRequest());
  projectNewReply(pjId);
};

// 댓글 수정
export const updateProjectComment = (fixedcomment) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());

  const updatedComment = await modifyProjectComment(fixedcomment);

  if (updatedComment.status === 400) {
    dispatch(projectCommentActions.setError(updatedComment.body));
  } else {
    dispatch(projectCommentActions.modifyProjectCommentSlice(updatedComment));
  }
  dispatch(projectCommentActions.endRequest());
};

// 댓글 삭제
export const removeProjectComment = (commentId) => async (dispatch) => {
  dispatch(projectCommentActions.startLoading());

  const response = await deleteProjectComment(commentId);

  if (response.status === 400) {
    dispatch(projectCommentActions.setError(response.body));
  } else {
    dispatch(projectCommentActions.deleteProjectCommentSlice(commentId));
  }
  dispatch(projectCommentActions.endRequest());
};

export const resetProjectComments = () => (dispatch) => {
  dispatch(projectCommentActions.startLoading());
  try {
    dispatch(projectCommentActions.resetProjectCommentsSlice());
  } catch (error) {
    dispatch(
      projectCommentActions.setError(
        error.message || "댓글 초기화에 실패했습니다."
      )
    );
  } finally {
    dispatch(projectCommentActions.endLoading());
  }
};
