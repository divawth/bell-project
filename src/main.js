/**
 * @file 入口
 * @author wangtianhua
 */
define(function (require, exports, module) {

  'use strict';

  exports.init = function () {

    var yox = new Yox({
      
      el: '#app',
      template: require('tpl!./main.html'),

      data: function () {
        return {
          
        }
      },


      methods: {
        
      },

      afterMount: function () {

      }
      
    });

  }
});