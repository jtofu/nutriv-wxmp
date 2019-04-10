// pages/meals/save/save.js
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
    const page = this;
    const url = app.globalData.url;
    wx.request({
      url: `${url}dishes/${options.id}`,
      method: 'GET',
      success(res) {
        const dish = res.data;
        page.setData(dish)
        console.log(11, dish)
      }
    })
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

  addToMeal(e) {
    console.log(e)
    const url = app.globalData.url;

    let dish_id = e.currentTarget.dataset.id;
    let user_id = app.globalData.userId;

    let meal = { quantity: 1, user_id: user_id, dish_id: dish_id };

    wx.request({
      url: `${url}meals`,
      method: "POST",
      data: meal,
      success(res) {
        console.log(res)
        wx.switchTab({
          url: `/pages/meals/index/index?user_id=${user_id}`
        })
      }
    })
  },
})