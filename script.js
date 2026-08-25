const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

const frameCount = 126;
const currentFrame = (index) =>
    `./frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

const images = [];
const airbnb = {
    frame: 0,
};

let imagesLoaded = 0;
let isLoaderHidden = false;

function hideLoader() {
    if (isLoaderHidden) return;
    isLoaderHidden = true;
    const loader = document.querySelector("#loader");
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                loader.style.display = "none";
                startAnimation();
            }
        });
    } else {
        startAnimation();
    }
}

function handleImageLoad() {
    imagesLoaded++;
    const progress = Math.min(100, Math.round((imagesLoaded / frameCount) * 100));
    const progressBar = document.querySelector(".loader-progress");
    const loaderText = document.querySelector("#loader-text");
    if (progressBar) progressBar.style.width = progress + "%";
    if (loaderText) loaderText.innerText = `PREPARING EXPERIENCE ${progress}%`;

    if (imagesLoaded >= frameCount) {
        hideLoader();
    }
}

function preloader() {
    // Safety fallback timeout: hide loader after 3s max
    setTimeout(() => {
        hideLoader();
    }, 3000);

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
        img.src = currentFrame(i);
        images.push(img);
    }
}

function startAnimation() {
    gsap.to(airbnb, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        },
        onUpdate: render,
    });

    // Fade out text as we scroll
    gsap.to(".hero-text", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "30% top",
            scrub: true,
        }
    });

    render();
}

function render() {
    if (images[airbnb.frame]) {
        scaleImage(images[airbnb.frame], context);
    }
}

function scaleImage(img, ctx) {
    if (!img || !img.complete || !img.width || !img.height) return;
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
}

preloader();
