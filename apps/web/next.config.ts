import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    transpilePackages: ["@myapp/shared-types"],
};

export default nextConfig;
