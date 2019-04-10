// pages/meals/add/add.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    toView: 'pic1',
    scrollTop: 100,
    inputShowed: false,
    inputVal: "",
    trueStatement: true,
    falseStatement: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const url = app.globalData.url;
    const page = this;

    wx.request({
      url: `${url}dishes`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        page.setData(res.data);
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

    let meal = {quantity: 1, user_id: user_id, dish_id: dish_id};

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

  mealMoreInfo(e) {
    const url = app.globalData.url;

    let dish_id = e.currentTarget.dataset.id;
    let user_id = app.globalData.userId;

    wx.navigateTo({
      url: `/pages/meals/save/save?id=${dish_id}`
    })
  },

  searchButtonInput: function (e) {
    console.log(e)
    let search = e.currentTarget.dataset.search
    const url = app.globalData.url
    const page = this;
    wx.request({
      url: `${url}dishes?search=${search}`,
      success(res) {
        console.log(res.data)
        page.setData(
          res.data
        );
      }
    })

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    const url = app.globalData.url;
    const page = this;
    
    this.setData({
      inputVal: ""
    });

    wx.request({
      url: `${url}dishes`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        page.setData(res.data);
      }
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
})