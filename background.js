// 接收到拦截的HTTP Response
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let response = request.data;
  let products = [];
  if (response.data.hasOwnProperty('productRealTimeList') && response.data.productRealTimeList.data.length > 0) {
    products = response.data.productRealTimeList.data;
  }
  if (response.data.hasOwnProperty('productList') && response.data.productList.data.length > 0) {
    products = response.data.productList.data;
  }
  if (products.length == 0) {
    return true;
  }

  let goto = "goto=";
  let result = [];
  products.forEach(function (p) {
    let wholeUrl = p.product.url;
    let startIndex = wholeUrl.indexOf(goto);
    if (startIndex >= 0) {
      let encodedUrl = wholeUrl.substring(startIndex + 5); // 截取字符串
      let decodedUrl = decodeURIComponent(encodedUrl); // 解码URL  
      result.push(decodedUrl);
    }
  });
  if (result.length > 0) {
    console.log(result);
  }
  return true;
});
