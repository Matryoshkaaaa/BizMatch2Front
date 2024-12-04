import { deleteCheckProject, getProjectList } from "../../api/projectApi";
import { projectAction } from "./userSlice";

export const readProject = () => {
  return async (dispatcher) => {
    dispatcher(projectAction.startRequest());
    try {
      const response = await getProjectList();
      dispatcher(projectAction.readProjectList({ body: response.body }));
    } catch (e) {
      dispatcher(projectAction.setErrors(e.message));
    } finally {
      dispatcher(projectAction.endRequest());
    }
  };
};
export const deleteProjects = (pjIds) => {
  return async (dispatcher) => {
    dispatcher(projectAction.startRequest());
    try {
      const response = await deleteCheckProject(pjIds);
      if (response) {
        dispatcher(projectAction.deleteProject(pjIds));
      } else {
        dispatcher(projectAction.setErrors("탈퇴 실패"));
      }
    } catch (e) {
      dispatcher(projectAction.setErrors(e.message));
    } finally {
      dispatcher(projectAction.endRequest());
    }
  };
};
