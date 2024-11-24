const displayResult = document.querySelector(".output");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const buttons = document.querySelectorAll("[data-btn], [data-operator]");

let currentExpression = "";

// Mapeia os operadores para suas funções correspondentes
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};

// Limpa toda a entrada
allClearButton.addEventListener("click", () => {
    currentExpression = "";
    displayResult.innerText = "";
});

// Apaga o último caractere
deleteButton.addEventListener("click", () => {
    currentExpression = currentExpression.slice(0, -1);
    displayResult.innerText = currentExpression;
});

// Atualiza o display e a expressão
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentExpression += btn.innerText;
        displayResult.innerText = currentExpression;
    });
});

// Calcula o resultado
equalsButton.addEventListener("click", () => {
    try {
        // Separa números e operadores
        const numbers = currentExpression.split(/[-+*/]/).map(Number);
        const operators = currentExpression.match(/[-+*/]/g);

        if (!operators || numbers.length - 1 !== operators.length) {
            throw new Error("Expressão inválida");
        }

        // Calcula o resultado usando reduce e o objeto de operações
        const result = numbers.reduce((acc, num, index) => {
            if (index === 0) return acc; // Ignora o primeiro número no reduce
            const operator = operators[index - 1];
            return operations[operator](acc, num); // Aplica a operação correspondente
        });

        displayResult.innerText = result;
        currentExpression = result.toString(); // Atualiza a expressão com o resultado
    } catch (error) {
        displayResult.innerText = "Erro";
        currentExpression = "";
    }
});
