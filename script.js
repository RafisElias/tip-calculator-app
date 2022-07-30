const billInput = document.getElementById('bill');
const numberOfPeopleInput = document.getElementById('number-people');
const customTipInput = document.getElementById('custom');

const btnReset = document.getElementById('reset');

let tipValue = 0;
let selectedButon;

btnReset.addEventListener('click', () => {
  billInput.value = '';
  numberOfPeopleInput.value = '';
  customTipInput.value = '';
  document.querySelector('.btn-selected')?.classList.remove('btn-selected');
  tipValue = 0;
  calculateTip();
})

const handleInput = (e) => {
  const formattedValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  e.target.value = formattedValue;
  calculateTip();
}

billInput.addEventListener('input', handleInput);

customTipInput.addEventListener('input', handleInput);

numberOfPeopleInput.addEventListener('input', handleInput);

customTipInput.addEventListener('focusin', () => {
  selectedButon = document.querySelector('.btn-selected');
  if (selectedButon) {
    selectedButon.classList.remove('btn-selected');
  }
});

customTipInput.addEventListener('focusout', () => {
  if (!customTipInput.value && selectedButon) {
    selectedButon.classList.add('btn-selected');
  }
});

const calculateTip = () => {
  const billValue = parseFloat(billInput.value);
  const numberOfPeopleValue = parseFloat(numberOfPeopleInput.value);
  const customTipValue = parseFloat(customTipInput.value);

  const tip = customTipValue / 100 || tipValue;
  const tipTotal = parseFloat(((billValue * tip) / numberOfPeopleValue).toFixed(2));
  const totalValue = parseFloat(((billValue / numberOfPeopleValue) + tipTotal).toFixed(2));
  const tipInput = document.getElementById('tip-value');
  const totalInput = document.getElementById('total-value');

  tipInput.innerHTML = isNaN(tipTotal) ? '0.00' : tipTotal;
  totalInput.innerHTML = isNaN(tipTotal) ? '0.00' : totalValue;
  if (!!billValue || !!numberOfPeopleValue || !!tip) {
    btnReset.disabled = false;
  } else {
    btnReset.disabled = true;
  }
}

window.onload = () => {
  const tipButtons = [...document.querySelectorAll('[data-value]')];
  tipButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (document.querySelector('.btn-selected')) {
        document.querySelector('.btn-selected').classList.remove('btn-selected');
      }
      customTipInput.value = '';
      selectedButon = button.classList.add('btn-selected');
      tipValue = button.dataset.value / 100;
      calculateTip();
    });
  });
}