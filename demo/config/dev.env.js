'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  infoHosts: '["iujhg293cabc.jccdex.cn1", "iujhg293cabc.jccdex.cn", "iujhg293cabc.jccdex.cn", "iujh6753cabc.jccdex.cn", "ikj98kyq754c.jccdex.cn", "iujh6753cabc.jccdex.cn", "ikj98kyq754c.jccdex.cn", "iujh6753cabc.jccdex.cn", "ikj98kyq754c.jccdex.cn"]',
  infoPort: '443',
  // infoHosts: '["iujhg293cabc1.jccdex.cn", "iujhg293cabc1.jccdex.cn", "iujhg293cabc1.jccdex.cn"]',
  
})
