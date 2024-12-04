import PortfolioWriteStyle from "./PortfolioWrite.module.css";

export default function PortfolioWrite() {
  return (
    <>
      <div className={PortfolioWriteStyle.contentBoxArea}>
        <div className={PortfolioWriteStyle.contentBox}>
          <div className={PortfolioWriteStyle.summaryBox}>
            <div className={PortfolioWriteStyle.about}>프로젝트명</div>
            <div className={PortfolioWriteStyle.name}>
              <input
                id="mbrPrtflTtl"
                name="mbrPrtflTtl"
                type="text"
                value="${memberPortfolioVO.mbrPrtflTtl}"
              />
            </div>
          </div>
          <div className={PortfolioWriteStyle.textLine}>
            프로젝트 상세
            <textarea
              id="mbrPrtflText"
              name="mbrPrtflText"
              type="text"
              value="${memberPortfolioVO.mbrPrtflText}"
            ></textarea>
            <div className={PortfolioWriteStyle.attachFileList}>
              <div>첨부파일</div>
            </div>
          </div>
          <div className={PortfolioWriteStyle.imageUpload}>
            <input
              className={PortfolioWriteStyle.fileList}
              type="file"
              name="attList[0]"
            />
            <button
              className={PortfolioWriteStyle.fileButton}
              type="button"
              id="add_attr_file"
            >
              첨부자료 추가
            </button>
          </div>
          <input
            className={PortfolioWriteStyle.signupbtn}
            type="submit"
            value="등록하기"
          />
        </div>
      </div>
    </>
  );
}
