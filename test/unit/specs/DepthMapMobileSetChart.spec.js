import depthMapMobileSetChart from 'js/DepthMapMobileSetChart'
import {getDepthData } from 'js/processData'
import testData from '../../../demo/src/data.json'

describe('test DepthMapMobileSetChart', () => {

  let depthData = getDepthData(testData.depthData, testData.coinType)
  let size = {
    height: 780,
    width: 900
  }

  let depthConfig = {
    backgroundColor: '#1ad2b4'
  }
  
  it('test depthMapMobile', () => {
    let depth = new depthMapMobileSetChart(depthConfig);
    expect(depth).toBeInstanceOf(depthMapMobileSetChart)
  })

  it('test initMobileECharts', () => {
    let depth = new depthMapMobileSetChart(depthConfig);
    const element = document.createElement('div');
    depth.initMobileECharts(element);
    expect(depth).not.toBeNull()
  })

  it('test setDepthoption', () => {
    let depth = new depthMapMobileSetChart(depthConfig);
    const element = document.createElement('div');
    depth.initMobileECharts(element);
    depth.setDepthoption();
    expect(depth).not.toBeNull;
  })
})