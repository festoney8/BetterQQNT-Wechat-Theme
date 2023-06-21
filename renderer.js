export function onLoad() {
    const element = document.createElement("style");
    document.head.appendChild(element);

    wechat_theme.updateStyle((event, message) => {
        element.textContent = message;
    });

    wechat_theme.rendererReady();
}