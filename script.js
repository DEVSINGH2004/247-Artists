function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.08,
    multiplier: 2.2,
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

  // ✅ PAGE 2 (unchanged)
  const stripes = gsap.utils.toArray(".page2 section");

  stripes.forEach((stripe) => {
    stripe.style.background = "linear-gradient(to top, yellow 0%, red 0%)";
    stripe.style.backgroundSize = "100% 0%";
    stripe.style.backgroundRepeat = "no-repeat";
    stripe.style.backgroundPosition = "bottom";
  });

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

  const others = stripes.filter((_, i) => i !== 2);
  const speeds = [0.8, 2.5, 3.8, 1.5, 5];

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
          start: "top 40%",
          end: "bottom 10%",
          scrub: speeds[i],
        },
      }
    );
  });





  // ✅ PAGE 3 — Font-size shrink + Scroll Freeze
  const words = document.querySelectorAll(".page3 span");

  // Set initial (large) font size for the animation start
  words.forEach((word) => {
    word.style.fontSize = "11.7vw"; // starting big font
  });

  // Create GSAP timeline that will control all font-size animations
  const tlPage3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top top",
      end: "+=2500", // how long scroll stays pinned
      pin: true,
      scrub: false, // disable scroll-based scrubbing
      onEnter: () => locoScroll.stop(), // freeze scroll while animating
      onLeave: () => locoScroll.start(), // resume scroll after animation
      onEnterBack: () => locoScroll.stop(),
      onLeaveBack: () => locoScroll.start(),
      // markers: true,
    },
  });

  // Animate each word to shrink down sequentially
  words.forEach((word, i) => {
    tlPage3.to(
      word,
      {
        fontSize: "7vw", // final smaller size
        duration: 0.6,
        ease: "power3.out",
      },
      i * 0.4 // delay each word slightly for a wave-like sequence
    );
  });

  // ✅ Resume scroll after animation completes
  tlPage3.call(() => locoScroll.start());

  const page4Text = document.querySelector(".page4 h1 span:nth-child(2)");

gsap.fromTo(
  page4Text,
  {
    y: 200, // start from below
    opacity: 0, // invisible initially
  },
  {
    y: 0,
    opacity: 1,
    ease: "power3.out",
    duration: 2.2,
    scrollTrigger: {
      trigger: ".page4",
      scroller: ".main",
      start: "top 80%",     // when Page 4 enters viewport
      end: "top 40%",       // completes before middle
      scrub: 2,             // makes it scroll-synced & smooth
      // markers: true,      // enable for debugging
    },
  }
);

  // ✅ Refresh ScrollTrigger after setup
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

scroll();
