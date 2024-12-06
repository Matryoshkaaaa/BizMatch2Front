import {
  getBoardList,
  getOneBoard,
  modifyBoard,
  deleteBoard,
} from "../../components/http/Api/boardApi";
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

export const fetchBoardById = (id, actionType = "readOneBoard") => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      const board = await getOneBoard(id);
      dispatcher(boardActions[actionType](board.body));
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

export const modifyOneBoard = (id, updatedBoard) => {
  return async (dispatcher) => {
    dispatcher(boardActions.startLoading());
    try {
      // 서버에 수정 요청
      const response = await modifyBoard(id, updatedBoard);

      // 상태 업데이트
      dispatcher(
        boardActions.modifyOneBoard({
          id,
          updatedBoard: response.body,
        })
      );
    } catch (e) {
      dispatcher(
        boardActions.setError(e.message || "게시글 수정에 실패했습니다.")
      );
    } finally {
      dispatcher(boardActions.endLoading());
    }
  };
};
