/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches : {
            fullUrl: true,
        }
    },
    images : {
        domains : [
            'shopping-phinf.pstatic.net',
            'drive.google.com',
            'lh3.googleusercontent.com'
        ]
    }
};

export default nextConfig;
