let apipath = window['APIPATH'];

// 去掉末尾的 /
if (apipath.substr(-1) == '/') {
    apipath = apipath.substr(0, apipath.length - 1);
}

//console.log('apipath: ' + apipath);

export default apipath;