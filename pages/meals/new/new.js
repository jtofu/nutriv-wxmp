// pages/meals/new/new.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    array: [],
    index: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const url = app.globalData.url;
    const user_id = app.globalData.userId;
    const page = this;
    // const array = [];

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        page.setData({
          current_latitude: latitude,
          current_longitude: longitude
        })
        console.log("location", `${page.data.current_latitude}, ${page.data.current_longitude}`);
      }
    });

    wx.request({
      url: `${url}users/${user_id}`,
      success(res) {
        console.log('res.data', res.data)
        const data = res.data
        
        if (data.goals.length <= 0) {
          page.setData({ no_goals: true })
        } else {
          const diffCal = data.goalCal - data.todayCal
          const diffProtein = data.goalProtein - data.todayProtein
          const diffFat = data.goalFat - data.todayFat
          const diffCarb = data.goalCarb - data.todayCarb
          const diffCholestrol = data.goalCholestrol - data.todayCholestrol
          const diffSatFat = data.goalSatFat - data.todaySatFat
          const diffTransFat = data.goalTransFat - data.todayTransFat
          const diffFiber = data.goalFiber - data.todayFiber
          const diffSodium = data.goalSodium - data.todaySodium
          const diffSugar = data.goalSugar - data.todaySugar
          const goals = []

          data.goals.forEach((goal) => {
            goals.push(goal["name"])
          })

          console.log('goals', goals)

          page.setData({
            array: goals,
            todayCal: data.todayCal,
            todayProtein: data.todayProtein,
            todayFat: data.todayFat,
            todayCarb: data.todayCarb,
            todayCholestrol: data.todayCholestrol,
            todaySatFat: data.todaySatFat,
            todayTransFat: data.todayTransFat,
            todayFiber: data.todayFiber,
            todaySodium: data.todaySodium,
            todaySugar: data.todaySugar,
            diffCalories: diffCal,
            diffProtein: diffProtein,
            diffTotalFat: diffFat,
            diffCarbohydrate: diffCarb,
            diffCholestrol: diffCholestrol,
            diffSaturatedFat: diffSatFat,
            diffTransFattyAcid: diffTransFat,
            diffDietaryFiber: diffFiber,
            diffSodium: diffSodium,
            diffSugars: diffSugar,
            meals: data.meals
          })
          page.setMealsRecommended();
          page.getDistanceFromLatLonInKm(page.data.current_latitude, page.data.current_longitude, page.data.latitude, page.data.longitude);
        }
        
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
        console.log(res);
        wx.navigateTo({
          url: "/"+res.path,
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.setMealsRecommended();
  },

  setMealsRecommended() {
    const url = app.globalData.url;
    const page = this;
    const nutrient = page.data.array[page.data.index]
    console.log('nutrient', nutrient)
    const diffNutrient = `diff${nutrient.replace(" ", "")}`
    const amount = page.data[`${diffNutrient}`]
    console.log('amount', amount)
    

    wx.request({
      url: `${url}dishes?nutrient=${nutrient}&amount=${amount}`,
      success(res) {
        console.log('filtered dishes', res.data.dishes)
        const dishes = res.data.dishes
        
        const nutrientAmount = [];
        
        dishes.forEach((dish) => {
          dish.nutrients.forEach((n) => {
            if (n["name"] === nutrient) {
              nutrientAmount.push(`${n["name"]}: ${n["amount"]} ${n["unit"]}`)
              // const nutrientUnit = n["unit"]
            }
          })   
        })

        page.setData({
          dishes: dishes,
          nutrientAmount: nutrientAmount,
        })
      }
    })
     
  },

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const page = this;
    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    };
    var R = 6371; // Radius of the earth in km
    console.log('location passthrough', lon1, lat1)
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    page.setData({
      distance: d
    });
    console.log('distance', page.data.distance);
  }
})