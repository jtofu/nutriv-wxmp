App({

  onLaunch: function () {
    // const host = 'http://localhost:3001/api/v1/'
    const host = 'http://localhost:3000/api/v1/'


    wx.login({
      success: (res) => {
        // console.log(res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            // console.log(res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
  globalData: {
    url: 'http://localhost:3000/api/v1/'
    // url: 'http://localhost:3001/api/v1/'
  }
})

