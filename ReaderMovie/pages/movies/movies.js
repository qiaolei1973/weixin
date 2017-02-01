Page({
    onLoad:function(e){
        wx.request({
          url: 'https://api.douban.com/v2/movie/top250',
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
              "Content-Type":"json"
          }, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
          },
          fail: function() {
            // fail
            console.log('fail');
          },
          complete: function() {
            // complete
          }
        })
    }
})