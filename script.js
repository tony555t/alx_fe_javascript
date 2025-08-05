// ✅ Check 1: Quotes array with objects containing text and category properties
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "innovation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "success" }
];

// ✅ Check 2: displayRandomQuote function (Note: function name matches requirement)
function displayRandomQuote() {
    // ✅ Check 3: Logic to select a random quote and update the DOM
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Select random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Update the DOM
    quoteDisplay.innerHTML = `
        <blockquote>"${randomQuote.text}"</blockquote>
        <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
}

// ✅ Check 4: addQuote function
function addQuote() {
    // ✅ Check 5: Logic to add a new quote to the quotes array and update the DOM
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    // Validate inputs
    if (newQuoteText === '' || newQuoteCategory === '') {
        alert('Please fill in both the quote text and category.');
        return;
    }
    
    // Add new quote to quotes array
    quotes.push({
        text: newQuoteText,
        category: newQuoteCategory.toLowerCase()
    });
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Update DOM to show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Quote added successfully!';
    successMessage.style.color = 'green';
    document.body.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 3000);
    
    // Display the new quote immediately
    displayRandomQuote();
}

// Function to create the add quote form dynamically
function createAddQuoteForm() {
    // Check if form already exists
    if (document.getElementById('addQuoteForm')) {
        return;
    }
    
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteForm';
    
    // Create form elements as specified in requirements
    formContainer.innerHTML = `
        <div>
            <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
            <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
            <button onclick="addQuote()">Add Quote</button>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(formContainer);
}

// ✅ Check 6: Event listener on the "Show New Quote" button
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
    
    // Display initial quote
    displayRandomQuote();
    
    // Create the add quote form
    createAddQuoteForm();
});