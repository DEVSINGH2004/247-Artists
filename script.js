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

  // ✅ PAGE 3 — New scroll-synced approach
  const words = document.querySelectorAll(".page3 span");
  const page3 = document.querySelector(".page3");

  // dynamically insert side text
  const sideText = document.createElement("div");
  sideText.className = "side-lines";
  sideText.innerHTML = `
    <p>making money with music is hard</p>
    <p>and comes with complex tasks</p>
  `;
  page3.appendChild(sideText);

  gsap.set(".side-lines", {
    position: "absolute",
    top: "68%",
    left: "62%",
    fontSize: "2vw",
    color: "#1B1914",
    fontFamily: "gel-medium",
    opacity: 1,
  });

  const tlPage3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top top",
      end: "+=2500",
      pin: true,
      anticipatePin: 1,
      scrub: 2, // ✨ smooth, scroll-synced
    },
  });

  // Step 1: Shrink the words
  tlPage3.to(words, {
    fontSize: "7vw",
    ease: "power3.out",
    stagger: 0.25,
  });

  // Step 2: Slide "can be hard" left
  tlPage3.to(".page3 h2", {
    xPercent: -25,
    ease: "power3.inOut",
  });

  // Step 3: Reveal side text diagonally (for cinematic feel)
  tlPage3.fromTo(
    ".side-lines p",
    { x: 100, y: 50, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      stagger: 0.4,
      duration: 1.2,
    },
    "-=0.3"
  );

  // ✅ PAGE 4 — Delayed “have to be…” Slide-Up Animation
  const page4Text = document.querySelector(".page4 h1 span:nth-child(2)");
  gsap.fromTo(
    page4Text,
    { y: 200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      duration: 2.2,
      delay: 0.8,
      scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 50%",
        end: "top 10%",
        scrub: 2,
      },
    }
  );

  // ✅ Keep ScrollTrigger and Locomotive in sync
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

scroll();
