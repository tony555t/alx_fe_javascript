const swahiliQuotes = [
    { text: "Haba na haraka, lakini bila kusimama.", category: "motivation", translation: "Slowly but surely, without stopping." },
    { text: "Mti hauanguki kwa mpigo mmoja.", category: "perseverance", translation: "A tree does not fall with one strike." },
    { text: "Ukweli hauogopi upelelezi.", category: "truth", translation: "Truth does not fear investigation." },
    { text: "Asiyejua njia ya kurudi, asiende mbali.", category: "wisdom", translation: "He who does not know the way back should not go far." },
    { text: "Subira ni ufunguo wa faraja.", category: "patience", translation: "Patience is the key to relief." },
    { text: "Penye nia, pana njia.", category: "determination", translation: "Where there is a will, there is a way." },
    { text: "Mkono mmoja hauaui chawa.", category: "unity", translation: "One hand cannot kill a louse (teamwork is important)." },
    { text: "Mchagua jembe si mkulima.", category: "action", translation: "The one who chooses the hoe is not the farmer (actions matter more than words)." },
    { text: "Daktari mjinga ni adui wa mgonjwa.", category: "competence", translation: "An ignorant doctor is an enemy to the patient." },
    { text: "Elimu ni bahari, ukijua kidogo, umesoma kidogo.", category: "education", translation: "Education is an ocean; if you know little, you have studied little." },
    { text: "Mwenye saburi, hula mbivu.", category: "patience", translation: "The patient one eats ripe fruit." },
    { text: "Kidole kimoja hakivunji chawa.", category: "cooperation", translation: "One finger cannot kill a louse." },
    { text: "Haraka haraka haina baraka.", category: "patience", translation: "Hurry hurry has no blessings." },
    { text: "Mvumilivu hula mbivu tamu.", category: "perseverance", translation: "The patient one eats sweet ripe fruit." },
    { text: "Usiende mahali pasipo na kurudi.", category: "caution", translation: "Don't go where you cannot return from." }
];
  
  // Required function
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <blockquote>"${randomQuote.text}"</blockquote>
      <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
  }
  
  // Required function
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
    showRandomQuote(); 
  }
  
  // Required function
  function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
  
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
  
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm(); 
    showRandomQuote();
  });
  