// pages/posts/posts.js
Page({
  data: {
    posts_key: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const posts_data = [
      {
        date: 'Nov 12 2016',
        title: '战场原黑仪',
        content: '《地球脉动第二季》是由英国广播电视中心公司制作的电视剧纪录片，由大卫·艾登堡执导并解说，该剧于2016年11月6日在英国首播。《地球脉动第二季》将运用同样的前瞻性思维，在三年中采用超高清4K摄影机拍摄，同时使用了无人机和远程控制拍摄技术',
        view_num: '112',
        collect_num: '99',
        author_img: '/images/zhanchangyuan.jpg',
        content_img: '/images/zhanchangyuan.jpg'
      },
      {
        date: 'Nov 12 2016',
        title: '悠哉日常大王1',
        content: '《地球脉动第二季》是由英国广播电视中心公司制作的电视剧纪录片，由大卫·艾登堡执导并解说，该剧于2016年11月6日在英国首播。《地球脉动第二季》将运用同样的前瞻性思维，在三年中采用超高清4K摄影机拍摄，同时使用了无人机和远程控制拍摄技术',
        view_num: '122',
        collect_num: '92',
        author_img: '/images/youzai1.jpg',
        content_img: '/images/youzai1.jpg'
      },
      {
        date: 'Jam 03 2017',
        title: '悠哉日常大王2',
        content: '《地球脉动第二季》是由英国广播电视中心公司制作的电视剧纪录片，由大卫·艾登堡执导并解说，该剧于2016年11月6日在英国首播。《地球脉动第二季》将运用同样的前瞻性思维，在三年中采用超高清4K摄影机拍摄，同时使用了无人机和远程控制拍摄技术。',
        view_num: '122',
        collect_num: '92',
        author_img: '/images/youzai1.jpg',
        content_img: '/images/youzai2.jpg'
      }
    ]
    this.setData({
      posts_key: posts_data
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