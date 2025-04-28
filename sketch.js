let capture;
let savedImage;
let mode = 0; // 用於切換畫面模式
let buttons = [];

function setup() {
    createCanvas(windowWidth, windowHeight); // 全螢幕畫布
    background('#f5ebe0'); // 設定背景顏色

    // 啟用視訊
    capture = createCapture(VIDEO);
    capture.size(320, 240); // 設定顯示畫面大小
    capture.hide(); // 隱藏原始 capture 元素

    // 建立按鈕
    buttons.push(createButton('模式 0').mousePressed(() => mode = 0));
    buttons.push(createButton('模式 1').mousePressed(() => mode = 1));
    buttons.push(createButton('模式 2').mousePressed(() => mode = 2));
    buttons.push(createButton('模式 3').mousePressed(() => mode = 3));

    // 設定按鈕位置
    buttons.forEach((btn, index) => {
        btn.position(10, 10 + index * 30);
    });
}

function draw() {
    background('#f5ebe0'); // 每次重繪時清除背景

    if (mode === 0) {
        // 模式 0：顯示攝影機影像
        push();
        translate(capture.width, 0);
        scale(-1, 1);
        image(capture, -mouseX, mouseY); // 翻轉後的影像
        pop();
    } else if (mode === 1) {
        // 模式 1：亮度影像方塊效果
        capture.loadPixels();
        for (let y = 0; y < capture.height; y += 10) {
            for (let x = 0; x < capture.width; x += 10) {
                let index = (x + y * capture.width) * 4;
                let r = capture.pixels[index];
                let g = capture.pixels[index + 1];
                let b = capture.pixels[index + 2];
                let brightness = (r + g + b) / 3;
                let rectSize = map(brightness, 0, 255, 5, 20);
                fill(r, g, b); // 顏色隨 RGB 值變化
                noStroke();
                rect(x * 2, y * 2, rectSize * 0.9, rectSize * 0.9); // 方塊大小與亮度相關，並有黑色縫隙
            }
        }
    } else if (mode === 2) {
        // 模式 2：灰階影像
        capture.loadPixels();
        for (let y = 0; y < capture.height; y += 10) {
            for (let x = 0; x < capture.width; x += 10) {
                let index = (x + y * capture.width) * 4;
                let r = capture.pixels[index];
                let g = capture.pixels[index + 1];
                let b = capture.pixels[index + 2];
                let brightness = (r + g + b) / 3;
                fill(brightness);
                noStroke();
                rect(x * 2, y * 2, 10, 10);
            }
        }
    } else if (mode === 3) {
        // 模式 3：文字雲效果
        capture.loadPixels();
        for (let y = 0; y < capture.height; y += 10) {
            for (let x = 0; x < capture.width; x += 10) {
                let index = (x + y * capture.width) * 4;
                let r = capture.pixels[index];
                let g = capture.pixels[index + 1];
                let b = capture.pixels[index + 2];
                let brightness = (r + g + b) / 3; // 計算亮度
                fill(r, g, b); // 設定文字顏色
                textSize(map(brightness, 0, 255, 5, 20)); // 根據亮度調整文字大小
                text("帥", x * 2, y * 2); // 繪製文字
            }
        }
    }
}

function keyPressed() {
    if (key === '1') {
        mode = 0; // 切換到模式 0
    } else if (key === '2') {
        mode = 1; // 切換到模式 1
    } else if (key === '3') {
        mode = 2; // 切換到模式 2
    } else if (key === '4') {
        mode = 3; // 切換到模式 3
    } else if (key === 's' || key === 'S') {
        // 儲存當前的 capture 影像
        savedImage = createImage(capture.width, capture.height);
        savedImage.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
        console.log('影像已儲存');
    }
}
