import $ from 'jquery';
import { getPathnames, setPathnames } from './pathname';

/**
 * 判断是否可以返回上一个页面
 *
 * @returns {Boolean} 
 */
function canBackPage() {
    let { pathnames, idx } = getPathnames();
    if (idx <= 0 || pathnames.length == 0) {
        return false;
    }
    return true;
}

/**
 * 返回上一个页面
 *
 */
function backPage() {
    let { pathnames, idx } = getPathnames();
    idx--;
    setPathnames({ pathnames, idx });
    location.href = pathnames[idx];
}


/**
 * 判断是否可以向前一个页面
 *
 * @returns {Boolean} 
 */
function canForwardPage() {
    let { pathnames, idx } = getPathnames();
    if (idx == -1 || pathnames.length == 0 || idx == pathnames.length - 1) {
        return false;
    }
    return true;
}

/**
 * 向前一个页面
 *
 */
function forwardPage() {
    let { pathnames, idx } = getPathnames();
    idx++;
    setPathnames({ pathnames, idx });
    location.href = pathnames[idx];
}


/**
 * 向导航栏插入路径信息
 *
 * @param {Number} 要显示的最大路径数量
 */
function insertNavpath(num) {
    let navBtns = $("#navBtns");
    let pathnames = location.pathname.split('/').filter(item => item != "")
    let n = pathnames.length;
    let url = '/';
    let navItem = $(`<a class="navbar-item nav-path" href="${url}">/</a>`);
    navBtns.after(navItem);
    navBtns = navItem;
    for (let i = n - num; i < n; i++) {
        if (i >= 0) {
            url = '/' + pathnames.slice(0, i + 1).join('/');
            let name = decodeURI(pathnames[i]);
            if (i == n - num && i > 0) {
                name = "..." + name;
            }
            navItem = $(`<a class="navbar-item nav-path" href="${url}">${name}</a>`);
            navBtns.after(navItem);
            navBtns = navItem;
        }
    }
}


/**
 * 向导航历史中增加一条记录
 *
 */
function pushNav() {
    let { pathnames, idx } = getPathnames();
    if (pathnames.length == 0 || pathnames[pathnames.length - 1] != this.href) {
        pathnames.push(this.href);
    }
    idx = pathnames.length - 1
    setPathnames({ pathnames, idx });
}

export { canBackPage, backPage, canForwardPage, forwardPage, insertNavpath, pushNav };