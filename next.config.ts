import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:true,
  images:{
    remotePatterns:[
      {hostname:'lh3.googleusercontent.com'},
      {hostname:'xsgames.co'}
    ]
  }
};

export default nextConfig;
