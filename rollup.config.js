import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const inputFiles = [
  // js files to bundle
];

export default {
  input: inputFiles.map((file) => path.resolve(file)),
  output: {
    file: 'assets/bundle.js',
    format: 'iife',
  },
  plugins: [resolve(), commonjs(), terser()],
  external: ['jquery'],
};
