/*
 * Copyright (c) 2026 Enactus McMaster. All rights reserved.
 * Source available for viewing only. See LICENSE.
 */

const entrance = [
  { opacity: 0, transform: "translateY(14px)" },
  { opacity: 1, transform: "translateY(0)" },
];

const timing: KeyframeAnimationOptions = {
  duration: 420,
  easing: "cubic-bezier(.2,.7,.2,1)",
};

type Play = (element: HTMLElement, frames?: Keyframe[]) => void;

function supportMotion(reducedMotion: MediaQueryList): Play {
  const running = new Map<HTMLElement, Animation>();

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    for (const animation of running.values()) animation.cancel();
    running.clear();
  });

  return (element, frames = entrance) => {
    if (reducedMotion.matches || element.matches(":focus-within") || typeof element.animate !== "function") return;
    running.get(element)?.cancel();
    const animation = element.animate(frames, timing);
    running.set(element, animation);

    const cancel = () => animation.cancel();
    const cleanup = () => {
      if (running.get(element) === animation) running.delete(element);
      element.removeEventListener("focusin", cancel);
    };

    animation.addEventListener("finish", cleanup, { once: true });
    animation.addEventListener("cancel", cleanup, { once: true });
    element.addEventListener("focusin", cancel, { once: true });
  };
}

function initMenu(): void {
  const button = document.querySelector<HTMLButtonElement>(".menu-button");
  const navId = button?.getAttribute("aria-controls");
  const navigation = navId ? document.getElementById(navId) : null;
  if (!button || !navigation) return;

  const symbol = button.querySelector<HTMLElement>(".menu-symbol");
  const mobile = window.matchMedia("(max-width: 760px)");
  const expanded = () => button.getAttribute("aria-expanded") === "true";

  const setExpanded = (open: boolean) => {
    button.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
    if (symbol) symbol.textContent = open ? "−" : "+";
  };

  button.addEventListener("click", () => setExpanded(!expanded()));
  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setExpanded(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !expanded()) return;
    setExpanded(false);
    button.focus();
  });
  mobile.addEventListener("change", () => setExpanded(false));

  setExpanded(false);
  button.hidden = false;
  document.documentElement.classList.add("has-interactions");
}

function fraction(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function initScrollMotion(reducedMotion: MediaQueryList): void {
  const hero = document.querySelector<HTMLElement>(".hero");
  const stage = hero?.querySelector<HTMLElement>(".hero-stage");
  const campus = document.querySelector<HTMLElement>(".join-scene");
  if (!hero && !campus) return;

  let queued = false;

  function draw(): void {
    queued = false;
    const viewport = window.innerHeight;

    if (hero) {
      const bounds = hero.getBoundingClientRect();
      const scrollRoom = Math.max(1, bounds.height - (stage?.offsetHeight ?? viewport));
      const progress = fraction(-bounds.top / Math.min(scrollRoom, viewport * 0.55));
      const remaining = 1 - progress * progress * (3 - 2 * progress);
      hero.style.setProperty("--veil-opacity", String(reducedMotion.matches ? 0.55 : 0.64 * remaining));
      hero.style.setProperty("--title-opacity", String(reducedMotion.matches ? 1 : remaining));
    }

    if (campus) {
      const bounds = campus.getBoundingClientRect();
      const progress = fraction((viewport - bounds.top) / (viewport + bounds.height));
      const shift = reducedMotion.matches ? 0 : (progress - 0.5) * 40;
      campus.style.setProperty("--campus-shift", `${shift}px`);
    }
  }

  function schedule(): void {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(draw);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reducedMotion.addEventListener("change", schedule);
  draw();
}

function imageUrl(value: string | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value, document.baseURI);
    if (url.origin === window.location.origin && url.protocol === window.location.protocol) {
      return url;
    }
  } catch {
    // A missing or malformed asset can stay in the image's error state.
  }
  return null;
}

function retryUrl(url: URL): string {
  const next = new URL(url);
  next.searchParams.set("retry", String(Date.now()));
  return next.href;
}

function initHeroPhoto(play: Play): void {
  const photo = document.querySelector<HTMLImageElement>(".hero-image img");
  const error = document.querySelector<HTMLElement>(".photo-error");
  const retry = error?.querySelector<HTMLButtonElement>(".retry-image");
  if (!photo || !error || !retry) return;

  const original = imageUrl(photo.currentSrc || photo.getAttribute("src") || undefined);
  if (!original) return;
  const photoArea = photo.parentElement;
  let retrying = false;

  const finishRetry = () => {
    retrying = false;
    retry.removeAttribute("aria-disabled");
    photoArea?.removeAttribute("aria-busy");
  };

  const markFailed = () => {
    finishRetry();
    photo.hidden = true;
    error.hidden = false;
  };

  photo.addEventListener("error", markFailed);
  photo.addEventListener("load", () => {
    error.hidden = true;
    photo.hidden = false;
    if (retrying) play(photo, [{ opacity: 0.45 }, { opacity: 1 }]);
    finishRetry();
  });

  retry.addEventListener("click", () => {
    if (retrying) return;
    retrying = true;
    retry.setAttribute("aria-disabled", "true");
    photoArea?.setAttribute("aria-busy", "true");
    photo.loading = "eager";
    photo.removeAttribute("srcset");
    photo.src = retryUrl(original);
  });

  if (photo.complete && photo.naturalWidth === 0) markFailed();
}

interface Slide {
  url: URL;
  sourceSet: string;
  alt: string;
  caption: string;
  label: string;
}

