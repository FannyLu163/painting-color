// 1. 八張畫作的詳細配色指引 (已移除文字說明欄位)
        const paintingsData = [
            {
                num: "SAMPLE 01",
                title: "櫻粉蝶影",
                image: "imgs/1.jpg",
                //fallback: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
                colors: ["#ffb7c5", "#f78da7", "#7bc0f5", "#fdf1a9", "#cbf3db"]
            },
            {
                num: "SAMPLE 02",
                title: "幻紫微瀾",
                image: "imgs/2.jpg",
                //fallback: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
                colors: ["#d2bbf4", "#9b72cf", "#f48cba", "#fde5ec", "#8f5799"]
            },
            {
                num: "SAMPLE 03",
                title: "翡翠羽翼",
                image: "imgs/3.jpg",
                //fallback: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=800",
                colors: ["#00a896", "#028090", "#f0f3f4", "#9fffcb", "#05668d"]
            },
            {
                num: "SAMPLE 04",
                title: "晨曦新綠",
                image: "imgs/4.jpg",
                //fallback: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800",
                colors: ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffffff", "#88d49e"]
            },
            {
                num: "SAMPLE 05",
                title: "緋紅織夢",
                image: "imgs/5.jpg",
                //fallback: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800",
                colors: ["#ff8b94", "#ffaaa6", "#ffd3b6", "#e23e57", "#ffbfa3"]
            },
            {
                num: "SAMPLE 06",
                title: "繁星蝶聚",
                image: "imgs/6.jpg",
                //fallback: "https://images.unsplash.com/photo-1501472312651-726afd116ff1?w=800",
                colors: ["#c5a3ff", "#a3c2ff", "#b4ffd4", "#f7ffb4", "#fcc6ff"]
            },
            {
                num: "SAMPLE 07",
                title: "澄澈幽藍",
                image: "imgs/7.jpg",
                //fallback: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
                colors: ["#4a90e2", "#5c6bc0", "#b39ddb", "#e0f2f1", "#0d47a1"]
            },
            {
                num: "SAMPLE 08",
                title: "彩虹花語",
                image: "imgs/8.jpg",
                //fallback: "https://images.unsplash.com/photo-1490750967868-88aa4486c944?w=800",
                colors: ["#ff9e2c", "#ff4e50", "#f9d423", "#4facfe", "#00f2fe"]
            }
        ];

        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img");
        const modalTitle = document.getElementById("modal-title");
        const modalPalette = document.getElementById("modal-palette");

        // 2. 開啟燈箱彈窗函數
        function openModal(index) {
            const data = paintingsData[index];
            
            // 優先加載本地 JPG 圖檔，若無則降級使用精美水彩替代圖
            modalImg.src = data.image;
            //modalImg.onerror = function() {
            //    this.src = data.fallback;
            //};
            
            // 格式化為單行標題，例如 "04 晨曦新綠"
            const numStr = String(index + 1).padStart(2, '0');
            modalTitle.innerHTML = `<span class="modal-title-num">${numStr}</span>${data.title}`;
            
            // 生成配色參考色塊
            modalPalette.innerHTML = "";
            data.colors.forEach(color => {
                const dot = document.createElement("div");
                dot.className = "palette-dot";
                dot.style.backgroundColor = color;
                dot.title = color;
                modalPalette.appendChild(dot);
            });

            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // 防止底層滾動
        }

        // 3. 關閉燈箱彈窗函數
        function closeModal(event) {
            modal.classList.remove("active");
            document.body.style.overflow = ""; // 恢復滾動
        }

        // 4. 春天櫻花飄落（Cherry Blossom Falling Effect）Canvas 粒子系統
        const canvas = document.getElementById("cherry-blossom-canvas");
        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Petal {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * -height;
                this.size = Math.random() * 8 + 6;
                this.speedY = Math.random() * 1.5 + 0.8;
                this.speedX = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.6 + 0.3;
                this.angle = Math.random() * 360;
                this.spin = Math.random() * 2 - 1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y / 30) * 0.5; // 隨微風擺動
                this.angle += this.spin;

                // 若飄出螢幕外則重置
                if (this.y > height + 10 || this.x < -10 || this.x > width + 10) {
                    this.y = Math.random() * -20;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.beginPath();
                // 畫出一片櫻花瓣的精美形狀
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
                ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
                ctx.fillStyle = `rgba(255, 183, 197, ${this.opacity})`; // 櫻花粉色
                ctx.fill();
                ctx.restore();
            }
        }

        const petals = Array.from({ length: 25 }, () => new Petal());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
