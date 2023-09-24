let targetUrl = 'https://api.youshu.youcloud.com/graphql';
let targetOrigin = 'https://console.youshu.youcloud.com';

// content_script与inject_script的消息通知通过postMessage进行
// 监听inject_script发出的消息
window.addEventListener("message", (e) => {
    if (!e.data || Object.keys(e.data).length === 0) {
        return;
    }
    // 检查收到的message是否是要监听的
    if (!targetOrigin
        || e.origin.indexOf(targetOrigin) === -1
        || !targetUrl
        || !e.data.url
        || e.data.url.indexOf(targetUrl) === -1
    ) {
        return;
    }

    let responseDataList = null;
    // 使用try-catch兼容接收到的message格式不是对象的异常情况
    try {
        responseDataList = JSON.parse(e.data.response);
        // 发消息给background.js，并接收其回复
        chrome.runtime.sendMessage({ data: responseDataList }, {}, function (res) {
            // 回调函数
            // do something ...
        })
    } catch (e) {
        alert('获取的数据有误，请联系管理员！');
    }

}, false);
