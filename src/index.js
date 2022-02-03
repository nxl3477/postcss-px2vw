const postcss = require('postcss')
module.exports = postcss.plugin('postcss-px2vw', function (opts) {
  opts = opts || {}
  const _screen = opts.screen || 375
  const _toFixed = opts.toFixed || 2
  const _identifier = opts.identifier || '%'

  const vwRgx = new RegExp(`\\'${_identifier}-?(\\d+)px\\'`, 'g')

  
  // 传⼊入配置相关的代码
  return function (root, result) {
    // 转化CSS 的功能代码
    root.walkDecls(decl => {
      if( vwRgx.test(decl.value) ) {
        decl.value = decl.value.replace(vwRgx, (matchStr) => {
          const numberPx = matchStr.match(/-?\d+/g)
          const toVw = (numberPx[0] / _screen * 100).toFixed(_toFixed)
          return +toVw + 'vw'
        })
      }
    })

    root.walkAtRules(atRule => {
      if( vwRgx.test(atRule.params) ) {
        atRule.params = atRule.params.replace(vwRgx, (matchStr) => {
          const numberPx = matchStr.match(/-?\d+/g)
          const toVw = (numberPx[0] / _screen * 100).toFixed(_toFixed)
          return +toVw + 'vw'
        })
      }
    })
  }
})
