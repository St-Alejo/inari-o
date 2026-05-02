module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/", "http://localhost:3000/catalogo", "http://localhost:3000/product/iphone-15-pro-max"],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready on",
      numberOfRuns: 2,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
