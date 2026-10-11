(function () {
  "use strict";

  var PLACEHOLDER = "YOUR-WEB3FORMS-ACCESS-KEY";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    setupNav();
    setupYear();
    setupForm();
    setupReveal();
  });

  function setupNav() {
    var toggle = document.querySelector(".nav__toggle");
    var links = document.getElementById("primary-nav");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });
  }

  function setupYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = year;
    }
  }

  function setupForm() {
    var form = document.getElementById("report-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var submitBtn = form.querySelector("[type=submit]");
    var mode = "report";
    var modeInput = form.querySelector("[name=mode]");
    var locationField = document.getElementById("field-location");
    var locationInput = form.querySelector("[name=location]");
    var subjectInput = form.querySelector("[name=subject]");
    var segments = form.querySelectorAll(".segment button");

    function setMode(next) {
      mode = next;
      if (modeInput) modeInput.value = next;
      for (var i = 0; i < segments.length; i++) {
        segments[i].setAttribute("aria-pressed", String(segments[i].dataset.mode === next));
      }
      if (locationField && locationInput) {
        var required = next === "report";
        locationField.hidden = !required;
        locationInput.required = required;
        locationInput.setAttribute("aria-required", String(required));
      }
      if (subjectInput) {
        subjectInput.value =
          next === "report"
            ? "Sanitation issue report"
            : "General enquiry";
      }
      if (status) status.classList.remove("is-visible");
    }

    for (var s = 0; s < segments.length; s++) {
      segments[s].addEventListener("click", function () {
        setMode(this.dataset.mode);
      });
    }

    function show(kind, html) {
      if (!status) return;
      status.className = "form__status is-visible form__status--" + kind;
      status.innerHTML = html;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      if (data.get("botcheck")) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var key = data.get("access_key");
      if (!key || key === PLACEHOLDER || key.indexOf("YOUR-WEB3FORMS") === 0) {
        show(
          "error",
          "<strong>Form not yet connected.</strong> The site owner still needs to add the Web3Forms access key. Please reach the taskforce by phone or email on the contact page in the meantime."
        );
        return;
      }

      var original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            setMode("report");
            show(
              "ok",
              "<strong>Message received.</strong> Thank you. The taskforce has your report and will follow up. For anything urgent, call the number on the contact page."
            );
          } else {
            show(
              "error",
              "<strong>That did not send.</strong> " +
                (json.message || "Please try again, or contact the taskforce by phone or email.")
            );
          }
        })
        .catch(function () {
          show(
            "error",
            "<strong>Network problem.</strong> Your message was not sent. Check your connection and try again, or call the taskforce."
          );
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = original;
          }
        });
    });

    setMode("report");
  }

  function setupReveal() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    nodes.forEach(function (node) {
      node.classList.add("reveal");
      observer.observe(node);
    });
  }
})();
