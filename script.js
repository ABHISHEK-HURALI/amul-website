const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});

const frameCount = 210;
const currentFrame = (index) =>
    `./frames/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

const images = [];
const airbnb = {
    frame: 0,
};

let imagesLoaded = 0;

function preloader() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            const progress = Math.round((imagesLoaded / frameCount) * 100);
            document.querySelector(".loader-progress").style.width = progress + "%";
            document.querySelector("#loader-text").innerText = `PREPARING EXPERIENCE ${progress}%`;
            
            if (imagesLoaded === frameCount) {
                gsap.to("#loader", {
                    opacity: 0,
                    duration: 1,
                    delay: 0.5,
                    onComplete: () => {
                        document.querySelector("#loader").style.display = "none";
                        startAnimation();
                    }
                });
            }
        };
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

    images[0].onload = render;
    render();
}

function render() {
    scaleImage(images[airbnb.frame], context);
}

function scaleImage(img, ctx) {
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
