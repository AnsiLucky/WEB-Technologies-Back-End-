fetch('/history/history', {
  method: 'POST',
})
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse response body as JSON
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    populateTable(data);
  });

// Function to generate and populate table rows
function populateTable(dataArray) {
  const tableBody = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0];

  console.log(dataArray);

  dataArray.forEach((data, index) => {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${data.sex}</td>
      <td>${data.age}</td>
      <td>${data.unit}</td>
      <td>${data.height}</td>
      <td>${data.weight}</td>
      <td>${data.bmi}</td>
      <td>${data.interpretation}</td>
      <td>${data.timestamp}</td>
    `;

    tableBody.appendChild(tableRow);
  });
}
