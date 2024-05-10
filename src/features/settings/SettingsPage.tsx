import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import SandboxPage from "./PaymentPage";
import ProfilePage from "./ProfilePage";

enum SettingsTab {
  profile = "profile",
  center = "center",
  packages = "packages",
  payment = "payment",
}

const SettingsPage = () => {
  const [tab, setTab] = useState(SettingsTab.profile);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
        p: 2,
        pb: 4,
      }}
    >
      <Box sx={{ backgroundColor: "white", p: 0 }}>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} variant="fullWidth">
          <Tab value={SettingsTab.profile} label={"Profile"} />
          <Tab value={SettingsTab.payment} label="Payment Setting" />
        </Tabs>
      </Box>
      {tab === SettingsTab.profile && <ProfilePage />}
      {tab === SettingsTab.payment && <SandboxPage />}
    </Box>
  );
};

export default SettingsPage;
