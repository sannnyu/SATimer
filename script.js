document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const bodyElement = document.body;

    // 更新时间函数
    function updateTime() {
        const now = new Date();
        
        // 格式化时间，确保是个位数时前面加0
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        // 格式化日期
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');

        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        dateElement.textContent = `${year}-${month}-${day}`;
    }

    // 每秒更新一次时间
    setInterval(updateTime, 1000);
    // 页面加载时立即更新一次时间，避免延迟显示
    updateTime();

    // 全屏切换功能
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            bodyElement.requestFullscreen().then(() => {
                bodyElement.classList.add('fullscreen');
                fullscreenBtn.textContent = '退出全屏';
            }).catch(err => {
                console.error(`进入全屏失败: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => {
                bodyElement.classList.remove('fullscreen');
                fullscreenBtn.textContent = '全屏';
            });
        }
    });

    // 监听全屏状态变化，以防用户通过其他方式退出全屏
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            bodyElement.classList.add('fullscreen');
            fullscreenBtn.textContent = '退出全屏';
        } else {
            bodyElement.classList.remove('fullscreen');
            fullscreenBtn.textContent = '全屏';
        }
    });
});