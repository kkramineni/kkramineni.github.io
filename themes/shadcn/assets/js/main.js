/*
 * main.js — zero-dependency behaviours for the shadcn Hugo theme.
 * Plain ES2018 so it can be minified by Hugo Pipes without a bundler.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var MODES = ["light", "dark", "system"];

  /* ------------------------------------------------------------ theme toggle */
  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function resolve(mode) {
    return mode === "system" || !mode ? systemPrefersDark() : mode === "dark";
  }

  function apply(mode, persist) {
    document.documentElement.classList.toggle("dark", resolve(mode));
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (e) {
        /* storage blocked (private mode); ignore */
      }
    }
  }

  function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }

    // Live mode state: tracked in a variable so it still advances when
    // localStorage is blocked (private mode), where every read returns null.
    var currentMode = stored || window.__shadcnTheme__ || "system";
    apply(currentMode, false);

    var button = document.getElementById("theme-toggle");
    if (button) {
      button.setAttribute("data-mode", currentMode);
      button.addEventListener("click", function () {
        var wasDark = resolve(currentMode);
        var index = MODES.indexOf(currentMode);
        if (index < 0) index = MODES.length - 1;

        // Cycle light -> dark -> system, skipping any mode that resolves to
        // the appearance already on screen. Without this, starting from
        // "system" on a light OS wasted the first click on an explicit
        // "light" that looked identical — so light -> dark needed two clicks.
        var next = currentMode;
        for (var i = 1; i <= MODES.length; i++) {
          next = MODES[(index + i) % MODES.length];
          if (resolve(next) !== wasDark) break;
        }

        currentMode = next;
        apply(next, true);
        button.setAttribute("data-mode", next);
      });
    }

    // Follow the OS while in "system" mode.
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () {
        if (!currentMode || currentMode === "system") apply("system", false);
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* -------------------------------------------------------- reveal on scroll */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    Array.prototype.forEach.call(items, function (el) {
      io.observe(el);
    });
  }

  /* -------------------------------------------------------------------- tabs */
  /* Wires [data-tabs] groups by data attributes, so no unique IDs are needed. */
  function initTabs() {
    var groups = document.querySelectorAll("[data-tabs]");

    Array.prototype.forEach.call(groups, function (group) {
      var labels = group.querySelectorAll("[data-tab-label]");
      var panels = group.querySelectorAll("[data-tab-panel]");
      if (!labels.length || !panels.length) return;

      function select(index) {
        Array.prototype.forEach.call(labels, function (label, i) {
          label.setAttribute("aria-selected", i === index ? "true" : "false");
          label.tabIndex = i === index ? 0 : -1;
        });
        Array.prototype.forEach.call(panels, function (panel, i) {
          panel.hidden = i !== index;
        });
      }

      Array.prototype.forEach.call(labels, function (label, i) {
        label.addEventListener("click", function () {
          select(i);
        });

        label.addEventListener("keydown", function (e) {
          var delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!delta) return;
          e.preventDefault();
          var next = (i + delta + labels.length) % labels.length;
          labels[next].focus();
          select(next);
        });
      });

      // Respect the tab marked selected in markup, else default to the first.
      var initial = 0;
      Array.prototype.forEach.call(labels, function (label, i) {
        if (label.getAttribute("aria-selected") === "true") initial = i;
      });
      select(initial);
    });
  }

  /* ----------------------------------------------------- copy code to clipboard */
  function initCopyButtons() {
    if (!navigator.clipboard) return;

    var blocks = document.querySelectorAll("pre");

    Array.prototype.forEach.call(blocks, function (pre) {
      var button = document.createElement("button");
      button.type = "button";
      button.className =
        "absolute top-2 right-2 rounded-md border bg-popover px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      button.addEventListener("click", function () {
        var code = pre.querySelector("code");
        navigator.clipboard.writeText(code ? code.textContent : pre.textContent).then(function () {
          button.textContent = "Copied";
          setTimeout(function () {
            button.textContent = "Copy";
          }, 2000);
        });
      });

      pre.style.position = "relative";
      pre.appendChild(button);

      pre.addEventListener("mouseenter", function () {
        button.style.opacity = "1";
      });
      pre.addEventListener("mouseleave", function () {
        button.style.opacity = "";
      });
    });
  }

  /* ------------------------------------------- close <details> menus on outside */
  function initDismissOnOutside() {
    document.addEventListener("click", function (e) {
      Array.prototype.forEach.call(document.querySelectorAll("details[open]"), function (d) {
        if (d.contains(e.target)) return;
        if (d.hasAttribute("data-no-dismiss")) return;
        d.removeAttribute("open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      Array.prototype.forEach.call(document.querySelectorAll("details[open]"), function (d) {
        if (d.hasAttribute("data-no-dismiss")) return;
        d.removeAttribute("open");
      });
    });
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initTheme();
    initReveal();
    initTabs();
    initCopyButtons();
    initDismissOnOutside();
  });
})();