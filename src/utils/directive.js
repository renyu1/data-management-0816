/* eslint-disable */
const globalData = {}
export default {
  chart: {
    inserted(el, binding) {
      let chartType                                = el.getAttribute(`data-chartType`)
      globalData[el.getAttribute(`data-chartKey`)] = echarts.init(
        el, null, {
          renderer: chartType,
          width: `auto`,
          height: `auto`
        }
      )
      globalData[el.getAttribute(`data-chartKey`)].setOption(binding.value, true)
    },
    update(el, binding) {
      globalData[el.getAttribute(`data-chartKey`)].setOption(binding.value, true)
    }
  }
}
