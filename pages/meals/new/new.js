// pages/meals/new/new.js
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
    const url = app.globalData.url;
    const userId = app.globalData.userId;
    const page = this;
    console.log(11,userId);
    wx.request({
      url: `${url}dishes`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        page.setData(res.data);
      }
    });

    wx.request({
      url: `${url}goals?user_id=${userId}`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        const goals = res.data.goals;
        page.setData({
          goals: goals
        });
      }
    });
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

  addNewMeal() {
    wx.navigateTo({
      url: '/pages/meals/add/add',
    })
  },

  scanQrCode() {
    // Allow scanning from camera only
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }
})