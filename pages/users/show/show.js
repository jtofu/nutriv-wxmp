// pages/users/show/show.js

const app = getApp();

Page({
  data: {

  },
  
  onShow: function (options) {    
    const page = this;
    const url = app.globalData.url;    
    const id = app.globalData.userId;
    console.log(id)
    const userInfo = app.globalData.userInfo;
    const avatarUrl = app.globalData.userInfo.avatarUrl;
    console.log(avatarUrl)
    const nickName = userInfo.nickName;    
    wx.request({      
      url: `${url}users/${id}`,      
      method: "PUT",
      data: { profile_image: avatarUrl, username: nickName },
      success(res) {       
        const user = res.data;       
        page.setData(user);
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
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })   
    const page = this;
    const url = app.globalData.url;    
    const id = app.globalData.userId;
    const userInfo = app.globalData.userInfo;    
    const avatarUrl = app.globalData.userInfo.avatarUrl;    
    const nickName = userInfo.nickName;    
    wx.request({     
      url: `${url}users/${id}`,       
      method: "PUT",
      data: { profile_image: avatarUrl, username: nickName },
      success(res) {       
        const user = res.data;         
        page.setData(user);
      }
    })
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

  }
})