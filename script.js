function makeTOC({
    rootSelector = "#tocRoot",
    headingSelector = "h1, h2, h3, h4, h5, h6",
    maxDepth = 6,
    minDepth = 1,
    titleSelector = ".title",
  } = {}) {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const headings = Array.from(document.querySelectorAll(headingSelector))
      .filter(h => {
        const level = parseInt(h.tagName.slice(1), 10);
        return level >= minDepth && level <= maxDepth && h.id;
      });

    if (headings.length === 0) {
      root.innerHTML = "";
      return;
    }

    function createListElement(level) {
      const list = document.createElement(level === minDepth ? "ol" : "ul");
      if (level !== minDepth) {
        list.classList.add("toc-sub");
      }
      return list;
    }

    function createItemLi(heading) {
      const level = parseInt(heading.tagName.slice(1), 10);

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${heading.id}`;

      const titleSpan = document.createElement("span");
      titleSpan.className = "title";
      titleSpan.textContent = heading.textContent.trim();

      const pageSpan = document.createElement("span");
      pageSpan.className = "page";

      a.appendChild(titleSpan);
      a.appendChild(pageSpan);
      li.appendChild(a);

      return { li, level };
    }

    root.innerHTML = "";

    const stack = [];
    let currentParentOL = root;

    for (const h of headings) {
      const { li, level } = createItemLi(h);

      if (stack.length === 0) {
        currentParentOL = root;
        stack.push({ level, ol: currentParentOL });
        currentParentOL.appendChild(li);
        continue;
      }

      const top = stack[stack.length - 1];

      if (level === top.level) {
        top.ol.appendChild(li);
      } else if (level > top.level) {
        const lastLi = top.ol.lastElementChild;
        if (!lastLi) {
          top.ol.appendChild(li);
        } else {
          const nestedList = createListElement(level);
          lastLi.appendChild(nestedList);
          nestedList.appendChild(li);
          stack.push({ level, ol: nestedList });
        }
      } else {
        while (stack.length && stack[stack.length - 1].level > level) {
          stack.pop();
        }

        if (stack.length === 0) {
          root.appendChild(li);
          stack.push({ level, ol: root });
        } else {
          const parent = stack[stack.length - 1];
          if (level === parent.level) {
            parent.ol.appendChild(li);
          } else {
            const lastLi = parent.ol.lastElementChild;
            if (lastLi) {
              const nestedList = createListElement(level);
              lastLi.appendChild(nestedList);
              nestedList.appendChild(li);
              stack.push({ level, ol: nestedList });
            } else {
              parent.ol.appendChild(li);
            }
          }
        }
      }
    }
  }

  function getSectionTitle(section) {
    const heading = section.querySelector("h1, h2, h3, h4, h5, h6");
    if (heading) {
      return heading.textContent.trim();
    }

    if (section.id) {
      return section.id
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, match => match.toUpperCase());
    }

    return "Section";
  }

  function getFirstImageSource(section) {
    const img = section.querySelector("img");
    if (!img) return "";
    return img.currentSrc || img.src || img.getAttribute("src") || "";
  }

  function wrapSectionWithBanner(section, index = 0) {
    if (!section || section.dataset.bannerized === "true") {
      return;
    }

    const article = document.createElement("article");
    article.className = "banner-panel";
    article.dataset.bannerized = "true";
    article.setAttribute("aria-expanded", "false");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "banner-trigger";
    trigger.setAttribute("aria-expanded", "false");

    const panel = document.createElement("div");
    panel.className = "banner-panel-body";
    panel.hidden = true;

    const title = getSectionTitle(section);
    const background = getFirstImageSource(section);

    trigger.innerHTML = `
      <span class="banner-image"${background ? ` style="background-image: url('${background}')"` : ""}></span>
      <span class="banner-shade"></span>
      <span class="banner-title">${title}</span>
      <span class="banner-caret">▾</span>
    `;

    while (section.firstChild) {
      panel.appendChild(section.firstChild);
    }

    trigger.addEventListener("click", () => {
      const isOpen = article.getAttribute("aria-expanded") === "true";
      article.setAttribute("aria-expanded", String(!isOpen));
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });

    article.appendChild(trigger);
    article.appendChild(panel);
    section.parentNode.replaceChild(article, section);

    // Set banners to be collapsed by default. `aria-expanded=false`
    if (index === 0) {
      article.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = false;
    }
  }

  function buildCollapsibleSectionBanners() {
    const directChildren = Array.from(document.body.children);
    const groups = [];
    let currentGroup = [];

    for (const node of directChildren) {
      if (node.tagName === "SCRIPT" || node.tagName === "STYLE") {
        continue;
      }

      if (node.id === "introduction" || node.id === "contact-div") {
        continue;
      }

      if (node.matches("div[id]")) {
        if (currentGroup.length) {
          groups.push(currentGroup);
          currentGroup = [];
        }
        groups.push([node]);
        continue;
      }

      if (node.matches("h1[id], h2[id], h3[id]")) {
        if (currentGroup.length) {
          groups.push(currentGroup);
        }
        currentGroup = [node];
        continue;
      }

      if (currentGroup.length) {
        currentGroup.push(node);
      }
    }

    if (currentGroup.length) {
      groups.push(currentGroup);
    }

    groups.forEach((group, index) => {
      if (!group.length) return;

      const firstNode = group[0];

      if (group.length === 1 && firstNode.matches("div[id]")) {
        wrapSectionWithBanner(firstNode, index);
        return;
      }

      const section = document.createElement("div");
      section.className = "content-section";
      section.id = firstNode.id || `generated-section-${index}`;

      group.forEach(node => {
        section.appendChild(node);
      });

      wrapSectionWithBanner(section, index);
    });
  }

  // Contents obsolete in favour of collapsable banner heading sections

  document.addEventListener("DOMContentLoaded", () => {
    /*makeTOC({
      rootSelector: "#tocRoot",
      headingSelector: "h1, h2, h3",
      minDepth: 1,
      maxDepth: 3
    });*/

    buildCollapsibleSectionBanners();
  });