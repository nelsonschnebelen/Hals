(function () {
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var LOCATIONS = {
    atlanta: {
      city: "Atlanta",
      area: "Buckhead",
      phone: "(404) 261-0025",
      tel: "tel:+14042610025",
      book: "https://www.opentable.com/r/hals-the-steakhouse-atlanta",
      map: "https://www.google.com/maps/search/?api=1&query=Hal%27s%20The%20Steakhouse%2030%20Old%20Ivy%20Road%20NE%20Atlanta%20GA%2030342",
    },
    nashville: {
      city: "Nashville",
      area: "Downtown · SoBro",
      phone: "(615) 560-7733",
      tel: "tel:+16155607733",
      book: "https://www.opentable.com/r/hals-the-steakhouse-nashville",
      map: "https://www.google.com/maps/search/?api=1&query=Hal%27s%20The%20Steakhouse%20407%20Korean%20Veterans%20Blvd%20Nashville%20TN%2037203",
    },
  };

  var sheet = document.querySelector("[data-sheet]");
  var sheetTitle = document.querySelector("[data-sheet-title]");
  var sheetLinks = document.querySelector("[data-sheet-links]");
  var lastFocus = null;

  function closeSheet() {
    if (!sheet || sheet.hasAttribute("hidden")) return;
    sheet.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function openSheet(kind) {
    if (!sheet) return;
    var copy = {
      call: ["Call which room?", "tel"],
      book: ["Reserve at", "book"],
      directions: ["Directions to", "map"],
    }[kind];
    if (!copy) return;
    sheetTitle.textContent = copy[0];
    sheetLinks.innerHTML = "";
    ["atlanta", "nashville"].forEach(function (id) {
      var loc = LOCATIONS[id];
      var a = document.createElement("a");
      var href = copy[1] === "tel" ? loc.tel : copy[1] === "book" ? loc.book : loc.map;
      a.href = href;
      if (copy[1] !== "tel") {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      var label = copy[1] === "tel" ? loc.phone : copy[1] === "book" ? "OpenTable" : "Google Maps";
      a.innerHTML = "<span><strong>" + loc.city + "</strong><span>" + loc.area + "</span></span><span>" + label + "</span>";
      sheetLinks.appendChild(a);
    });
    lastFocus = document.activeElement;
    sheet.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    var first = sheetLinks.querySelector("a");
    if (first) first.focus();
  }

  document.querySelectorAll("[data-open-sheet]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openSheet(btn.getAttribute("data-open-sheet"));
    });
  });

  if (sheet) {
    sheet.addEventListener("click", function (event) {
      if (event.target === sheet) closeSheet();
    });
    var closer = sheet.querySelector("[data-sheet-close]");
    if (closer) closer.addEventListener("click", closeSheet);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSheet();
  });

  var panels = document.querySelectorAll("[data-menu-panel]");
  if (!panels.length) return;

  var params = new URLSearchParams(window.location.search);
  var city = params.get("at") === "nashville" ? "nashville" : "atlanta";
  var listId = params.get("list") || "";

  function firstList(nextCity, groupId) {
    var row = document.querySelector('[data-lists-for="' + nextCity + "-" + groupId + '"]');
    var button = row && row.querySelector("[data-list]");
    return button ? button.getAttribute("data-list") : "";
  }

  function groupFor(nextCity, id) {
    var match = "";
    document.querySelectorAll('[data-lists-for^="' + nextCity + '-"]').forEach(function (row) {
      if (row.querySelector('[data-list="' + id + '"]')) {
        match = row.getAttribute("data-lists-for").slice(nextCity.length + 1);
      }
    });
    return match || "dinner";
  }

  function writeUrl() {
    var url = new URL(window.location.href);
    url.searchParams.set("at", city);
    url.searchParams.set("list", listId);
    history.replaceState(null, "", url);
  }

  function show(nextCity, nextList) {
    city = nextCity;
    if (!nextList || !document.getElementById("menu-" + nextList)) {
      listId = firstList(city, "dinner");
    } else {
      listId = nextList;
    }
    var group = groupFor(city, listId);
    panels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-list") === listId);
    });
    document.querySelectorAll("[data-city-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-city-btn") === city ? "true" : "false");
    });
    document.querySelectorAll("[data-city-groups]").forEach(function (row) {
      row.hidden = row.getAttribute("data-city-groups") !== city;
    });
    document.querySelectorAll("[data-group]").forEach(function (btn) {
      var on = btn.getAttribute("data-group") === group && btn.getAttribute("data-for-city") === city;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll("[data-lists-for]").forEach(function (row) {
      var on = row.getAttribute("data-lists-for") === city + "-" + group && row.querySelectorAll("[data-list]").length > 1;
      row.hidden = !on;
    });
    document.querySelectorAll("[data-list]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-list") === listId ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-city-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-city-btn");
      show(next, firstList(next, "dinner"));
      writeUrl();
    });
  });
  document.querySelectorAll("[data-group]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var nextCity = btn.getAttribute("data-for-city");
      show(nextCity, firstList(nextCity, btn.getAttribute("data-group")));
      writeUrl();
    });
  });
  document.querySelectorAll("[data-list]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      show(city, btn.getAttribute("data-list"));
      writeUrl();
    });
  });

  show(city, listId);
})();
