// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'movie-t57mh'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const id = event.id //reviewId
  const openId = event.openId ? event.openId : wxContext.OPENID

  const reviewRes = await db.collection("review").doc(id).get()
  const review = reviewRes.data

  review.isTheUser = review.openId == wxContext.OPENID ? true : false

  return { review }

  // const openId = event.openId ? event.openId : wxContext.OPENID

  // const reviewRes = await db.collection("review").where({ openId, id }).get()

  // const review = reviewRes.data
  // review.map(it => {
  //   it.isTheUser = it.openId == wxContext.OPENID ? true : false

  //   return it
  // })

  // return { review }
}