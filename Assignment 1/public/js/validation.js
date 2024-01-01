const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const ageInput = document.getElementById('age');
const form = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
const statusResult = document.getElementById('statusResult');
const sexButtons = document.getElementsByClassName('btn-field')[0];


form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  if (form.getElementsByClassName("is-valid").length != 3) {
    alert("Input Correct");
    return;
  }

  console.log([...sexButtons.getElementsByClassName('bg-blue'),
  ...sexButtons.getElementsByClassName('bg-pink')][0].textContent);
  // Prepare the data to be sent to the server
  const dataToSend = {
    sex: [...sexButtons.getElementsByClassName('bg-blue'),
    ...sexButtons.getElementsByClassName('bg-pink')][0].textContent,
    age: ageInput.value,
    unit: unitDropdown.value,
    height: parseFloat(heightInput.value),
    weight: parseFloat(weightInput.value)
  };

  // Send the form data to the server using Fetch API
  fetch('/bmi/calculator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse response body as JSON
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      setResponse(data);

    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});

function setResponse(data) {
  const bmi = parseFloat(data.bmi).toFixed(2);
  bmiResult.value = bmi;
  statusResult.value = data.status;
  if (bmi < 18.5) {
    statusResult.className = '';
    statusResult.classList.add('text-info', 'border-0');
  } else if (bmi >= 18.5 && bmi < 25) {
    statusResult.className = '';
    statusResult.classList.add('text-success', 'border-0');
  } else if (bmi >= 25 && bmi < 30) {
    statusResult.className = '';
    statusResult.classList.add('text-warning', 'border-0');
  } else {
    statusResult.className = '';
    statusResult.classList.add('text-danger', 'border-0');
  }
}

heightInput.addEventListener("input", function (element) {
  isValid(heightInput, element);
});

weightInput.addEventListener("input", function (element) {
  isValid(weightInput, element);
});

ageInput.addEventListener("input", function (element) {
  isValid(ageInput, element);
});

function isValid(el, element) {
  let val = element.target.value.trim();
  if (el.id == 'height' && !isNaN(val) && val > 40 && val < 300 && parseInt(val) == val) {
    setValid(el);
    return true;
  } else if (el.id == 'weight' && !isNaN(val) && val > 2 && val < 300) {
    setValid(el);
    return true;
  } else if (el.id == 'age' && !isNaN(val) && val > 0 && val < 200 &&  parseInt(val) == val) {
    setValid(el);
    return true;
  } else {
    setInvalid(el);
    return false;
  }
}

function setInvalid(element) {
  element.classList.add('is-invalid');
  element.classList.remove('is-valid')
}

function setValid(element) {
  element.classList.add('is-valid');
  element.classList.remove('is-invalid')
};

