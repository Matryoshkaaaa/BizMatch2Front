import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectParticipantList } from "../http/api/projectApi";
import ProjectApplyCard from "./ProjectApplyCard";
import projectStyle from "./ProjectApplicationList.module.css";
import ProjectCard from "./ProjectCard";

/**
 * 프로젝트 참여자의 리스트를 보여주는 컴포넌트.
 * @param {*} param0
 * @returns
 */
export default function ProjectApplicantList() {
  const { pjId } = useParams();
  const [participants, setParticipants] = useState([]); // 참여자 목록 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 참여자 데이터 가져오기
    const fetchParticipants = async () => {
      try {
        const data = await getProjectParticipantList(pjId); // API 호출
        setParticipants(data.body); // 참여자 상태 업데이트
      } catch (error) {
        console.error("참여자 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };
    fetchParticipants(); // useEffect 실행 시 데이터 로드
  }, [pjId]);

  return (
    <div>
      <ProjectCard project={pjId} />
      <div className={projectStyle.container}>
        {isLoading ? (
          <div>참가자 정보를 불러오는 중입니다...</div>
        ) : participants.length > 0 ? (
          <div>
            {participants.map((participant) => (
              <ProjectApplyCard
                key={participant.pjApplyId}
                applyProject={participant}
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
