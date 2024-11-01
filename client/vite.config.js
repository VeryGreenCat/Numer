import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@routes": path.resolve(__dirname, "src/routes"),
		},
	},
	// server: {
	// 	host: "26.182.1.45", // Replace with your IP address
	// },
});
