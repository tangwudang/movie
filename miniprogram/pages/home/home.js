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
    review: {
      filmId: 'CNUBDYRr62L3dM7qODNckqI285ozalPFgyKBWSqyMhNiniRJ',
      userId:'',
      userName: 'jack',
      userAvatar: '',
      reviewText: '这是一部好电影',
      soundUrl: '',
      soundTime: ''
    }
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
      console.log(this.data.userInfo)
    })

    console.log(this.data.userInfo)
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

  

})