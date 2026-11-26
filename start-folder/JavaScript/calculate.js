const value1Input = document.querySelector("#value1");
const value2Input = document.querySelector("#value2");
const operatorInput = document.querySelector("#operator");
const resultOutput = document.querySelector("#result");

const calculate = () => {
  const value1Text = value1Input.value.trim();
  const value2Text = value2Input.value.trim();

  if (value1Text === "" || value2Text === "") {
    resultOutput.textContent = "両方の数値を入力してください";
    return;
  }

  const value1 = Number(value1Text);
  const value2 = Number(value2Text);
  const operator = operatorInput.value;

  if (operator === "/" && value2 === 0) {
    resultOutput.textContent = "0で割る事はできません。";
    return;
  }

  let answer;
  switch (operator) {
    case "+":
      answer = value1 + value2;
      break;
    case "-":
      answer = value1 - value2;
      break;
    case "*":
      answer = value1 * value2;
      break;
    case "/":
      answer = value1 / value2;
      break;
    default:
      resultOutput.textContent = "演算子を選択してください";
      return;
  }

  resultOutput.textContent = `${value1} ${operator} ${value2} = ${answer}`;
};

value1Input.addEventListener("input", calculate);
value2Input.addEventListener("input", calculate);
operatorInput.addEventListener("input", calculate);
operatorInput.addEventListener("change", calculate);

calculate();