function initGalleries(play: Play): void {
  for (const gallery of document.querySelectorAll<HTMLElement>(".team-gallery")) {
    const image = gallery.querySelector<HTMLImageElement>("img");
    const caption = gallery.querySelector<HTMLElement>(".gallery-source");
    const status = gallery.querySelector<HTMLElement>(".gallery-position");
    const error = gallery.querySelector<HTMLElement>(".gallery-error");
    const retry = gallery.querySelector<HTMLButtonElement>(".gallery-retry");
    const controls = gallery.querySelector<HTMLElement>(".gallery-controls");
    if (!image || !caption || !status || !error || !retry || !controls) continue;

    const slides = Array.from(gallery.querySelectorAll<HTMLElement>(".gallery-slide"))
      .flatMap<Slide>((item) => {
        const { src, srcWidth, hdSrc, hdWidth, alt, caption, label } = item.dataset;
        const url = imageUrl(src);
        const hd = imageUrl(hdSrc);
        if (!url || !alt || !caption || !label) return [];
        const hasWidths = /^\d+$/.test(srcWidth ?? "") && /^\d+$/.test(hdWidth ?? "");
        const sourceSet = hd && hasWidths ? `${url.href} ${srcWidth}w, ${hd.href} ${hdWidth}w` : "";
        return [{ url, sourceSet, alt, caption, label }];
      });

    if (slides.length < 2) continue;

    const imageArea = image.closest("figure") ?? image;
    let index = 0;
    let direction = 0;

    const setImageState = (ok: boolean) => {
      const restoreFocus = ok && document.activeElement === retry;
      imageArea.removeAttribute("aria-busy");
      retry.removeAttribute("aria-disabled");
      image.hidden = !ok;
      error.hidden = ok;
      if (restoreFocus) controls.querySelector<HTMLButtonElement>("[data-gallery-step]")?.focus();
    };

    const choose = (step: number) => {
      direction = step;
      index = (index + step + slides.length) % slides.length;
      const slide = slides[index];
      if (!slide) return;
      imageArea.setAttribute("aria-busy", "true");
      retry.removeAttribute("aria-disabled");
      error.hidden = true;
      image.hidden = false;
      image.alt = slide.alt;
      image.loading = "eager";
      image.srcset = slide.sourceSet;
      image.src = slide.url.href;
      caption.textContent = slide.caption;
      status.textContent = `Photo ${index + 1} of ${slides.length}: ${slide.label}`;
    };

    image.addEventListener("error", () => setImageState(false));
    image.addEventListener("load", () => {
      setImageState(true);
      if (direction === 0) return;
      play(image, [
        { opacity: 0.4, transform: `translateX(${direction * 10}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ]);
      direction = 0;
    });

    for (const control of controls.querySelectorAll<HTMLButtonElement>("[data-gallery-step]")) {
      const step = control.dataset.galleryStep === "-1" ? -1 : 1;
      control.addEventListener("click", () => choose(step));
    }

    controls.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      choose(event.key === "ArrowLeft" ? -1 : 1);
    });

    retry.addEventListener("click", () => {
      const slide = slides[index];
      if (!slide || retry.getAttribute("aria-disabled") === "true") return;
      retry.setAttribute("aria-disabled", "true");
      imageArea.setAttribute("aria-busy", "true");
      image.loading = "eager";
      image.removeAttribute("srcset");
      image.src = retryUrl(slide.url);
    });

    if (image.complete && image.naturalWidth === 0) setImageState(false);
    controls.hidden = false;
  }
}

function initYearTabs(play: Play): void {
  for (const tablist of document.querySelectorAll<HTMLElement>('[role="tablist"]')) {
    const entries = Array.from(tablist.querySelectorAll<HTMLButtonElement>("[data-result-year]"))
      .flatMap((tab) => {
        const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
        return panel ? [{ tab, panel }] : [];
      });

    if (entries.length < 2) continue;

    const show = (index: number, animate = true) => {
      const entry = entries[index];
      if (!entry) return;
      tablist.style.setProperty("--year-index", String(index));
      entries.forEach(({ tab, panel }, position) => {
        const selected = index === position;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panel.hidden = !selected;
      });

      if (animate) play(entry.panel);
    };

    entries.forEach(({ tab, panel }, index) => {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.removeAttribute("aria-label");
      panel.tabIndex = 0;
      tab.addEventListener("click", () => {
        if (tab.getAttribute("aria-selected") !== "true") show(index);
      });

      tab.addEventListener("keydown", (event) => {
        let next = index;
        if (event.key === "ArrowLeft") next = (index - 1 + entries.length) % entries.length;
        else if (event.key === "ArrowRight") next = (index + 1) % entries.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = entries.length - 1;
        else return;

        event.preventDefault();
        entries[next]?.tab.focus();
        if (next !== index) show(next);
      });
    });

    const selected = entries.findIndex(({ tab }) => tab.getAttribute("aria-selected") === "true");
    show(Math.max(0, selected), false);
    tablist.hidden = false;
  }
}

function initReveals(play: Play): void {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || !(target instanceof HTMLElement)) continue;
        observer.unobserve(target);
        if (!target.matches(":focus-within")) play(target);
      }
    }, { threshold: 0.12 });

    for (const group of document.querySelectorAll("[data-reveal]")) observer.observe(group);
  }

  for (const details of document.querySelectorAll<HTMLDetailsElement>("details")) {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      for (const child of details.children) {
        if (child instanceof HTMLElement && child.tagName !== "SUMMARY") play(child);
      }
    });
  }
}

export function initInteractions(): void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const play = supportMotion(reducedMotion);

  initMenu();
  initScrollMotion(reducedMotion);
  initHeroPhoto(play);
  initGalleries(play);
  initYearTabs(play);
  initReveals(play);
}
