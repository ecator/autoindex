/**
 * 设置cookie，仅当前会话有效
 *
 * @param {String} cname
 * @param {String} cvalue
 */
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; path=/; SameSite=Strict";
}


/**
 * 从cookie中获取指定值
 *
 * @param {String} cname
 * @returns {String} 
 */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { setCookie, getCookie };