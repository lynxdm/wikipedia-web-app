const wikiForm = document.querySelector(".wiki-form");
const wikiSearch = document.querySelector(".wiki-search");
const clearBtn = document.querySelector(".clear-btn");

// ADD FOCUS ON CLICK
wikiForm.addEventListener("click", () => {
  wikiSearch.focus();
  wikiForm.classList.add("searching");
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
