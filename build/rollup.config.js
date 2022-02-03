import { name } from '../package.json'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import clear from 'rollup-plugin-clear'
import replace from '@rollup/plugin-replace'
import less from 'rollup-plugin-less'
import image from '@rollup/plugin-image'
import postcss from 'rollup-plugin-postcss';
const path = require('path')

String.prototype.transform = function () {
  const re = /-(\w)/g
  return this.replace(re, function () {
    const args = arguments
    return args[1].toUpperCase()
  })
}

const outputName = name.transform()

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/bundle.umd.js',
      format: 'umd',
      exports: 'named',
      name: outputName
    },
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs',
      exports: 'auto',
      name: outputName
    },
    {
      file: 'lib/bundle.js',
      format: 'es',
      name: outputName
    }
  ],
  watch: {
    include: ['src/**']
  },
  plugins: [
    clear({
      targets: [path.resolve(__dirname, '../lib')],
      watch: true
    }),
    postcss({
      extensions: [ '.css' ]
    }),
    image(),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, '../src') },
        { find: 'src', replacement: path.resolve(__dirname, '../src') }
      ]
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs(),
    nodeResolve(),
    json(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // 不加入打包的插件列表
  external: ['vue']
}
