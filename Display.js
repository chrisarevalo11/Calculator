class Display {
    constructor(displayPreviousValue, displayCurrentValue) {
        this.displayCurrentValue = displayCurrentValue;
        this.displayPreviousValue = displayPreviousValue;
        this.calculator = new Calculator();
        this.operation = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.operationSign = {
            add: '+',
            substract: '-',
            divide: '÷',
            multiply: '*'
        }
    }

    addNumber(number) {
        if(number === '.' && this.currentValue.includes('.')) return;
        this.currentValue += number;
        this.printValues();
    }

    printValues() {
        this.displayCurrentValue.textContent = this.currentValue;
        this.displayPreviousValue.textContent = `${this.previousValue} ${this.operationSign[this.operation] || ""}`;
    }

    delete() {
        this.currentValue = this.currentValue.slice(0, -1);
        this.printValues();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
        this.printValues();
    }

    calc() {
        const floatPreviousValue = parseFloat(this.previousValue);
        const floatCurrentValue = parseFloat(this.currentValue);

        if (isNaN(floatCurrentValue) || isNaN(floatPreviousValue)) return
        this.currentValue = this.calculator[this.operation](floatPreviousValue, floatCurrentValue)
    }

    defOperation(value) {
        this.operation !== 'result' && this.calc();
        this.operation = value;
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.printValues();
    }
}