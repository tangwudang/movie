// pages/mine/mine.js
const util = require('../../utils/util.js')
const db = require('../../utils/db.js')

Page({

  /**
   * Page initial data
   */
  data: {
    tabs: ['发布的影评', '收藏的影评'],
    curIndex: 0,
    user: null,
    release: [],
    collection: [],
  },

  onLoad: function (options) {
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        user: userInfo
      })
      wx.startPullDownRefresh()
    })
  },

  onPullDownRefresh: function () {
    this.fetchCollectionOfOpenId()
    this.fetchReviewByOpenId()
  },

  onGotUserInfo(event) {
    this.setData({
      user: event.detail.userInfo
    })
    this.fetchCollectionOfOpenId()
    this.fetchReviewByOpenId()
  },

  fetchReviewByOpenId(){
    db.getMyReviewByOpenId().then(({ result }) => {
      wx.stopPullDownRefresh()
      const { data } = result

      this.setData({
        release: data
      })

      if (this.data.curIndex == 0) {
        this.setData({ review: this.data.release })
      } else {
        this.setData({ review: this.data.collection })
      }

    }).catch(error => {
      wx.stopPullDownRefresh()
    })
  },

  fetchCollectionOfOpenId() {
    const user = this.data.user
    console.log(user)
    if (user) {
      db.fetchCollectionOfOpenId().then(({ result }) => {
        wx.stopPullDownRefresh()
        const { data } = result

        // let collection = []
        // data.map(it => {
        //   if (it.userOpenId == it.openId) {
        //     collection.push(it)
        //   } 
        // })

        this.setData({
          collection: data
        })

        if (this.data.curIndex == 0) {
          this.setData({ review: this.data.release })
        } else {
          this.setData({ review: this.data.collection })
        }

      }).catch(error => {
        wx.stopPullDownRefresh()
      })
    } else {
      wx.stopPullDownRefresh()
    }

  },

  backToStart() {
    wx.navigateBack({})
  },

  audioPlay: function (event) {
    const soudUrl = event.detail
    console.log(soudUrl)
    if (!soudUrl) return

    var tempSound = util.midstr(soudUrl)
    console.log(tempSound)
    wx.playBackgroundAudio({
      dataUrl: tempSound,
    })
  },

  //选项卡切换事件
  clickTab: function (event) {
    console.log(event)
    const current = event.currentTarget.dataset.current
    if (current == 0) {
      this.setData({ review: this.data.release, curIndex: current })
    } else {
      this.setData({ review: this.data.collection, curIndex: current })
    }
  },

  swiperTab: function (e) {
    const current = e.detail.current
    if (current == 0) {
      this.setData({ review: this.data.release, curIndex: current })
    } else {
      this.setData({ review: this.data.collection, curIndex: current })
    }
  },

  onItemClick: function (event) {
    console.log(event)
    const id = event.currentTarget.id
    const openId = event.currentTarget.openId
    //const openId = event.detail
    wx.navigateTo({
      url: `/pages/review-detail/review-detail?id=${id}&openId=${openId}`,
    })
  }

})