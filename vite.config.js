import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [[react()], ["@firebase/firestore"]],

  plugins: [react()],
  server: {
    port: 3000,
  },
});
