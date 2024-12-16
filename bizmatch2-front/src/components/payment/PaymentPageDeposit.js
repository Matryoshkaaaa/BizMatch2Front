import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneProjectThunk } from "../../stores/thunks/projectThunk";
import { isPast, parseISO, isSameDay } from "date-fns";
import { askiamPortPayment } from "./iamport";
import { postPaymentDeposit } from "../http/api/paymentApi";
import AdditionalRecruitmentModal from "../ui/AdditionalRecruitmentModal";

// Global Styles
const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Arial", sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }
`;

// Styled Components
const Header = styled.header`
  background-color: #4758ee;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const BorderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 1rem 0;
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem;
  max-width: 600px;
  margin: auto;
`;

const ProjectBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const ProjectHead = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Status0 = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
`;
const Status3 = styled.span`
  background-color: #d5e84c;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
`;

const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectBodyContent = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ProjectBodyCard = styled.div`
  background-color: #e4f0ff;
  padding: 0.8rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  color: black;
`;

const PaymentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: 3rem;
`;

const PaymentBoxWord1 = styled.div`
  font-size: 1rem;
  color: #666;
`;

const PaymentBoxWord2 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
`;

const PaymentBoxBtn = styled.button`
  background-color: #4758ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

// Main Component
const PaymentPageDeposit = () => {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  const projectVO = useSelector((state) => state.project.details);
  const navigate = useNavigate();

  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getOneProjectThunk(pjId));
  }, [pjId, dispatch]);

  const pjApplyIdValue = projectVO?.applyProjectVOList[0]?.pjApplyId;
  console.log(projectVO);
  let isButtonDisabled = false;

  const paybuttonClick = async (projectVO) => {
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 생성
      name: projectVO?.pjTtl, // 주문자 이름
      amount: 10, // 결제 금액 (사실 나중에 바꿔야 하긴 함.)
      buyer_name: projectVO?.ordrId,
      buyer_tel: "010-1234-5678",
    };

    console.log("결제 요청 데이터", data);

    if (projectVO?.paymentVO?.grntPdDt) {
      alert("보증금 지불 완료");
      navigate("/project/findpage");
    }
    // 보증금을 지불하지 않은 경우.
    else {
      const nowDate = new Date(); // 현재 날짜
      const endDate = projectVO?.pjRcrutEndDt
        ? parseISO(projectVO.pjRcrutEndDt)
        : null; // 프로젝트 모집 마감 날짜

      // 마감일이 오늘 이전인지 확인 (오늘 날짜 제외)
      const isEndDateBeforeToday =
        endDate && isPast(endDate) && !isSameDay(endDate, nowDate);

      // 지원자가 존재하는 경우.
      if (pjApplyIdValue) {
        // 지원자 있으니까 돈 내야함.
        // 아임포트에 결제 요청 해야함.
        try {
          const response = await askiamPortPayment(data);
          if (response) {
            const requestData = {
              pymntId: projectVO?.paymentVO?.pymntId,
              pjId: projectVO?.pjId,
              accntNm: projectVO?.paymentVO?.accntNm,
              emilAddr: projectVO?.paymentVO?.ordrId,
              impUid: response.imp_uid,
              grntAmt: projectVO?.paymentVO?.grntAmt,
            };
            // 우리 백엔드 서버에 보증금 결제 저장 로직 넘겨야함.
            const result = await postPaymentDeposit(requestData);
            console.log(result);
          }
          if (response.error_msg === "사용자가 결제를 취소하셨습니다") {
            alert("사용자 요청으로 결제를 취소합니다.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        /**
         * 지원자가 없으면 결제 못하게 버튼 눌려야함.
         * 만약 프로젝트 모집 마감일이 지났는데도 지원자가 없으면
         * 사용자에게 추가모집을 할건지 물어봐야함.
         */
        alert("지원자 없음");
        isButtonDisabled = true;
        // 만약 지원자가 없는데 현재 시간 기준으로 마감일이 지났으면 추가모집 할거냐고 물어봐야 함
        if (!isEndDateBeforeToday) {
          // eslint-disable-next-line no-restricted-globals
          const isConfirmed = confirm(
            "지원자가 존재하지 않습니다. 추가모집을 진행하겠습니까?"
          );
          // 추가 모집에 동의한 경우.
          if (isConfirmed) {
            // 추가 모집 진행
            setIsAdditionalModalOpen(true);
            return;
          } else {
            // 기간 만료 처리 된다고 사용자에게 알리고
            // 프로젝트 기간 만료 또는 프로젝트 내리기
            // TODO 이거 나중에 로직 구현하기
            alert("인원 모집 기간이 지나서 프로젝트가 목록에서 없어집니다.");
            return;
          }
        } else {
          alert("결제진행이 불가능합니다.");
          return;
          // 결제 못하게 버튼 막아야함.
          // 그리고 그냥 함수 리턴시키기
        }
      }
    }
  };

  const stateText = (pjStt) => {
    switch (pjStt) {
      case 0:
        return <Status0>모집중</Status0>; //모집
      case 3:
        return <Status3>추가 모집중</Status3>; //추가모집
      default:
        return;
    }
  };
  return (
    <GlobalStyle>
      <Header>프로젝트 결제</Header>
      <BorderLine />
      <ProjectCard>
        <ProjectBox>
          <ProjectHead>
            <div>
              {stateText(projectVO?.pjStt)}
              <h2>{projectVO?.pjTtl || "프로젝트 제목"}</h2>
            </div>
            <div>등록일자: {projectVO?.rgstrDt || "2024-01-01"}</div>
          </ProjectHead>
          <ProjectBody>
            <ProjectBodyBox>
              <div>프로젝트 분야</div>
              <ProjectBodyContent>
                <ProjectBodyCard>
                  <strong>
                    {projectVO?.projectIndustryVO?.indstrInfoVO?.indstrNm}
                  </strong>
                </ProjectBodyCard>
              </ProjectBodyContent>
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>관련기술</div>
              <ProjectBodyContent />
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>모집 마감일</div>
              <ProjectBodyCard>
                {projectVO?.pjRcrutEndDt || "2024-12-31"}
              </ProjectBodyCard>
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>프로젝트 일정</div>
              <ProjectBodyCard>
                {projectVO?.strtDt || "2024-01-01"} ~{" "}
                {projectVO?.endDt || "2024-12-31"}
              </ProjectBodyCard>
            </ProjectBodyBox>
          </ProjectBody>
        </ProjectBox>
        <PaymentBox>
          <div>
            <PaymentBoxWord1>보증금</PaymentBoxWord1>
            <PaymentBoxWord2>
              {projectVO?.paymentVO?.grntAmt || "100,000"}원
            </PaymentBoxWord2>
          </div>
          <PaymentBoxBtn
            disabled={isButtonDisabled}
            onClick={paybuttonClick(projectVO)}
          >
            납부하기
          </PaymentBoxBtn>
        </PaymentBox>
      </ProjectCard>
      <AdditionalRecruitmentModal
        isOpen={isAdditionalModalOpen}
        onClose={() => setIsAdditionalModalOpen(false)}
        onConfirm={(data) => {
          console.log("추가 모집 데이터:", data);
          alert("추가 모집이 설정되었습니다.");
        }}
      />
    </GlobalStyle>
  );
};

export default PaymentPageDeposit;
