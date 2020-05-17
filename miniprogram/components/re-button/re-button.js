// components/re-button/re-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    target: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navToTarget: function (event) {
      const id = event.currentTarget.id
      this.triggerEvent("ToTarget", id)
    }
  }
})
