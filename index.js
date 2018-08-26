const buttonsNum = document.querySelectorAll('button.num');
const buttonsFunc = document.querySelectorAll('button.op');
const buttonsClear = document.querySelectorAll('button.clear');

var calculator = {
  tempResults: [],
  sequence: '',
  endResult: 0,
  digitStr: '',
  waitingOp: '',

  buildNumber: function(digit) {
    this.digitStr += digit;
  },
  operation: function(operator) {
    this.sequence += this.waitingOp + this.digitStr;
    if (this.waitingOp !== '') {
      this.tempResults.push(+this.digitStr);
      this.digitStr = '';
      this.tempResults = [this.getResult()];
    } else {
      this.tempResults = [+this.digitStr];
      this.digitStr = '';
    }
    if (operator === '=') {
      this.endResult = this.tempResults;
      this.tempResults = [];
      this.waitingOp = '';
    } else { 
      this.waitingOp = operator;
    }
  },
  getResult: function() {
    var temp = eval(this.tempResults[0] + this.waitingOp + this.tempResults[1]);
    return Math.round(temp * 10000) / 10000;
  },
  clear: function(clear) {
    this.digitStr = '';
    if (clear === 'AC') {
      this.tempResults = [];
      this.waitingOp = '';
      this.sequence = '';
    }
  }
};

var handler = {
  buildNumber: function(e) {
    var value = e.target.value;
    if (!(value === '.' && calculator.digitStr.includes('.'))) {
      calculator.buildNumber(value);
      $('#result').text(calculator.digitStr);
      $('#sequence').text(calculator.sequence);
    }
  },
  operation: function(e) {
    var value = e.target.value;
    var re = /\d$/g;
    if (re.test(calculator.digitStr)) {
      calculator.operation(value);
      $('#sequence').text(calculator.sequence);
      if (value === '=') {
        $('#result').text(calculator.endResult);
        calculator.sequence = '';
      } else {
        $('#result').text(calculator.tempResults);
      }
    }
  },
  clear: function(e) {
    var value = e.target.value;
    calculator.clear(value);
    $('#result').text('0');
    $('#sequence').text(calculator.sequence);
  }
};



buttonsNum.forEach(button => {
  button.addEventListener('click', handler.buildNumber);
});
buttonsFunc.forEach(button => {
  button.addEventListener('click', handler.operation);
});
buttonsClear.forEach(button => {
  button.addEventListener('click', handler.clear);
});
