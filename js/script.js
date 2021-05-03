


const inputText = document.getElementById('text'),
    inputAmount = document.getElementById('amount'),
    addTransactionBtn = document.getElementById('transBtn'),
    balance = document.getElementById('balance');
    transactionHistory = document.getElementsByClassName('list');
    money_plus = document.getElementById('money-plus')
    money_minus = document.getElementById('money-minus')
    container = document.getElementById('container')
    let isFirstStart = true;
    let transactionsArray = []
transactionsArray = getFromLocalStorage() || []
init()

function createHTML(transItem) {
    const sign = transItem.transactionAmount < 0 ? '-' : '+'
    const el = document.createElement('li')
    transItem.transactionAmount < 0 ? el.classList.add('minus') : el.classList.add('plus')
    el.innerHTML = `
    ${transItem.transictionText}
    <span>${sign}$${Math.abs(transItem.transactionAmount)}</span>
    <button  class="delete-btn ${transItem.id}"  onclick="deleteItem(event)" id=${transItem.id}>x</button>
    `
    transactionHistory[0].append(el)
}

function addValue() {
    const amountValue = +inputAmount.value;
    const textValue = inputText.value
    const newValue = {
        id: Math.floor(Math.random() * 100000000),
        transictionText: textValue,
        transactionAmount: amountValue
    }
    if (!isFirstStart) {
        transactionsArray.push(newValue)
        addToLocalStorage(transactionsArray)
    }
    isFirstStart = false
    changeBalance()
}

function changeBalance() {
    const total = transactionsArray.reduce((acc, item) => acc += item.transactionAmount || 0, 0)
    const income = transactionsArray.filter(item => item.transactionAmount || 0 > 0 ? item.transactionAmount || 0 : 0).reduce(
        (acc, item) => acc += item.transactionAmount, 0
    )
    const expance = transactionsArray.filter(item => item.transactionAmount < 0 ? item.transactionAmount : 0).reduce(
        (acc, item) => acc += item.transactionAmount, 0
    )
    balance.textContent = `$${total.toFixed(2)}`
    money_minus.textContent = `${expance < 0 ? '-' : ''}$${Math.abs(expance.toFixed(2))}`
    money_plus.textContent = `$${income.toFixed(2)}`
}

function isValid(amountValue, textValue) {
    if (amountValue != '' && textValue != '' && !Number.isNaN(amountValue)) {
        return true
    } else {
        return false
    }
}

function addToLocalStorage(newValue) {
    localStorage.setItem('transictionsArray', JSON.stringify(newValue))
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('transictionsArray'))
}

function deleteItem(e) {
    const element = e.target.parentElement;
    const htmlCollection = transactionHistory[0].getElementsByTagName('li')
    Array.from(htmlCollection).forEach(function (item, i) {
        if (item === element) {
            element.parentNode.removeChild(element);
            transactionsArray.splice(i, 1)
            changeBalance()
            localStorage.removeItem('transictionsArray')
            addToLocalStorage(transactionsArray)
        }
    })
}

function createContent() {
    transactionHistory[0].innerHTML = ''
    transactionsArray.forEach(function (item, i) {
        if (Object.keys(item).length == 0) {
            return
        } else {
            createHTML(item)
        }
    })
}

function init() {
    const amountValue = +inputAmount.value,
        textValue = inputText.value
    if (isFirstStart) {
        addValue(amountValue, textValue)
        createContent()
    } else if (isValid(amountValue, textValue)) {
        addValue()
        createContent()
    } else {
        alert('Введите данные в инпуты,второй инпут обязательно число')
    }
}
addTransactionBtn.addEventListener('click', function (e) {
    e.preventDefault()
    init()
})