module.exports = {
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
};
