//本地存储
var localStorage = window.sessionStorage;
function get(name) {
  var value = localStorage.getItem(name);
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value);
  }
  return value;
}
function set(name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(name, value);
}
function remove(name) {
  return localStorage.removeItem(name);
}

//获取链接参数
function getparam(name, url) {
  var m, reg, tmp;
  url = (url || window.location.href).split('#');
  if (name.indexOf('#') != -1) {
    tmp = url.length < 2 ? '' : url[1];
  } else {
    tmp = url[0];
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'));
  if (m) {
    return decodeURIComponent(m[0].split('=')[1]);
  } else {
    return '';
  }
}

// ajaxpost同步请求
function ajaxPost_syn(url, data, success, error) {
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    async: false,
    // contentType: 'application/json;charset=UTF-8',
    data: data ? data : {},
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    }
  });
}

// ajaxpost异步请求
function ajaxPost(url, data, success, error) {
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    // contentType: 'application/json;charset=UTF-8',
    data: data ? data : {},
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    }
  });
}

// ajaxget请求 无缓存
function ajaxGet(url, data, success, error) {
  $.ajax({
    url: url,
    data: data ? data : {},
    //cache: false,
    beforeSend: function () {
      $(".loading").show();
    },
    success: function (data) {
      if (success) {
        success(data);
      }
    },
    complete: function () {
      $('.loading').hide();
    },
    error: function (data) {
      if (error) {
        error(data);
      }
    }
  });
}

//历史回退
function goBack() {
  window.history.back();
}


//返回登录
function goLogin() {
  window.location.href = path + '/login.html';
}

//信息提示
function layerMsg(msg) {
  layer.open({
    content: msg,
    skin: 'msg',
    time: 2
  });
}

//判断微信浏览器
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

//微信分享
function wxShareIn(title, desc, link, imgUrl) {
  var urljson = { "url": window.location.href.split('#')[0] };
  console.log(urljson);
  $.ajax({
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    url: wechatPath + "/wechat/official/weixShare",
    data: JSON.stringify(urljson),
    beforeSend: function () {
      // $(".loading").show();
    },
    success: function (data) {
      if (data.code == 1) {
        console.log(data.content);
        configIn(data.content);
      }
    },
    error: function () {
    },
    complete: function () {
      // $(".loading").hide();
    }
  });

  function configIn(data) {
    // console.log(data)
    wx.config({
      debug: false,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    });
    wx.ready(function () {
      //分享微信好友
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          //alert("success")
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      //分享给微信朋友圈
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

    });
  }
}

//文字滚动方法
function autoScroll(obj) {
  $(obj).animate({
      marginTop: "-0.6rem"
  }, 600, "linear", function () {
      $(this).css({marginTop: "0rem"}).find("li:first").appendTo(this);
  })
}
