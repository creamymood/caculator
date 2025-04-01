// 디스플레이 요소 선택
let display = document.getElementById('display')
// 디스플레이 숫자 (계산에 사용될 숫자)
let num = 0;
// 버튼 클래스 요소 전체 선택
let buttons = document.querySelectorAll(".button")

//화면에 표시될 숫자와 도트 버튼 선택
let numberAnddot = document.querySelectorAll(".number, .dot")


buttons.forEach(function(button) {
    button.addEventListener('click', function(){
        console.log(button.textContent)
    })
})

//디스플레이에 숫자랑 . 버튼 나타나게 하기. (0일 경우는 초기화)
numberAnddot.forEach(function(button) {
    button.addEventListener('click', function() {
        if(num === 0) {
            num = ''
        }
        num += button.textContent //(초기화 된 num 뒤에, 누른 버튼 텍스트 컨텐트) (num + button.textContent 해도 됌.) 
        display.textContent = num
    })
})

//연산기호 버튼 선택
let operatorButton = document.querySelectorAll(".operator")

//디스플레이에 입력된 기존 숫자
let firstOperand = null

//디스플레이에 입력되고 있는 새로운 숫자
let secondOperand = null

//선택된 연산 기호
let operator = null


//디스플레이에 숫자를 입력한 다음 연산기호를 누르면 디스플레이에 있는 숫자를 저장하고 연산기호 기억하기

operatorButton.forEach(function(button){
    button.addEventListener('click', function(){
        if(firstOperand === null) {
            firstOperand = parseFloat(num) //첫번째 숫자가 입력되지 않았다면, 현재 입력된 num이 첫번째 숫자다.
            operator = button.textContent
            num = ''
            //ex : 1+1 끝난 뒤, 새로운 계산 하기 위해 초기화 하는 것
            //아래 코드는 연속 계산 위해. 
        } else if(firstOperand !== null && secondOperand !== null && operator !==null ) {
            //secondOperand = parseFloat(num);
            firstOperand = calculate(firstOperand, secondOperand, operator) //앞에서 한 계산 결과를 첫번째 숫자로 다시 저장
            display.textContent = firstOperand  //연속 계산시, 앞선 계산 값 디스플레이 업데이트 
            secondOperand = null //secondOperand를 초기화하여 새로운 두 번째 숫자를 받을 준비를 한다.
            operator = button.textContent  // 새로 클릭한 연산자를 operator에 저장한다.
            num = ''
        }
        
    })
})

//3. 연산기호 버튼이 클릭된 후 디스플레이에 다른 숫자를 입력하면 새로운 숫자가 디스플레이에 입력되도록 합니다.
// 연산기호 버튼이 클릭된 후 두 번째 숫자를 입력하면 디스플레이의 값이 새로 입력한 숫자로 바뀝니다.


numberAnddot.forEach(function(button){
    button.addEventListener('click',function(){
        if(firstOperand !== null && operator !== null ) {
            if(secondOperand === null ) {
                secondOperand = num
                secondOperand = parseFloat(num)
                display.textContent = num
                num = ''
            }
        }
    
    })
})

//4. calculate 함수 구현 및 = 버튼 클릭시 계산 수행

//4-1. 매개 변수로 두 숫자를 입력 받아서 결과를 반환하는 calculate 함수를 만듭니다.

function calculate(firstOperand,secondOperand, operation) {
    switch (operation) {
        case '+':
            return firstOperand + secondOperand;
            break;
        case '-':
            return firstOperand - secondOperand;
            break;
        case '*':
            return firstOperand * secondOperand;
        case '/' :
            return secondOperand === 0 ? "Error" : firstOperand / secondOperand; //0으로 나누면 에러뜨게
            break;

    }
}


//4-2 = 버튼이 클릭되면 firstOperand, operator, secondOperand를 전달하여 계산을 수행하고 결과를 디스플레이에 표시합니다.

//= 버튼 선택하기
let equalSign = document.getElementById('equalbtn')

equalSign.addEventListener('click', function(){
    if(firstOperand !==null && operator !== '' && secondOperand !== null) {
        let result = calculate(firstOperand, secondOperand, operator)
        display.textContent = result
        
        firstOperand = null
        secondOperand = null
        operator = null
        num = ''
    } else { 

    }
    
})




//C 버튼 누르면 리셋 되는 기능
//c 버튼 선택 하기
let clearButton = document.getElementById("C")

clearButton.addEventListener('click', function(){
    firstOperand = null
    secondOperand = null
    operator = null
    num = ''

    display.textContent = '0'
})