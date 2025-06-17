/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server: "@remix-run/vercel",
  serverBuildPath: "api/index.js"
};