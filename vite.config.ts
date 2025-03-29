import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    host: "0.0.0.0",
    https: {
      key: "./example.com+5-key.pem",
      cert: "./example.com+5.pem",
    },
  },
});
