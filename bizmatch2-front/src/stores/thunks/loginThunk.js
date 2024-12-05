import { getLoginUserInfo, login } from "../../components/http/api/loginApi";
import { memberActions } from "../ToolkitStrore";

export const getMyToken = (email, password) => {
  return async (dispatcher) => {
    const tokenJson = await login(email, password);
    const status = tokenJson.status;
    if (status === 200) {
      const token = tokenJson.body;
      console.log(token);
      dispatcher(memberActions.setToken(token));
      const myInfoJson = await getLoginUserInfo();
      dispatcher(memberActions.setMyInfo(myInfoJson.body));
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
  };
};
