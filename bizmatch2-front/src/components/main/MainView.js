import { useNavigate } from "react-router-dom";
import mainViewStyle from "./MainView.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "../ui/LoginModal";

export default function MainView() {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.member);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToRegistPage = () => {
    if (loginState && loginState.info) {
      navigate("/project/regist");
    } else {
      openModal();
    }
  };
  const handlerQuestionClick = () => {
    navigate("/board");
  };

  return (
    <>
      <div className={mainViewStyle.container} id="container">
        <div className={mainViewStyle.reg}>
          <div className={mainViewStyle.regMent}>
            <div className={mainViewStyle.regTitleMent}>
              <div>프로젝트 등록하기</div>
            </div>

            <div className={mainViewStyle.regSmallMent}>
              <div>지금 프로젝트를 등록해서 나에게 </div>
              <div>필요한 전문가를 찾아보세요.</div>
            </div>
            <div className={mainViewStyle.regBtnArea}>
              <button
                className={mainViewStyle.regBtn}
                id="reg-btn"
                onClick={goToRegistPage}
              >
                프로젝트 등록하기
              </button>
            </div>
          </div>
          <div className={mainViewStyle.imgBox}>
            <img src="./images/Illustration.svg" alt="" />
          </div>
        </div>
      </div>
      <div className={mainViewStyle.secondSection} id="secondSection">
        <div className={mainViewStyle.secondSectionBox}>
          <p className={mainViewStyle.secondSectionTitle}>
            BizMatch에서 아웃소싱 고민을 해결해보세요!
          </p>

          <div className={mainViewStyle.cards}>
            <div className={mainViewStyle.card}>
              <div className={mainViewStyle.cardText}>
                <h3>맞춤형 전문가와 매칭</h3>
              </div>
              <div className={mainViewStyle.cardImg}>
                <img src="./images/second-section1.svg" alt="" />
              </div>
              <div className={mainViewStyle.cardCaption}>
                <p>업종과 프로젝트에 맞는</p>
                <p>전문가 신속 연결</p>
                <p>필요한 서비스와</p>
                <p>맞춤형 지원 제공</p>
              </div>
            </div>
            <div className={mainViewStyle.card}>
              <div className={mainViewStyle.cardText}>
                <h3>기업 맞춤형 지원</h3>
              </div>
              <div className={mainViewStyle.cardImg}>
                <img src="./images/second-section2.svg" alt="" />
              </div>
              <div className={mainViewStyle.cardCaption}>
                <p>기업 특정 요구에 맞춘</p>
                <p>다양한 아웃소싱 솔루션</p>
                <p>효율적인 업무 처리 가능</p>
              </div>
            </div>
            <div className={mainViewStyle.card}>
              <div className={mainViewStyle.cardText}>
                <h3>실시간 프로젝트 관리</h3>
              </div>
              <div className={mainViewStyle.cardImg}>
                <img src="./images/second-section3.svg" alt="" />
              </div>
              <div className={mainViewStyle.cardCaption}>
                <p>프로젝트 진행 상황</p>
                <p>한눈에 확인</p>
                <p>필요한 변경 사항 즉시 반영</p>
                <p>실시간 관리 시스템 제공</p>
              </div>
            </div>
            <div className={mainViewStyle.card}>
              <div className={mainViewStyle.cardText}>
                <h3>안전한 거래 및 결제 시스템</h3>
              </div>
              <div className={mainViewStyle.cardCaption}>
                <p>철저한 보안</p>
                <p>신뢰성 있는 결제 시스템</p>
                <p>안전한 거래 환경 보장</p>
              </div>
              <div className={mainViewStyle.cardImg}>
                <img src="./images/second-section4.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={mainViewStyle.thirdSection}>
        <div className={mainViewStyle.thirdSectionBox}>
          <p className={mainViewStyle.thirdSectionTitle}>왜 BizMatch 인가요?</p>
          <div className={mainViewStyle.thirdSectionCards}>
            <div className={mainViewStyle.thirdSectionCard}>
              <div className={mainViewStyle.thirdSectionCardHeader}>
                <p className={mainViewStyle.thirdSectionCardHeaderTitle1}>
                  시간 절약
                </p>
              </div>
              <div className={mainViewStyle.thirdSectionCardBody}>
                <p>전문가 탐색 시간 단축</p>
                <p>빠르게 프로젝트 시작</p>
              </div>
            </div>
            <div className={mainViewStyle.thirdSectionCard}>
              <div className={mainViewStyle.thirdSectionCardHeader}>
                <p className={mainViewStyle.thirdSectionCardHeaderTitle2}>
                  신뢰할 수 있는 네트워크
                </p>
              </div>
              <div className={mainViewStyle.thirdSectionCardBody}>
                <p>다양한 산업군 인증된 전문가</p>
                <p>안정적인 거래</p>
              </div>
            </div>
            <div className={mainViewStyle.thirdSectionCard}>
              <div className={mainViewStyle.thirdSectionCardHeader}>
                <p className={mainViewStyle.thirdSectionCardHeaderTitle3}>
                  유연한 가격 책정
                </p>
              </div>
              <div className={mainViewStyle.thirdSectionCardBody}>
                <p>예산에 맞는 합리적인 가격</p>
                <p>최상의 결과 도출</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={mainViewStyle.fourthSection} id="fourthSection">
        <div className={mainViewStyle.fourthSectionContainer}>
          <p className={mainViewStyle.fourthSectionTitle}>
            자주 묻는 질문 ( FAQ )
          </p>
        </div>
        <div className={mainViewStyle.fourthSectionBox}>
          <div className={mainViewStyle.card1}>
            <div className={mainViewStyle.cardText}>
              <span className={mainViewStyle.fourthSectionText}>
                1. 플랫폼에서 제공하는 서비스는 어떤 것인가요?
              </span>
            </div>
            <div className={mainViewStyle.cardCaption1}>
              <p>
                A. 다양한 프로젝트 등록, 기업과의 매칭, 지원 관리 및 결제 시스템
                등을 제공합니다.
              </p>
            </div>
          </div>
          <div className={mainViewStyle.fourthSectionBox2}></div>
          <div className={mainViewStyle.card1}>
            <div className={mainViewStyle.cardText}>
              <span className={mainViewStyle.fourthSectionText}>
                2. 프로젝트 등록 후 어떻게 지원 기업을 선택하나요?
              </span>
            </div>
            <div className={mainViewStyle.cardCaption1}>
              <p>
                A. 등록한 프로젝트에 관심 있는 기업이 지원하면, 해당 기업들의
                프로필과 제안을 검토하여 선택할 수 있습니다.
              </p>
            </div>
          </div>
          <div className={mainViewStyle.fourthSectionBox2}></div>
          <div className={mainViewStyle.card1}>
            <div className={mainViewStyle.cardText}>
              <span className={mainViewStyle.fourthSectionText}>
                3. 결제는 어떻게 진행되나요?
              </span>
            </div>
            <div className={mainViewStyle.cardCaption1}>
              <p>
                A. 플랫폼 내에서 제공하는 안전한 결제 시스템을 통해, 계약 체결
                후 정해진 금액을 결제할 수 있습니다.
              </p>
            </div>
          </div>
          <div className={mainViewStyle.fourthSectionBox2}></div>
          <div className={mainViewStyle.card1}>
            <div className={mainViewStyle.cardText}>
              <span className={mainViewStyle.fourthSectionText}>
                4. 분쟁이 발생했을 때 어떻게 해결되나요?
              </span>
            </div>
            <div className={mainViewStyle.cardCaption1}>
              <p>
                A. 고객 지원팀에 문의하거나, 플랫폼 내 분쟁 해결 프로세스를 통해
                중재를 요청할 수 있습니다.
              </p>
            </div>
          </div>

          <div className={mainViewStyle.fourthSectionBoxQnaArea}>
            <p
              className={mainViewStyle.fourthSectionBoxQna}
              onClick={handlerQuestionClick}
            >
              질문 모두 보기
            </p>
          </div>
        </div>
      </div>
      <div className={mainViewStyle.fifthSection}>
        <div className={mainViewStyle.fifthSectionContainer}>
          <div className={mainViewStyle.fifthSectionTitle}>
            <p>지금 바로 등록하여</p>
            <p>비즈니스의 새로운 기회를 </p>
            <p>만나보세요!</p>
          </div>
          <div className={mainViewStyle.fifthSectionBtnArea}>
            <button
              className={mainViewStyle.fifthSectionBtn}
              onClick={goToRegistPage}
            >
              프로젝트 등록하기
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <LoginModal onClose={closeModal} loginState={loginState} />
      )}
    </>
  );
}
