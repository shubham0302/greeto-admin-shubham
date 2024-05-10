import { isEmpty } from "lodash";

export const getEmailError = (email: string): string => {
  if (isEmpty(email)) {
    return "Cannot be empty!";
  } else {
    return "";
  }
};

export const getPhoneError = (phone: string): string => {
  if (isEmpty(phone)) {
    return "Cannot be empty!";
  } else if (isNaN(Number(phone)) || phone.length !== 10) {
    return "Invalid phone!";
  } else {
    return "";
  }
};
