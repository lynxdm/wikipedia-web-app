const wikiForm = document.querySelector(".wiki-form");
const wikiSearch = document.querySelector(".wiki-search");
const clearBtn = document.querySelector(".clear-btn");
const themeToggle = document.querySelector(".theme-toggle label");

//******THEME TOGGLE IMPLEMENTATION******
// check if dark theme was applied in previous usage
let theme = localStorage.getItem("theme");
if (theme) {
  document.body.classList.add("dark-theme");
  document.querySelector(".theme-toggle input").checked = true;
}
// event listener for toggle button
themeToggle.addEventListener("click", () => {
  // add theme class to body
  document.body.classList.toggle("dark-theme");
  //  setting local storage
  localStorage.setItem("theme", "dark-theme");
  if (!document.body.classList.contains("dark-theme")) {
    localStorage.removeItem("theme");
  }
});

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
