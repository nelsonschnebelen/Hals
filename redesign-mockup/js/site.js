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
      book: "https://www.opentable.com/hals-the-steakhouse",
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

  var root = document.querySelector("[data-menu-root]");
  if (!root || !window.HALS_MENUS) return;

  var GROUPS = {
    atlanta: [
      { id: "dinner", label: "Dinner", ids: ["hal-s-atlanta-menu"] },
      {
        id: "wine",
        label: "Wine",
        ids: [
          "by-the-glass--red-wine",
          "by-the-glass--white-wine",
          "bottles--specials",
          "bottles--reserve-wine",
          "bottles--red-wine",
          "bottles--red-wine-of-the-world",
          "bottles--white-wine",
          "bottles--bubbles",
        ],
      },
      { id: "bar", label: "Bar", ids: ["liquor", "aperitif", "after-dinner-1", "beer-list"] },
    ],
    nashville: [
      { id: "dinner", label: "Dinner", ids: ["hals-nashville-dinner-menu"] },
      {
        id: "wine",
        label: "Wine",
        ids: [
          "red-wine-by-the-glass",
          "white-wine--by-the-glass",
          "white-wine-by-the-bottle",
          "red-wine--by-the-bottle",
          "reserve-red-wine--by-the-bottle",
          "large-format-red-wine--by-the-bottle",
        ],
      },
      { id: "bar", label: "Bar", ids: ["spirits", "beer"] },
    ],
  };

  var NOTES = {
    "hal-s-atlanta-menu": [
      "Monday–Saturday, 5–11 PM. Sunday, 4–9 PM. The bar opens at 4 PM.",
      "$5 valet.",
      "Hal's does not offer separate checks except for equal payments, and does not permit outside wine.",
    ],
    "hals-nashville-dinner-menu": [
      "Kitchen: Tuesday–Thursday 4:30–10 PM, Friday–Saturday 4:30–11 PM, Sunday–Monday 4:30–9 PM.",
      "Bar: Tuesday–Thursday 4 PM–11 PM, Friday–Saturday 4 PM–midnight, Sunday–Monday 4 PM–10 PM.",
      "$12 valet at the AC Hotel Marriott deck on Rep. John Lewis Way S. The restaurant is on the bottom floor of the AC Hotel.",
      "Hal's does not offer separate checks except for equal payments, and does not permit outside wine.",
    ],
  };

  var params = new URLSearchParams(window.location.search);
  var city = params.get("at") === "nashville" ? "nashville" : "atlanta";
  var listId = params.get("list") || "";

  var toolbar = document.querySelector("[data-menu-toolbar]");

  function menusFor(cityId) {
    return window.HALS_MENUS[cityId] || [];
  }

  function findMenu(cityId, id) {
    return menusFor(cityId).filter(function (menu) { return menu.id === id; })[0];
  }

  function groupFor(cityId, id) {
    var groups = GROUPS[cityId];
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].ids.indexOf(id) !== -1) return groups[i];
    }
    return groups[0];
  }

  function writeUrl() {
    var url = new URL(window.location.href);
    url.searchParams.set("at", city);
    url.searchParams.set("list", listId);
    history.replaceState(null, "", url);
  }

  function renderToolbar() {
    var group = groupFor(city, listId);
    var html = '<div class="toolbar-inner wrap">';
    html += '<div class="seg" role="tablist" aria-label="Restaurant">';
    html += cityButton("atlanta", "Atlanta");
    html += cityButton("nashville", "Nashville");
    html += "</div>";
    html += '<div class="seg" role="tablist" aria-label="Menu group">';
    GROUPS[city].forEach(function (item) {
      var pressed = item.id === group.id;
      html += '<button type="button" data-group="' + item.id + '" aria-pressed="' + pressed + '">' + item.label + "</button>";
    });
    html += "</div>";
    if (group.ids.length > 1) {
      html += '<div class="subpills" role="tablist" aria-label="List">';
      group.ids.forEach(function (id) {
        var menu = findMenu(city, id);
        if (!menu) return;
        html += '<button type="button" data-list="' + id + '" aria-pressed="' + (id === listId) + '">' + menu.label + "</button>";
      });
      html += "</div>";
    }
    html += "</div>";
    toolbar.innerHTML = html;

    toolbar.querySelectorAll("[data-city]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        city = btn.getAttribute("data-city");
        listId = GROUPS[city][0].ids[0];
        writeUrl();
        render();
      });
    });
    toolbar.querySelectorAll("[data-group]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-group");
        var next = GROUPS[city].filter(function (item) { return item.id === id; })[0];
        listId = next.ids[0];
        writeUrl();
        render();
      });
    });
    toolbar.querySelectorAll("[data-list]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        listId = btn.getAttribute("data-list");
        writeUrl();
        render();
      });
    });
  }

  function cityButton(id, label) {
    return '<button type="button" data-city="' + id + '" aria-pressed="' + (city === id) + '">' + label + "</button>";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderList() {
    var menu = findMenu(city, listId) || menusFor(city)[0];
    if (!menu) {
      root.innerHTML = "<p>Menu unavailable.</p>";
      return;
    }
    var jumps = '<nav class="section-jumps" aria-label="Sections on this menu">';
    menu.sections.forEach(function (section, index) {
      jumps += '<a href="#section-' + index + '">' + escapeHtml(section.title) + "</a>";
    });
    jumps += "</nav>";

    var body = "";
    menu.sections.forEach(function (section, index) {
      var side = /side/i.test(section.title);
      body += '<section class="menu-section" id="section-' + index + '">';
      body += "<h3>" + escapeHtml(section.title) + "</h3>";
      body += '<div class="' + (side ? "sides" : "dishes") + '">';
      section.items.forEach(function (item) {
        var price = item.price || "";
        var multi = price.indexOf("·") !== -1;
        var cost = price
          ? '<span class="cost' + (multi ? " multi" : "") + '">' + escapeHtml(price) + "</span>"
          : '<span class="cost missing">Price not listed</span>';
        body += "<article class=\"dish\"><h4>" + escapeHtml(item.name) + "</h4>" + cost;
        if (item.description) body += "<p>" + escapeHtml(item.description) + "</p>";
        body += "</article>";
      });
      body += "</div></section>";
    });

    var notes = NOTES[menu.id] || [];
    var noteHtml = "";
    if (!menu.priced) {
      noteHtml += '<p class="unpriced-note">This list is on the current hals.net menu without prices. The names are published; the pour price is not.</p>';
    } else if (menu.priced < menu.total) {
      noteHtml += '<p class="unpriced-note">Where a price is not printed, hals.net does not list one.</p>';
    }
    if (notes.length) {
      noteHtml += '<ul class="menu-notes">';
      notes.forEach(function (note) { noteHtml += "<li>" + escapeHtml(note) + "</li>"; });
      noteHtml += "</ul>";
    }

    var place = city === "atlanta" ? "Buckhead" : "Downtown Nashville";
    root.innerHTML =
      '<div class="menu-head"><div><p class="eyebrow">' + place + "</p><h2>" + escapeHtml(menu.label) + "</h2></div>" +
      '<p class="lede">Taken from the current hals.net menu. A design preview, not a live ordering page.</p></div>' +
      jumps + body + noteHtml;
  }

  function render() {
    if (!listId || !findMenu(city, listId)) listId = GROUPS[city][0].ids[0];
    renderToolbar();
    renderList();
  }

  render();
})();
