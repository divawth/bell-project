import Yox from 'yox'
import * as YoxRouter from 'yox-router'
import * as bellUI from 'bell-ui'

import FooComponent from './component/foo/Foo'
import BarComponent from './component/bar/Bar'
import 'bell-ui/dist/bell-ui.css'

Yox.use(YoxRouter)
Yox.use(bellUI)

var router = new YoxRouter.Router({
  el: '#app',
  routes: [
    {
      path: '/foo',
      component: FooComponent
    },
    {
      path: '/bar',
      component: BarComponent
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