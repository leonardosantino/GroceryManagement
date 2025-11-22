import type { Metadata, Viewport } from "next";

import { ColorTheme } from "@/com/ui/theme/scheme";

export const appViewport: Viewport = {
  themeColor: ColorTheme.primary,
};

export const appMetadata: Metadata = {
  title: "Ecom Soft Co.",
  description: "Ecom Management",
  manifest: "/manifest.json",

  appleWebApp: {
    title: "Ecom Soft Co.",
    statusBarStyle: "default",
    startupImage: {
      url: "/images/screen-720-1280.png",
    },
  },

  other: {
    "mobile-web-app-capable": "yes",
  },
};
