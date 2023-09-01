let url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srlimit=20&srsearch=";

// ******SELECTING ELEMENTS******
const wikiForm = document.querySelector(".wiki-form");
const wikiSearch = document.querySelector(".wiki-search");
const clearBtn = document.querySelector(".fa-circle-xmark");
const themeToggle = document.querySelector(".theme-toggle label");
const upBtn = document.querySelector(".up-btn");
const results = document.querySelector(".results");
const suggestions = document.querySelector(".suggestions");

//******THEME TOGGLE IMPLEMENTATION******
// check if dark theme was applied in previous usage
retrieveTheme();
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

// ******UP BUTTON IMPLEMENTATION******
window.addEventListener("scroll", () => {
  let scrollHeight = window.pageYOffset;
  upBtn.style.visibility = "hidden";
  if (scrollHeight > 400) {
    upBtn.style.visibility = "visible";
  }
});

//******ADD FOCUS ON CLICK AND GET HISTORY******
document.addEventListener("mousedown", (e) => {
  if (wikiForm.contains(e.target)) {
    wikiSearch.focus();
    if (wikiSearch.value) {
      clearBtn.style.visibility = "visible";
    }
    let list = getStorage().reverse();
    if (!list.length < 1) {
      wikiForm.classList.add("searching");
      renderHistory(list);
    }
  } else if (
    !wikiForm.contains(e.target) &&
    !e.target.classList.contains("fa-xmark")
  ) {
    // returnToDefaults();
    returnToScreen();
  }
});

//******DISPLAY clearBtn WHILE TYPING AND FILTER HISTORY******
wikiSearch.addEventListener("keyup", (e) => {
  if (wikiSearch.value) {
    let list = getStorage().reverse();
    if (!list.length < 1) {
      wikiForm.classList.add("searching");
      filterHistory(list, wikiSearch.value);
      clearBtn.style.visibility = "visible";
      if (e.keyCode === 13) {
        returnToDefaults();
      }
    }
  } else {
    clearBtn.style.visibility = "hidden";
    wikiForm.classList.remove("searching");
  }
});

// ******CLEARBTN IMPLEMENTATION******
clearBtn.addEventListener("mousedown", () => {
  console.log("hey");
  //   returnToDefaults();
  wikiForm.classList.remove("searching");
  suggestions.innerHTML = "";
  wikiSearch.value = "";
});

// ******ON SUBMIT******
wikiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = wikiSearch.value;
  returnToDefaults();
  wikiSearch.blur()
  if (input) {
    fetchPages(input);
  } else {
    errorText("no input");
  }
});

// ******FUNCTIONS******
function retrieveTheme() {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add("dark-theme");
    document.querySelector(".theme-toggle input").checked = true;
  }
}

const fetchPages = async (searchValue) => {
  results.classList.add("loading");
  try {
    let response = await fetch(`${url}${searchValue}`);
    let data = await response.json();
    let search = data.query.search;
    if (search.length < 1) {
      errorText("not found, please check and try again");
    } else {
      let id = new Date().getTime();
      addToHistory(id, searchValue);
      renderResults(search, id);
    }
  } catch {
    errorText("There was an error, please try again :(");
  }
};

function errorText(text) {
  if (results.classList.contains("loading")) {
    results.classList.remove("loading");
  }
  results.classList.add("error");
  results.innerHTML = `<p>${text}</p>`;
}

function returnToDefaults() {
  results.innerHTML = "";
  results.classList.remove("error");
  wikiForm.classList.remove("searching");
  suggestions.innerHTML = "";
  clearBtn.style.visibility = "hidden";
}

function returnToScreen() {
  wikiForm.classList.remove("searching");
  suggestions.innerHTML = "";
  clearBtn.style.visibility = "hidden";
}

function renderResults(search) {
  results.classList.remove("loading");
  returnToDefaults();
  const values = search
    .map((value) => {
      return `<a href="http://en.wikipedia.org/?curid=${value.pageid}" target="_blank">
          <h4>${value.title}</h4>
          <p>${value.snippet}...</p>
        </a>`;
    })
    .join("");
  results.innerHTML = values;
}

function renderHistory(list) {
  let history = list
    .map((items) => {
      return `<li class='history' data-id=${items.id}>
      <a><i class='fa-solid fa-clock-rotate-left'></i>
      <p>${items.value}</p>
    </a>
    <button class='delete-btn' title='Delete'>
      <i class='fa-solid fa-xmark'></i>
    </button>
  </li>`;
    })
    .join("");
  addToSuggestion(history);
}

function addToSuggestion(history) {
  suggestions.innerHTML = history;
  let historyItems = suggestions.querySelectorAll("li");
  historyItems.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      let id = Number(item.dataset.id);
      let historyValue = item.textContent;
      if (e.target.classList.contains("fa-xmark")) {
        let deleteBtn = e.target;
        item.remove();
        let list = getStorage();
        list = list.filter((item) => {
          if (item.id !== id) return item;
        });
        localStorage.setItem("list", JSON.stringify(list));
        if (!suggestions.innerHTML) {
          wikiForm.classList.remove("searching");
        }
      } else {
        fetchPages(historyValue);
        returnToDefaults();
        wikiSearch.value = `${item.textContent}`.trim();
      }
    });
  });
}

function filterHistory(list, value) {
  let newList = list.filter((item) => {
    if (item.value.includes(value)) return item;
  });

  let filterered = newList
    .map((item) => {
      return `<li class='history' data-id=${item.id}>
      <a><i class='fa-solid fa-clock-rotate-left'></i>
      <p>${item.value}</p>
    </a>
    <button class='delete-btn' title='Delete'>
      <i class='fa-solid fa-xmark'></i>
    </button>
  </li>`;
    })
    .join("");
  if (!filterered.length < 1) {
    addToSuggestion(filterered);
  } else {
    returnToScreen();
  }
}

// ******STORAGE FUNCTIONS******
function addToHistory(id, value) {
  let list = getStorage();
  //   TO KEEP HISTORY LENGTH BELOW 5
  if (list.length > 4) {
    list.shift();
  }

  list.push({ id, value });
  localStorage.setItem("list", JSON.stringify(list));
}

function getStorage() {
  let list = JSON.parse(localStorage.getItem("list"));
  return list ? list : [];
}
