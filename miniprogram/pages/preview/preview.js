// pages/preview/preview.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')

const button = [{ title: "重新编辑", image: "/images/search.png" },
{ title: "发布影评", image: "/images/add_review.png" }]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    button: button,
    user: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        user: userInfo
      })
    })

    console.log(options)
    const { id, input, soudUrl, recordingTime, isShow } = options
    this.setData({
      id,
      input,
      soudUrl,
      recordingTime,
      isShow
    })

    this.getFilmDetails(options.id)
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
          movie: data,
          image: data.imageurl,
          name: data.filmname,
          id: data._id
        })
      }
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },

  //重新编辑
  reEditorHandle: function (event) {
    wx.navigateBack({})
  },

  //播放录音
  audioPlay: function () {
    const soudUrl = this.data.soudUrl
    console.log(soudUrl)
    if (!soudUrl) return

    var tempSound = util.midstr(soudUrl)
    console.log(tempSound)
    wx.playBackgroundAudio({
      dataUrl: tempSound,
    })
  },

  //发布影评
  releaseHandle: function (event) {
    const movie = this.data.movie
    db.releaseReview(movie._id, movie.imageurl, movie.filmname, this.data.user, this.data.input, this.data.soudUrl, this.data.recordingTime).then(({ result }) => {

      const reviewRes = {
        id: movie._id,
        image: movie.imageurl,
        name: movie.filmname,
        review: this.data.input,
        soudUrl: this.data.soudUrl,
        user: this.data.user,
        recordingTime: this.data.recordingTime
      }

      //console.log(reviewRes)

      wx.navigateTo({
        url: '/pages/review-list/review-list?id=' + movie._id,
      })

    })
  }

})