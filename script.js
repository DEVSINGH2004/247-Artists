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

  // ✅ PAGE 1 — Smooth Slide-Out Animation
 

  // ✅ PAGE 2 — Stripe Color Animation
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

  // ✅ PAGE 3 — Shrink, Slide & Reveal Side Text
  const words = document.querySelectorAll(".page3 span");
  words.forEach((word) => {
    word.style.fontSize = "11.7vw";
  });

  // Create side text dynamically
  const sideTextContainer = document.createElement("div");
  sideTextContainer.classList.add("side-text-container");
  sideTextContainer.innerHTML = `
    <p class="side-line">making money with music is hard</p>
    <p class="side-line">and comes with complex tasks</p>
  `;
  document.querySelector(".page3").appendChild(sideTextContainer);

  // Position & style side text (move this to CSS if needed)
  gsap.set(".side-text-container", {
    position: "absolute",
    top: "68%",
    left: "62%",
    transform: "translateY(-50%)",
    color: "#1B1914",
    fontSize: "2vw",
    fontFamily: "gel-medium",
    opacity: 0,
  });

  const tlPage3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: false,
      onEnter: () => locoScroll.stop(),
      onLeave: () => locoScroll.start(),
      onEnterBack: () => locoScroll.stop(),
      onLeaveBack: () => locoScroll.start(),
    },
  });

  // Shrink each word
  words.forEach((word, i) => {
    tlPage3.to(
      word,
      {
        fontSize: "7vw",
        duration: 0.6,
        ease: "power3.out",
      },
      i * 0.4
    );
  });

  // Slide "can be hard" left
  tlPage3.to(".page3 h2", {
    xPercent: -25,
    duration: 1.2,
    ease: "power3.inOut",
  }, "+=0.3");

  // Reveal side text beside it
  tlPage3.to(".side-text-container", {
    x: 0,
    opacity: 1,
    ease: "power3.out",
    duration: 1.2,
  }, "-=0.4");

  tlPage3.call(() => locoScroll.start());

  // ✅ PAGE 4 — “have to be…” Slide Up Animation
  const page4Text = document.querySelector(".page4 h1 span:nth-child(2)");
  gsap.fromTo(
    page4Text,
    { y: 200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      duration: 2.2,
      delay:0.8,
      scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 80%",
        end: "top 40%",
        scrub: 2,
      },
    }
  );

  // ✅ Refresh ScrollTrigger after setup
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

scroll();
