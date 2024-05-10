import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ProfileManuFacturerPage from "./ProfilePage";
import { useLocation, useParams } from "react-router-dom";
import ProductListPage from "../products/list/ProductListPage";

enum SettingsTab {
  profile = "profile",
  products = "products",
}

const ManuFacturerDetails = () => {
  const [tab, setTab] = useState(SettingsTab.profile);
  const { manufacturerId } = useParams();
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
          <Tab value={SettingsTab.products} label="Products" />
        </Tabs>
      </Box>
      {tab === SettingsTab.profile && (
        <ProfileManuFacturerPage id={manufacturerId} />
      )}
      {tab === SettingsTab.products && (
        <ProductListPage manufacturerId={manufacturerId} fullWidth />
      )}
    </Box>
  );
};

export default ManuFacturerDetails;
