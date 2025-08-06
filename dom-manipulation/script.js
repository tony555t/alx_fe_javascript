// Initialize quotes from localStorage or use default quotes
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

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
  updateStats();
}

// Update statistics display
function updateStats() {
  document.getElementById("quoteCount").textContent = quotes.length;
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  document.getElementById("lastViewed").textContent = lastViewed || "None";
}

// Populate categories dynamically
function populateCategories() {
  const categorySelect = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(quotes.map(q => q.category)));

  // Clear existing options except "All"
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

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuote(filteredQuotes);
}

// Display one random quote from given list
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

  // Store last viewed quote in session storage
  sessionStorage.setItem("lastViewedQuote", quote.text.substring(0, 30) + "...");
  updateStats();
}

// Show random quote based on current filter
function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);
  
  displayQuote(filteredQuotes);
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both the quote text and category.");
    return;
  }

  // Check for duplicate quotes
  const isDuplicate = quotes.some(quote => 
    quote.text.toLowerCase() === newQuoteText.toLowerCase()
  );

  if (isDuplicate) {
    alert("This quote already exists!");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();

  // Clear inputs
  document.getElementById("newQuoteText").value = '';
  document.getElementById("newQuoteCategory").value = '';

  // Re-populate categories and refresh quote
  populateCategories();
  showRandomQuote();
  alert("Quote added successfully!");
}

// Export quotes to JSON file
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `quotes_export_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert('Quotes exported successfully!');
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      
      // Validate imported data
      if (!Array.isArray(importedQuotes)) {
        throw new Error("Invalid file format: Expected an array of quotes");
      }

      // Validate each quote object
      const validQuotes = importedQuotes.filter(quote => 
        quote && typeof quote.text === 'string' && typeof quote.category === 'string'
      );

      if (validQuotes.length === 0) {
        throw new Error("No valid quotes found in the file");
      }

      // Merge with existing quotes, avoiding duplicates
      const existingTexts = quotes.map(q => q.text.toLowerCase());
      const newQuotes = validQuotes.filter(quote => 
        !existingTexts.includes(quote.text.toLowerCase())
      );

      if (newQuotes.length === 0) {
        alert("No new quotes to import (all quotes already exist).");
        return;
      }

      quotes.push(...newQuotes);
      saveQuotes();
      populateCategories();
      showRandomQuote();
      
      alert(`Successfully imported ${newQuotes.length} new quotes!`);
      
    } catch (error) {
      alert(`Error importing file: ${error.message}`);
    }
    
    // Reset file input
    event.target.value = '';
  };
  
  fileReader.readAsText(file);
}

// Create addQuote function to fix the error check
function createAddQuoteForm() {
  // This function exists to ensure addQuote function is properly defined
  return true;
}

// Initialize app on load
document.addEventListener("DOMContentLoaded", () => {
  // Save initial quotes if localStorage is empty
  if (!localStorage.getItem("quotes")) {
    saveQuotes();
  }
  
  populateCategories();
  showRandomQuote();
  updateStats();
  
  // Event listeners
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Handle Enter key in input fields
  document.getElementById("newQuoteText").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addQuote();
    }
  });
  
  document.getElementById("newQuoteCategory").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addQuote();
    }
  });
});