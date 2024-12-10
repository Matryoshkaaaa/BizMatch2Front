export default function Portfolio({ portfolio }) {
  return (
    <div>
      <img
        src={portfolio.image || "default-image-path.jpg"} // 이미지가 없을 경우 기본 이미지 표시
        alt={portfolio.mbrPrtflTtl}
      />
      <h3>{portfolio.mbrPrtflTtl}</h3>
      <p>{portfolio.mbrPrtflText}</p>
    </div>
  );
}
