function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
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

  // ✅ Different scroll speeds (like a “music bar”)
  const speeds = [2.5, 2, 1.5, 1, 2.2, 1.8];

  stripes.forEach((stripe, i) => {
    // Start each stripe as red with a gradient fill (yellow from bottom)
    stripe.style.background = "linear-gradient(to top, yellow 0%, red 0%)";
    stripe.style.backgroundSize = "100% 0%"; // start empty (no fill)
    stripe.style.backgroundRepeat = "no-repeat";
    stripe.style.backgroundPosition = "bottom";

    // ✅ Animate both slide-up + gradient fill
    gsap.fromTo(
      stripe,
      {
        y: 400 + i * 40, // starts lower
        backgroundSize: "100% 0%", // no yellow yet
      },
      {
        y: 0,
        backgroundSize: "100% 100%", // fully yellow at the top
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".page2",
          scroller: ".main",
          start: "top 90%",
          end: "bottom 10%",
          scrub: speeds[i], // different scroll speed
        },
      }
    );
  });
}

scroll();
