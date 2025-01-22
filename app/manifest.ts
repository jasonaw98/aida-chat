import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "IDRead Messaging",
    name: "IDRead Messaging",
    short_name: "IDREAD",
    description: "IDRead Messaging",
    scope: "/",
    start_url: "/chatapp",
    display_override: ["fullscreen", "browser", "minimal-ui", "window-controls-overlay"],
    display: "standalone",
    background_color: "#111827",
    theme_color: "#111827",
    orientation: "portrait",
    screenshots: [
      {
        src: "/aidaicon.png",
        sizes: "1010x1008",
        type: "image/png",
      },  
    ],
    icons: [
      {
        src: "/aidaicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
