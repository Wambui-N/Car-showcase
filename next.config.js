const { types } = require('util')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['cdn.imagin.studio']
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
