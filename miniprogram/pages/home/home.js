// pages/home/home.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    filmDetail: null,
    review: null
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRandomFilm()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })

  },

  getRandomFilm: function () {
    wx.showLoading({
      title: '加载中...',
    })
    db.getRandomFilm().then(result => {
      wx.hideLoading()
      const filmDetail = result.data[0]
      if (filmDetail) {
        this.setData({
          filmDetail
        })

        this.getRandomReview()
      }
    })
  },

  getRandomReview() {
    let filmid = this.data.filmDetail._id
    db.getRandomReview(filmid).then(result => {
      wx.hideLoading()
      console.log(result)
      const reviewData = result.data[0]

      if (reviewData) {
        this.setData({
          review: reviewData
        })
      }
    })
  },

  //热门 点击事件
  toHotHandle: function () {
    wx.navigateTo({
      url: '/pages/film-list/film-list',
    })
  },

  //我的 点击事件
  toMineHandle: function () {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },

  //电影详情 点击事件
  toDetail: function (event) {
    console.log(event)
    const id = event.target.id //filmId
    wx.navigateTo({
      url: `/pages/film-details/film-details?id=${id}`,
    })
  },

  //推荐跳转到影评详情，影评ID
  toReviewDetail: function (event) {
    console.log(event)
    const id = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/review-detail/review-detail?id=${id}&openId=${this.data.review.openId}`,
    })
  },

})