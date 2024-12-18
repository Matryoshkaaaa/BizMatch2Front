import { deleteCheckProject, getProjectList } from "../../api/projectApi";
import { adminProjectAction } from "./projectSlice";

export const readProject = () => {
  return async (dispatcher) => {
    dispatcher(adminProjectAction.startRequest());
    try {
      const response = await getProjectList();
      console.log("asdasd", response);
      dispatcher(adminProjectAction.readProjectList({ body: response.body }));
    } catch (e) {
      dispatcher(adminProjectAction.setErrors(e.message));
    } finally {
      dispatcher(adminProjectAction.endRequest());
    }
  };
};
export const deleteProjects = (pjIds) => {
  return async (dispatcher) => {
    dispatcher(adminProjectAction.startRequest());
    try {
      const response = await deleteCheckProject(pjIds);
      if (response) {
        dispatcher(adminProjectAction.deleteProject(pjIds));
      } else {
        dispatcher(adminProjectAction.setErrors("탈퇴 실패"));
      }
    } catch (e) {
      dispatcher(adminProjectAction.setErrors(e.message));
    } finally {
      dispatcher(adminProjectAction.endRequest());
    }
  };
};
