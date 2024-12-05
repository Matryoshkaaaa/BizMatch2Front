import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjects, readProject } from "../features/users/projectThunks";
import { projectAction } from "../features/users/userSlice";
import CmsPagination from "./CmsPagination";

export default function ProjectTable() {
  const { data, selectedIds, allChecked, isDelete, pagination } = useSelector(
    (state) => state.project
  );
  const { currentPage, itemsPerPage } = pagination;

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const projectDispatcher = useDispatch();
  useEffect(() => {
    projectDispatcher(readProject());
  }, [projectDispatcher, isDelete]);
  const projectTitleOnClickHandler = () => {
    alert("!");
  };
  const projectStatus = {
    0: "인원 모집중",
    1: "프로젝트 수행완료",
    2: "진행중",
    3: "추가 모집중",
    4: "최종완료",
  };

  const getProjectStatus = (pjStt) => projectStatus[pjStt] || "알 수 없음";

  const renderProjectRow = ({
    pjId,
    ordrId,
    obtnId,
    pjTtl,
    cntrctAccnt,
    pjStt,
    isRcrutAdd,
  }) => (
    <tr key={pjId}>
      <td>
        <input
          type="checkbox"
          checked={selectedIds.includes(pjId)}
          onChange={() =>
            projectDispatcher(projectAction.toggleSingleCheck(pjId))
          }
        />
      </td>
      <td>{pjId}</td>
      <td>{ordrId}</td>
      <td>{obtnId}</td>
      <td onClick={projectTitleOnClickHandler}>{pjTtl}</td>
      <td>{cntrctAccnt}</td>
      <td>{getProjectStatus(pjStt)}</td>
      <td>{isRcrutAdd}</td>
    </tr>
  );

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <h2>프로젝트 관리</h2>
        <button onClick={() => projectDispatcher(deleteProjects(selectedIds))}>
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
            <th>프로젝트 ID</th>
            <th>발주자 EMAIL</th>
            <th>수주자 EMAIL</th>
            <th>프로젝트 제목</th>
            <th>계약금액</th>
            <th>진행 상태</th>
            <th>추가 모집 여부</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="9">검색 결과가 없습니다</td>
            </tr>
          ) : (
            paginatedData.map(renderProjectRow)
          )}
        </tbody>
      </table>
      <CmsPagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) =>
          projectDispatcher(projectAction.setCurrentPage(page))
        }
      />
    </>
  );
}
