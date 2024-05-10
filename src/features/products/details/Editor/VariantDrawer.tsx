import { AddAPhotoOutlined, Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { noOp, useAlert, useToggle } from "../../../../common";
import SFButton from "../../../../common/components/Button";
import MediaUploader from "../../../../common/components/MediaUploader";
import SFDropdownComp from "../../../../common/components/SFDropdown";
import SFInput from "../../../../common/components/SFInput";
import { Variant, VariantType } from "../../../../common/types/productTypes";
import { productApiService } from "../../../../infrastructure";

type Props = {
  isCreate?: boolean;
  variant: Variant;
  onSave: (variant: Variant) => void;
  onClose: () => void;
  idx: number;
};

const varinatTypes: VariantType[] = [
  "color",
  "material",
  "model",
  "noOfItems",
  "size",
  "weight",
];

const variantMap: Record<VariantType, string> = {
  color: "Color",
  material: "Material",
  model: "Model",
  noOfItems: "No. of Items",
  size: "Size",
  weight: "Weight",
};

const variantMapCode: Record<VariantType, string> = {
  color: "CL",
  material: "ML",
  model: "MD",
  noOfItems: "NI",
  size: "SZ",
  weight: "WT",
};

const VariantDrawer: FC<Props> = (props) => {
  const {
    isCreate = false,
    onClose,
    variant: pVariant,
    idx,
    onSave: pOnSave,
  } = props;

  const [variant, setVariant] = useState(pVariant);
  useEffect(() => {
    setVariant(pVariant);
  }, [pVariant]);

  const onChangeVerification = useCallback((_: any, c: boolean) => {
    setVariant((prev) => ({ ...prev, isVerified: c }));
  }, []);

  const sku = useMemo(() => {
    const skuType = variant.type.map((e) => variantMapCode[e] || e);
    const skuValue = variant.value.map((e) =>
      e.toUpperCase().replace(/\s/g, "").slice(0, 2)
    );
    const newArr: string[] = [];

    skuType.forEach((e, i) => {
      const nType = e;
      const nVal = skuValue[i];
      const comibination = `${nType}-${nVal}`;
      newArr.push(comibination);
    });

    const sku = `PRODUCT-${idx + 1}-${newArr.join("-")}`;

    return sku;
  }, [idx, variant.type, variant.value]);

  const {
    isOpen: isSaveInProgress,
    open: startProgress,
    close: closeProgress,
  } = useToggle();

  const { error: showError, success: showSuccess } = useAlert();

  const onSave = useCallback(async () => {
    // api call
    try {
      startProgress();
      // api call
      const nVariant = { ...variant, sku };
      const apiResponse = await productApiService.saveVariantDetails(
        nVariant._id,
        nVariant,
        nVariant.productId
      );
      const { data, success } = apiResponse;
      if (success) {
        showSuccess("Variant Saved successfully");
        pOnSave(data);
        onClose();
      } else {
        showError("Error saving variant");
      }
    } catch (error) {
      showError("Error saving variant");
    } finally {
      closeProgress();
    }
  }, [
    closeProgress,
    onClose,
    pOnSave,
    showError,
    showSuccess,
    sku,
    startProgress,
    variant,
  ]);

  return (
    <Box
      sx={{
        minWidth: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">
          {isCreate ? "Create Variant" : "Edit Variant"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            gap: 4,
          }}
        >
          <Typography variant="bodyXxxl">Basic Info</Typography>
          <Box>
            <Typography variant="body2">
              SKU-ID(Generated based on Combinations)
            </Typography>
            <Typography variant="labelXxl">#{sku}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SFInput
                value={variant.price}
                label="Price"
                placeholder="eg. 1000"
                type="number"
                disabled
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SFInput
                value={variant.stock}
                label="Stock"
                placeholder="eg. 1000"
                type="number"
                disabled
              />
            </Box>
          </Box>

          <Typography variant="bodyXxxl">Photo & Gallery</Typography>
          <MediaUploader
            onRemove={noOp}
            onUpload={noOp}
            src={variant.photo}
            type="image"
            noImageTitle="Add Lead photo"
            noImageDescription="JPG, PNG, JPEG are allowed"
            noImageIcon={AddAPhotoOutlined}
            width="100%"
            height="200px"
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="bodyXxxl">Combinations</Typography>
          </Box>
          {!!variant.type.length && (
            <>
              {variant.type.map((type, ind) => (
                <Box
                  key={ind}
                  sx={{
                    width: "100%",
                    gap: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SFDropdownComp
                    options={varinatTypes.map((e) => (
                      <MenuItem value={e}>{variantMap[e] || e}</MenuItem>
                    ))}
                    value={type}
                    onChange={noOp}
                    disabled
                    sx={{ flex: 1 }}
                    label="Variant Type"
                  />
                  <SFInput
                    value={variant.value[ind]}
                    type={
                      type === "noOfItems" || type === "size"
                        ? "number"
                        : "text"
                    }
                    disabled
                    label={"Variant"}
                    sx={{ flex: 1 }}
                  />
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <FormControlLabel
          control={<Switch />}
          label={"Verify"}
          checked={variant.isVerified}
          onChange={onChangeVerification}
        />
        <SFButton onClick={onSave} disabled={isSaveInProgress}>
          Save
        </SFButton>
      </Box>
    </Box>
  );
};

export default VariantDrawer;
