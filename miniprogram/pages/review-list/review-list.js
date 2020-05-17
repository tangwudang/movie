// pages/review-list/review-list.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })

    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function () {
    this.fetchReview()
  },

  fetchReview: function () {
    const id = this.data.id
    db.fetchReview(id).then(({ result }) => {
      wx.stopPullDownRefresh()
      const { review } = result
      //console.log(review)
      this.setData({
        review
      })
    }).catch(error => {
      wx.stopPullDownRefresh()
    })
  },

  audioPlay: function (event) {
    const id = event.target.id
    var tempSound = util.midstr(id)
    //console.log(tempSound)

    wx.playBackgroundAudio({
      dataUrl: tempSound,
    })
  },

  backToStart: function () {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  toReviewDetail: function (event) {
    console.log(event)
    const id = event.currentTarget.id //_id,reviewId
    const openId = event.currentTarget.dataset.openid
    wx.navigateTo({
      url: `/pages/review-detail/review-detail?id=${id}&openId=${openId}`,
    })
  }
})