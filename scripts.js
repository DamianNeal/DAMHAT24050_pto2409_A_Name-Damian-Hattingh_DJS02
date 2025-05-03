const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Initial state
result.innerText = "No calculation performed";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Missing input validation
    if (dividend.trim() === "" || divider.trim() === "") {
      result.innerText =
        "Division not performed. Both values are required in inputs. Try again";
      return;
    }

    const num1 = Number(dividend);
    const num2 = Number(divider);

    // Non-numeric input triggers critical crash
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Non-numeric input encountered");
    }

    // Division by zero
    if (num2 === 0) {
      console.error("Division by zero error");
      console.trace();
      result.innerText =
        "Division not performed. Invalid number provided. Try again";
      return;
    }

    // Whole number division (no decimal)
    const wholeNumber = Math.floor(num1 / num2);
    result.innerText = wholeNumber;
  } catch (error) {
    console.error(error);
    console.trace();
    document.body.innerHTML =
      "<h1>Something critical went wrong. Please reload the page</h1>";
  }
});
