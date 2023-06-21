const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("wechat_theme", {
    updateStyle: (callback) => ipcRenderer.on(
        "betterQQNT.wechat_theme.updateStyle",
        callback
    ),
    rendererReady: () => ipcRenderer.send(
        "betterQQNT.wechat_theme.rendererReady"
    )
});