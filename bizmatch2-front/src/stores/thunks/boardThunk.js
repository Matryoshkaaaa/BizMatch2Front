import { getBoardList } from "../../components/http/Api/boardApi";
import { boardActions } from "../ToolkitStrore";

export const readBoards = () => {
  return async (dispatcher) => {
    dispatcher(boardActions.startRequest());
    try {
      const articleList = await getBoardList();
      dispatcher(boardActions.readList(articleList));
    } catch (e) {
      dispatcher(boardActions.setErrors(e.message));
    } finally {
      dispatcher(boardActions.endRequest());
    }
  };
};

export const readOneBoard = (id) => {
  return async (dispatcher) => {
    const article = await getBoardList(id);

    dispatcher(boardActions.readOne(article.body));
  };
};
