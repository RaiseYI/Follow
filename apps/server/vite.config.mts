import { resolve } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { viteRenderBaseConfig } from "../../configs/vite.render.config"
import { twMacro } from "../../plugins/vite/tw-macro"

export default () => {
  return defineConfig({
    resolve: {
      alias: {
        "@pkg": resolve(__dirname, "../../package.json"),
        "@client": resolve(__dirname, "./client"),
      },
    },
    define: {
      ...viteRenderBaseConfig.define,
      ELECTRON: "false",
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "dist-external/[name].[hash].[ext]",
          chunkFileNames: "dist-external/[name].[hash].js",
          entryFileNames: "dist-external/[name].[hash].js",
        },
      },
    },
    plugins: [react(), twMacro()],

    server: {
      proxy: {
        "/api": {
          target: "https://api.dev.follow.is",
          changeOrigin: true,
          rewrite(path) {
            return path.replace("/api", "")
          },
        },
      },
    },
  })
}
