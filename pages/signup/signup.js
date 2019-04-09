// pages/signup/signup.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getUserInfo: function (e) {
    console.log(22, e)
    app.globalData.userInfo = e.detail.userInfo
    console.log('globalData', app.globalData.userInfo)
    // console.log(app.globalData.userInfo)

    this.setData({
      userInfo: e.detail.userInfo
    })
    wx.switchTab({
      url: `../meals/index/index`
    })
  },

})