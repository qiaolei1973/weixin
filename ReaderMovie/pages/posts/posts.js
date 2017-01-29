// pages/posts/posts.js
import { postsData } from '../../data/posts-data';
Page({
  data: {
    posts_key: []
  },
  onPostTap: e => {
    const {postId} = e.currentTarget.dataset;

    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      posts_key: postsData
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})