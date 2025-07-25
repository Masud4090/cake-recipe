// Theme toggle
const btn = document.querySelector("#toggleTheme");
const body = document.querySelector("body");
let mode = "light";

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add("dark");
  mode = "dark";
  btn.innerText = "☀️ Dark";
}

btn.addEventListener("click", () => {
  if (mode === "light") {
    body.classList.add("dark");
    body.classList.remove("light");
    btn.innerText = "☀️ Dark";
    mode = "dark";
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
    btn.innerText = "🌙 Light";
    mode = "light";
  }
});

// Print with title
function printWithTitle() {
  const originalTitle = document.title;
  document.title = "Vanilla_Cake_Recipe";
  window.print();
  document.title = originalTitle;
}

const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");

checkboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    const id = cb.getAttribute("data-id");
    localStorage.setItem(`checkbox_${id}`, cb.checked);
    updateCheckAllButton(); // update button label
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");

  checkboxes.forEach(cb => {
    const id = cb.getAttribute("data-id");
    const savedState = localStorage.getItem(`checkbox_${id}`);
    if (savedState !== null) {
      cb.checked = savedState === "true";
    }
  });

  updateCheckAllButton();
});

const checkAllBtn = document.getElementById("checkAllBtn");

checkAllBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
    const id = cb.getAttribute("data-id");
    localStorage.setItem(`checkbox_${id}`, cb.checked);
  });
 updateCheckAllButton()
});

function updateCheckAllButton() {
  const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  const checkAllBtn = document.getElementById("checkAllBtn");

  checkAllBtn.innerHTML = allChecked ? "❌ Uncheck All" : "✅ Check All";
}

// Accordion toggle with localStorage
const accordionButtons = document.querySelectorAll(".accordion");

window.addEventListener("DOMContentLoaded", () => {
  accordionButtons.forEach(btn => {
    const id = btn.getAttribute("data-id");
    const isOpen = localStorage.getItem(`accordion_${id}`) === "true";
    const panel = btn.nextElementSibling;

    if (isOpen) {
      btn.classList.add("active");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

accordionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const panel = btn.nextElementSibling;
    const isOpen = btn.classList.contains("active");
    const id = btn.getAttribute("data-id");

    panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : null;
    localStorage.setItem(`accordion_${id}`, isOpen);
  });
});

const funFacts = [
  "Cakes were first made in ancient Egypt as sweet breads!",
  "The word 'cake' comes from the Old Norse word “kaka.”",
  "In Japan, Christmas cake is a strawberry shortcake – not fruitcake!",
  "Chocolate was once used as currency in the Mayan civilization.",
  "The world’s tallest cake stood over 100 feet tall!",
  "The first cupcakes were baked in teacups!",
  "Vanilla is the most popular cake flavor globally.",
  "The most expensive cake ever sold cost over $75 million!",
];

function getRandomFacts(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

window.addEventListener("DOMContentLoaded", () => {
  // Show 3 random facts
  const factList = document.getElementById("funFacts");
  const randomFacts = getRandomFacts(funFacts, 3);
  randomFacts.forEach(fact => {
    const li = document.createElement("li");
    li.textContent = fact;
    factList.appendChild(li);
  });
});
