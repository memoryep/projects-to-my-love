const intro = document.querySelector("#intro");
const show = document.querySelector("#show");
const ending = document.querySelector("#ending");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const counter = document.querySelector("#counter");
const openBtn = document.querySelector("#openBtn");
const againBtn = document.querySelector("#againBtn");

let W = 0;
let H = 0;
let dpr = 1;
let raf = 0;
let scene = 0;
let sceneStart = 0;
let running = false;

let rays = [];
let particles = [];

function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;

    canvas.width = W * dpr;
    canvas.height = H * dpr;

    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

addEventListener("resize", resize);
resize();

function heart(u) {
    return [
        16 * Math.sin(u) ** 3,
        13 * Math.cos(u)
        - 5 * Math.cos(2 * u)
        - 2 * Math.cos(3 * u)
        - Math.cos(4 * u)
    ];
}

function smallHeart(u) {
    return [
        1.6 * Math.sin(u) ** 3,
        1.3 * Math.cos(u)
        - 0.5 * Math.cos(2 * u)
        - 0.2 * Math.cos(3 * u)
        - 0.1 * Math.cos(4 * u)
    ];
}

function clear(bg = "#000") {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
}

function center() {
    ctx.translate(W / 2, H / 2);
    ctx.scale(1, -1);
}

function sceneFade(ms, duration) {
    const edge = 900;

    return Math.min(
        1,
        ms / edge,
        (duration - ms) / edge
    );
}

function prepare() {
    rays = [];

    for (let i = 0; i < 140; i++) {
        const u =
            (i / 140) * Math.PI * 2
            + (Math.random() * 0.04 - 0.02);

        const [x, y] = heart(u);

        const len =
            9.8 + Math.random() * 1.4;

        rays.push([
            x * len,
            y * len
        ]);
    }

    particles = [];

    for (let i = 0; i < 2000; i++) {
        const u =
            Math.random() * Math.PI * 2;

        const [hx, hy] =
            smallHeart(u);

        const rad =
            Math.sqrt(Math.random());

        particles.push([
            hx * rad,
            hy * rad,
            1.1 *
            (1 - rad) *
            (Math.random() * 2 - 1)
        ]);
    }
}

const durations = [
    6000,
    6500,
    6000,
    6500,
    7500
];

function draw1(ms) {
    clear("#000");

    ctx.save();
    center();

    const originalScale = 20;

    const fit =
        Math.min(
            W / 600,
            H / 600
        );

    const scale =
        originalScale * fit;

    ctx.strokeStyle = "purple";

    ctx.lineWidth =
        Math.max(1, fit);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.globalAlpha =
        sceneFade(
            ms,
            durations[0]
        );

    const progress =
        Math.min(
            1,
            ms / 5000
        );

    const count =
        Math.max(
            1,
            Math.floor(
                6000 * progress
            )
        );

    ctx.beginPath();

    for (
        let i = 0;
        i < count;
        i++
    ) {
        const x =
            15 *
            Math.sin(i) ** 3;

        const y =
            12 * Math.cos(i)
            - 5 * Math.cos(2 * i)
            - 2 * Math.cos(3 * i)
            - Math.cos(4 * i);

        if (i === 0) {
            ctx.moveTo(
                x * scale,
                y * scale
            );
        } else {
            ctx.lineTo(
                x * scale,
                y * scale
            );
        }
    }

    ctx.stroke();
    ctx.restore();
}

function heartPath(size) {
    ctx.beginPath();

    for (
        let i = 0;
        i <= 180;
        i++
    ) {
        const u =
            (i / 180) *
            Math.PI *
            2;

        const [x, y] =
            heart(u);

        if (i === 0) {
            ctx.moveTo(
                x * size,
                y * size
            );
        } else {
            ctx.lineTo(
                x * size,
                y * size
            );
        }
    }

    ctx.closePath();
}

