"use strict";

const tip = document.querySelectorAll(".tip--button");
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const tipAmount = document.querySelector(".tip--amount");
const total = document.querySelector(".total--amount");
const reset = document.querySelector(".reset");
const inputTip = document.querySelector(".tip--input");
const billError = document.querySelector(".bill--label .hidden");
const peopleError = document.querySelector(".people--label .hidden");

let totalTip;
let totalTipPerson;
let card;
let choosenTip = null;

function choosenTipType(tipType) {
  if (bill.value > 0 && people.value > 0) {
    totalTip = bill.value * tipType;
    totalTipPerson = (totalTip / people.value).toFixed(2);
    tipAmount.textContent = totalTipPerson;
    total.textContent = (bill.value / people.value).toFixed(2);
    billError?.classList.add("hidden");
    peopleError?.classList.add("hidden");
  } else if (bill.value === "" && people.value === "") {
    billError?.classList.remove("hidden");
    peopleError?.classList.remove("hidden");
  } else if (bill.value > 0 && people.value === "") {
    peopleError?.classList.remove("hidden");
    billError?.classList.add("hidden");
  } else if (bill.value === "" && people.value > 0) {
    billError?.classList.remove("hidden");
    peopleError?.classList.add("hidden");
  }
}

tip.forEach(function (item) {
  item.addEventListener("click", function () {
    const buttonTip = item.querySelector(".tip--value");
    let buttonTipValue = buttonTip.textContent / 100;

    choosenTipType(buttonTipValue);

    const active = document.querySelector(".tip-active");
    card = item;
    card.classList.add("tip-active");
    choosenTip = card;
    if (active) {
      active.classList.remove("tip-active");
    }
    if (card.contains(active)) {
      active.classList.add("tip-active");
    }
    inputTip.value = "";
  });
});

document.addEventListener("keydown", function (e) {
  let inputTipValue = inputTip.value / 100;

  if (e.key === "Enter") {
    if (inputTip.value > 100) {
      inputTipValue = 100 / 100;
      inputTip.value = 100;
    } else if (inputTip.value < 0) {
      inputTipValue = 0;
      inputTip.value = 0;
    }
    choosenTipType(inputTipValue);

    if (inputTip.value >= 0) {
      document.querySelector(".tip-active")?.classList.remove("tip-active");
    }
  }
});

reset.addEventListener("click", function () {
  bill.value = "";
  people.value = "";
  inputTip.value = "";
  tipAmount.textContent = (0).toFixed(2);
  total.textContent = (0).toFixed(2);
  card?.classList.remove("tip-active");
  billError.classList.add("hidden");
  peopleError.classList.add("hidden");
});
