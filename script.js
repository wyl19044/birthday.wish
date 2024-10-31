// 初始化轮播图
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// 音乐控制
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = true;

// 页面加载完成后自动播放音乐
window.addEventListener('load', () => {
    music.play().then(() => {
        musicToggle.style.animation = 'rotate 3s linear infinite';
    }).catch(error => {
        // 处理自动播放失败的情况
        console.log('自动播放失败:', error);
        isPlaying = false;
    });

    const cakeEntrance = document.getElementById('cakeEntrance');
    const mainContent = document.getElementById('mainContent');
    
    // 3秒后隐藏蛋糕动画，显示主内容
    setTimeout(() => {
        cakeEntrance.style.opacity = '0';
        cakeEntrance.style.transition = 'opacity 1s ease-out';
        mainContent.style.display = 'block';
        
        setTimeout(() => {
            cakeEntrance.style.display = 'none';
        }, 1000);
    }, 3000);
});

// 音乐控制按钮点击事件
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicToggle.style.animation = 'none';
    } else {
        music.play();
        musicToggle.style.animation = 'rotate 3s linear infinite';
    }
    isPlaying = !isPlaying;
});

// 添加旋转动画的CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 添加图片点击放大功能
document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.addEventListener('click', function() {
        // 创建全屏显示的容器
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.className = 'fullscreen-image';
        
        // 创建图片元素
        const fullImg = document.createElement('img');
        fullImg.src = this.src;
        
        // 将图片添加到容器中
        fullscreenDiv.appendChild(fullImg);
        
        // 添加点击关闭功能
        fullscreenDiv.addEventListener('click', function() {
            this.remove();
        });
        
        // 将容器添加到页面中
        document.body.appendChild(fullscreenDiv);
    });
});

// 创建背景气泡
function createBubbles() {
    const container = document.body;
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // 随机大小
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `-${size}px`;
        
        // 随机动画延迟
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(bubble);
        
        // 动画结束后移除气泡
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
}

// 定期创建新气泡
setInterval(createBubbles, 3000);
createBubbles(); // 初始创建气泡 