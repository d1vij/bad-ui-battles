import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sassDts from "vite-plugin-sass-dts";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        allowedHosts: true,
    },
    base: mode === "production" ? "/bad-ui-battles" : "/",
    css: {
        devSourcemap: true,
    },
    build: {
        license: true,
        minify: "oxc",
        cssMinify: "lightningcss",
        rolldownOptions: {
            optimization: {
                inlineConst: { mode: "all", pass: 1 },
            },
            treeshake: true,
        },
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
