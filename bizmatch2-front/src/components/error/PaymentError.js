import PaymentErrorStyle from "./PaymentError.module.css";

export default function PaymentError() {
  return (
    <>
      <div className={PaymentErrorStyle.container}>
        <div className={PaymentErrorStyle.errorIcon}>&#9888;</div>
        <h1>결제 취소 중 오류가 발생했습니다.</h1>
        <p>
          결제를 취소하는 도중 문제가 발생하였습니다. 잠시 후 다시 시도하시거나,
          고객센터로 문의해 주세요.
        </p>
        <a href="/" className={PaymentErrorStyle.btn}>
          홈으로 돌아가기
        </a>
      </div>
    </>
  );
}
