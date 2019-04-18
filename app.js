App({

  onLaunch: function () {
    const host = this.globalData.url

    wx.login({
      success: (res) => {
        console.log('login res.code', res.code)
        console.log('url', host + 'login')
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log('receiving reply')
            console.log('res', res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
  globalData: {
    //  url: 'http://localhost:3000/api/v1/',
    // url: 'http://localhost:3001/api/v1/',
    // PRODUCTION BELOW
    url: 'https://nutriv.wogengapp.cn/api/v1/',
    max_calories: 3000,
    calories: 1000
  }
})

