/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/.well-known/lnurlp/:username",
                destination: "/well-known/lnurlp/:username"
            }
        ]
    }
}

module.exports = nextConfig
