import { Box } from "@mui/material";
import AccountSetting from "./AccountSetting";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        overflowY: "scroll",
        pb: 10,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <AccountSetting />
        {/* <ChangePassword /> */}
      </Box>
    </Box>
  );
};

export default ProfilePage;
