const quoteCon = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorName = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get quote from API

//https://api.quotable.io/random

//show loading
const showLoading = () => {
    loader.hidden = false
    quoteCon.hidden = true
}

// hide loading
const hideLoading = () => {
    if(!loader.hidden) {
        quoteCon.hidden = false
        loader.hidden = true
    }
}

const getQuote = async() => {
    showLoading()
    const apiUrl = 'https://api.quotable.io/random'

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        if(data.author === '') {
            authorName.innerText = 'unknown';
        }else {
            authorName.innerText = data.author;
        }

        // check quote length to determine the styling 
        if(data.content.length > 50) {
            quoteText.classList.remove('long-quote')
        }

        authorName.innerText = data.author
        quoteText.innerText = data.content

        hideLoading()

    } catch (err) {
        console.error('Error fetching quote', err)
        getQuote() // retry fetching quote
    }
}

// Tweet
const tweetQuote = () => {
    const quote = quoteText.innerText
    const author = authorName.innerText

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`

    window.open(twitterUrl, "_blank")
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)
getQuote()