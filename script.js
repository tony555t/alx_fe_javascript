const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "innovation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "inspiration" }
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '<blockquote>"' + randomQuote.text + '"</blockquote><p><strong>Category:</strong> ' + randomQuote.category + '</p>';
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
    
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
    displayRandomQuote();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
    displayRandomQuote();
});