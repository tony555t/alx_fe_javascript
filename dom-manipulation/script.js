let quotes = [
  { text: "Haba na haraka, lakini bila kusimama.", category: "motivation" },
  { text: "Mti hauanguki kwa mpigo mmoja.", category: "perseverance" },
  { text: "Ukweli hauogopi upelelezi.", category: "truth" },
  { text: "Penye nia, pana njia.", category: "determination" }
];

// Load quotes from localStorage on startup
function loadQuotes() {
  const saved = localStorage.getItem('quotes');
  if (saved) {
    quotes = JSON.parse(saved);
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Save last viewed quote to sessionStorage
function saveLastViewed(quote) {
  sessionStorage.setItem('lastViewed', JSON.stringify(quote));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `
    <blockquote>"${randomQuote.text}"</blockquote>
    <p><strong>Category:</strong> ${randomQuote.category}</p>
  `;
  saveLastViewed(randomQuote);
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === '' || newQuoteCategory === '') {
    alert('Please fill in both the quote text and category.');
    return;
  }

  quotes.push({
    text: newQuoteText,
    category: newQuoteCategory.toLowerCase()
  });

  saveQuotes();
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  alert('Quote added successfully!');
  showRandomQuote();
}

function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
  
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function createAddQuoteForm() {
  // Form already exists in HTML
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  createAddQuoteForm();
  showRandomQuote();
});