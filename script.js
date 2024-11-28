class FinancialCalculator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.sum = 0;
      this.procent = 0;
      this.time = 0;
  
      this.render();
      this.addListeners();
      console.log('Компонент создан');
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./style.css">

        <div class="container">
          <label for="loan-payment">Сумма кредита:</label>
          <input type="number" id="loan-payment" value="${this.sum}">
  
          <label for="procent-rate">Процентная ставка (%):</label>
          <input type="number" id="procent-rate" value="${this.procent}">
  
          <label for="loan-term">Срок кредита (мес.):</label>
          <input type="number" id="loan-term" value="${this.time}">
  
          <div id="results">
            <p>Ежемесячный платеж: <span id="monthly-payment"></span></p>
            <p>Общая сумма: <span id="total-payment"></span></p>
            <p>Начисленный процент: <span id="total-procent"></span></p>
          </div>
        </div>
      `;
    }
  
    addListeners() {
        this.shadowRoot.querySelector('#loan-payment').addEventListener('input', this.handleInputChange.bind(this));
        this.shadowRoot.querySelector('#procent-rate').addEventListener('input', this.handleInputChange.bind(this));
        this.shadowRoot.querySelector('#loan-term').addEventListener('input', this.handleInputChange.bind(this));
    }
  
  
    handleInputChange() {
      this.sum = parseFloat(this.shadowRoot.querySelector('#loan-payment').value) || 0;
      this.procent = parseFloat(this.shadowRoot.querySelector('#procent-rate').value) || 0;
      this.time = parseInt(this.shadowRoot.querySelector('#loan-term').value) || 0;
      this.calculate();
      console.log('Данные обновлены');
    }
  
  
    calculate() {
      if (this.sum <= 0 || this.procent <= 0 || this.time <= 0) {
        this.displayResults('Некорректные данные');
        return;
      }
  
      const monthlyRate = this.procent / 12 / 100;
      const monthPayment = this.sum * monthlyRate / (1 - Math.pow(1 + monthlyRate, -this.time));
      const totalPrice = monthPayment * this.time;
      const totalProcent = totalPrice - this.sum;
      
  
      this.displayResults(monthPayment.toFixed(2), totalPrice.toFixed(2), totalProcent.toFixed(2));
    }
  
    displayResults(monthPayment, totalPrice, totalProcent){
      this.shadowRoot.querySelector('#monthly-payment').textContent = monthPayment;
      this.shadowRoot.querySelector('#total-payment').textContent = totalPrice;
      this.shadowRoot.querySelector('#total-procent').textContent = totalProcent;
    }
  
  
    disconnectedCallback() {
      console.log('Компонент удален');
    }
  }
  
  customElements.define('financial-calculator', FinancialCalculator);