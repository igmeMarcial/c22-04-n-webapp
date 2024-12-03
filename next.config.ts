import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:true,
  images:{
    remotePatterns:[
      {hostname:'lh3.googleusercontent.com'}
    ]
  }
};

export default nextConfig;
