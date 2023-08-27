const wikiForm = document.querySelector(".wiki-form");
const wikiSearch = document.querySelector(".wiki-search");
const clearBtn = document.querySelector(".clear-btn");

// ADD FOCUS ON CLICK
wikiForm.addEventListener("click", () => {
  wikiSearch.focus();
});

// display clearBtn while typing
wikiSearch.addEventListener("keyup", () => {
  clearBtn.style.visibility = "visible";
  if (!wikiSearch.value) {
    clearBtn.style.visibility = "hidden";
  }
});
