// console.log("I am inside the popup script")

// Initialize total_coin, buy_coin, sell_coins, profit_coins
let totalCoin = document.getElementById("total_coins");
let buyCoin = document.getElementById("buy_coins");
let sellCoin = document.getElementById("sell_coins");
let profitCoin = document.getElementById("profit_coins");

document.getElementById("total_buy").innerHTML = fixed_price(0);
document.getElementById("total_sell").innerHTML = fixed_price(0);
document.getElementById("buy_fee").innerHTML = fixed_price(0);
document.getElementById("sell_fee").innerHTML = fixed_price(0);
document.getElementById("total_fee").innerHTML = fixed_price(0);
document.getElementById("total_profit").innerHTML = fixed_price(0);



// Total Coin
totalCoin.addEventListener("input", (e) => {
  updateTotalCoin = e.target.value;

  buy = getCoin('updateBuyCoin', 'buy_coins')
  updateBuyCoin = buy * updateTotalCoin;
  sell = getCoin('updateSellCoin', 'sell_coins')
  updateSellCoin = sell * updateTotalCoin;

  document.getElementById("total_buy").innerHTML = fixed_price(updateBuyCoin);
  document.getElementById("total_sell").innerHTML = fixed_price(updateSellCoin);
})

// Buy Coin
buyCoin.addEventListener("input", (e) => {
  fee = document.getElementById("commission_fee").value;

  totalCoin = getCoin('updateTotalCoin', 'total_coins')
  updateBuyCoin = e.target.value * totalCoin;
  buy_fee = updateBuyCoin * fee
  
  document.getElementById("total_buy").innerHTML = fixed_price(updateBuyCoin);
  document.getElementById("buy_fee").innerHTML = fixed_price(buy_fee);
})

// Sell Coin
sellCoin.addEventListener("input", (e) => {
  fee = document.getElementById("commission_fee").value;

  totalCoin = getCoin('updateTotalCoin', 'total_coins')
  updateSellCoin = e.target.value * totalCoin;
  sell_fee = updateSellCoin * fee

  document.getElementById("total_sell").innerHTML = fixed_price(updateSellCoin);
  document.getElementById("sell_fee").innerHTML = fixed_price(sell_fee);
})


function getCoin(storageKey, keyId=null) {
  return Number(document.getElementById(keyId).value);
}

function setCoin(id, amt) {
}

function fixed_price(value) {
  return value.toFixed(4)
}

// Total Profit
Profit = document.getElementById('Profit')
Profit.addEventListener("click", () => {
  data = updateValues();

  document.getElementById("total_fee").innerHTML = fixed_price(data['comm_fee']);
  document.getElementById("total_profit").innerHTML = fixed_price(data['profit']);
});

// Commission Fee
commission = document.getElementById("commission_fee")
commission.addEventListener("change", () => {
  data = updateValues();
  document.getElementById("buy_fee").innerHTML = fixed_price(data['buy_fee']);
  document.getElementById("sell_fee").innerHTML = fixed_price(data['sell_fee']);
  document.getElementById("total_fee").innerHTML = fixed_price(data['comm_fee']);
  document.getElementById("total_profit").innerHTML = fixed_price(data['profit']);
})

// Calculate Fee & Profit
function updateValues(){
  fee = document.getElementById("commission_fee").value;
  buy = getCoin('updateBuyCoin', 'buy_coins')
  sell = getCoin('updateSellCoin', 'sell_coins')
  console.log('fee', fee, 'buy', buy, 'sell', sell)

  total = getCoin('updateTotalCoin', 'total_coins')
  buy_fee = buy * total * fee
  sell_fee = sell * total * fee
  comm_fee = buy_fee + sell_fee
  console.log(buy_fee, sell_fee, comm_fee);
  console.log('commission fee', comm_fee)
  profit = (total * (sell - buy)) - comm_fee
  return {
    'buy_fee': buy_fee,
    'sell_fee': sell_fee,
    'comm_fee': comm_fee,
    'profit': profit
  }
}
