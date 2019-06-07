describe('stockSymbol', function() {
  it('should compare the symbols of two stocks', function() {
    expect(stockSymbol(stockSymbol)).to.equal(viewStocks);
  });

//   it('should return the sum of two decimal numbers to 2 decimal places', function() {
//     expect(addValue(2.034, 4.777)).to.equal(6.811);
//   });

//   it('should return the sum to 2 decimal places of a decimal number and a string that is coercible to a number', function() {
//     expect(addValue(2.034, '4.777')).to.equal(6.811);
//   });

//   it('should return the original total for invalid inputs', function() {
//     expect(addValue(4.66, 'cow')).to.equal(4.66);
//   });
 });