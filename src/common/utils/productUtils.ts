import { v4 } from "uuid";
import {
  CustomizationConfig,
  CustomizationType,
  DropDownCustomizationConfig,
  ImageCustomizationConfig,
  Product,
  TextCustomizationConfig,
  Variant,
  VariantNotification,
} from "../types/productTypes";
import moment from "moment";

export const getDefaultProduct = (): Product => {
  return {
    bulletPoints: [],
    categories: [],
    description: "",
    name: "",
    relatives: [],
  };
};

export const getDemoProductList = (): Product[] => {
  return [
    {
      bulletPoints: [],
      categories: [],
      description: "",
      name: "Product 1",
      relatives: [],
      _id: v4(),
    },
    {
      bulletPoints: [],
      categories: [],
      description: "",
      name: "Product 2",
      relatives: [],
      _id: v4(),
    },
    {
      bulletPoints: [],
      categories: [],
      description: "",
      name: "Product 3",
      relatives: [],
      _id: v4(),
    },
    {
      bulletPoints: [],
      categories: [],
      description: "",
      name: "Product 4",
      relatives: [],
      _id: v4(),
    },
    {
      bulletPoints: [],
      categories: [],
      description: "",
      name: "Product 5",
      relatives: [],
      _id: v4(),
    },
  ];
};

export const getDefaultVariant = (productId: string): Variant => {
  return {
    gallery: [],
    photo: "",
    price: 0,
    productId,
    sku: "",
    stock: 0,
    type: [],
    value: [],
  };
};

export const getDemoVariants = (): Variant[] => {
  return [
    {
      gallery: [],
      photo: "",
      _id: v4(),
      price: Math.floor(1000 * Math.random()),
      stock: Math.floor(100 * Math.random()),
      productId: "",
      sku: "PRODUCT-1-CL-RE-SZ-20",
      type: ["color", "size"],
      value: ["red", "20"],
    },
    {
      gallery: [],
      photo: "",
      _id: v4(),
      price: Math.floor(1000 * Math.random()),
      stock: Math.floor(100 * Math.random()),
      productId: "",
      sku: "PRODUCT-2-CL-RE-SZ-20",
      type: ["color", "size"],
      value: ["red", "30"],
    },
    {
      gallery: [],
      photo: "",
      _id: v4(),
      price: Math.floor(1000 * Math.random()),
      stock: Math.floor(100 * Math.random()),
      productId: "",
      sku: "PRODUCT-3-CL-RE-SZ-20",
      type: ["color", "size"],
      value: ["red", "40"],
    },
  ];
};

export const getDemoVariantNotification = (): VariantNotification[] => {
  return [
    {
      isResolvedByAdmin: false,
      isResolvedByManufacturer: false,
      reply: "",
      subject: "Price is too high",
      timeStamp: moment().toISOString(),
      type: "price",
      variantId: "",
      _id: v4(),
    },
    {
      isResolvedByAdmin: false,
      isResolvedByManufacturer: false,
      reply: "",
      subject: "Photo is blurred",
      timeStamp: moment().add(-2, "days").toISOString(),
      type: "photo",
      variantId: "",
      _id: v4(),
    },
    {
      isResolvedByAdmin: false,
      isResolvedByManufacturer: false,
      reply: "",
      subject: "Check photo no. 6",
      timeStamp: moment().add(-1, "days").toISOString(),
      type: "price",
      variantId: "",
      _id: v4(),
    },
    {
      isResolvedByAdmin: false,
      isResolvedByManufacturer: false,
      reply: "",
      subject: "Combination is not suitable",
      timeStamp: moment().add(-3, "days").toISOString(),
      type: "combination",
      variantId: "",
      _id: v4(),
    },
  ];
};

export const getDefaultCustomization = (
  type: CustomizationType,
  productId: string,
  userId: string
): CustomizationConfig => {
  if (type === "text") {
    return {
      description: "",
      isTemplate: false,
      label: "",
      productId,
      type,
      userId,
      maxCharLimit: 0,
      minCharLimit: 0,
      noOfLine: 0,
      sample: "",
    } as TextCustomizationConfig;
  }
  if (type === "image") {
    return {
      description: "",
      isTemplate: false,
      label: "",
      productId,
      type,
      userId,
      noOfImages: 0,
    } as ImageCustomizationConfig;
  }
  if (type === "dropdown") {
    return {
      description: "",
      isTemplate: false,
      label: "",
      productId,
      type,
      userId,
      options: [],
    } as DropDownCustomizationConfig;
  }
};

export const demoProductList = getDemoProductList();
export const demoVariantList = getDemoVariants();
export const demoVariantNotificationList = getDemoVariantNotification();
