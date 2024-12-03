import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readProjects } from "../features/projects/projectThunks";
import { projectAction } from "../features/projects/projectSlice";

export default function ProjectTable() {
  const { data, filteredData, selectedProjectIds, allChecked } = useSelector(
    (state) => state.project
  );
  const filterData = filteredData;
  const projectDispatcher = useDispatch();

  useEffect(() => {
    projectDispatcher(readProjects(data.pageNO));
  }, [data.pageNO, data, projectDispatcher]);

  const onClickMoreHandler = () => {
    projectDispatcher(projectAction.updatePageNO(data.pageNO + 1));
  };

  const renderProjectRow = ({
    projectId,
    projectName,
    projectStatus,
    startDate,
    endDate,
    category,
  }) => (
    <tr key={projectId}>
      <td>
        <input
          type="checkbox"
          checked={selectedProjectIds.includes(projectId)}
          onChange={() =>
            projectDispatcher(projectAction.toggleSingleCheck(projectId))
          }
        />
      </td>
      <td>{projectName}</td>
      <td>{projectStatus === 0 ? "진행중" : "완료"}</td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{category}</td>
    </tr>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <h2>프로젝트 관리</h2>
        {/* <SearchProjects /> */}
        <button
          onClick={() => projectDispatcher(projectAction.removeSelected())}
        >
          삭제
        </button>
      </div>

      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() =>
                  projectDispatcher(projectAction.toggleAllCheck())
                }
              />
            </th>
            <th>프로젝트 이름</th>
            <th>상태</th>
            <th>시작 날짜</th>
            <th>종료 날짜</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody>
          {filterData.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                검색 결과가 없습니다
              </td>
            </tr>
          ) : (
            filterData.map(renderProjectRow)
          )}
          {data.map(renderProjectRow)}
        </tbody>
      </table>
      <button onClick={onClickMoreHandler}>더보기</button>
    </div>
  );
}
