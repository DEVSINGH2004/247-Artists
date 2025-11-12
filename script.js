function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.08,      // snappy
    multiplier: 2.2, // fast overall scroll
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

  // ✅ Set initial look
  stripes.forEach((stripe) => {
    stripe.style.background = "linear-gradient(to top, yellow 0%, red 0%)";
    stripe.style.backgroundSize = "100% 0%";
    stripe.style.backgroundRepeat = "no-repeat";
    stripe.style.backgroundPosition = "bottom";
  });

  // ✅ PART 1 — Stripe 3 plays first (index 2)
  const stripe3 = stripes[2];
  const lead = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 85%",
      end: "top 45%",
      scrub: 1.2,
    },
  });

  lead.fromTo(
    stripe3,
    { y: 100, backgroundSize: "100% 0%" },
    {
      y: 0,
      backgroundSize: "100% 100%",
      ease: "power3.out",
      duration: 1.5,
    }
  );

  // ✅ PART 2 — After stripe 3 finishes, all others animate together
  const others = stripes.filter((_, i) => i !== 2);
  const speeds = [0.8, 2.5, 3.8, 1.5, 5]; // adjust per stripe (fast → slow)

  others.forEach((stripe, i) => {
    gsap.fromTo(
      stripe,
      { y: 500 + i * 60, backgroundSize: "100% 0%" },
      {
        y: 0,
        backgroundSize: "100% 100%",
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".page2",
          scroller: ".main",
          start: "top 40%", // begins once lead stripe nearly done
          end: "bottom 10%",
          scrub: speeds[i], // each with its own scroll speed
        },
      }
    );
  });
}

scroll();
