import Axios, { AxiosError } from "axios";
import { isNil, omit, pick } from "lodash";
import { v4 } from "uuid";
import { baseApi } from "./BaseApi";
import { BaseApi } from "./types";
import {
  BaseApiResponse,
  CustomizationConfig,
  Product,
  ProductFilter,
  Shipping,
  Variant,
  VariantNotification,
  demoProductList,
  demoVariantList,
  demoVariantNotificationList,
} from "../common";

class ProductApiService {
  private baseService: BaseApi;
  private baseUrl: string = "/products";
  constructor(baseService: BaseApi) {
    this.baseService = baseService;
  }

  // product API (Base info)
  async getProductList(
    filters?: ProductFilter,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Product[]>> {
    let subUrl = "/admin";
    const search: string[] = [];
    if (filters) {
      if (filters.name) {
        search.push(`name=${filters.name}`);
      }
      if (filters.creator) {
        search.push(`creator=${filters.creator}`);
      }
      if (!isNil(filters.active)) {
        search.push(`active=${filters.active}`);
      }
      if (!isNil(filters.isVerified)) {
        search.push(`isVerified=${filters.isVerified}`);
      }
    }

    if (search) {
      subUrl = subUrl + "?" + search.join("&");
    }
    const url = this.baseUrl + subUrl;
    const result: BaseApiResponse<Product[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const apiResponse = await Promise.resolve(demoProductList);
        result.data = apiResponse;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<Product[]>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async getProductDetails(
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Product>> {
    const url = this.baseUrl + "/" + productId + "/details";
    const result: BaseApiResponse<Product> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const apiResponse = await Promise.resolve(demoProductList);
        result.data = apiResponse.find((e) => e._id === productId);
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<Product>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  async getShippingDetails(
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Shipping>> {
    const url = this.baseUrl + "/" + productId + "/shipping";
    const result: BaseApiResponse<Shipping> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = {
          height: 0,
          length: 0,
          productId,
          weight: 0,
          width: 0,
        };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<Shipping>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async saveShippingDetails(
    productId: string,
    shipping: Shipping,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Shipping>> {
    const url = this.baseUrl + "/" + productId + "/shipping/save";
    const result: BaseApiResponse<Shipping> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = shipping;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.post<
          BaseApiResponse<Shipping>,
          Omit<Shipping, "_id" | "productId" | "createdDate" | "__v">
        >(url, omit(shipping, ["_id", "productId", "createdDate", "__v"]));

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async saveProductDetails(
    productId: string,
    product: Product,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Product>> {
    const url = this.baseUrl + "/" + productId + "/save";
    const result: BaseApiResponse<Product> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const ind = demoProductList.findIndex((e) => e._id === productId);
        if (ind !== -1) {
          demoProductList[ind] = { ...product, _id: productId };
        }
        result.data = { ...product, _id: productId };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.put<
          BaseApiResponse<Product>,
          Pick<
            Product,
            "name" | "description" | "bulletPoints" | "categories" | "relatives"
          >
        >(
          url,
          pick(product, [
            "name",
            "description",
            "bulletPoints",
            "categories",
            "relatives",
          ])
        );

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async deleteProductDetails(
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<boolean>> {
    const url = this.baseUrl + "/" + productId + "/delete";
    const result: BaseApiResponse<boolean> = {
      data: false,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = true;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.delete<
          BaseApiResponse<boolean>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async createProductDetails(
    product: Product,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Product>> {
    const url = this.baseUrl + "/create";
    const result: BaseApiResponse<Product> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const id = v4();
        demoProductList.push({
          ...product,
          _id: id,
        });

        result.data = { ...product, _id: id };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.post<
          BaseApiResponse<Product>,
          Pick<
            Product,
            "name" | "description" | "bulletPoints" | "categories" | "relatives"
          >
        >(
          url,
          pick(product, [
            "name",
            "description",
            "bulletPoints",
            "categories",
            "relatives",
          ])
        );

        const { status, data } = apiResponse;

        if (status === 201) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  // product variants API
  async createVariantDetails(
    productId: string,
    variant: Variant,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Variant>> {
    const url = this.baseUrl + "/" + productId + "/variants/create";
    const result: BaseApiResponse<Variant> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const id = v4();
        demoVariantList.push({
          ...variant,
          _id: id,
          productId,
        });

        result.data = { ...variant, _id: id, productId };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.post<
          BaseApiResponse<Variant>,
          Pick<
            Variant,
            "sku" | "gallery" | "photo" | "price" | "stock" | "type" | "value"
          >
        >(
          url,
          pick(variant, [
            "sku",
            "gallery",
            "photo",
            "price",
            "stock",
            "type",
            "value",
          ])
        );

        const { status, data } = apiResponse;

        if (status === 201) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async deleteVariantDetails(
    variantId: string,
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<boolean>> {
    const url =
      this.baseUrl + "/" + productId + "/variants/" + variantId + "/delete";
    const result: BaseApiResponse<boolean> = {
      data: false,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = true;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.delete<
          BaseApiResponse<boolean>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          (result.data = data.data), (result.success = data.success);
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async saveVariantDetails(
    variantId: string,
    variant: Variant,
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Variant>> {
    const url =
      this.baseUrl + "/" + productId + "/variants/" + variantId + "/admin/save";
    const result: BaseApiResponse<Variant> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const ind = demoVariantList.findIndex((e) => e._id === variantId);
        if (ind !== -1) {
          demoVariantList[ind] = { ...variant, _id: variantId };
        }
        result.data = { ...variant, _id: variantId, productId };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.patch<
          BaseApiResponse<Variant>,
          Pick<Variant, "isVerified">
        >(url, pick(variant, ["isVerified"]));

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async getProductVariants(
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<Variant[]>> {
    const url = this.baseUrl + "/" + productId + "/variants";
    const result: BaseApiResponse<Variant[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const apiResponse = await Promise.resolve(demoVariantList);
        result.data = apiResponse.map((e) => ({ ...e, productId }));
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<Variant[]>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  // product variants API
  async createCustomizationDetails(
    productId: string,
    customization: CustomizationConfig,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<CustomizationConfig>> {
    const url = this.baseUrl + "/" + productId + "/customizations/create";
    const result: BaseApiResponse<CustomizationConfig> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const id = v4();
        result.data = { ...customization, _id: id, productId };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.post<
          BaseApiResponse<CustomizationConfig>,
          Omit<
            CustomizationConfig,
            "_id" | "productId" | "userId" | "createdDate" | "__v"
          >
        >(
          url,
          omit(customization, [
            "_id",
            "productId",
            "userId",
            "createdDate",
            "__v",
          ])
        );

        const { status, data } = apiResponse;

        if (status === 201) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async deleteCustomizationDetails(
    customizationId: string,
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<boolean>> {
    const url =
      this.baseUrl +
      "/" +
      productId +
      "/customization/" +
      customizationId +
      "/delete";
    const result: BaseApiResponse<boolean> = {
      data: false,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = true;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.delete<
          BaseApiResponse<boolean>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          (result.data = data.data), (result.success = data.success);
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async saveCustomizationDetails(
    customizationId: string,
    customization: CustomizationConfig,
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<CustomizationConfig>> {
    const url =
      this.baseUrl +
      "/" +
      productId +
      "/customizations/" +
      customizationId +
      "/save";
    const result: BaseApiResponse<CustomizationConfig> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = { ...customization, _id: customizationId, productId };
        result.success = true;
      } else {
        const apiResponse = await this.baseService.put<
          BaseApiResponse<CustomizationConfig>,
          Omit<
            CustomizationConfig,
            "_id" | "productId" | "userId" | "createdDate" | "__v"
          >
        >(
          url,
          omit(customization, [
            "_id",
            "productId",
            "userId",
            "createdDate",
            "__v",
          ])
        );

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async getProductCustomizations(
    productId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<CustomizationConfig[]>> {
    const url = this.baseUrl + "/" + productId + "/customizations";
    const result: BaseApiResponse<CustomizationConfig[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = [];
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<CustomizationConfig[]>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async getTemplateCustomizations(
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<CustomizationConfig[]>> {
    const url = this.baseUrl + "/customizations/template";
    const result: BaseApiResponse<CustomizationConfig[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = [];
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<CustomizationConfig[]>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  // messages
  async createVariantNotification(
    notification: VariantNotification,
    variantId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<VariantNotification>> {
    const url =
      this.baseUrl + "/variants/" + variantId + "/notifications/create";
    const result: BaseApiResponse<VariantNotification> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = notification;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.post<
          BaseApiResponse<VariantNotification>,
          Pick<VariantNotification, "subject" | "type">
        >(url, pick(notification, ["subject", "type"]));

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async saveVariantNotification(
    notificationId: string,
    notification: VariantNotification,
    variantId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<VariantNotification>> {
    const url =
      this.baseUrl +
      "/variants/" +
      variantId +
      "/notifications/" +
      notificationId +
      "/resolve";
    const result: BaseApiResponse<VariantNotification> = {
      data: null,
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        result.data = notification;
        result.success = true;
      } else {
        const apiResponse = await this.baseService.patch<
          BaseApiResponse<VariantNotification>,
          Pick<VariantNotification, "isResolvedByAdmin">
        >(url, pick(notification, ["isResolvedByAdmin"]));

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }
  async getVariantNotifications(
    variantId: string,
    generateDemoData?: boolean
  ): Promise<BaseApiResponse<VariantNotification[]>> {
    const url = this.baseUrl + "/variants/" + variantId + "/notifications";
    const result: BaseApiResponse<VariantNotification[]> = {
      data: [],
      success: false,
      error: null,
    };
    try {
      if (generateDemoData) {
        const apiResponse = await Promise.resolve(demoVariantNotificationList);
        result.data = apiResponse.map((e) => ({ ...e, variantId }));
        result.success = true;
      } else {
        const apiResponse = await this.baseService.get<
          BaseApiResponse<VariantNotification[]>
        >(url);

        const { status, data } = apiResponse;

        if (status === 200) {
          result.data = data.data;
          result.success = data.success;
          result.error = data.error;
        } else {
          result.success = false;
        }
      }
    } catch (error) {
      this.handleError(error, result);
    }
    return result;
  }

  protected handleError<T>(err: any, result: BaseApiResponse<T>) {
    let message = err?.message;
    const error = err as AxiosError;
    if (error?.isAxiosError) {
      message = ((error?.response?.data as any)?.error as any)?.message;
    }
    const cancelled = Axios.isCancel(err);
    result.success = false;
    result.cancelled = cancelled;
    result.error = {
      message: cancelled ? "Server call has been cancelled" : message,
    };
  }
}

export const productApiService = new ProductApiService(baseApi);
