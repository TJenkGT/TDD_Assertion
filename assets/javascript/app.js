$(function(){
 // Initial array of stocks
const stocksList = ['V', 'MA', 'BAH', 'IBM', 'ACN', 'IT', 'NKE', 'BA', 'VZ', 'MCD'];



// Get Stock info

const queryStockSymbol = 'https://api.iextrading.com/1.0/ref-data/symbols';


const validationList = [];

$.ajax({
  url:queryStockSymbol,
  method:'GET'

}).then(function(response) {

  response.forEach(function(element) {
  validationList.push(element.symbol)
   
  });

})

// Obtain the company name, logo, 
const displayStockInfo = function () {

  const stock = $(this).attr('data-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news&range=1m&last=10`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    // Creating a div to hold the stock
    const stockDiv = $('<div>').addClass('stock');

    // DISPLAY COMPANY LOGO
    const stocklogo = response.logo.url;
    const logoHolder = $('<img>').attr('src', stocklogo);
    stockDiv.append(logoHolder);

    // Creating an element to display the company name
    const companyName = response.quote.companyName;
    const nameHolder = $('<p>').text(`Company Name: ${companyName}`);
    stockDiv.append(nameHolder);

    const stockSymbol = response.quote.symbol;
    const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);
    stockDiv.append(symbolHolder);

    const stockPrice = response.quote.latestPrice;
    const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);
    stockDiv.append(priceHolder);
   
    
    // get the news articles related to the stock
    const stockNews = `https://api.iextrading.com/1.0/stock/${stock}/news/last/10`;
    const companyNews = [];
      $.ajax({
      url:stockNews,
      method:'GET'
    
    }).then(function(responseS) {
      
      const stockHeadline = $('<div>').addClass('stock');

      responseS.forEach(function(element) {
        companyNews.push(element.headline)
      

      });
    
      for (let i = 0; i < responseS.length; i++){
        const summaryHolder = $('<p>').text(`${responseS[i].headline}`);
        const anchor = $('<a>').attr('href', responseS[i].text);
        anchor.append(summaryHolder);
  
        stockHeadline.append(anchor);

        $('#viewHeadlines').html(stockHeadline);
      }
    
      
    })
          
    $('#viewStocks').html(stockDiv);
   
  });


}

// create buttons for user input stocks
const render = function () {

   $('#viewButtons').empty();

    for (let i = 0; i < stocksList.length; i++) {

    const newButton = $('<button>');
    
    newButton.addClass('stock-btn');
    newButton.attr('data-name', stocksList[i]);
    newButton.text(stocksList[i]);
    
       $('#viewButtons').append(newButton);
  }
}


// Validate the user input
const addButton = function(event) {
  event.preventDefault();

  const newStock = $('#txtStockInput').val().trim();
  
  if (validationList.includes(newStock) && !stocksList.includes(newStock)) {
    $('#userMessage').empty();
    stocksList.push(newStock);
    $('#txtStockInput').val('');
    render();
  }
  
  else {
    $('#userMessage').text('* Stock Symbol does not exist');
  }
 
}

let total = 0;

const stockSymbol = function(txtStockInput, viewStocks) {
  txtStockInput === viewStocks;

//Clear form
const clear = function() {
  $('#viewButtons').empty();
}

$('#clear').on('click', clear);

$('#btnAddStock').on('click', addButton);
$('#viewButtons').on('click', '.stock-btn', displayStockInfo);


render();


})