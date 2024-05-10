import ChangePasswordRequest from "../../features/login/ChangePasswordRequest";
import LoginPage, { LoginRedirect } from "../../features/login/LoginPage";
import PasswordReset from "../../features/login/PasswordReset";
import PasswordSetSuccess from "../../features/login/PasswordSetSuccess";
import SentEmail from "../../features/login/SentEmail";
import { routeConstants } from "./routeConstants";
import { routeHandler } from "./routeHendler";

export const createPublicRoutes = async () => {
  routeHandler.registerPublicRoute({
    path: routeConstants.login,
    Component: LoginPage,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.checkUser,
    Component: ChangePasswordRequest,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.emailSent,
    Component: SentEmail,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.restPassword,
    Component: PasswordReset,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.login,
    Component: LoginPage,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.changedPassword,
    Component: PasswordSetSuccess,
  });
  routeHandler.registerPublicRoute({
    path: routeConstants.root,
    Component: LoginRedirect,
    index: true,
  });
};
