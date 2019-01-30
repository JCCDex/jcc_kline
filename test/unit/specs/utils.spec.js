import { isNumber, getLanguage, formatDecimal, getClientWidth, getClientHeight } from 'js/utils'

describe('test utils', () => {
  it('test is number', () => {
    expect(isNumber(2)).toBe(true)
  })

  it('test if language type is zh', () => {
    localStorage.setItem('languageType', 'zh')
    expect(getLanguage().language).toBe('zh')
  })

  it('test if language type is en', () => {
    localStorage.setItem('languageType', 'en')
    expect(getLanguage().language).toBe('en')
  })

  it('test if language type not is en or zh', () => {
    localStorage.setItem('languageType', 'ja')
    expect(getLanguage().language).toBe('en')
  })

  it('test formatDecimal if sep is true', () => {
    expect(formatDecimal(11212.234234234, 6, true)).toBe("11,212.234234")
  })

  it('test formatDecimal if not num', () => {
    expect(formatDecimal('not num', 6, true)).toBe("not num")
  })

  it('test formatDecimal if sep is false', () => {
    expect(formatDecimal(11232.234234234, 6, false)).toBe("11232.234234")
  })

  it('test getClientWidth', () => {
    expect(getClientWidth()).not.toBeNull()
  })

  it('test getClientWidth if window innerWidth is null', () => {
    window.innerWidth = null
    expect(getClientWidth()).not.toBeNull()
  })

  it('test getClientHeight', () => {
    expect(getClientHeight()).not.toBeNull()
  })

  it('test getClientHeight if window innerHeight is null ', () => {
    window.innerHeight = null
    expect(getClientHeight()).not.toBeNull()
  })
})