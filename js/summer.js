// 1. 八張畫作的詳細配色指引 (精簡單行，完全無文字描述)
        const paintingsData = [
            {
                num: "01",
                title: "陽光石屋",
                image: "imgs/summer1.jpg",
                //fallback: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                colors: ["#e9d8a6", "#ee9b00", "#ca6702", "#9b2226", "#94d2bd"]
            },
            {
                num: "02",
                title: "藍頂教堂",
                image: "imgs/summer2.jpg",
                //fallback: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
                colors: ["#0077b6", "#0096c7", "#90e0ef", "#fdf0d5", "#f77f00"]
            },
            {
                num: "03",
                title: "愛琴海花",
                image: "imgs/summer3.jpg",
                //fallback: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
                colors: ["#ff758f", "#ff8fa3", "#0077b6", "#03045e", "#ffd166"]
            },
            {
                num: "04",
                title: "繽紛港灣",
                image: "imgs/summer4.jpg",
                //fallback: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
                colors: ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"]
            },
            {
                num: "05",
                title: "懸崖別墅",
                image: "imgs/summer5.jpg",
                //fallback: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
                colors: ["#d8e2dc", "#ffe5d9", "#ffcad4", "#f4acb7", "#9e2a2b"]
            },
            {
                num: "06",
                title: "白牆藍扉",
                image: "imgs/summer6.jpg",
                //fallback: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
                colors: ["#0077b6", "#00b4d8", "#90e0ef", "#f5ebe0", "#e3d5ca"]
            },
            {
                num: "07",
                title: "教堂鐘聲",
                image: "imgs/summer7.jpg",
                //fallback: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800",
                colors: ["#0096c7", "#0077b6", "#fdfbf7", "#f3c68f", "#809c13"]
            },
            {
                num: "08",
                title: "海風暖陽",
                image: "imgs/summer8.jpg",
                //fallback: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800",
                colors: ["#0077b6", "#ade8f4", "#f8f9fa", "#ffca3a", "#e07a5f"]
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
            
            // 格式化為單行標題，例如 "04 繽紛港灣"
            modalTitle.innerHTML = `<span class="modal-title-num">${data.num}</span>${data.title}`;
            
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

        // 4. 夏日水下氣泡上升（Ocean Floating Bubble Effect）Canvas 粒子系統
        const canvas = document.getElementById("ocean-bubble-canvas");
        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Bubble {
            constructor() {
                this.reset();
                this.y = Math.random() * height; // 初始隨機散佈於螢幕高度中
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 20 + 5;
                this.size = Math.random() * 6 + 3; // 泡泡大小 3px - 9px
                this.speedY = Math.random() * 1.2 + 0.6; // 向上漂浮速度
                this.speedX = Math.random() * 0.4 - 0.2; // 微弱水平擺動
                this.opacity = Math.random() * 0.4 + 0.15; // 透明度
                this.swingRange = Math.random() * 15 + 10; // 水平搖擺幅度
                this.swingSpeed = Math.random() * 0.02 + 0.01; // 搖擺頻率
                this.swingAngle = Math.random() * 360;
            }

            update() {
                this.y -= this.speedY;
                this.swingAngle += this.swingSpeed;
                this.x += this.speedX + Math.sin(this.swingAngle) * 0.15; // 正弦曲線微動

                // 若飄出螢幕頂部則重置到最底端
                if (this.y < -20 || this.x < -20 || this.x > width + 20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                
                // 漸層泡泡特效：製造清澈的反光水泡質感
                const gradient = ctx.createRadialGradient(
                    this.x - this.size / 3, this.y - this.size / 3, this.size / 10,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.3})`);
                gradient.addColorStop(0.5, `rgba(144, 224, 239, ${this.opacity})`); // 嫩藍色微反光
                gradient.addColorStop(1, `rgba(0, 119, 182, 0.08)`); // 深藍色邊緣
                
                ctx.fillStyle = gradient;
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity + 0.1})`;
                ctx.lineWidth = 1;
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }

        // 初始化 30 個清澈涼爽的夏日氣泡
        const bubbles = Array.from({ length: 30 }, () => new Bubble());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            bubbles.forEach(bubble => {
                bubble.update();
                bubble.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
