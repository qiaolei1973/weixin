import { postsData } from '../../../data/posts-data';

Page({
  data: {

  },
  onCollectionTap: function (e) {
    const postsCollected = wx.getStorageSync('postsCollected');
    const id = this.data.id;
    let collected = postsCollected[id];
    collected = !collected;
    console.log(collected);
    wx.setStorageSync('postsCollected',
      Object.assign(
        postsCollected,
        { [id]: collected })
    )
    this.setData({
      collected: collected
    })
  },
  onShareTap: e => {
    const key = wx.getStorageSync('key');
  },

  onLoad: function (options) {
    // wx.clearStorageSync();
    // 生命周期函数--监听页面加载
    const {id} = options;
    const postData = postsData[id];
    this.setData(postData);
    this.setData({ id });

    let postsCollected = wx.getStorageSync('postsCollected');

    if (postsCollected) {
      const collected = postsCollected[id];
      this.setData({ collected: collected });
    } else {
      wx.setStorageSync('postsCollected',
        {
          [id]: false
        }
      )
    }
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})