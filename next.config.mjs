/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tzocmpsvbdhjihgejtvx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // For SSG, we need to set the output to export for SSG to work
  // This will create a new folder called "out" similar to a "dist" folder
  // IF we try to do this while any of the routes were dynamic we would get an error
  // output: "export",
};

export default nextConfig;
