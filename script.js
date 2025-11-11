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

  // ✅ Animate each stripe
  stripes.forEach((stripe, i) => {
    // Give all sections a starting red color
    stripe.style.backgroundColor = "red";

    gsap.fromTo(
      stripe,
      {
        y: 300 + i * 30,   // start lower
        opacity: 1,
        backgroundColor: "red",
      },
      {
        y: 0,
        opacity: 1,
        backgroundColor: "red", // animate to yellow
        ease: "power3.out",
        duration: 2,
        scrollTrigger: {
          trigger: stripe,
          scroller: ".main",   // 👈 important for Locomotive
          start: "top 90%",
          end: "bottom 40%",
          scrub: 1.5,          // keeps color & motion linked to scroll
        },
      }
    );
  });
}

scroll();
