import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/sitemap.xml"],
  },
  ...nextVitals,
];

export default eslintConfig;
