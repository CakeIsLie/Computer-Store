
const computerElement = document.getElementById("computer");
const descriptElement = document.getElementById("description");
const specElement = document.getElementById("specs");
const priceElement = document.getElementById("price");
const stockElement = document.getElementById("stock");
const activeElement = document.getElementById("active");
const imageElement = document.getElementById("image");
const titleElement = document.getElementById("title");
const buyElement = document.getElementById("buy");
const inBankElement = document.getElementById("inBank");
const workedElement = document.getElementById("worked");
const inLoanElement = document.getElementById("inLoan");

 
let computer = [];
let title = "";
let inBank = 0;
let worked = 0;
let inLoan = 0;
let workCheck = 0;
let loanCheck = 0;
let addToPayOff = 0;
let makePayInLoan = 0;
let money;
let addLoanMoney = 0;
let cantLoanBig = 0;


function myLoan() {      
    if (loanCheck == 0){ //Makes so you can get a loan
      money = prompt("Please enter the amount you want to loan, if you clicked it by accident please click OK");
      if(money <= cantLoanBig){
        if (money != 0) {
        document.getElementById("loaning").innerHTML = money; //Show how much have been loaned
        loanCheck = 1;
    } 
    else{
        loanCheck = 0;
        }  
    }
    else{
        prompt("You can't loan more then dubble your balance");
        }    
    }
    else if(loanCheck >= 1){ //Makes so two loans cant exist
        prompt("Pay back your current loan before taking a new one"); 
        loanCheck = 1;
    }
    else{
        prompt("Something is wrong"); //To see that things are working, this should never show up
        loanCheck = 1;
        }  
}
function sendToBank(){
    if (loanCheck == 0){ //If a loan have not been taken
      inBank = inBank + worked; //Makes so inBank have all the money
      cantLoanBig = inBank + inBank; 
    inBankElement.innerText = inBank; //Show what the bank has
    workedElement.innerText = 0;  //Show what Pay has
    }
    else{
        payTheLoan(); //Call function so nothing more adds
    }
    workCheck = 0;  //A check so the pay adds correctly  
  }
 function payTheLoan(){
    prompt("The loan needs money"); //Show what needs to be done
}
function workedPay(){
    workCheck += 1; //Make workCheck bigger so things work
    if (loanCheck == 0){ //Make sure loan is 0 so you can add to Pay
     if (workCheck >= 2){
      worked += 100; //Add 100 to Pay
  workedElement.innerText = worked;  //Show what Pay has
    }
    else{
        worked = 0; //Reset the Pay to 0
        worked += 100;
        workedElement.innerText = worked;
        
    }   
    }
    else{ //Else add money to to pay off loan
        addToPayOff += 1;       
        if(makePayInLoan == 0){
            addLoanMoney = 0; //Start getting money from pay to loan from 0
            makePayInLoan = 1;
         if (addToPayOff >= 1){ //Adding money from pay to loan but dont start from 0
          addLoanMoney += 100; //Add 100 at a time
        inLoan = addLoanMoney; //Add all money to pay of loan
        inLoanElement.innerText = inLoan;  //Show what the loan has
        }
        else{
            prompt("Something in adding to loan is broken") //To see that things are working, this should never show up
            }   
        }
        else{
            addLoanMoney += 100;
        inLoan = addLoanMoney;
        inLoanElement.innerText = inLoan;         
        }      
    }
}
function payingLoanBack(){
    if (loanCheck != 0){ //If there is a loan
        if(inLoan > money){ //If there is overflow
           inLoan = inLoan - money;
           inBank = inBank + inLoan; //The overflow ends upp in inBank
           inBankElement.innerText = inBank;
        }
        money = money - inLoan; //The money from inLoan needs to get to money
        document.getElementById("loaning").innerHTML = money;        
        inLoan = 0; //Reset what inLoan have
        addLoanMoney = 0; //Reset what worked have, so you can start from 0 if loan is not fully payed off
        inLoanElement.innerText = inLoan;
        if (money <= 0){ //If the loan is fully payed off
           inLoan = 0;
           money = 0;
           makePayInLoan = 0; //Make so if you take another loan you start from 0 again
           document.getElementById("loaning").innerHTML = money; 
        inLoanElement.innerText = inLoan;
        loanCheck = 0; //Make 0 when loan is fully payed off so new loan can be taken 
        
    }
        else{
            prompt("Loan is not payed off"); //Making sure it works, might be deleted later
        }
    }
    else{
        prompt("You have no loan to pay"); //Make sure to know it workes fine
    }    
}


 fetch("https://noroff-komputer-store-api.herokuapp.com/computers") //Fetch the data from an api
    .then(response => response.json())
    .then(data => computer = data)
    .then(computer => addCompMenu(computer));
    

    const addCompMenu = (computer) => {
        computer.forEach(x => addComp(x));
        specElement.innerText = computer[0].specs;
        descriptElement.innerText = computer[0].description;
        priceElement.innerText = computer[0].price;
        imageElement.innerText = computer[0].image;
        titleElement.innerText = computer[0].title; 
        let img = document.createElement("img"); 
        img.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png"; 
        let src = document.getElementById("image"); 
        src.appendChild(img);
    }

const addComp = (compur) => {
    const compElement = document.createElement("option");
    compElement.value = compur.id;
    compElement.appendChild(document.createTextNode(compur.title));
    computerElement.appendChild(compElement);
}

const computerChange = e =>{ //add the specs
    const selectComputer = computer[e.target.selectedIndex];
    specElement.innerText = selectComputer.specs;
}
computerElement.addEventListener("change", computerChange); //change the specs when changing computer

const computerChangeDisc = e =>{ //add the description
    const selectComputer = computer[e.target.selectedIndex];
    descriptElement.innerText = selectComputer.description;    
}
computerElement.addEventListener("change", computerChangeDisc); //change the description when changing computer

const computerChangePrice = e =>{ //add the price
    const selectComputer = computer[e.target.selectedIndex];
    priceElement.innerText = selectComputer.price;
}
computerElement.addEventListener("change", computerChangePrice); //change price when changing computer

const computerChangeComp = e =>{ //Add the computer title
    const selectComputer = computer[e.target.selectedIndex];
    titleElement.innerText = selectComputer.title;
}
computerElement.addEventListener("change", computerChangeComp);

function buyComputer(){
    if(inBank >= priceElement.innerText){ //If what the bank have is equal or more of what the computer cost
        prompt("You bught a computer");
     inBank = inBank - priceElement.innerText;
     inBankElement.innerText = inBank;
    }
    else{
        prompt("You need more money for this computer");
    }
} 

const computerChangeImage = e =>{ //Add the computer image
    const selectComputer = computer[e.target.selectedIndex];
    imageElement.innerText = selectComputer.image;
    let img = document.createElement("img"); 
    img.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectComputer.image; 
    let src = document.getElementById("image"); 
    src.appendChild(img); 
    if(selectComputer.image == computer[4].image){
        let img = document.createElement("img"); 
        img.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/5.png"; 
        let src = document.getElementById("image"); 
        src.appendChild(img);
    }
}
computerElement.addEventListener("change", computerChangeImage);