function draw2(ms) {
    clear("#000");

    ctx.save();
    center();

    const base =
        Math.min(W, H) / 44;

    const progress =
        Math.min(
            1,
            ms / 4200
        );

    ctx.globalAlpha =
        sceneFade(
            ms,
            durations[1]
        );

    for (
        let i = 0;
        i < 40 * progress;
        i++
    ) {
        const k =
            Math.pow(
                0.91,
                i
            );

        const rot =
            i * 0.075;

        ctx.save();

        ctx.rotate(rot);

        ctx.strokeStyle =
            `rgba(
                255,
                255,
                255,
                ${0.2 + 0.8 * k}
            )`;

        ctx.lineWidth =
            Math.max(
                0.45,
                1.15 * k
            );

        heartPath(
            base * k
        );

        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
}

function draw3(ms) {
    clear("#000");

    ctx.save();
    center();

    const scale =
        Math.min(W, H) / 42;

    ctx.globalAlpha =
        sceneFade(
            ms,
            durations[2]
        );

    for (
        let i = 0;
        i < 140;
        i++
    ) {
        const u =
            (i / 140) *
            Math.PI *
            2;

        const [hx, hy] =
            heart(u);

        const ex =
            hx * 2.1;

        const ey =
            hy * 2.1;

        const grad =
            ctx.createLinearGradient(
                hx * scale,
                hy * scale,
                ex * scale,
                ey * scale
            );

        grad.addColorStop(
            0,
            "rgb(242,38,26)"
        );

        grad.addColorStop(
            1,
            "rgb(8,0,0)"
        );

        ctx.strokeStyle =
            grad;

        ctx.lineWidth =
            1;

        ctx.beginPath();

        ctx.moveTo(
            hx * scale,
            hy * scale
        );

        ctx.lineTo(
            ex * scale,
            ey * scale
        );

        ctx.stroke();
    }

    ctx.restore();
}

function draw4(ms) {
    clear("#000");

    ctx.save();
    center();

    const t =
        ((ms / 25) % 48) / 24;

    const scale =
        Math.min(W, H) / 37;

    ctx.globalAlpha =
        sceneFade(
            ms,
            durations[3]
        );

    if (t <= 1.6) {
        const head =
            Math.min(
                1,
                t
            );

        const tail =
            Math.max(
                0,
                t - 0.35
            );

        const fade =
            t > 0.7
                ? Math.max(
                    0,
                    1 - (t - 0.7)
                )
                : 1;

        const red =
            Math.floor(
                170 * fade
            );

        for (
            const [hx, hy]
            of rays
        ) {
            const x1 =
                hx * tail;

            const y1 =
                hy * tail;

            const x2 =
                hx * head;

            const y2 =
                hy * head;

            ctx.strokeStyle =
                `rgb(${red},0,26)`;

            ctx.lineWidth =
                1;

            ctx.beginPath();

            ctx.moveTo(
                x1 * scale / 10,
                y1 * scale / 10
            );

            ctx.lineTo(
                x2 * scale / 10,
                y2 * scale / 10
            );

            ctx.stroke();

            if (t < 0.9) {
                ctx.fillStyle =
                    "#ff1a40";

                ctx.beginPath();

                ctx.arc(
                    x2 * scale / 10,
                    y2 * scale / 10,
                    1.15,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }
    }

    ctx.restore();
}

function colorDepth(f) {
    f =
        Math.max(
            0,
            Math.min(
                1,
                f
            )
        );

    return `rgb(
        ${Math.floor(70 + 185 * f)},
        ${Math.floor(30 * f)},
        ${Math.floor(10 + 40 * f)}
    )`;
}

function draw5(ms) {
    clear("#050002");

    ctx.save();
    center();

    const scale =
        Math.min(W, H) / 4.7;

    const theta =
        ms * 0.0028;

    const ct =
        Math.cos(theta);

    const st =
        Math.sin(theta);

    const proj =
        particles
        .map(
            ([x, y, z]) => {
                const xr =
                    x * ct
                    + z * st;

                const zr =
                    -x * st
                    + z * ct;

                return [
                    xr,
                    y,
                    zr
                ];
            }
        )
        .sort(
            (a, b) =>
                a[2] - b[2]
        );

    ctx.globalAlpha =
        sceneFade(
            ms,
            durations[4]
        );

    for (
        const [x, y, z]
        of proj
    ) {
        const depth =
            (z + 1.1) / 2.2;

        ctx.fillStyle =
            colorDepth(depth);

        const radius =
            0.9
            + depth * 1.5;

        ctx.beginPath();

        ctx.arc(
            x * scale,
            y * scale,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.restore();
}

const drawers = [
    draw1,
    draw2,
    draw3,
    draw4,
    draw5
];

function frame(now) {
    if (!running) {
        return;
    }

    const elapsed =
        now - sceneStart;

    drawers[scene](
        elapsed
    );

    counter.textContent =
        `0${scene + 1}  /  05`;

    if (
        elapsed >=
        durations[scene]
    ) {
        scene++;

        if (
            scene >=
            drawers.length
        ) {
            finish();
            return;
        }

        sceneStart =
            now;
    }

    raf =
        requestAnimationFrame(
            frame
        );
}

function start() {
    prepare();

    scene = 0;
    running = true;

    intro.classList.remove(
        "active"
    );

    ending.classList.remove(
        "active"
    );

    show.classList.add(
        "active"
    );

    sceneStart =
        performance.now();

    cancelAnimationFrame(
        raf
    );

    raf =
        requestAnimationFrame(
            frame
        );
}

function finish() {
    running = false;

    cancelAnimationFrame(
        raf
    );

    show.classList.remove(
        "active"
    );

    ending.classList.add(
        "active"
    );
}

openBtn.addEventListener(
    "click",
    start
);

againBtn.addEventListener(
    "click",
    start
);
