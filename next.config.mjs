/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  images: {
    unoptimized: true,
  },
  //assetPrefix: "." 
  env: {
    URL_BACKEND: 'http://localhost:8080',
    API_KEY_EDITOR: 'g81xywcn8iio1g9fec2ou4yv1itx1px237ogzhtowtrh9tp0'
  },
};

export default nextConfig;
