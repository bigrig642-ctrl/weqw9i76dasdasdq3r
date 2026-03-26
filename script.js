(function () {
  var currentPage = document.body.getAttribute("data-page");
  var navLinks = document.querySelectorAll(".top-nav a");
  var menuToggle = document.querySelector(".menu-toggle");
  var topNav = document.querySelector(".top-nav");

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "index.html" && href === "index.html")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (menuToggle && topNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = topNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    var code = pre.querySelector("code");
    if (!code) {
      return;
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copy";

    button.addEventListener("click", function () {
      var text = code.innerText;
      var done = function () {
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = "Copy";
        }, 1400);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          button.textContent = "Failed";
        });
        return;
      }

      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();

      try {
        document.execCommand("copy");
        done();
      } catch (error) {
        button.textContent = "Failed";
      }

      document.body.removeChild(area);
    });

    pre.appendChild(button);
  });
}());
