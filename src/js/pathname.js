import $ from 'jquery';
import { getCookie, setCookie } from './cookie';


/**
 * 从cookie中获取pathname数组
 *
 * @returns {{pathnames:String[],idx:Number}}
 */
function getPathnames() {
    let pathname = getCookie("pathnames");
    let pathnames = [];
    let idx = -1;
    if (pathname) {
        pathnames = pathname.split('|');
    }
    if (pathnames.length > 0 && $.isNumeric(pathnames[0])) {
        idx = parseInt(pathnames[0]);
    }
    pathnames = pathnames.slice(1);
    return { pathnames, idx };
}


/**
 * 设置pathnames信息到cookie
 *
 * @param {{pathnames:String[],idx:Number}}
 */
function setPathnames({ pathnames, idx }) {
    let cvalue = idx;
    if ($.isArray(pathnames) && pathnames.length > 0) {
        cvalue += "|" + pathnames.join("|");
    }
    setCookie("pathnames", cvalue);
}

export { getPathnames, setPathnames };