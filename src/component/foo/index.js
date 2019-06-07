import template from './index.html'
import './index.styl'
import image from '../../assets/imgs/image1.png'

export default {
  template,
  data () {
    return {
      title: 'foo',
      img: image
    }
  }
}