const isProd = process.env.NODE_ENV === "production";

const internalHost = process.env.TAURI_DEV_HOST || "localhost";

/** @type {import('next').NextConfig} */
const nextConfig = {
	skipTrailingSlashRedirect: true,
	reactStrictMode: true,
	trailingSlash: true,
	swcMinify: true,
	// Note: This feature is required to use the Next.js Image component in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	// Ensure Next.js uses SSG instead of SSR
	// https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
	output: "export",
	distDir: "build",
  trailingSlash: true,
	// Configure assetPrefix or else the server won't properly resolve your assets.
	assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
	webpack: (config) => {
    const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.(".svg")
		)
    config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ["@svgr/webpack"],
			}
		)
		fileLoaderRule.exclude = /\.svg$/i
		return config
	},
};

export default nextConfig;
