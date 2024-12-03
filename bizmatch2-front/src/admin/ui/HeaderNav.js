import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderNav() {
  return (
    <header>
      <div>
        <h1>관리자 페이지</h1>
      </div>
      <nav>
        <div>
          <NavLink to="members">
            <button>회원 관리</button>
          </NavLink>
          <NavLink to="reviews">
            <button>리뷰 관리</button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
