import {
  deletePortfolio,
  getPortfolioList,
  postPortfolio,
  updatePortfolio,
} from "../../components/http/api/userApi";
import { portfolioAction } from "../ToolkitStrore";

/**
 * 포트폴리오 리스트 조회
 * @returns
 */
export const getPortfolioListThunk = (cmpId) => {
  return async (dispatcher) => {
    dispatcher(portfolioAction.startRequest());
    try {
      const response = await getPortfolioList(cmpId);
      dispatcher(portfolioAction.readPortfoliolist({ body: response.body }));
    } catch (e) {
      dispatcher(portfolioAction.setErrors(e.message));
    } finally {
      dispatcher(portfolioAction.endRequest());
    }
  };
};

/**
 * 하나의 포트폴리오 조회
 * @param {*} mbrPrtflId 포트폴리오 아이디
 * @returns
 */
export const getOnePortfolioThunk = (mbrPrtflId) => {
  return async (dispatcher) => {
    try {
      const portfolio = await getPortfolioList(mbrPrtflId);
      dispatcher(portfolioAction.readOnePortfolio(portfolio.body));
    } catch (e) {
      dispatcher(portfolioAction.setErrors(e.message));
    } finally {
      dispatcher(portfolioAction.endRequest());
    }
  };
};

/**
 * 포트폴리오 등록
 * @param {*} portfolioData 포트폴리오 입력 내용물
 * @returns
 */
export const registPortfolioThunk = (portfolioData) => {
  return async (dispatcher) => {
    dispatcher(portfolioAction.startRequest());
    try {
      const response = await postPortfolio(portfolioData);
      dispatcher(portfolioAction.registPortfolio(response));
    } catch (e) {
      dispatcher(portfolioAction.setErrors(e.message));
    } finally {
      dispatcher(portfolioAction.endRequest());
    }
  };
};

/**
 * 포트폴리오 수정
 * @param {*} mbrPrtflId 포트폴리오 아이디
 * @param {*} portfolioData 포트폴리오 내용물
 * @returns
 */
export const updatePortfolioThunk = (mbrPrtflId, portfolioData) => {
  return async (dispatcher) => {
    dispatcher(portfolioAction.startRequest());
    try {
      const response = await updatePortfolio(mbrPrtflId, portfolioData);
      dispatcher(
        portfolioAction.editPortfolio({ mbrPrtflId, ...response.body })
      );
    } catch (e) {
      dispatcher(portfolioAction.setErrors(e.message));
    } finally {
      dispatcher(portfolioAction.endRequest());
    }
  };
};

/**
 * 포트폴리오 삭제
 * @param {*} mbrPrtflId 포트폴리오 아이디
 * @returns
 */
export const deletePortfolioThunk = (mbrPrtflId) => {
  return async (dispatcher) => {
    dispatcher(portfolioAction.startRequest());
    try {
      await deletePortfolio(mbrPrtflId);
      dispatcher(portfolioAction.deletePortfolio(mbrPrtflId));
    } catch (e) {
      dispatcher(portfolioAction.setErrors(e.message));
    } finally {
      dispatcher(portfolioAction.endRequest());
    }
  };
};
