import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/views/simple-sale-replica-without-checkout-features",
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    tailwindcss(),
  ],
});
