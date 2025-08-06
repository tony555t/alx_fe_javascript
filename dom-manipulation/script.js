const quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

// --- Populate categories dynamically ---
function populateCategories() {
  const categorySelect = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(quotes.map(q => q.category)));

  // Clear existing (except "All")
  categorySelect.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });

  // Restore last selected filter
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categorySelect.value = savedFilter;
  }
}

// --- Filter quotes by category ---
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuote(filteredQuotes);
}

// --- Display one quote from given list ---
function displayQuote(quoteList) {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (!quoteList.length) {
    quoteDisplay.innerHTML = `<p>No quotes found in this category.</p>`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * quoteList.length);
  const quote = quoteList[randomIndex];

  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// --- Show random quote based on current filter ---
function showRandomQuote() {
  filterQuotes(); // Simply reuse filter logic
}

// --- Add a new quote ---
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both the quote text and category.");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Clear inputs
  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';

  // Re-populate categories and refresh quote
  populateCategories();
  filterQuotes();
  alert("Quote added successfully!");
}

// --- Initialize app on load ---
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
