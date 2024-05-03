const 정답 = "APPLE";

let attempts = 0; //시도 횟수
let index = 0; //다음 칸으로 넘어가기 위해
let timer;

function appStart() {
  const displayGameover = () => {
    //게임오버표시
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //이벤트지우개
    displayGameover(); //게임오버함수출력
    clearInterval(timer); //게임이 끝나면 클리어해줌. 시간멈춤
  };

  //다음 줄 함수
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번 횟수이면 종료
    attempts += 1; //다음 행
    index = 0; //인덱스 0으로 첫번째 칸
  };

  const handleEnterkey = () => {
    //정답확인
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      //console.log("i값=" + i);
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은갯수 += 1;
        block.style.background = "#6AAA64"; //정답 일 때 초록색
      } else if (정답.includes(입력한_글자))
        block.style.background = "#C9B458"; //정답이나 글자 위치 다를때 노란색
      else block.style.background = "#787C7E"; //틀란 알파벳은 회색
      //console.log("입력한글자:", 입력한_글자, "정답글자:", 정답_글자);
    }
    if (맞은갯수 === 5) gameover();
    else nextLine(); //함수호출하여 다음 줄로 넘어가기
  };

  //지우기
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1; //인덱스 1 빼기
  };

  const handleKeydown = (event) => {
    //event는 들어가는 값
    //특정 키 뽑고 현재 위치 업데이트
    const key = event.key.toUpperCase(); //대문자로 출력하도록
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //변수 쓰고 싶을 때 백틱 사용
    //console.log(event.key, event.keyCode);

    if (event.key == "Backspace")
      handleBackspace(); //thisBlock를 backspace에 파라미터 전달
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey(); //엔터키 눌렸을때
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; //다음칸 넘어가기
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer"); //id값 넣기

      timeDiv.innerText = `${분}:${초}`;
    }

    //주기성
    timer = setInterval(setTime, 1000);
    console.log(timer); //setInterval id값 나온다. 몇번째 인터벌이 나오는지
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown); //키 누르기,, addEventListener함수는 handlekeydown 암묵적으로 event 전달됌.
}

appStart(); //함수 호출하여 로직 실행
