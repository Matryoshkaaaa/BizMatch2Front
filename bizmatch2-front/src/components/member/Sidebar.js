export default function Sidebar() {
  const handleMenuClick = (target) => {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="sidebar">
      <div className="sidebar-menulist">
        <div
          className="sidebar-menu"
          onClick={() => handleMenuClick("#introduction")}
        >
          내 프로필
        </div>
        <div
          className="sidebar-menu"
          onClick={() => handleMenuClick("#interesting-industry")}
        >
          관심 산업
        </div>
        <div
          className="sidebar-menu"
          onClick={() => handleMenuClick("#holding-technology")}
        >
          보유 기술
        </div>
        <div
          className="sidebar-menu"
          onClick={() => handleMenuClick("#attachment")}
        >
          회사 첨부자료
        </div>
        <div className="sidebar-menu" onClick={() => handleMenuClick("#map")}>
          회사 위치
        </div>
        <div
          className="sidebar-menu"
          onClick={() => handleMenuClick("#review-list")}
        >
          리뷰
        </div>
        <div className="sidebar-menu">내 프로젝트</div>
      </div>
    </section>
  );
}
