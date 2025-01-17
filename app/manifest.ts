import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IDRead Messaging",
    short_name: "IDREAD",
    description: "IDRead Messaging",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#111827",
    icons: [
      {
        src: "/aidaicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
