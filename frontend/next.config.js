/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.lorem.space"],
    loader: "imgix",
    path: "",
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
