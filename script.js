document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    
    let currentInput = '0';
    let previousInput = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        if (currentInput.length > 9) {
            display.style.fontSize = '2.0rem';
        } else if (currentInput.length > 6) {
            display.style.fontSize = '2.6rem';
        } else {
            display.style.fontSize = '3.4rem';
        }
        display.innerText = currentInput;
    }

    function appendNumber(number) {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            if (number === '.' && currentInput.includes('.')) return;
            currentInput += number;
        }
        updateDisplay();
    }

    function appendOperator(operator) {
        if (currentOperator && !shouldResetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        currentOperator = operator;
        
        let displayOp = operator;
        if (operator === '*') displayOp = '×';
        if (operator === '/') displayOp = '÷';
        
        historyDisplay.innerText = `${previousInput} ${displayOp}`;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (!currentOperator || shouldResetDisplay) return;

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (currentOperator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': 
                if (current === 0) {
                    result = "Error";
                } else {
                    result = prev / current; 
                }
                break;
            case '%': result = (prev / 100) * current; break;
            default: return;
        }

        if (typeof result === 'number') {
            result = parseFloat(result.toFixed(8)).toString();
        }

        historyDisplay.innerText = '';
        currentInput = result;
        currentOperator = null;
        shouldResetDisplay = true;
        updateDisplay();
    }

    function clearAll() {
        currentInput = '0';
        previousInput = '';
        currentOperator = null;
        shouldResetDisplay = false;
        historyDisplay.innerText = '';
        updateDisplay();
    }

    function deleteLast() {
        if (shouldResetDisplay) return;
        if (currentInput.length === 1 || currentInput === 'Error') {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Modern operational event listener definitions
    document.querySelectorAll('.btn-num').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.innerText));
    });

    document.getElementById('btn-ac').addEventListener('click', clearAll);
    document.getElementById('btn-del').addEventListener('click', deleteLast);
    document.getElementById('btn-mod').addEventListener('click', () => appendOperator('%'));
    document.getElementById('btn-div').addEventListener('click', () => appendOperator('/'));
    document.getElementById('btn-mul').addEventListener('click', () => appendOperator('*'));
    document.getElementById('btn-sub').addEventListener('click', () => appendOperator('-'));
    document.getElementById('btn-add').addEventListener('click', () => appendOperator('+'));
    document.getElementById('btn-eq').addEventListener('click', calculate);
});
