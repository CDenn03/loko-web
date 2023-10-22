import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
<<<<<<< HEAD
  plugins: [[react()], ["@firebase/firestore"]],
=======
  plugins: [react()],
>>>>>>> 304b1ddb9bb53248be2f291aea9c406baf0df24b
  server: {
    port: 3000,
  },
});
