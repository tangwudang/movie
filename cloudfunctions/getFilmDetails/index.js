// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const id = event.id
  console.log(event)
  const filmRes = await db.collection('movies').doc(id).get()
  console.log(filmRes)
  const filmDetails = filmRes.data

  return filmDetails
}