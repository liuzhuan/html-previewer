import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'main.js',
  output: {
    dir: 'dist',
    entryFileNames: '[name].[hash:8].js',
  },
  plugins: [nodeResolve(), terser()],
};
