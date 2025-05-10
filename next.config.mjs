/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches : {
            fullUrl: true,
        }
    },
    images : {
        // domains : [
        //     'shopping-phinf.pstatic.net',
        //     'drive.google.com',
        //     'lh3.googleusercontent.com'
        // ],
        remotePatterns : [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            }
        ]
    }
};

export default nextConfig;
