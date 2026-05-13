/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Циклические зависимости',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-shared-to-higher-layers',
      severity: 'error',
      from: { path: '^src/shared' },
      to: { path: '^src/(entities|features|widgets|pages)/' },
    },
    {
      name: 'no-entities-to-features-widgets-pages',
      severity: 'error',
      from: { path: '^src/entities' },
      to: { path: '^src/(features|widgets|pages)/' },
    },
    {
      name: 'no-features-to-widgets-pages',
      severity: 'error',
      from: { path: '^src/features' },
      to: { path: '^src/(widgets|pages)/' },
    },
    {
      name: 'no-widgets-to-pages',
      severity: 'error',
      from: { path: '^src/widgets' },
      to: { path: '^src/pages/' },
    },
  ],
};

export default config;
