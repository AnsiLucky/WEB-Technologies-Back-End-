let female = document.getElementById("female");
let male = document.getElementById("male");
let bmiResultSpan = document.getElementById("bmiResultSpan");
let statusResultSpan = document.getElementById("statusResultSpan");

male.onclick = function() {
  female.classList.add("bg-secondary");
  female.classList.remove("bg-pink");
  male.classList.remove("bg-secondary");
  male.classList.add("bg-blue");
  bmiResultSpan.classList.add("text-blue");
  bmiResultSpan.classList.remove("text-pink");
  statusResultSpan.classList.add("text-blue");
  statusResultSpan.classList.remove("text-pink");
}

female.onclick = function() {
  female.classList.add("bg-pink");
  female.classList.remove("bg-secondary");
  male.classList.add("bg-secondary");
  male.classList.remove("bg-blue");
  bmiResultSpan.classList.add("text-pink");
  bmiResultSpan.classList.remove("text-blue");
  statusResultSpan.classList.add("text-pink");
  statusResultSpan.classList.remove("text-blue");
}