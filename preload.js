const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("wechat_theme", {
    updateStyle: (callback) => ipcRenderer.on(
        "LiteLoader.wechat_theme.updateStyle",
        callback
    ),
    rendererReady: () => ipcRenderer.send(
        "LiteLoader.wechat_theme.rendererReady"
    )
});
