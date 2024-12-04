import { useEffect } from "react";
import { getProjectList } from "../api/projectApi";

export default function ProjectTable() {
  const onClickHandler = useEffect(() => {
    getProjectList();
  }, []);
  return <button onClick={onClickHandler}>프로젝트 리스트 불러오기</button>;
}
