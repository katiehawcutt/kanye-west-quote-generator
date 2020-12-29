console.log("It's Kanye time...");
const quote = document.querySelector("#kanye-quote");
const getQuoteButton = document.querySelector("#new-quote-button");
const quoteList = document.querySelector("#kanye-quote-history");
const ol = document.querySelector("ol");
let firstTime = true;

async function getQuote(count) {
  if (count === undefined) {
    count = 0;
  }
  if (count === 3) {
    return;
  }
  let response = await fetch("https://api.kanye.rest/");
  let data = await response.json();

  const listItems = document.querySelectorAll("li");
  const arrayList = Array.from(listItems);
  const result = arrayList.some((item) => {
    return data.quote === item.innerText;
  });

  if (result === false) {
    quote.innerText = `"${data.quote}"`;
    addQuoteToList(data.quote);
  } else {
    count++;
    getQuote(count);
  }
}

function addQuoteToList(quote) {
  const quoteListItem = document.createElement("li");
  quoteListItem.innerText = `"${quote}"`;
  quoteList.appendChild(quoteListItem);
}

getQuoteButton.addEventListener("click", () => {
  getQuote();
  document.querySelector("#noQuotesMessage").innerText = "";
});

getQuoteButton.addEventListener("mousedown", () => {
  getQuoteButton.style.backgroundColor = "#23679e";
  getQuoteButton.style.transform = "scale(1.2)";
});

getQuoteButton.addEventListener("mouseup", (e) => {
  console.log(e);
  getQuoteButton.style.backgroundColor = "white";
  getQuoteButton.style.transform = "scale(1.1)";
});
