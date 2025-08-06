let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Haba na haraka, lakini bila kusimama.", category: "motivation" },
  { text: "Mti hauanguki kwa mpigo mmoja.", category: "perseverance" },
  { text: "Ukweli hauogopi upelelezi.", category: "truth" },
  { text: "Asiyejua njia ya kurudi, asiende mbali.", category: "wisdom" },
  { text: "Subira ni ufunguo wa faraja.", category: "patience" },
  { text: "Penye nia, pana njia.", category: "determination" },
  { text: "Mkono mmoja hauaui chawa.", category: "unity" },
  { text: "Mchagua jembe si mkulima.", category: "action" },
  { text: "Daktari mjinga ni adui wa mgonjwa.", category: "competence" },
  { text: "Elimu ni bahari, ukijua kidogo, umesoma kidogo.", category: "education" },
  { text: "Mwenye saburi, hula mbivu.", category: "patience" },
  { text: "Kidole kimoja hakivunji chawa.", category: "cooperation" },
  { text: "Haraka haraka haina baraka.", category: "patience" },
  { text: "Mvumilivu hula mbivu tamu.", category: "perseverance" },
  { text: "Usiende mahali pasipo na kurudi.", category: "caution" }
];

// Show a random quote from a given list
function showQuote(list) {
  const quote = list[Math.floor(Math.random() * list.length)];
  document.getElementById("quoteDisplay").innerHTML = quote
    ? `<blockquote>"${quote.text}"</blockquote><p><strong>Category:</strong> ${quote.category}</p>`
    : "<p>No quotes found in this category.</p>";
}

// Populate dropdown with unique categories
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const selected = localStorage.getItem("selectedCategory") || "all";
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  select.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat[0].toUpperCase() + cat.slice(1)}</option>`)
    .join("");
  select.value = selected;
}

// Filter and display quotes based on selected category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);
  const filtered = selected === "all" ? quotes : quotes.filter(q => q.category === selected);
  showQuote(filtered);
}

// Add new quote and update storage and UI
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!text || !category) return alert("Please fill in both the quote and category.");

  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  populateCategories();
  filterQuotes();
  alert("Quote added successfully!");
}

document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
  document.getElementById("newQuote").addEventListener("click", filterQuotes);
});
