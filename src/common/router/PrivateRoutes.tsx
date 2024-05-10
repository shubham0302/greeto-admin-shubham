import {
  Home,
  PeopleAltOutlined,
  Settings,
  ShoppingBagOutlined,
  Visibility,
} from "@mui/icons-material";
import CompleteProfile from "../../features/CompleteProfile";
import HomePage, { HomePageRedirect } from "../../features/home/HomePage";
import ProductDetailsPage from "../../features/products/details/ProductDetailsPage";
import ProductListPage from "../../features/products/list/ProductListPage";
import SettingsPage from "../../features/settings/SettingsPage";
import { routeConstants } from "./routeConstants";
import { routeHandler } from "./routeHendler";
import ManufacturerList from "../../features/manufacturer/ManufacturerList";
import ManuFacturerDetails from "../../features/manufacturer/ManuFacturerDetails";

export const createPrivateRoutes = async () => {
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.home,
      Component: HomePage,
    },
    {
      name: "Home",
      icon: <Home color="inherit" />,
      shouldIncludeInNavigation: true,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.productDetails,
      Component: ProductDetailsPage,
      index: true,
    },
    {
      name: "Product Details",
      icon: <Visibility color="inherit" />,
      shouldIncludeInNavigation: false,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.products,
      Component: ProductListPage,
      index: true,
    },
    {
      name: "All Products",
      icon: <ShoppingBagOutlined color="inherit" />,
      shouldIncludeInNavigation: true,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.manufacturer,
      Component: ManufacturerList,
      index: true,
    },
    {
      name: "All Manufacturers",
      icon: <PeopleAltOutlined color="inherit" />,
      shouldIncludeInNavigation: true,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.manufacturerDetails,
      Component: ManuFacturerDetails,
      index: true,
    },
    {
      name: "Manufacturer Details",
      icon: <PeopleAltOutlined color="inherit" />,
      shouldIncludeInNavigation: false,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.settings,
      Component: SettingsPage,
    },
    {
      name: "Settings",
      icon: <Settings color="inherit" />,
      shouldIncludeInNavigation: true,
    }
  );
  routeHandler.registerPrivateRoute(
    {
      path: routeConstants.completeProfile,
      Component: CompleteProfile,
    },
    {
      name: "Complete Profile",
      icon: <Settings color="inherit" />,
      shouldIncludeInNavigation: false,
      hideSideBar: true,
    }
  );
  routeHandler.registerPrivateRoute({
    path: routeConstants.root,
    Component: HomePageRedirect,
    index: true,
  });
};
