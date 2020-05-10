// pages/film-list/film-list.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilmList();
  },

  onPullDownRefresh: function () {
  },

  //获取电影列表
  getFilmList() {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getFilmList().then(result => {
      wx.hideLoading()
      const data = result.data
      if (data) {
        this.setData({
          filmList: data
        })
      }
      wx.stopPullDownRefresh()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  //跳转到详情页
  redirectToDetails(event) {
    let id = event.currentTarget.dataset.filmid
    wx.navigateTo({
      url: '../film-details/film-details?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})