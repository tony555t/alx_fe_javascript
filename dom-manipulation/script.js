// Step 1: Quote array with text and category
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Wisdom" }
  ];
  
  // Step 2: Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> ${randomQuote.text}</p>
      <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
  }
  
  // Step 3: Add new quote dynamically
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // Optional: clear the form inputs
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
  
      // Optional: Show the newly added quote immediately
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = `
        <p><strong>Quote:</strong> ${newQuoteText}</p>
        <p><strong>Category:</strong> ${newQuoteCategory}</p>
      `;
    } else {
      alert("Please enter both a quote and category.");
    }
  }
  
  // Step 4: Event listener for "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  