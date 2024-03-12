const quoteCon = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorName = document.getElementById('author')
const twitterbtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')


// https://type.fit/api/quotes

let apiQuote = [];


function newQuote() {
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)]
    console.log(quote)
    if(!quote.author) {
        authorName.textContent = 'Unknown'
    } else {
        authorName.textContent = quote.author
    }

    // CheckQuote length to determine the styling 
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    authorName.textContent = quote.author
    quoteText.textContent = quote.text
}

async function getQuote() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuote = await response.json()

        console.log(apiQuote)
        newQuote()

    } catch(err) {
        console.log(err)
    }
}

// Even listeners 
newQuoteBtn.addEventListener('click', newQuote)

getQuote()

