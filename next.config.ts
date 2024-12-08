import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:true,
  images:{
    remotePatterns:[
      {hostname:'lh3.googleusercontent.com'},
      {hostname:'xsgames.co'},
      {hostname:'plazaperu.s3.us-east-1.amazonaws.com'}
    ]
  }
};

export default nextConfig;
