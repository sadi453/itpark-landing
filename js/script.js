document.addEventListener("DOMContentLoaded", () => {
    const coin = document.getElementById("coin");
    const intro = document.getElementById("intro");
    const coinTarget = document.getElementById("coin-target");
    const header = document.querySelector(".header");

    const heroLabel = document.querySelector(".hero-label");
    const heroTitle = document.querySelector(".hero-right h1");
    const heroText = document.querySelector(".hero-right p");
    const heroButtons = document.querySelector(".hero-buttons");

    if (!window.gsap) {
        console.error("GSAP is not loaded.");
        return;
    }

    if (!coin || !intro || !coinTarget) {
        console.error("Required intro elements were not found.");
        return;
    }

    // Initial state
    gsap.set(header, { opacity: 0, y: -30 });
    gsap.set([heroLabel, heroTitle, heroText, heroButtons], {
        opacity: 0,
        y: 35
    });

    gsap.set(coin, {
        scale: 0.2,
        opacity: 0,
        rotationY: 0,
        rotationX: 0
    });

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.inOut"
        }
    });

    // Coin appears
    timeline.to(coin, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)"
    });

    // One fast full rotation
    timeline.to(coin, {
        duration: 1.1,
        rotationY: 360,
        ease: "power2.inOut"
    });

    // Move coin to Hero target
    timeline.add(() => {
        const coinRect = coin.getBoundingClientRect();
        const targetRect = coinTarget.getBoundingClientRect();

        const deltaX =
            targetRect.left +
            targetRect.width / 2 -
            (coinRect.left + coinRect.width / 2);

        const deltaY =
            targetRect.top +
            targetRect.height / 2 -
            (coinRect.top + coinRect.height / 2);

        gsap.to(coin, {
            duration: 1.2,
            x: deltaX,
            y: deltaY,
            scale: 0.88,
            rotationY: 540,
            ease: "power4.inOut",
            onComplete: () => {
                coinTarget.appendChild(coin);

                gsap.set(coin, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotationY: 180
                });

                coin.classList.add("is-in-hero");

                gsap.set(intro, {
                    display: "none"
                });

                startHeroAnimation();
            }
        });
    });

    function startHeroAnimation() {
        const heroTimeline = gsap.timeline();

        heroTimeline
            .to(header, {
                duration: 0.7,
                opacity: 1,
                y: 0,
                ease: "power3.out"
            })
            .to(
                heroLabel,
                {
                    duration: 0.6,
                    opacity: 1,
                    y: 0
                },
                "-=0.3"
            )
            .to(
                heroTitle,
                {
                    duration: 0.8,
                    opacity: 1,
                    y: 0
                },
                "-=0.35"
            )
            .to(
                heroText,
                {
                    duration: 0.7,
                    opacity: 1,
                    y: 0
                },
                "-=0.4"
            )
            .to(
                heroButtons,
                {
                    duration: 0.7,
                    opacity: 1,
                    y: 0
                },
                "-=0.4"
            );

        // Slow continuous rotation after intro
        gsap.to(coin, {
            rotationY: "+=360",
            duration: 14,
            repeat: -1,
            ease: "none"
        });

        // Slight floating effect
        gsap.to(coin, {
            y: -12,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Header effect on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});
