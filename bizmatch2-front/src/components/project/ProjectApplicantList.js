import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectApplyCard from "./ProjectApplyCard";
import projectStyle from "./ProjectApplicationList.module.css";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProjectThunk,
  readApplyList,
  removeApply,
  selectApply,
} from "../../stores/thunks/projectThunk";
import { projectActions } from "../../stores/ToolkitStrore";
import { reload } from "../../stores/memberSlice";

/**
 * 프로젝트 참여자의 리스트를 보여주는 컴포넌트.
 * @param {*} param0
 * @returns
 */
export default function ProjectApplicantList() {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const participants = useSelector((state) => state.project.participants);
  const project = useSelector((state) => state.project.details);
  useEffect(() => {
    dispatch(readApplyList(pjId));
    dispatch(getOneProjectThunk(pjId));
  }, [pjId, dispatch]);

  const acceptHandler = ({ pjApply }) => {
    dispatch(selectApply(pjApply?.pjApplyId));
    navigate(`/project/info/${pjApply.pjId}`);
  };
  const rejectHandler = ({ pjApply }) => {
    dispatch(removeApply(pjApply?.pjApplyId));
    window.location.reload();
  };

  return (
    <div>
      <ProjectCard key={project?.pjId} project={project} />
      <div className={projectStyle.container}>
        {participants?.length > 0 ? (
          <div>
            {participants?.map((participant) => (
              <ProjectApplyCard
                key={participant.pjApplyId}
                applyProject={participant}
                acceptHandler={acceptHandler}
                rejectHandler={rejectHandler}
              />
            ))}
          </div>
        ) : (
          <div>참가자 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
