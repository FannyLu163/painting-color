// 1. 八張畫作的詳細配色指引
const paintingsData = [
    {
        num: "SAMPLE 01",
        title: "楓紅小鋪",
        image: "imgs/Fall1.jpg",
        colors: ["#c0392b", "#e67e22", "#f1c40f", "#3e2723", "#fbeed7"]
    },
    {
        num: "SAMPLE 02",
        title: "綠意庭院",
        image: "imgs/Fall2.jpg",
        colors: ["#88d49e", "#2e7d32", "#dcedc1", "#8d6e63", "#ffffff"]
    },
    {
        num: "SAMPLE 03",
        title: "春櫻漫舞",
        image: "imgs/Fall3.jpg",
        colors: ["#ffb7c5", "#f78da7", "#7bc0f5", "#cbf3db", "#ffffff"]
    },
    {
        num: "SAMPLE 04",
        title: "翠綠鐵道",
        image: "imgs/Fall4.jpg",
        colors: ["#1b5e20", "#81c784", "#ffb74d", "#d32f2f", "#f5f5f5"]
    },
    {
        num: "SAMPLE 05",
        title: "金楓山莊",
        image: "imgs/Fall5.jpg",
        colors: ["#f1c40f", "#e67e22", "#95a5a6", "#34495e", "#fdf5e6"]
    },
    {
        num: "SAMPLE 06",
        title: "藍天列車",
        image: "imgs/Fall6.jpg",
        colors: ["#29b6f6", "#ff7043", "#ffffff", "#1b5e20", "#8d6e63"]
    },
    {
        num: "SAMPLE 07",
        title: "楓林咖啡",
        image: "imgs/Fall7.jpg",
        colors: ["#f9d423", "#9b59b6", "#e67e22", "#ffffff", "#a0522d"]
    },
    {
        num: "SAMPLE 08",
        title: "櫻花樹下",
        image: "imgs/Fall8.jpg",
        colors: ["#ffa3b1", "#ffccd5", "#81c784", "#4fc3f7", "#8d6e63"]
    }
];

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPalette = document.getElementById("modal-palette");

// 2. 開啟燈箱彈窗函數
function openModal(index) {
    const data = paintingsData[index];

    modalImg.src = data.image;

    const numStr = String(index + 1).padStart(2, "0");
    modalTitle.innerHTML = `<span class="modal-title-num">${numStr}</span>${data.title}`;

    modalPalette.innerHTML = "";
    data.colors.forEach(color => {
        const dot = document.createElement("div");
        dot.className = "palette-dot";
        dot.style.backgroundColor = color;
        dot.title = color;
        modalPalette.appendChild(dot);
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// 3. 關閉燈箱彈窗函數
function closeModal(event) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// 4. 金秋落葉飄落 Canvas 粒子系統
const canvas = document.getElementById("maple-falling-canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class Leaf {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 1.5 - 0.75;

        const leafColors = [
            `rgba(192, 57, 43, ${this.opacity})`,
            `rgba(230, 126, 34, ${this.opacity})`,
            `rgba(241, 196, 15, ${this.opacity})`,
            `rgba(141, 110, 99, ${this.opacity})`
        ];
        this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 40) * 0.4;
        this.angle += this.spin;

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

        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 3, -this.size, this.size / 2, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size / 3, 0, 0);

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

const leaves = Array.from({ length: 20 }, () => new Leaf());

function animate() {
    ctx.clearRect(0, 0, width, height);
    leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
    });
    requestAnimationFrame(animate);
}

animate();
