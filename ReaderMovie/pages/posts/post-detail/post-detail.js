import { postsData } from '../../../data/posts-data';
//获取全局变量
let {globalData} = getApp();;

Page({
  data: {
    collected: false,
    postData: {},
    id: 0,
    isPlayMusic: false
  },

  onCollectionTap: function (e) {
    const postsCollected = wx.getStorageSync('postsCollected');
    const {id} = this.data;
    let collected = postsCollected[id];
    collected = !collected;
    wx.setStorageSync('postsCollected',
      Object.assign(
        postsCollected,
        { [id]: collected })
    )
    this.setData({
      collected: collected
    })

    const toastTitle = collected ?
      '收藏成功' :
      '取消收藏';

    wx.showToast({
      title: toastTitle
    })
  },

  onShareTap: e => {
    const itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList,
      itemColor: '#405f80',
      success: function (res) {
        //res.cancel
        //res.tapIndex
        if (res.cancel) {
          return;
        }
        wx.showModal({
          title: `用户分享到了${itemList[res.tapIndex]}`
        })
      }
    })
  },

  onMusic: function (e) {
    const {isPlayMusic,
      postData: {
        music: {
          dataUrl, title, coverImgUrl
        }
      }
    } = this.data;

    if (isPlayMusic) {
      wx.pauseBackgroundAudio({
        success: res => {
          this.setData({ isPlayMusic: false });
        }
      });
    } else {
      const {g_currentMusicId} = globalData;
      //构造异步promise
      new Promise((resolve, reject) => {
        //获取当前音乐源
        wx.getBackgroundAudioPlayerState({
          success: res => {
            (res.status !== 2) &&
              //若切换至其他页面页面，先将原音乐关闭再进行其他操作
              !g_currentMusicId && wx.stopBackgroundAudio();
              resolve('success');
          }
        })
      })
        .then((res, rej) => {
          console.log(res, rej)
          wx.playBackgroundAudio({
            dataUrl,
            title,
            coverImgUrl,
            success: res => {
              this.setData({ isPlayMusic: true });
            }
          })
        })

    }
  },

  setAudioMonitor: function (id) {
    //获取全局变量
    let {g_isPlayMusic, g_currentMusicId} = globalData;
    if (g_isPlayMusic && (g_currentMusicId === id)) {
      //若播放器未关闭且该详情页面为音乐播放页面
      this.setData({ isPlayMusic: true })
    } else {
      globalData.g_isPlayMusic = false;
      globalData.g_currentMusicId = null;
      //关闭不同页面的背景音乐
      // wx.stopBackgroundAudio();
    }


    //监听播放器启动
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayMusic: true
      })
      globalData.g_isPlayMusic = true;
      !g_currentMusicId && (globalData.g_currentMusicId = id);
    });

    //监听播放器暂停
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayMusic: false
      })
      globalData.g_isPlayMusic = false;
    });
  },

  onLoad: function (options) {
    // wx.clearStorageSync();
    // 生命周期函数--监听页面加载
    const {id} = options;
    const postData = postsData[id];
    this.setData({ postData });
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
    this.setAudioMonitor(id);
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