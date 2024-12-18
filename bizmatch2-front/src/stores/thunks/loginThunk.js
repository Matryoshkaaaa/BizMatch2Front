import { signinAlarmSender } from "../../alarm/socketSender";
import { getLoginUserInfo, login } from "../../components/http/api/loginApi";
import { memberActions } from "../memberSlice";

export const getMyToken = (email, password) => {
  return async (dispatcher) => {
    const tokenJson = await login(email, password);
    const status = tokenJson.status;
    try {
      if (status === 200) {
        const token = tokenJson.body;
        dispatcher(memberActions.setToken(token));

        const myInfoJson = await getLoginUserInfo();
        dispatcher(memberActions.setMyInfo(myInfoJson.body));
      } else {
        const errorMessage = tokenJson.errors.join("\n");
        alert(errorMessage);
      }
    } catch (e) {
      //console.log(e);
    } finally {
      signinAlarmSender(email);
    }
  };
};
