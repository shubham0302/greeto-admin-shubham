import { useCallback, useMemo } from "react";
import { NavigateProps, useNavigate, useSearchParams } from "react-router-dom";
import { routeConstants } from "../common/router/routeConstants";
import AccountSetting from "./settings/AccountSetting";

const CompleteProfile = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const newUrl = useMemo<NavigateProps["to"]>(() => {
    const redirectTo = searchParams.get("redirectTo");
    const newUrl: NavigateProps["to"] = {
      pathname: redirectTo ? redirectTo : routeConstants.home,
    };
    return newUrl;
  }, [searchParams]);

  const callBack = useCallback(() => {
    nav(newUrl);
  }, [nav, newUrl]);

  return (
    <AccountSetting
      title="Complete your profile"
      hideProfileVisibility
      cb={callBack}
    />
  );
};

export default CompleteProfile;
