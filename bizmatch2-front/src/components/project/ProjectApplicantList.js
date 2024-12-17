import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectApplyCard from "./ProjectApplyCard";
import projectStyle from "./ProjectApplicationList.module.css";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProjectThunk,
  readApplyList,
} from "../../stores/thunks/projectThunk";

/**
 * 프로젝트 참여자의 리스트를 보여주는 컴포넌트.
 * @param {*} param0
 * @returns
 */
export default function ProjectApplicantList() {
  const { pjId } = useParams();
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.project.participants);
  const project = useSelector((state) => state.project.details);

  const handleParticipantUpdate = () => {
    dispatch(readApplyList(pjId));
  };

  useEffect(() => {
    dispatch(readApplyList(pjId));
    dispatch(getOneProjectThunk(pjId));
  }, [pjId, dispatch]);

  return (
    <div>
      {project ? (
        <ProjectCard key={project.pjId} project={project} />
      ) : (
        <div>프로젝트 정보를 불러오는 중입니다...</div>
      )}

      <div className={projectStyle.container}>
        {participants?.length > 0 ? (
          <div>
            {participants?.map((participant) => (
              <ProjectApplyCard
                key={participant.pjApplyId}
                applyProject={participant}
                setChange={handleParticipantUpdate}
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
