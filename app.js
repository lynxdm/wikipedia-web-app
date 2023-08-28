const wikiForm = document.querySelector(".wiki-form");
const wikiSearch = document.querySelector(".wiki-search");
const clearBtn = document.querySelector(".clear-btn");

// ADD FOCUS ON CLICK
document.addEventListener("mousedown", (e) => {
  if (wikiForm.contains(e.target)) {
    wikiSearch.focus();
    wikiForm.classList.add("searching");
  } else {
    wikiForm.classList.remove("searching");
  }
});

// display clearBtn while typing
wikiSearch.addEventListener("keyup", () => {
  clearBtn.style.visibility = "visible";
  wikiForm.classList.add("searching");
  if (!wikiSearch.value) {
    clearBtn.style.visibility = "hidden";
    wikiForm.classList.remove("searching");
  }
});
