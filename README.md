# movie

本项目使用微信小程序云开发模式

1、云数据库构建

1）须在后台建立 movies, review, collection 三个数据库，分别存放电影详情、影评详情、收藏影评的相关数据。

2）其中只需要初始化 movies 数据库，可使用other目录下的movies.json文件初始化movies数据库。

3）其它两个数据库 collection和review 只需要在云数据库里创建文件夹，在用户发布影评和收藏影评时中会自动添加数据。

2、云存储

本项目拥有两个云存储目录，movies 和 sounds 。

其中，movies用来存放电影海报jpg图片文件，sounds用来存放用户发布的语音影评mp3文件。