export type CustomizationType = "image" | "text" | "dropdown";

export interface CustomizationConfig {
  label: string;
  description: string;
  type: CustomizationType;
  isTemplate: boolean;
  _id?: string;
  productId: string;
  userId: string;
  createdDate?: string;
  __v?: any;
}

export interface TextCustomizationConfig extends CustomizationConfig {
  noOfLine: number;
  minCharLimit: number;
  maxCharLimit: number;
  sample: string;
}

export interface ImageCustomizationConfig extends CustomizationConfig {
  noOfImages: number;
}

export interface DropDownCustomizationConfig extends CustomizationConfig {
  options: DropDownCustomizationConfigItem[];
}

export interface DropDownCustomizationConfigItem {
  label: string;
  charmUrl: string;
  price: number;
}

export type Shipping = {
  weight: number;
  width: number;
  height: number;
  length: number;
  productId: string;
  _id?: string;
  __v?: string;
  createdDate?: string;
};

export type ProductFilter = {
  name?: string;
  creator?: string;
  isVerified?: boolean;
  active?: boolean;
};

export type Product = {
  name: string;
  _id?: string;
  description: string;
  categories: string[];
  relatives: string[];
  bulletPoints: string[];
  active?: boolean;
  createdDate?: string;
  creator?: string;
  isVerified?: boolean;
  verifiedProducts?: number;
  nonVerifiedProducts?: number;
  allVerified?: boolean;
  someVerified?: boolean;
  __v?: any;
};

export type VariantNotification = {
  subject: string;
  type: "photo" | "price" | "gallery" | "combination";
  reply: string;
  isResolvedByManufacturer: boolean;
  isResolvedByAdmin: boolean;
  variantId: string;
  timeStamp: string;
  _id?: string;
};

export type Variant = {
  sku: string;
  type: VariantType[];
  value: string[];
  photo: string;
  gallery: string[];
  price: number;
  stock: number;
  productId: string;
  _id?: string;
  active?: boolean;
  createdDate?: string;
  creator?: string;
  isVerified?: boolean;
  __v?: any;
};

export type VariantType =
  | "color"
  | "size"
  | "material"
  | "weight"
  | "noOfItems"
  | "model";
