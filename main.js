let computerNum = 0;
let playButton = document.getElementById("play_button"); //index.html에서 getElementById를 사용해 id로 찾아 가져옴.
let userInput = document.getElementById("user_input");
let resultArea = document.getElementById("result_area");
let resetButton = document.getElementById("reset_button");
let chanceArea = document.getElementById("chance_area");
let chances = 5;
let gameOver = false;
let history = [];
playButton.addEventListener("click", play); //(버튼에 이벤트 넣기(클릭, 포커스, 마우스오버등등,,), 이벤트 실행시 어떤 함수를 부를지), 함수도 매개변수로 넘길 수 있다.
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
}); // focus를 주면 입력칸이 비워진다.

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; //1부터 100까지 숫자중 랜덤하게 하나의 숫자를 뽑아줌.
  console.log("정답:", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과100사이의 숫자를 입력해주세요.";
    return;
  }

  if (history.includes(userValue)) {
    //유저가 입력한 값이 배열에 있다면
    resultArea.textContent = "이미 입력하신 숫자입니다.";
    return;
  }

  chances--; //play를 누를 때 마다 기회가 1씩 줄어든다.
  chanceArea.textContent = `남은기회: ${chances}번`; //동적인값 넣기

  if (userValue < computerNum) {
    resultArea.textContent = "Up!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!";
  } else {
    resultArea.textContent = "정답!";
    gameOver = true;
  }

  history.push(userValue); //유저가 입력한 값을 배열로 받아놓는다.

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  //userInput창이 깨끗하게 정리
  userInput.value = "";
  //새로운 랜덤번호가 생성
  pickRandomNum();
  resultArea.textContent = "결과값이 여기에 나옵니다!";
  //리셋버튼을 누르면 유저가 입력한 숫자의 배열, 기회, 버튼 모두 초기화시키기
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  history = [];
}

pickRandomNum();
