/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
    dest: "public",
    register: true,
    skipWaiting: true,
    scope: "/",
    sw: "sw.js",
    disable: process.env.NODE_ENV === 'development', // 開発中はPWA無効
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    publicExcludes: []
})

module.exports = withPWA({
    reactStrictMode: true
})