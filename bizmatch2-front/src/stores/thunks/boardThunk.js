import {
  getBoardList,
  getOneBoard,
  modifyBoard,
  deleteBoard,
  writeBoardApi,
  upcountBoardViewApi,
} from "../../components/http/api/boardApi";
import { boardActions } from "../ToolkitStrore";

export const fetchAllBoards = () => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      const boardList = await getBoardList();
      dispatcher(boardActions.readBoardList(boardList));
    } catch (e) {
      dispatcher(
        boardActions.setError(
          e.message || "게시판 목록을 가져오는데 실패했습니다."
        )
      );
    } finally {
      dispatcher(boardActions.endLoading());
    }
  };
};

export const fetchBoardById = (pstId) => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      const board = await getOneBoard(pstId);

      dispatcher(boardActions.readOneBoard(board)); // Redux에 전달
    } catch (e) {
      dispatcher(
        boardActions.setError(e.message || "게시글을 가져오는데 실패했습니다.")
      );
    } finally {
      dispatcher(boardActions.endLoading());
    }
  };
};

export const deleteOneBoard = (id) => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      await deleteBoard(id); // 실제 삭제 API 호출
      dispatcher(boardActions.deleteOneBoard(id));
    } catch (e) {
      dispatcher(
        boardActions.setError(e.message || "게시글 삭제에 실패했습니다.")
      );
    } finally {
      dispatcher(boardActions.endLoading());
    }
  };
};

export const modifyOneBoard = (fixedBoard) => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      // 서버에 수정 요청
      const response = await modifyBoard(fixedBoard);

      // 상태 업데이트
      dispatcher(boardActions.modifyOneBoard(response));
    } catch (e) {
      dispatcher(
        boardActions.setError(e.message || "게시글 수정에 실패했습니다.")
      );
    } finally {
      dispatcher(boardActions.endLoading());
    }
  };
};

export const createBoard = (newBoard) => async (dispatch) => {
  dispatch(boardActions.startLoading());

  try {
    const result = await writeBoardApi(newBoard);
    dispatch(boardActions.writeBoard(result));
  } catch (error) {
    dispatch(boardActions.setError(error.message));
  } finally {
    dispatch(boardActions.endLoading());
  }
};
export const increaseViewCount = (boardId) => async (dispatch) => {
  dispatch(boardActions.startLoading());
  try {
    await upcountBoardViewApi(boardId); // 실제 삭제 API 호출
    dispatch(boardActions.increaseBoardView(boardId));
  } catch (e) {
    dispatch(boardActions.setError(e.message || "게시글 삭제에 실패했습니다."));
  } finally {
    dispatch(boardActions.endLoading());
  }
};
