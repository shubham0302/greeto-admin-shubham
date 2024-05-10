export enum UserRole {
  admin = "admin",
  student = "student",
  management = "management",
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
  role: "admin" | "reseller";
  __v?: string;
};

export type ManufacturerFilter = {
  companyName?: string;
  isVerified?: boolean;
};

export type Manufacturer = {
  _id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  legalStructure: "proprietorship" | "pvtLtd" | "llp";
  gstNumber: string;
  gstCertificate: string;
  isVerified: boolean;
  incorporationCertificate: string;
  socialMedia: SocialMediaLink[];
  owner: PersonModel[];
  contactPerson: PersonModel[];
  financialInfo: FinancialInfoModel[];
  __v?: string;
};

export type ManufacturerError = {
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  legalStructure: string;
  gstNumber: string;
  gstCertificate: string;
  // incorporationCertificate: string;
  // socialMedia: SocialMediaLink[];
  // owner: PersonModel[];
  // contactPerson: PersonModel[];
  // financialInfo: FinancialInfoModel[];
  // __v?: string;
};

export type FinancialInfoModel = {
  key: string;
  value: string;
};

export type PersonModel = {
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
};

export type SocialMediaLink = {
  socialMedia: "instagram" | "facebook" | "twitter" | "linkedin" | "website";
  url: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type SignUpRequest = {
  companyName: string;
  email: string;
  phone: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginOtpRequest = {
  credentials: string;
  otp: string;
};
