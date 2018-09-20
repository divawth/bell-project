
let fs = require('fs')
let path = require('path')
let etpl = require('./etpl')
let UADevice = require('ua-device')

let viewDir = path.join(__dirname, '../../view')
let filterDir = path.join(viewDir, '../tool/filter')
let targetDir = path.join(viewDir, 'common')

function minifyHTML(html) {
  return html.replace(/\n\s*/g, '')
}

function createEngine() {

  let engine = new etpl.Engine({
    // 清除命令标签前后的空白字符
    strip: true,
    // target 或 master 名字冲突时的处理策略
    // 冲突必须报错，否则出了问题太难搞
    namingConflict: 'error',
  })

  fs.readdirSync(filterDir).forEach(
    fileName => {
      if (fileName !== '.' && fileName !== '..') {
        engine.addFilter(
          path.basename(fileName, '.js'),
          require(path.join(filterDir, fileName))
        )
      }
    }
  )

  fs.readdirSync(targetDir).forEach(
    fileName => {
      if (fileName !== '.' && fileName !== '..') {
        engine.compile(
          minifyHTML(
            fs.readFileSync(path.join(targetDir, fileName), 'utf8')
          )
        )
      }
    }
  )

  return engine
}

let siteData = {
  host_origin: '',
  static_origin: '',
}

exports.render = function (context, file, data) {
  let ua = new UADevice(context.req.headers['user-agent'])
  let uaData = {
    browser: {
      name: ua.browser.name.toLowerCase(),
      version: ua.browser.version.original,
    },
    os: {
      name: ua.os.name.toLowerCase(),
      version: ua.os.version.original,
    },
    device: {
      type: ua.device.type,
      model: ua.device.model,
      manufacturer: ua.device.manufacturer,
    },
  }

  let userData = {
    id: '111',
    nickname: '',
    gender: 1,
    avatar: ''
  }

  let engine = createEngine()
  let content = fs.readFileSync(path.join(viewDir, file + '.html'), 'utf8')

  return engine.compile(minifyHTML(content))({
    ua_data: uaData,
    site_data: siteData,
    user_data: userData,
    tpl_data: data || { },
  })
}
