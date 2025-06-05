import type { Metadata, Viewport } from "next";

import { Sx } from "@/common/ui/base";

export const appViewport: Viewport = {
  themeColor: Sx.color.primary,
};

export const appMetadata: Metadata = {
  title: "Opção Supermercado",
  description: "Sistema de gerenciamento",
  manifest: "/manifest.json",

  appleWebApp: {
    title: "Opção Supermercado",
    statusBarStyle: "default",
    startupImage: {
      url: "/images/screen-720-1280.png",
    },
  },

  other: {
    "mobile-web-app-capable": "yes",
  },
};
