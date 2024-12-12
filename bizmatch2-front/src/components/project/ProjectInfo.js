import React from "react";
import ProjectInfoStyle from "./ProjectInfo.module.css";
import { useParams } from "react-router-dom";
import { getOneProjectThunk } from "../../stores/thunks/projectThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";

export default function ProjectInfo() {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  console.log(pjId);
  const project = useSelector((state) => state.project.details);
  useEffect(() => {
    dispatch(getOneProjectThunk(pjId));
  }, [dispatch, pjId]);
  console.log(project);

  return (
    <>
      <ProjectCard project={project} />
      <div className={ProjectInfoStyle.cardInclude}></div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>업무내용</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}>
            {project?.pjDesc}
          </div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>모집요건</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}></div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>근무환경</h1>
          </div>
          <div className={ProjectInfoStyle.mainContentDetail}></div>
        </div>
      </div>

      <div className={ProjectInfoStyle.mainContentContainer}>
        <div className={ProjectInfoStyle.mainContent}>
          <div>
            <h1 className={ProjectInfoStyle.mainContentTitle}>프로젝트 문의</h1>
            <div className={ProjectInfoStyle.createNewComment}>
              <button className={ProjectInfoStyle.newCommentButton}>
                새 문의 작성하기
              </button>
            </div>
          </div>

          {/* <div className={ProjectInfoStyle.commentOuterBox}>
            <div className={ProjectInfoStyle.commentMiddleBox}>
              <div className={ProjectInfoStyle.commentLinnerBox}>
                {project.projectCommentList &&
                project.projectCommentList.length > 0 ? (
                  project.projectCommentList.map((comment) =>
                    comment.isDlt === "0" ? (
                      <div
                        className={ProjectInfoStyle.oneComment}
                        style={{ paddingLeft: `${comment.lv * 1.2}rem` }}
                        key={comment.pjCmmntId}
                      >
                        <div className={ProjectInfoStyle.commentUpperside}>
                          <div className={ProjectInfoStyle.commentLeftPart}>
                            <div className={ProjectInfoStyle.name}>
                              {comment.mbrNm} ({comment.athrId})
                            </div>
                            <div className={ProjectInfoStyle.content}>
                              {comment.cmmntCntnt}
                            </div>
                          </div>
                          <div className={ProjectInfoStyle.commentRightPart}>
                            <div className={ProjectInfoStyle.dateBox}>
                              <div className={ProjectInfoStyle.createDate}>
                                작성일: {comment.crtdDt}
                              </div>
                              {comment.lstModDt && (
                                <div className={ProjectInfoStyle.createDate}>
                                  수정일: {comment.lstModDt}
                                </div>
                              )}
                            </div>

                            {loginMemberVO.emilAddr === comment.athrId && (
                              <div
                                className={ProjectInfoStyle.fuctionLine}
                                data-id={comment.pjCmmntId}
                              >
                                {comment.cmmntCntnt ? (
                                  <input
                                    className={ProjectInfoStyle.modifyBtn}
                                    type="button"
                                    data-text={comment.cmmntCntnt}
                                    value="수정"
                                  />
                                ) : (
                                  <input
                                    className={ProjectInfoStyle.modifyBtn}
                                    type="button"
                                    data-test=""
                                    value="수정"
                                  />
                                )}
                                <input
                                  className={ProjectInfoStyle.deleteBtn}
                                  type="button"
                                  value="삭제"
                                />
                                <input
                                  className={ProjectInfoStyle.recommentBtn}
                                  type="button"
                                  value="답글"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={ProjectInfoStyle.deletedComment}
                        style={{ marginLeft: `${(comment.lv - 1) * 1.2}rem` }}
                        key={comment.pjCmmntId}
                      >
                        삭제된 댓글입니다.
                      </div>
                    )
                  )
                ) : (
                  <p>등록된 문의가 존재하지 않습니다.</p>
                )}
              </div>
            </div>
          </div>

          {paginationVO.groupEndPageNo > 0 && (
            <div className={ProjectInfoStyle.pageDiv}>
              <div className={ProjectInfoStyle.prePageBtn}>
                {paginationVO.hasPrevGroup && (
                  <>
                    <div>
                      <a
                        href={`/project/info/${paginationVO.searchIdParam}?currPageNo=0&exposureListSize=${paginationVO.exposureListSize}`}
                      >
                        처음
                      </a>
                    </div>
                    <div>
                      <a
                        href={`/project/info/${paginationVO.searchIdParam}?currPageNo=${paginationVO.prevGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                      >
                        이전
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className={ProjectInfoStyle.pageNumberBtn}>
                {Array.from(
                  {
                    length:
                      paginationVO.groupEndPageNo -
                      paginationVO.groupStartPageNo +
                      1,
                  },
                  (_, index) => paginationVO.groupStartPageNo + index
                ).map((p) => (
                  <div
                    className={`${ProjectInfoStyle.numberBox} ${
                      paginationVO.currPageNo === p
                        ? ProjectInfoStyle.active
                        : ""
                    }`}
                    key={p}
                  >
                    <a
                      href={`/project/info/${paginationVO.searchIdParam}?currPageNo=${p}&exposureListSize=${paginationVO.exposureListSize}`}
                    >
                      {p + 1}
                    </a>
                  </div>
                ))}
              </div>

              <div className={ProjectInfoStyle.nextPageBtn}>
                {paginationVO.hasNextGroup && (
                  <>
                    <div>
                      <a
                        href={`/project/info/${paginationVO.searchIdParam}?currPageNo=${paginationVO.nextGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                      >
                        다음
                      </a>
                    </div>
                    <div>
                      <a
                        href={`/project/info/${
                          paginationVO.searchIdParam
                        }?currPageNo=${
                          paginationVO.pageCount - 1
                        }&exposureListSize=${paginationVO.exposureListSize}`}
                      >
                        마지막
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>*/}
        </div>
      </div>

      <dialog id="commentModal" className={ProjectInfoStyle.commentModal}>
        <div className={ProjectInfoStyle.modalContent} id="modal-content">
          <div className={ProjectInfoStyle.modalContainer}>
            <div className={ProjectInfoStyle.modalInnerBox}>
              <div className={ProjectInfoStyle.closeBtn}>&times;</div>
              <textarea
                id="cmmntCntnt"
                name="cmmntCntnt"
                placeholder="댓글을 입력하세요..."
              ></textarea>
              <button className={ProjectInfoStyle.submitBtn2}>댓글 달기</button>
            </div>
          </div>
        </div>
      </dialog>

      {/* Footer can be added separately */}
      <footer>{/* Include footer component here */}</footer>
    </>
  );
}
