const { generateColorDict} = require('./tailwind_helper')

describe('description', () => {
  it('test', () => {
    const colors = {
      red: 'colorred',
      green: 'colorgreen',
      blue: { '100': 'colorblue100', '200': 'colorblue200', '300': 'colorblue300' }
    }
    const colorDict = generateColorDict(colors)
    expect(Object.keys(colorDict).length).toBe(5)
    expect(colorDict['colorblue100']).toBe('blue-100')
  })
})

