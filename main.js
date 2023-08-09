const fs = require("fs");
const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");

// 防抖函数
function debounce(fn, time) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time);
    };
}

// 更新样式
function updateStyle(webContents) {
    const csspath = path.join(__dirname, "style.css");
    fs.readFile(csspath, "utf-8", (err, data) => {
        if (err) {
            return;
        }
        webContents.send("LiteLoader.wechat_theme.updateStyle", data);
    });
}

// 监听CSS修改-开发时候用的
function watchCSSChange(webContents) {
    const filepath = path.join(__dirname, "style.css");
    fs.watch(
        filepath,
        "utf-8",
        debounce(() => {
            updateStyle(webContents);
        }, 100)
    );
}

function onLoad(plugin) {
    ipcMain.on("LiteLoader.wechat_theme.rendererReady", (event, message) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        updateStyle(window.webContents);
    });
}

function onBrowserWindowCreated(window, plugin) {
    watchCSSChange(window.webContents);
}

module.exports = {
    onLoad,
    onBrowserWindowCreated
};
