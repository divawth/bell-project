import Yox from 'yox'
import './style/base.styl'
import template from './main.html'
console.log('>>>>', template)
new Yox({
  el: '#app',
  template: template
})