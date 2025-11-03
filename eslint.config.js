import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // 添加Prettier配置，禁用可能与Prettier冲突的ESLint规则
      eslintConfigPrettier,
    ],
    plugins: {
      // 添加Prettier插件，将Prettier错误作为ESLint错误报告
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    rules: {
      // 启用Prettier规则
      'prettier/prettier': 'error',
      // 禁用TypeScript未使用变量的检查
      '@typescript-eslint/no-unused-vars': 'off',
      // 允许React组件在开发环境中使用
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
