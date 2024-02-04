/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        defaultLocale: "en-US",
        locales: ["en-US", "fr-FR"]
    },
    trailingSlash: true
};

module.exports = nextConfig;
