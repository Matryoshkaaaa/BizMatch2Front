export default function Introduction({ companyVO }) {
  return (
    <div className="introduction" id="introduction">
      회사 소개
      <div className="introduction-content">{companyVO.cmpnyIntr}</div>
    </div>
  );
}
