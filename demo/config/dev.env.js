'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  infoHosts: '["ijiijhg293cabc.jccdex.cn","ijijjh6753cabc.jccdex.cn","ijikj98kyq754c.jccdex.cn","ijin8hn7hcgyxk.jccdex.cn","ijia3b44eb75ef.jccdex.cn","ijib059e8792d5.jccdex.cn","ijic352fb2ef56.jccdex.cn","ijidb149d5a1e5.jccdex.cn","ijie8c0429aaeb.jccdex.cn","ijif1ddbbbf1cd.jccdex.cn"]',
  infoPort: '443'
})
