const util = require('./util')

const db = wx.cloud.database({
  env: 'movie-t57mh'
})

module.exports = {
  getRandomFilm() {
    return db.collection('movies').limit(1).get()
  },
  getRandomReview(filmid) {
    return db.collection('review').where({
      filmid
    }).limit(1).get()
  },
  getFilmList() {
    return db.collection('movies').get()
  },

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
      console.log(result)
      reslove({ result })
    })
  }),

}