//DOM
const calculatorGrid_div = document.querySelector(".calculator-grid");  
let screenText_p = document.getElementById("screen-text");
let resultText_p=document.getElementById("result-text");
let operatorText_p=document.getElementById("operator");

calculatorGrid_div.addEventListener('click',checkButtonClicked); //i listen for a click event on the parent of the elements so i can use .target property on the event to see which button exactly the user clicked on

//Javascript variables
let previousNumberString='';
let newNumberString='';
let operation='';
let result=0;
let operationsArray=[];
let res=0;


//function code

function checkButtonClicked(event){  //here i check which button the user clicked and then i call the addNumber function,passing it the element's id the user clicked on   
    switch (event.target.id) {
        case 'one':
            updateScreen(1);
            break;
        case 'two':
            updateScreen(2);
            break;
        case 'three':
            updateScreen(3);
            break;
        case 'four':
            updateScreen(4);
            break;
        case 'five':
            updateScreen(5);
            break;
        case 'six':
            updateScreen(6);
            break;
        case 'seven':
            updateScreen(7);
            break;
        case 'eight':
            updateScreen(8);
            break;
        case 'nine':
            updateScreen(9);
            break;

         case 'addition':
         case 'substract':
         case 'divide':
         case 'multiply':
                operator(event.target.id);
             break;

        case 'equals':
            if(operation!=''){ //I also check if the previous operation is empty because if it is not i cannot do the equal operation,it would have unexpected results.It would keep the previous operation and if i clicked multiple times the equals button it would do operations while it should do nothing.
                operator(event.target.id);
            }
            break;

        case 'clear':  //i didnt use the default here cause when user clicked anywhere elese in the gaps of the buttons,the calculator would clear() eveyrhting since it detects click on the container of the buttons where i created the addEventListener
            clear();
            break;
    }
}

function updateScreen(newNumberString){ //here i update the screen text,what user is clicking
   screenText_p.innerText=previousNumberString.toString()+newNumberString.toString();
   previousNumberString=previousNumberString+newNumberString.toString();
}

function updateScreenResult(result){ //here i update with the result everytime an operation is completed
        resultText_p.innerText=result;
}

function operator(e){ //check what operation the user wants to do,then call the calculate function passing a string with the operation it must do and the array with the numbers
    
    if(parseInt(previousNumberString)) operationsArray.push(parseInt(previousNumberString)); //here i fixed a bug where,everytime the user entered the only operators as input,the array received NaN values and i had unexpected results at the result screen
    
    switch(e){
        case 'addition':
            previousNumberString='';
            operation='addition';
            operatorText_p.innerText="+";
            break;

        case 'substract':
            previousNumberString='';
            operation='substract';
            operatorText_p.innerText="-";
            break;

        case 'multiply':
            previousNumberString='';
            operation='multiply';
            operatorText_p.innerText="*";
            break;

        case 'divide':
            previousNumberString='';
            operation='divide';
            operatorText_p.innerText="/";
            break;

        case 'equals':
            if(operationsArray.length>1){  //solved a bug where when the user clicked a number then an operation (+,-,*) and then clicked the equals (=) operator the display was NaN.I had to make it sure that the calculator will execute calculate only when there are more than 1 elements (numbers) in the array
                operatorText_p.innerText="=";
                previousNumberString='';
                resultText_p.innerText=calculate(operation);
                break;
            }
           
    }
        checkArray(operation);
}

 function calculate(operation){  //here the calculations happen depend on the operation the user clicked
    if(operation==='addition'){
        let array2 = operationsArray.splice(0,2);
        res=array2[0]+array2[1];
        operationsArray.unshift(res);
    }
    else if(operation==='substract'){
        let array2 = operationsArray.splice(0,2);
        res=array2[0]-array2[1];
        operationsArray.unshift(res);
    }
    else if(operation==='multiply'){
        let array2 = operationsArray.splice(0,2);
        res=array2[0]*array2[1];
        operationsArray.unshift(res);
    }
    else if(operation==="divide"){
        let array2 = operationsArray.splice(0,2);
        res=array2[0]/array2[1];
        operationsArray.unshift(res);
    }
    if(!Number.isInteger(res)){
        console.log("not integer");
        res=res.toFixed(3); //i keep only 2 digits after the ., if the number is not a float
    }
        return res;
}

function checkArray(operation){
    if(operationsArray.length==2){
        result=calculate(operation);
        resultText_p.innerText=result;
    }
}

function clear(){ //i initialize again everything from 0
    operationsArray.length=0;
    previousNumberString='';
    newNumberString='';
    screenText_p.innerText=0;
    resultText_p.innerText='result';
}
