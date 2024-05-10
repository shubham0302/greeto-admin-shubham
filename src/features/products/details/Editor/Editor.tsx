import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Product,
  getDefaultProduct,
  useActiveCategories,
  useActiveRelations,
  useTemplateCustomization,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import {
  useFetchProductDetails,
  useFetchProductShippingDetails,
} from "../../hooks";
import BasicInfoEditor from "./BasicInfoEditor";
import CustomisationEditor from "./CustomisationEditor";
import ShippingEditor from "./ShippingEditor";
import VariantEditor from "./VariantEditor";

type Props = {
  productId?: string;
  product: Product;
  hideTabs: SettingsTab[];
  childWidth?: string;
  subChildWidth?: string;
  basicPadding?: number;
  variantPadding?: number;
  customizationPadding?: number;
  shippingPadding?: number;
};

export enum SettingsTab {
  basic = "basic",
  variant = "variant",
  customization = "customization",
  shipping = "shipping",
}

const EditorChild: React.FC<Props> = (props) => {
  const {
    product: pProduct,
    hideTabs,
    childWidth = "90%",
    subChildWidth = "90%",
    basicPadding,
    variantPadding,
    customizationPadding,
    shippingPadding,
  } = props;
  const { fetchTemplateCustomizations } = useTemplateCustomization();
  useEffect(() => {
    fetchTemplateCustomizations();
  }, [fetchTemplateCustomizations]);

  const { fetchCategories } = useActiveCategories();
  const { fetchRelations } = useActiveRelations();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchRelations();
  }, [fetchRelations]);

  const [product, setProduct] = useState(pProduct);

  useEffect(() => {
    setProduct(pProduct);
  }, [pProduct]);

  const onChangeProduct = useCallback((product: Product) => {
    setProduct(product);
  }, []);

  const { _id: productId } = product || {};

  const [searchParams] = useSearchParams();

  const { isCreate } = useMemo(() => {
    const mode = searchParams.get("mode");
    return {
      isEdit: !productId ? true : mode === "edit",
      isCreate: !productId,
    };
  }, [productId, searchParams]);

  const [tab, setTab] = useState<SettingsTab>(SettingsTab.basic);
  const onChangeTabDt = useCallback(
    (_: any, val: SettingsTab) => {
      if (!isCreate) {
        setTab(val);
      }
    },
    [isCreate]
  );

  const onSaveAndNext = useCallback(async () => {
    const nextTab = getNextOrPrevStatus(tab, false);
    setTab(nextTab);
  }, [tab]);

  const hideNextButton = useMemo(() => {
    switch (tab) {
      case SettingsTab.basic:
        return hideTabs.includes(SettingsTab.variant);
      case SettingsTab.variant:
        return hideTabs.includes(SettingsTab.customization);
      case SettingsTab.customization:
        return hideTabs.includes(SettingsTab.shipping);
      case SettingsTab.shipping:
        return true;
    }
  }, [hideTabs, tab]);

  const hidePrevButton = useMemo(() => {
    switch (tab) {
      case SettingsTab.basic:
        return true;
      case SettingsTab.variant:
        return hideTabs.includes(SettingsTab.basic);
      case SettingsTab.customization:
        return hideTabs.includes(SettingsTab.variant);
      case SettingsTab.shipping:
        return hideTabs.includes(SettingsTab.customization);
    }
  }, [hideTabs, tab]);

  const {
    data: shippingDetails,
    isError: shippingError,
    isFetching: shippingFetching,
    errorMessage: shippingErrorMessage,
    refetch,
  } = useFetchProductShippingDetails(productId, false, true);

  useEffect(() => {
    console.log("fetched", productId);

    if (productId && tab === SettingsTab.shipping) {
      refetch();
    }
  }, [productId, refetch, tab]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <Box
        width={childWidth}
        sx={{
          bgcolor: "white",
          mx: "auto",
        }}
      >
        <Tabs value={tab} onChange={onChangeTabDt} variant="fullWidth">
          {!hideTabs.includes(SettingsTab.basic) && (
            <Tab value={SettingsTab.basic} label={"Basic Information"} />
          )}
          {!hideTabs.includes(SettingsTab.variant) && (
            <Tab value={SettingsTab.variant} label="Variants" />
          )}
          {!hideTabs.includes(SettingsTab.customization) && (
            <Tab value={SettingsTab.customization} label="Customizations" />
          )}
          {!hideTabs.includes(SettingsTab.shipping) && (
            <Tab value={SettingsTab.shipping} label="Shipping Details" />
          )}
        </Tabs>
      </Box>
      <Box
        sx={{
          width: subChildWidth,
          height: "fit-content",
          maxHeight: "80%",
          // pb: 20,
          overflowY: "scroll",
          mx: "auto",
          bgcolor: "white",
        }}
      >
        {tab === SettingsTab.basic && (
          <BasicInfoEditor
            product={product}
            onChangeProduct={onChangeProduct}
            padding={basicPadding}
          />
        )}
        {tab === SettingsTab.variant && (
          <VariantEditor productId={productId} padding={variantPadding} />
        )}
        {tab === SettingsTab.customization && (
          <CustomisationEditor
            productId={productId}
            padding={customizationPadding}
          />
        )}
        {tab === SettingsTab.shipping && (
          <ShippingEditor
            shippingDetails={shippingDetails}
            errorMessage={shippingErrorMessage}
            isError={shippingError}
            isFetching={shippingFetching}
            onChange={() => {}}
            padding={shippingPadding}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          //   justifyContent: "space-between",
          alignItems: "center",
          p: 4,
        }}
      >
        {!hidePrevButton && (
          <SFButton
            sfColor="sp"
            size="large"
            onClick={() => {
              const nextTab = getNextOrPrevStatus(tab, true);
              setTab(nextTab);
            }}
          >
            Previous
          </SFButton>
        )}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", ml: "auto" }}>
          {!hideNextButton && (
            <Button
              size="medium"
              onClick={onSaveAndNext}
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
              variant="outlined"
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

type EditorProps = {
  productId?: string;
  hideTabs: SettingsTab[];
  childWidth?: string;
  subChildWidth?: string;
  basicPadding?: number;
  variantPadding?: number;
  customizationPadding?: number;
  shippingPadding?: number;
};

const Editor: React.FC<EditorProps> = (props) => {
  const {
    productId,
    hideTabs,
    childWidth,
    subChildWidth,
    basicPadding,
    variantPadding,
    customizationPadding,
    shippingPadding,
  } = props;

  const { data, isError, isFetching, errorMessage, refetch } =
    useFetchProductDetails(productId, false, true);

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId, refetch]);

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>Error fetching details: {errorMessage}</Typography>
          )}
          {!isError && (
            <EditorChild
              product={data || getDefaultProduct()}
              productId={productId}
              hideTabs={hideTabs}
              childWidth={childWidth}
              subChildWidth={subChildWidth}
              basicPadding={basicPadding}
              customizationPadding={customizationPadding}
              shippingPadding={shippingPadding}
              variantPadding={variantPadding}
            />
          )}
        </>
      )}
    </>
  );
};

const getNextOrPrevStatus = (
  tab: SettingsTab,
  isPrev: boolean
): SettingsTab => {
  switch (tab) {
    case SettingsTab.basic:
      return isPrev ? SettingsTab.basic : SettingsTab.variant;
    case SettingsTab.variant:
      return isPrev ? SettingsTab.basic : SettingsTab.customization;
    case SettingsTab.customization:
      return isPrev ? SettingsTab.variant : SettingsTab.shipping;
    case SettingsTab.shipping:
      return isPrev ? SettingsTab.customization : SettingsTab.shipping;
    default:
      return tab;
  }
};

export default Editor;
