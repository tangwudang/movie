// pages/film-details/film-details.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmDetails: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getFilmDetails(id)
  },

  getFilmDetails(id) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getFilmDetails(id).then(result => {
      wx.hideLoading()
      let data = result.result
      if (data) {
        this.setData({
          filmDetails: data,
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})