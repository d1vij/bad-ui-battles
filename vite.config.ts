import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sassDts from "vite-plugin-sass-dts";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => ({
    server: {
        allowedHosts: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        sassDts({
            enabledMode: ["development", "production"],
            esmExport: true,
        }),
        tailwindcss(),
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        {
            name: "build-uuid-generator",

            generateBundle() {
                const uuid = crypto.randomUUID();

                this.emitFile({
                    type: "asset",
                    fileName: "build.txt",
                    source: uuid,
                });
            },
        },
    ],
}));
