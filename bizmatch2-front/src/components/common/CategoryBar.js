import React, { useState, useRef } from "react";
import CategoryBarStyle from "./CategoryBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../stores/ToolkitStrore";

const categoryOptions = {
  major: [
    "IT 컨설팅과 기타 서비스",
    "데이터 처리와 아웃소싱 서비스",
    "인터넷 서비스와 인프라",
    "애플리케이션 소프트웨어",
    "시스템 소프트웨어",
    "게임 소프트웨어",
    "디자인 및 미디어",
    "카탈로그 소매 및 인터넷 소매",
    "마케팅 및 광고 서비스",
    "번역 및 통역 서비스",
    "헬스케어 및 의료 솔루션",
    "교육 및 학습 서비스",
  ],
  sub: [
    "기술 자문 및 전략 컨설팅",
    "정보화 기획 및 시스템 설계",
    "디지털 전환 및 혁신 서비스",
    "비즈니스 프로세스 개선 컨설팅",
    "규제 준수 및 인증 지원",
    "프로젝트 관리 및 PMO 서비스",
    "데이터 분석 및 처리 서비스",
    "클라우드 데이터 관리",
    "백오피스 아웃소싱 (HR, 회계)",
    "고객 지원 및 콜센터 운영",
    "IT 아웃소싱 및 관리 서비스",
    "프로세스 자동화 (RPA) 서비스",
    "웹사이트 및 온라인 플랫폼 구축",
    "클라우드 인프라 및 서버 관리",
    "네트워크 설계 및 보안 관리",
    "콘텐츠 관리 시스템 (CMS)",
    "검색 최적화 및 디지털 마케팅",
    "소셜 미디어 및 커뮤니티 운영",
    "웹 및 모바일 앱 개발",
    "ERP, CRM 등 비즈니스 애플리케이션",
    "전자상거래 솔루션 개발",
    "고객 경험 및 사용자 인터페이스 설계",
    "교육용 소프트웨어 및 e-Learning 시스템",
    "금융 및 핀테크 애플리케이션",
    "운영체제 개발 및 유지보수",
    "데이터베이스 관리 시스템 (DBMS)",
    "네트워크 운영 소프트웨어",
    "시스템 모니터링 및 관리 도구",
    "백업 및 복구 소프트웨어",
    "보안 소프트웨어 및 바이러스 백신",
    "게임 콘텐츠 개발 (모바일, PC, 콘솔)",
    "가상 현실 및 증강 현실 게임",
    "인터랙티브 미디어 및 메타버스 개발",
    "게임 디자인 및 그래픽 제작",
    "게임 운영 및 리워드 시스템",
    "시각 디자인 및 브랜드 구축",
    "3D 모델링 및 애니메이션",
    "영상 제작 및 편집",
    "그래픽 디자인 및 인쇄물 제작",
    "디지털 일러스트 및 캐릭터 디자인",
    "홍보 및 마케팅 콘텐츠 제작",
    "온라인 쇼핑몰 구축 및 운영",
    "디지털 카탈로그 제작 및 관리",
    "상품 촬영 및 콘텐츠 생성",
    "물류 및 재고 관리 솔루션",
    "고객 리뷰 및 피드백 관리",
    "전자상거래 마케팅 전략 수립",
    "디지털 광고 및 배너 제작",
    "브랜드 전략 및 시장 분석",
    "소셜 미디어 캠페인 관리",
    "콘텐츠 마케팅 및 블로그 운영",
    "인플루언서 및 바이럴 마케팅",
    "오프라인 및 이벤트 마케팅",
    "전문 문서 번역 및 현지화",
    "영상 자막 및 더빙 서비스",
    "비즈니스 및 법률 통역",
    "다국어 고객 지원 서비스",
    "의료 소프트웨어 개발 (EMR, EHR)",
    "원격 의료 및 진료 플랫폼",
    "병원 관리 시스템",
    "헬스케어 데이터 분석",
    "학습 관리 시스템 (LMS)",
    "온라인 강의 및 교육 콘텐츠 개발",
    "교육용 앱 및 소프트웨어",
  ],
};

export default function CategoryBar() {
  const dispatch = useDispatch();
  const { selectedMajorCategory, selectedSubCategory } = useSelector(
    (state) => state.category1
  );

  const [majorSearchValue, setMajorSearchValue] = useState("");
  const [subSearchValue, setSubSearchValue] = useState("");
  const [filteredMajorOptions, setFilteredMajorOptions] = useState(
    categoryOptions.major
  );
  const [filteredSubOptions, setFilteredSubOptions] = useState(
    categoryOptions.sub
  );

  const majorInputRef = useRef(null);
  const subInputRef = useRef(null);

  const filterOptions = (options, searchValue) => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSearchChange = (e, type) => {
    const value = e.target.value;
    if (type === "major") {
      setMajorSearchValue(value);
      setFilteredMajorOptions(filterOptions(categoryOptions.major, value));
    } else {
      setSubSearchValue(value);
      setFilteredSubOptions(filterOptions(categoryOptions.sub, value));
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      if (type === "major" && majorSearchValue === "") {
        const firstOption = categoryOptions.major[0];
        dispatch(categoryActions.setMajorCategory(firstOption));
        setMajorSearchValue(firstOption);
        if (majorInputRef.current) majorInputRef.current.blur();
      }

      if (type === "sub" && subSearchValue === "") {
        const firstOption = categoryOptions.sub[0];
        dispatch(categoryActions.setSubCategory(firstOption));
        setSubSearchValue(firstOption);
        if (subInputRef.current) subInputRef.current.blur();
      }

      const firstOption =
        type === "major" ? filteredMajorOptions[0] : filteredSubOptions[0];

      if (firstOption) {
        if (type === "major") {
          dispatch(categoryActions.setMajorCategory(firstOption));
          setMajorSearchValue(firstOption);
        } else {
          dispatch(categoryActions.setSubCategory(firstOption));
          setSubSearchValue(firstOption);
        }
      }
    }
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "major") {
      dispatch(categoryActions.setMajorCategory(value));
    } else {
      dispatch(categoryActions.setSubCategory(value));
    }
  };

  return (
    <>
      <div className={CategoryBarStyle.selectBox}>
        <select
          id="cmpnyBizCtgry"
          name="cmpnyIndstrId.mjrId"
          className={CategoryBarStyle.levelCategory}
          value={selectedMajorCategory}
          onChange={(e) => handleChange(e, "major")}
          style={{ width: "15rem" }}
        >
          <option value="0">대분류</option>
          {filteredMajorOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          ref={majorInputRef}
          type="text"
          className={CategoryBarStyle.searchInput}
          placeholder="Search Categories"
          value={majorSearchValue}
          onChange={(e) => handleSearchChange(e, "major")}
          onKeyPress={(e) => handleKeyPress(e, "major")}
        />
      </div>

      <div className={CategoryBarStyle.selectBox}>
        <select
          id="cmpnyIndstrId"
          name="cmpnyIndstrId.smjrId"
          value={selectedSubCategory}
          className={CategoryBarStyle.levelCategory}
          onChange={(e) => handleChange(e, "sub")}
          style={{ width: "15rem" }}
        >
          <option value="0">중분류</option>
          {filteredSubOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          ref={subInputRef}
          type="text"
          className={CategoryBarStyle.searchInput}
          placeholder="Search Subcategories"
          value={subSearchValue}
          onChange={(e) => handleSearchChange(e, "sub")}
          onKeyPress={(e) => handleKeyPress(e, "sub")}
        />
      </div>
    </>
  );
}
