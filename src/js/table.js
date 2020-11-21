import $ from 'jquery';

import apipath from './apipath';

/**
 * 递归搜索指定路径的文件并显示
 *
 * @param {String} pathname
 * @param {Boolean} recurse
 * @param {String} glob
 */
function searchFiles(pathname, recurse, glob) {
    if (pathname.substr(-1) != '/') {
        pathname += '/';
    }
    $.getJSON(apipath + pathname, function (data, status) {
        //console.log(data, status);
        let pattern = glob.replace(/\./g, '\\.');
        pattern = pattern.replace(/\*/g, '.*');
        pattern = pattern.replace(/\?/g, '.?');
        pattern = new RegExp('(' + pattern + ')', 'ig');
        //console.log(pattern);
        data = data.filter(item => {
            if (item['type'] == 'directory' || !glob) {
                return true;
            }
            if (item['name'].match(pattern)) {
                return true;
            }
        });
        data.map((item) => item['fullname'] = pathname + item['name']);
        for (let i = 0; i < data.length; i++) {
            if (data[i]['type'] == 'directory') {
                if (recurse) {
                    searchFiles(pathname + data[i]['name'], recurse, glob);
                }
            } else {
                data[i]['name'] = data[i]['name'].replace(pattern, '<span class="tag is-success">$1</span>');
                appendToListTable(data[i]);
            }
        }
    }).fail(function () {
        console.log(`search ${pathname} fail`);
    });
}


/**
 * 列出指定路径下的内容并显示
 *
 * @param {String} pathname
 */
function listPathname(pathname) {
    clearListTable();
    if (pathname.substr(-1) != '/') {
        pathname += '/';
    }
    $.getJSON(apipath + pathname, function (data, status) {
        //console.log(data, status);
        data.map((item) => item['fullname'] = pathname + item['name']);
        appendToListTable(data);
    }).fail(function () {
        console.log(`list ${pathname} fail`);
    });
}


/**
 * 清空结果表格
 *
 */
function clearListTable() {
    let listTableBody = $("#listTable tbody");
    listTableBody.html(`<tr><td><a class="filetype-icon folder-parent-icon" href="../">..</a></td><td>-</td><td>-</td></tr>`);
}


/**
 * 向结果表格输出
 *
 * @param {{fullname:string,name:string,mtime:string,size:string}} data
 */
function appendToListTable(data) {
    if (!$.isArray(data)) {
        data = [data];
    }
    let listTableBody = $("#listTable tbody");
    data.forEach(item => {
        let mtime = new Date(item['mtime']);
        mtime = mtime.getFullYear() + '/' + ('0' + mtime.getMonth()).substr(-2) + '/' + ('0' + mtime.getDate()).substr(-2) + ' ' + ('0' + mtime.getHours()).substr(-2) + ':' + ('0' + mtime.getMinutes()).substr(-2) + ':' + ('0' + mtime.getSeconds()).substr(-2);
        let size = item['size'];
        if (size == undefined) {
            size = '-';
        } else {
            let sizeUnits = ['B', 'KB', 'MB', 'GB', 'TB']
            size = parseInt(size);
            let i = 0;
            for (; i < sizeUnits.length; i++) {
                if (size < Math.pow(1024, i + 1) || i == sizeUnits.length - 1) {
                    break;
                }
            }
            size = (size / Math.pow(1024, i)).toFixed(2) + ' ' + sizeUnits[i];
        }
        let tr = $(`<tr><td><a class="filetype-icon ${getFileTypeIcon(item)}" href="${item['fullname']}">${item['name']}</a></td><td><tt>${mtime}</tt></td><td>${size}</td></tr>`);
        listTableBody.append(tr);
    });
}



/**
 * 根据文件类型返回对应的图标式样类型
 *
 * @param {{type:string,name:string}} item
 * @returns {string}
 */
function getFileTypeIcon(item) {
    if (item['type'] == 'directory') {
        return 'folder-icon';
    }
    let name = item['name'];
    let dotIdx = name.lastIndexOf('.');
    if (dotIdx == -1) {
        return "comm-file-icon";
    }
    let ext = name.substr(dotIdx + 1);
    if (ext.match(/avi|rmvb|rm|asf|divx|mpg|mpeg|mpe|wmv|mp4|mkv|vob/i)) {
        return 'video-file-icon';
    }
    if (ext.match(/mp3|aac|flac|ogg|wma/i)) {
        return 'music-file-icon';
    }
    if (ext.match(/psd|xcf|ai|cdr|tif|tiff|bmp|jpg|jpeg|gif|png|eps|raw|cr2|nef|orf|sr2/i)) {
        return 'img-file-icon';
    }
    return "comm-file-icon";
}


export { listPathname, searchFiles, clearListTable };