const {globalData: {doubanBase}} = getApp();

Page({
    data: {
        inTheaters: [],
        comingSoon: [],
        top250: []
    },
    getMovieListData: function (url) {
        return new Promise(function (resolve, reject) {
            wx.request({
                url,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    "Content-Type": "json"
                }, // 设置请求的 header
                success: function (res) {
                    // success
                    resolve({ [url]: res });
                },
                fail: function (err) {
                    // fail
                    reject(err);
                },
            })
        })
    },

    onLoad: function (e) {
        //起始位置与所需数据个数
        const
            start = 0,
            count = 3;
        const queryParam = `?start=${start}&count=${count}`;

        const
            inTheatersUrl = doubanBase + "/v2/movie/in_theaters" + queryParam,
            comingSoonUrl = doubanBase + "/v2/movie/coming_soon" + queryParam,
            top250Url = doubanBase + "/v2/movie/top250" + queryParam;

        const {getMovieListData} = this;

        let
            get_inTheaters = getMovieListData(inTheatersUrl),
            get_comingSoon = getMovieListData(comingSoonUrl),
            get_top250 = getMovieListData(top250Url);


        Promise.all([get_inTheaters, get_comingSoon, get_top250])
            .then(res => {
                let inTheaters, comingSoon, top250;
                res.map((item) => {
                    !inTheaters && (inTheaters = item[inTheatersUrl] && item[inTheatersUrl].data.subjects);
                    !comingSoon && (comingSoon = item[comingSoonUrl] && item[comingSoonUrl].data.subjects);
                    !top250 && (top250 = item[top250Url] && item[top250Url].data.subjects);
                })
                console.log(inTheaters, comingSoon, top250);
            })
            .catch(err => err);

    }
})