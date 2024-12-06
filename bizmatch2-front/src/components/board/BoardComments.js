export default function BoardComments() {
  return (
    <div className={BoardViewStyle.commentBox} data-boardid={boardVO.pstId}>
      <div className={BoardViewStyle.writeBox}>
        <textarea className={BoardViewStyle.commentText}></textarea>
        <button className={BoardViewStyle.createBtn}>등록</button>
      </div>
      <div className={BoardViewStyle.listBox}>
        {comments && comments.length > 0 ? (
          comments.map((comment) =>
            comment.isDlt === "0" ? (
              <div
                key={comment.cmmntId}
                className={BoardViewStyle.oneComment}
                style={{ marginLeft: `${(comment.lv - 1) * 1.2}rem` }}
              >
                <div className={BoardViewStyle.commentUpperside}>
                  <div className={BoardViewStyle.commentLeftPart}>
                    <div className={BoardViewStyle.name}>
                      {comment.mbrNm} ({comment.athrId})
                    </div>
                    <div className={BoardViewStyle.content}>
                      {comment.cmmntCntnt}
                    </div>
                    <div className={BoardViewStyle.modifyWriteBox}>
                      <textarea className={BoardViewStyle.modifyText}>
                        {comment.cmmntCntnt}
                      </textarea>
                      <button className={BoardViewStyle.submitBtn}>등록</button>
                    </div>
                  </div>
                  <div className={BoardViewStyle.commentRightPart}>
                    <div className={BoardViewStyle.dateBox}>
                      <div className={BoardViewStyle.createDate}>
                        {comment.lstModDt}
                      </div>
                    </div>
                    <div
                      className={BoardViewStyle.functionLine}
                      data-id={comment.cmmntId}
                    >
                      {comment.athrId === loginInfo.emilAddr && (
                        <>
                          <input
                            className={BoardViewStyle.modifyCommentBtn}
                            type="button"
                            value="수정"
                          />
                          <input
                            className={BoardViewStyle.deleteCommentBtn}
                            type="button"
                            value="삭제"
                          />
                        </>
                      )}
                      <input
                        className={BoardViewStyle.recommentBtn}
                        type="button"
                        value="답글"
                      />
                    </div>
                  </div>
                </div>
                <div className={BoardViewStyle.recommentWriteBox}>
                  <textarea className={BoardViewStyle.recommentText}></textarea>
                  <button className={BoardViewStyle.submitBtn}>등록</button>
                </div>
              </div>
            ) : (
              <div
                key={comment.cmmntId}
                className={BoardViewStyle.deletedComment}
                style={{ marginLeft: `${(comment.lv - 1) * 1.2}rem` }}
              >
                삭제된 댓글입니다.
              </div>
            )
          )
        ) : (
          <div>댓글이 존재하지 않습니다.</div>
        )}
      </div>

      {paginationVO.groupEndPageNo > 0 && (
        <div className={BoardViewStyle.pageDiv}>
          <div className={BoardViewStyle.prePageBtn}>
            {paginationVO.hasPrevGroup && (
              <>
                <div>
                  <a
                    className={BoardViewStyle.whiteText}
                    href={`/board/view${boardVO.pstNm}?currPageNo=0&exposureListSize=${paginationVO.exposureListSize}`}
                  >
                    처음
                  </a>
                </div>
                <div>
                  <a
                    className={BoardViewStyle.whiteText}
                    href={`/board/view${boardVO.pstNm}?currPageNo=${paginationVO.prevGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                  >
                    이전
                  </a>
                </div>
              </>
            )}
          </div>
          <div className={BoardViewStyle.pageNumberBtn}>
            {[
              ...Array(
                paginationVO.groupEndPageNo - paginationVO.groupStartPageNo + 1
              ),
            ].map((_, index) => {
              const p = paginationVO.groupStartPageNo + index;
              return (
                <div
                  key={p}
                  className={
                    paginationVO.currPageNo === p ? BoardViewStyle.active : ""
                  }
                >
                  <a
                    className={BoardViewStyle.whiteText}
                    href={`/board/view${boardVO.pstNm}?currPageNo=${p}&exposureListSize=${paginationVO.exposureListSize}`}
                  >
                    {p + 1}
                  </a>
                </div>
              );
            })}
          </div>
          <div className={BoardViewStyle.nextPageBtn}>
            {paginationVO.hasNextGroup && (
              <>
                <div>
                  <a
                    className={BoardViewStyle.whiteText}
                    href={`/board/view${boardVO.pstNm}?currPageNo=${paginationVO.nextGroupStartPageNo}&exposureListSize=${paginationVO.exposureListSize}`}
                  >
                    다음
                  </a>
                </div>
                <div>
                  <a
                    className={BoardViewStyle.whiteText}
                    href={`/board/view${boardVO.pstNm}?currPageNo=${
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
    </div>
  );
}
