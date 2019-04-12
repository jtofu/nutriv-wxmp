// pages/meals/index/index.js

const wxCharts = require('../../../utils/wxcharts.js');
const app = getApp();
const order = ['pic1', 'pic2', 'pic3', 'pic4']
let pieChart = null;

Page({
  data: {
    toView: 'pic1',
    scrollTop: 100, 
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },

  formatDate(currentDate) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = currentDate.getDate();
    var monthIndex = currentDate.getMonth();
    var year = currentDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  },

  onLoad: function (e) {
    const currentDate = new Date();
    console.log('todaysDate', currentDate);
    const formattedDate = this.formatDate(currentDate);
    console.log('formatted', formattedDate)
    this.setData({
      currentDate: formattedDate
    })

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: 'Calories',
        data: 800,
        color: 'lightgrey',
      }, {
        name: 'Proteins',
        data: 65,
      }, {
        name: 'Fat',
        data: 10,
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },

  /**
   * Page initial data
   */
  // data: {
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
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    const page = this;
    const url = app.globalData.url;
    const user_id = app.globalData.userId;
    console.log(user_id)

    wx.request({
      // url: `${url}dishes`,
      url: `${url}meals?user_id=${user_id}`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        const meals = res.data.meals;
        // page.setData(res.data);
        console.log('meals', meals);
        page.setData({
          meals: meals
        })
        
      }
    });
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

  
})
