// Quotes array with objects containing text and category properties
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "innovation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "inspiration" }
];

// Function named exactly "displayRandomQuote" (not showRandomQuote)
function displayRandomQuote() {
    // Logic to select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Update the DOM
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <blockquote>"${randomQuote.text}"</blockquote>
        <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
}

// Function named exactly "addQuote"
function addQuote() {
    // Get input values
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    // Validate inputs
    if (newQuoteText === '' || newQuoteCategory === '') {
        alert('Please fill in both the quote text and category.');
        return;
    }
    
    // Logic to add new quote to the quotes array
    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory.toLowerCase()
    };
    quotes.push(newQuote);
    
    // Update the DOM - clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Show success message and display new quote
    alert('Quote added successfully!');
    displayRandomQuote();
}

// Event listener on the "Show New Quote" button
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the button with ID "newQuote"
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
    
    // Display initial quote
    displayRandomQuote();
});