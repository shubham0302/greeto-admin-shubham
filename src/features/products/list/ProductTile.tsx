import {
  Close,
  Fullscreen,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Manufacturer, Product, useToggle } from "../../../common";
import { routeConstants } from "../../../common/router/routeConstants";
import VariantsListView from "./VariantsListView";
import Editor, { SettingsTab } from "../details/Editor/Editor";

type Props = {
  product: Product;
  onDeleteProduct: (index: number) => void;
  index: number;
  manuFacturerList: Manufacturer[];
};

const ProductTile: React.FC<Props> = (props) => {
  const { product, manuFacturerList } = props;
  const { toggle, isOpen } = useToggle();
  const { open: openPopup, isOpen: popup, close: closePopup } = useToggle();

  const manuFacturerName = useMemo<string>(
    () =>
      manuFacturerList?.find((e) => e._id === product.creator)?.companyName ||
      "",
    [manuFacturerList, product.creator]
  );
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "gray.white",
        borderRadius: 2,
      }}
    >
      <Drawer open={popup} anchor="right" onClose={closePopup}>
        {popup && (
          <Box sx={{ width: "500px" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
              }}
            >
              <Typography variant="labelXxl">Product Details</Typography>
              <Link
                style={{ marginLeft: "auto" }}
                to={`${routeConstants.productDetails.replace(
                  ":productId",
                  product._id
                )}`}
              >
                <IconButton>
                  <Fullscreen />
                </IconButton>
              </Link>
              <IconButton onClick={closePopup}>
                <Close />
              </IconButton>
            </Box>
            <Divider />
            <Editor
              productId={product._id}
              hideTabs={[
                SettingsTab.variant,
                SettingsTab.customization,
                SettingsTab.shipping,
              ]}
              childWidth="100%"
              subChildWidth="100%"
              basicPadding={1}
            />
          </Box>
        )}
      </Drawer>
      <Box
        sx={{
          width: "100%",
          p: 2,
          borderBottom: "1px solid",
          borderBottomColor: "gray.100",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton onClick={toggle}>
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        <Typography variant="labelXl">
          {product.name}{" "}
          <Chip
            label={manuFacturerName}
            variant="outlined"
            size="small"
            color="primary"
          />
        </Typography>
        <Typography variant="bodyLr">
          <strong>{product.categories?.length}</strong> Categories
        </Typography>
        <Typography>
          <strong>{product.relatives?.length}</strong> tags
        </Typography>
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* <Link
            to={`${routeConstants.productDetails.replace(
              ":productId",
              product._id
            )}`}
          > */}
          <IconButton onClick={openPopup}>
            <Visibility />
          </IconButton>
          {/* </Link> */}
        </Box>
      </Box>
      {isOpen && <VariantsListView productId={product._id} />}
    </Box>
  );
};

export default ProductTile;
