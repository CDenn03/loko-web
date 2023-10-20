import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    [react()],
    [
      "@firebase/firestore",
      {
        config: require("./src/config/firebaseConfig.js"),
      },
    ],
  ],
  server: {
    port: 3000,
  },
});
