// pages/meals/index/index.js
const wxCharts = require('../../../utils/wxcharts.js');
const app = getApp();
const order = ['pic1', 'pic2', 'pic3', 'pic4']
let pieChart = null;
let max_calories = app.globalData.max_calories;
var lineChart = null;
const user_id = app.globalData.userId;
const url = app.globalData.url;


Page({
  data: {
    toView: 'pic1',
    scrollTop: 100, 
    scaleTextStyle: {
      show: true,
      size: 12,
      color: '#666'
    },
    indicatorTextStyle: {
      show: true,
      size: 16,
      text: 'Calories'
    },
    indicatorValueStyle: {
      show: true,
      size: 55,
      color: '#4575e8'
    },
    indicatorCircleStyle: {
      show: true,
      boderColor: [
        {
          progress: 0,
          value: "#4575e8"
        },
        {
          progress: 1,
          value: "#fff"
        }
      ]
    }
  },
  // touchHandler: function (e) {
  //   console.log(pieChart.getCurrentDataIndex(e));
  // },

  // FOR LINE CHART
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
  },
  createSimulationData: function () {
    var categories = [];
    let data = [];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;

    for (var i = 6; i >= 0; i--) {
      categories.push(`${month}-${day - i}`);
      data.push(Math.random() * (2000 - 1000) + 1000);
    }

    return {
      categories: categories,
      data: data
    }
  },
  // END OF LINE CHART

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

    // return monthNames[monthIndex] + ' ' + year;
    return `${monthNames[monthIndex]} ${day}, ${year}`
  },

  onLoad: function (e) {
    // SET TODAY'S DATE and PROFILE IMAGE
    const currentDate = new Date();
    console.log('todaysDate', currentDate);
    const formattedDate = this.formatDate(currentDate);
    console.log('formatted', formattedDate);
    const avatarUrl = app.globalData.userInfo.avatarUrl;

    this.setData({
      currentDateNoFormat: currentDate,
      currentDate: formattedDate,
      avatarUrl: avatarUrl
    });


    // GET USER'S GOALS and CURRENT MEAL's NUTRIENTS
    const page = this;
    const url = app.globalData.url;
    const user_id = app.globalData.userId;
    console.log(user_id)

    wx.request({
      url: `${url}users/${user_id}`,
      success(res) {
        console.log('new api request res', res)
        const data = res.data
        page.setData({
          calories: data.goalCal,
          protein: data.goalProtein,
          fat: data.goalFat,
          todayCal: data.todayCal,
          todayFat: data.todayFat,
          todayProtein: data.todayProtein,
          last7d: data.last7d
        })

        data.meals.forEach((meal) => {
          let mealDate = page.formatDate(new Date(meal.date));
          meal.date = mealDate
        })
        page.setData({
          meals: data.meals
        })

        page.renderChart();
      }
    })

    
    ////////////////////////////////////

  //   var windowWidth = 320;
  //   try {
  //     var res = wx.getSystemInfoSync();
  //     windowWidth = res.windowWidth;
  //   } catch (e) {
  //     console.error('getSystemInfoSync failed!');
  //   }

  //   pieChart = new wxCharts({
  //     animation: true,
  //     canvasId: 'pieCanvas',
  //     type: 'pie',
  //     series: [{
  //       name: 'Calories',
  //       data: 800,
  //       color: 'lightgrey',
  //     }, {
  //       name: 'Proteins',
  //       data: 65,
  //     }, {
  //       name: 'Fat',
  //       data: 10,
  //     }],
  //     width: windowWidth,
  //     height: 300,
  //     dataLabel: true,
  //   });
  },

  renderChart: function () {
    let page = this
    var windowWidth = 300;

    var simulationData = this.createSimulationData();
    var chartData = page.data.last7d
    console.log('chartData', chartData)
    console.log('simulationData.data', simulationData.data)

    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: 'Last 7D Calories Intake',
        data: chartData,
        format: function (val, name) {
          return val.toFixed(1);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        // title: 'Calories',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0,
        max: page.data.calories // 3000
      },
      width: windowWidth,
      height: 220,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
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