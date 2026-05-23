module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev -- --host 127.0.0.1',
      url: ['http://127.0.0.1:5173/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.65 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.75 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
