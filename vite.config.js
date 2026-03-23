import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    return {
        plugins: [react()],
        server: {
            port: 5173,
            proxy: {
                "/graphql": {
                    target: env.VITE_GRAPHQL_URL,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
});
