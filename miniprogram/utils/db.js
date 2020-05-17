const util = require('./util')

const db = wx.cloud.database({
  env: 'movie-t57mh'
})

module.exports = {
  getRandomFilm() {
    return db.collection('movies').limit(1).get()
  },
  getRandomReview(id) {
    return db.collection('review').where({
      id
    }).limit(1).get()
  },
  getFilmList() {
    return db.collection('movies').get()
  },
  getMyReviewByOpenId: () => new Promise((reslove, reject) => {
    wx.cloud.callFunction({
      name: 'fetchMyReviewByOpenId',
      data: {
      }
    }).then(res => {
      const { result } = res
      reslove({ result })
    })
  }),
  getFilmDetails(id) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: "getFilmDetails",
          data: {
            id
          }
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },

  fetchReviewOfOpenId: (id) => new Promise((reslove, reject) => {
    wx.cloud.callFunction({
      name: 'fetchReviewOfOpenid',
      data: {
        id
      }
    }).then(res => {
      const { result } = res
      //console.log(result)
      reslove({ result })
    })
  }),

  /**
     * 发布影评：（电影Id, 电影图片，电影名，用户信息， 影评，音频）
     */
  releaseReview: (id, image, name, user, review, soudUrl, recordingTime) => new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'add-review',
      data: {
        id,
        image,
        name,
        user,
        review,
        soudUrl,
        recordingTime
      }
    }).then(result => {
      console.log(result)
      resolve({ result })
    })
  }),

  //根据电影Id获取对应的影评
  fetchReview: (id) => new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getReviewByFilmId',
      data: {
        id: id
      }
    }).then(res => {
      //console.log(res)
      const { result } = res
      resolve({ result })
    })
  }),

  //根据openId和电影ID获取影评信息
  fetchReviewOfId: (openId, id) => new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'fetchReviewOfId',
      data: {
        openId,
        id
      }
    }).then(res => {
      console.log(res)
      const { result } = res
      resolve({ result })
    })
  }),

  fetchReviewOfOpenId: (id) => new Promise((reslove, reject) => {
    wx.cloud.callFunction({
      name: 'fetchReviewOfOpenid',
      data: {
        id
      }
    }).then(res => {
      console.log(res)
      const { result } = res
      console.log(result)
      reslove({ result })
    })
  }),

  //收藏影评 （电影id, 电影名字，电影图片，影评人信息，影评内容）
  //addOrCollection: 用于判定用户是自己发布Or收藏
  collection: (reviewRes, userOpenId) => new Promise((reslove, reject) => {
    wx.cloud.callFunction({
      name: 'collection',
      data: {
        res: reviewRes,
        userOpenId
      }
    }).then(res => {
      console.log(res)
      const { result } = res
      reslove({ result })
    })
  }),

  //获取收藏影评
  fetchCollectionOfOpenId: () => new Promise((reslove, reject) => {
    wx.cloud.callFunction({
      name: 'fetchCollectionOfOpenid'
    }).then(res => {
      console.log(res)
      const { result } = res
      console.log(result)
      reslove({ result })
    })
  }),
}