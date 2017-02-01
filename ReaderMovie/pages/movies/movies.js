const {globalData: {doubanBase}} = getApp();

Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {}
    },
    getMovieListData: function (url, key) {
        const {processData} = this;
        // return new Promise(function (resolve, reject) {
        wx.request({
            url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "json"
            }, // 设置请求的 header
            success: (res) => {
                // success
                // resolve({ [url]: res });
                const data = processData(res.data);
                this.setData({
                    [key]:data
                })

            },
            fail: (err) => {
                // fail
                // reject(err);
            },
        }).bind(this);
        // })
    },

    processData: function (data) {
        const {title, subjects} = data;

        let temp = {};
        temp.title = title;

        temp.subjects = subjects.map((item) => {
            const {
                id,
                title,
                rating: { average },
                images: { large }
            } = item;

            return {
                id,
                title,
                average,
                image: large
            };
        })
        return temp;
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

        getMovieListData(inTheatersUrl, 'inTheaters');
        getMovieListData(comingSoonUrl, 'comingSoon');
        getMovieListData(top250Url, 'top250');

        // Promise.all([
        //     getMovieListData(inTheatersUrl),
        //     getMovieListData(comingSoonUrl),
        //     getMovieListData(top250Url)
        // ])
        //     .then(res => {
        //         let inTheaters, comingSoon, top250;

        //         res.map((item) => {
        //             //
        //             !inTheaters &&
        //                 (inTheaters = item[inTheatersUrl] &&
        //                     processData(item[inTheatersUrl].data));
        //             //
        //             !comingSoon &&
        //                 (comingSoon = item[comingSoonUrl] &&
        //                     processData(item[comingSoonUrl].data));
        //             //
        //             !top250 &&
        //                 (top250 = item[top250Url] &&
        //                     processData(item[top250Url].data));
        //         })

        //         this.setData({
        //             inTheaters,
        //             comingSoon,
        //             top250
        //         })
        //     })
        //     .catch(err => console.log(err));

    }
})