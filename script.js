function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.08,       // low smoothness (snappy)
  multiplier: 2.2,  // fast scrolling
  });

  // ✅ Sync ScrollTrigger with Locomotive
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // ✅ Select all stripes
  const stripes = gsap.utils.toArray(".page2 section");

  // ✅ Much larger variation in scroll speeds
  const speeds = [0, 1.5, 4, 6, 2, 8]; 
  // ⬆️ smaller = faster, larger = slower

  stripes.forEach((stripe, i) => {
    // Gradient from red → yellow rising upward
    stripe.style.background = "linear-gradient(to top, yellow 0%, red 0%)";
    stripe.style.backgroundSize = "100% 0%"; // start empty
    stripe.style.backgroundRepeat = "no-repeat";
    stripe.style.backgroundPosition = "bottom";

    // ✅ Animate both slide-up + color fill
    gsap.fromTo(
      stripe,
      {
        y: 500 + i * 80,       // more dramatic offset depth
        backgroundSize: "100% 0%", // start red
      },
      {
        y: 0,
        backgroundSize: "100% 100%", // fully yellow fill
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".page2",
          scroller: ".main",
          start: "top 90%",
          end: "bottom 10%",
          scrub: speeds[i], // huge variation
        },
      }
    );
  });
}

scroll();
