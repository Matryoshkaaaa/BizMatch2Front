const { IMP } = window;

/**
 * 아임포트에 결제를 요청하는 함수.
 * @param {*} data
 */
export const askiamPortPayment = (data) => {
  return new Promise((resolve, reject) => {
    IMP.init("imp81518761"); // 가맹점 식별코드

    IMP.request_pay(data, (response) => {
      if (response.success) {
        resolve(response); // 결제 성공 시 Promise resolve
      } else {
        reject(response); // 결제 실패 시 Promise reject
      }
    });
  });
};
