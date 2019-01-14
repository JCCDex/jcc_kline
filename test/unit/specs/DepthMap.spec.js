import depthMapController from 'js/DepthMap.js'
import {getDepthData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test DepthMap', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let depthConfig = {
    backgroundColor: '#1ad2b4'
  }

  it('has a created hook', () => {
    expect(typeof depthMapController).toBe('function')
  })

  it('test initChart', () => {
    let depth = new depthMapController(depthConfig)
    const element = document.createElement('div');
    depth.initMobileChart(element)
    expect(depth).not.toBeNull()
  })

  it('test setDepthoption', () => {
    let depth = new depthMapController(depthConfig)
    const element = document.createElement('div');
    depth.initMobileChart(element)
    depth.setDepthoption(depthData)
    expect(depth.setDepthMapChart.depth.getOption()).not.toBeNull()
  })

  it('test hideLoading', () => {
    let depth = new depthMapController(depthConfig)
    const element = document.createElement('div');
    depth.initMobileChart(element)
    depth.hideDepthLoading()
    expect(depth.setDepthMapChart.depth).not.toBeNull()
  })

})