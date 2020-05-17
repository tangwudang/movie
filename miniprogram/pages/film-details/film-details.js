// pages/film-details/film-details.js
const db = require('../../utils/db')
const util = require('../../utils/util.js')

const button = [{ title: "影评列表", image: "/images/search.png" },
  { title: "添加影评", image: "/images/add_review.png" },
  { title: "我的影评", image: "/images/add_review.png" } ]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null, //filmid
    detail: null,
    button: button,
    user: null,
    reviewed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getFilmDetails(id)
    this.fetchReviewOfOpenid(id)
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
          detail: data,
          id
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        user: userInfo
      })
    })
  },

  /**
   * 根据用户OpenId和电影Id获取影评信息
   * 若获取数据，则显示“我的影评”，若没有，则显示“添加影评”
   */
  fetchReviewOfOpenid: function (id) {
    //console.log(id)
    db.fetchReviewOfOpenId(id).then(({ result }) => {
      console.log(result)
      this.setData({
        review: !result.data || result.data.length == 0 ? null : result.data[0],
        reviewed: !result.data || result.data.length == 0 ? false : true
      })
    })
  },
  //影评列表
  firstHandle: function (event) {
    if (!this.data.user) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }
    const id = this.data.id
    wx.navigateTo({
      url: '/pages/review-list/review-list?id=' + id,
    })

  },
  //添加影评
  secondHandle: function (event) {
    if (!this.data.user) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }

    console.log(event)
    wx.showActionSheet({
      itemList: ["文字", "音频"],
      success: res => {
        console.log(res)
        let tag;
        if (res.tapIndex == 0) {
          tag = ''
        } else {
          tag = 'audio'
        }

        wx.navigateTo({
          url: `/pages/review-add/review-add?id=${this.data.id}&tag=${tag}`,
        })
      }
    })
  },
  //我的影评
  thirdHandle: function (event) {
    if (!this.data.user) {
      wx.showToast({
        title: '请先登录',
      })
      return
    }

    console.log(this.data.review)
    if (!this.data.review) return

    wx.navigateTo({
      url: '/pages/review-detail/review-detail?id=' + this.data.review._id,
    })
  }

})