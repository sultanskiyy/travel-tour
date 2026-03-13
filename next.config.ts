import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD

    remotePatterns: [
      { protocol: "https", hostname: "www.shms.com" },
      { protocol: "https", hostname: "tse2.mm.bing.net" },
      { protocol: "https", hostname: "tse3.mm.bing.net" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "adventourss.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
      { protocol: "https", hostname: "cdn.properties.emaar.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },

=======
    domains: [
      "www.shms.com",
      "tse2.mm.bing.net",
      "images.pexels.com",
      "res.cloudinary.com",
      "i.ytimg.com",
      "adventourss.com",
      "images.unsplash.com" ,
      "next.config.js" ,
      "cdn.properties.emaar.com",
      "cdn.properties.emaar.com"  ,
      "i.pinimg.com",
      "tse3.mm.bing.net",
      
      ]
  }
>>>>>>> ffb59e609affc476c2fe8d3f20e9af6ac3969308
};

export default nextConfig;