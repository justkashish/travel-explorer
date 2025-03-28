/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["json-data-1wm2.onrender.com"], // ✅ Ensure correct domain
        remotePatterns: [{
            protocol: "https",
            hostname: "**", // ✅ Allow all external images (if needed)
        }, ],
        unoptimized: true,
    },
    output: "standalone",
};

module.exports = nextConfig;