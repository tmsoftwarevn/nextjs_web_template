/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  images: {
    unoptimized: true,
  },
  //assetPrefix: "." 
  env: {
    // change url be  ko có / cuối  
    // http://localhost:8080

    //VERCEL_URL: 'https://tmsoftware.vn',
    //http://localhost:3000

    //URL_BACKEND: 'http://localhost:8080',
    URL_BACKEND: 'https://bekhogiaodien.tmsoftware.vn',
    API_KEY_EDITOR: 'g81xywcn8iio1g9fec2ou4yv1itx1px237ogzhtowtrh9tp0'

  },
};

export default nextConfig;
