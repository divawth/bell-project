import Yox from 'yox'
import * as YoxRouter from './yox-router'

import fooComponent from './component/foo/index'
import barComponent from './component/bar/index'

console.log(YoxRouter)
Yox.use(YoxRouter)

var router = new YoxRouter.Router({
  el: '#app',
  routes: [
    {
      path: '/foo',
      component: fooComponent
    },
    {
      path: '/bar',
      component: barComponent
    }
  ],
  route404: {
    path: '/404',
    component: {
      template: '<div>not found</div>'
    }
  }
})

router.start()