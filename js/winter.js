// 1. 八張畫作的詳細配色指引 (已移除文字說明欄位)
        const paintingsData = [
            {
                num: "01",
                title: "星願小熊",
                image: "imgs/winter1.jpg",
                //fallback: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800",
                colors: ["#fff9db", "#ffb7b2", "#b3e5fc", "#d1c4e9", "#ffffff"]
            },
            {
                num: "02",
                title: "深海鯨歌",
                image: "imgs/winter2.jpg",
                //fallback: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=800",
                colors: ["#1e2a5a", "#4a90e2", "#b3e5fc", "#ffeb3b", "#eae6df"]
            },
            {
                num: "03",
                title: "雲端禮物",
                image: "imgs/winter3.jpg",
                //fallback: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
                colors: ["#ffcdd2", "#ffe082", "#90caf9", "#e0f2f1", "#ffffff"]
            },
            {
                num: "04",
                title: "星願風鈴",
                image: "imgs/winter4.jpg",
                //fallback: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
                colors: ["#b388ff", "#ff80ab", "#ffe082", "#80d8ff", "#ffffff"]
            },
            {
                num: "05",
                title: "月亮紙船",
                image: "imgs/winter5.jpg",
                //fallback: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                colors: ["#ffcdd2", "#ffe082", "#80d8ff", "#3f51b5", "#ffffff"]
            },
            {
                num: "06",
                title: "紫藤月桂",
                image: "imgs/winter6.jpg",
                //fallback: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800",
                colors: ["#d1c4e9", "#9575cd", "#ff80ab", "#ffffff", "#e0f2f1"]
            },
            {
                num: "07",
                title: "星軌森林",
                image: "imgs/winter7.jpg",
                //fallback: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800",
                colors: ["#0d1b2a", "#1b263b", "#e0e1dd", "#f5cb5c", "#415a77"]
            },
            {
                num: "08",
                title: "星塵花束",
                image: "imgs/winter8.jpg",
                //fallback: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800",
                colors: ["#ff80ab", "#90caf9", "#d1c4e9", "#ffe082", "#ffffff"]
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
            
            // 格式化為單行標題，例如 "04 星願風鈴"
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

        // 4. 宇宙星塵（Twinkling Stardust & Cosmic Dust）Canvas 粒子系統
        const canvas = document.getElementById("starry-canvas");
        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.alpha = Math.random() * 0.8 + 0.2;
                this.speedAlpha = Math.random() * 0.02 + 0.005;
                this.direction = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.alpha += this.speedAlpha * this.direction;
                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.direction = -1;
                } else if (this.alpha <= 0.1) {
                    this.alpha = 0.1;
                    this.direction = 1;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(179, 136, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        class CosmicDust {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 4 + 2;
                this.speedY = Math.random() * 0.3 + 0.1;
                this.speedX = Math.random() * 0.2 - 0.1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.angle = Math.random() * 360;
                this.spin = Math.random() * 0.4 - 0.2;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX + Math.sin(this.y / 50) * 0.15;
                this.angle += this.spin;

                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.y = height + 10;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.beginPath();
                const r = this.size;
                ctx.moveTo(0, -r);
                ctx.quadraticCurveTo(0, 0, r, 0);
                ctx.quadraticCurveTo(0, 0, 0, r);
                ctx.quadraticCurveTo(0, 0, -r, 0);
                ctx.quadraticCurveTo(0, 0, 0, -r);
                ctx.fillStyle = `rgba(188, 204, 255, ${this.opacity})`;
                ctx.fill();
                ctx.restore();
            }
        }

        const stars = Array.from({ length: 45 }, () => new Star());
        const dustParticles = Array.from({ length: 15 }, () => new CosmicDust());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            dustParticles.forEach(dust => {
                dust.update();
                dust.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
