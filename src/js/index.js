import $ from 'jquery';
import 'bulma';
import '../style/index.css';
import '../favicon.ico';

import { listPathname, searchFiles, clearListTable } from "./table";
import { canBackPage, backPage, canForwardPage, forwardPage, insertNavpath, pushNav } from './nav';



$(function () {

    // top按钮
    let topBtn = $('#topBtn');
    $(window).on('scroll', () => {
        if ($(window).scrollTop() == 0) {
            topBtn.hide();
        } else {
            topBtn.show();
        }
    });
    topBtn.on('click', () => {
        $(window).scrollTop(0);
    });

    // 导航栏插入路径信息
    insertNavpath(3);

    // 初期表示
    listPathname(location.pathname);

    // 导航路径点击记录
    $(document).on('click', '.nav-path,.folder-icon,.folder-parent-icon', pushNav);

    // 前后翻页导航
    let arrowBackOutlineBtn = $("#arrowBackOutlineBtn");
    if (canBackPage()) {
        arrowBackOutlineBtn.removeClass('is-disabled');
    }
    let arrowForwardOutlineBtn = $("#arrowForwardOutlineBtn");
    if (canForwardPage()) {
        arrowForwardOutlineBtn.removeClass("is-disabled");
    }
    $("#arrowBackOutlineBtn:not(.is-disabled)").on('click', backPage);
    $("#arrowForwardOutlineBtn:not(.is-disabled)").on('click', forwardPage);

    // 检索框是否有输入内容，动态改变检索按钮是否可用
    let searchInput = $("#searchInput");
    let searchBtn = $("#searchBtn");
    if (searchInput.val()) {
        searchBtn.removeClass("is-disabled");
    }
    searchInput.on("input", function () {
        searchBtn.removeClass("is-disabled");
        if (!this.value) {
            searchBtn.addClass("is-disabled");
        }
    });
    searchBtn.on('click', function () {
        clearListTable();
        searchFiles(location.pathname, true, searchInput.val());
    });
    searchInput.on('keypress', function (event) {
        setTimeout(() => {
            if (event.key == "Enter" && this.value) {
                searchBtn.trigger("click");
            }
        }, 100);
    });
});

