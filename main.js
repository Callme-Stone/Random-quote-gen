const quoteCon = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorName = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


// https://type.fit/api/quotes

let apiQuote = [];

//show loading

function loading() {
    loader.hidden = false
    quoteCon.hidden = true
}

// hide loading
function complete() {
    quoteCon.hidden = false
    loader.hidden = true
}


function newQuote() {
    loading()
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
    complete()
}

async function getQuote() {
    loading()
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

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${authorName.textContent}-${authorName.textContent}`
    window.open(twitterUrl, "_blank")
    
}

// Even listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuote()

