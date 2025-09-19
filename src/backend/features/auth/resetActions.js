import { logout } from "../auth/authSlice";
import { authApi } from "../auth/authAPI";
import { persistor } from "../../app/store";
import { userApi } from "../user/userAPI";

export const resetApp = () => async (dispatch) => {
  dispatch(logout()); // vide le slice auth
  dispatch(authApi.util.resetApiState()); // vide les caches RTK
  dispatch(userApi.util.resetApiState());

  await persistor.purge(); // vide redux-persist
};
