import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      mimeTypes: {
        '.tsx': 'text/javascript', // Explicitly set MIME type for TypeScript files
    },
    },
  },
});
