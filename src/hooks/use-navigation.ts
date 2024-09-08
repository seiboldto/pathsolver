import { type StringRouteParams, useLocation } from "wouter";

const ROUTES = {
  MENU: "/",
  ABOUT: "/about",
  SETTINGS: "/settings",
  LEVEL: "/level",
  SHARE: "/share/:encodedID",
} as const;

type Location = keyof typeof ROUTES;

const createLink = <L extends Location>(
  location: L,
  params: StringRouteParams<(typeof ROUTES)[L]>
) => {
  const url = Object.entries(params).reduce(
    (acc, [name, value]) => (value ? acc.replace(`:${name}`, value) : acc),
    ROUTES[location] as string
  );
  return window.location.origin + url;
};

createLink("SHARE", { encodedID: "hey" });

export const useNavigation = () => {
  const [location, setLocation] = useLocation();

  const handleMenuNavigation = () => setLocation(ROUTES.MENU);
  const handleAboutNavigation = () => setLocation(ROUTES.ABOUT);
  const handleSettingsNavigation = () => setLocation(ROUTES.SETTINGS);
  const handleLevelNavigation = () => setLocation(ROUTES.LEVEL);

  const isLocation = (l: Location) => location === ROUTES[l];

  return {
    ROUTES,
    isLocation,
    createLink,
    handleMenuNavigation,
    handleAboutNavigation,
    handleSettingsNavigation,
    handleLevelNavigation,
  };
};
