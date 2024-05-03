const 정답 = "APPLE";

let attempts = 0; //시도 횟수
let index = 0; //다음 칸으로 넘어가기 위해

function appStart() {
  //다음 줄 함수
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번 횟수이면 종료
    attempts += 1; //다음 행
    index = 0; //인덱스 0으로 첫번째 칸
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown); //이벤트지우개
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
      console.log("입력한글자:", 입력한_글자, "정답글자:", 정답_글자);
    }
  };

  const handleKeydown = (event) => {
    //event는 들어가는 값
    //특정 키 뽑고 현재 위치 업데이트

    const key = event.key.toUpperCase(); //대문자로 출력하도록
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //변수 쓰고 싶을 때 백틱 사용

    if (index === 5) {
      if (event.key === "Enter") handleEnterkey(); //엔터키 눌렸을때
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; //다음칸 넘어가기
    }
  };

  window.addEventListener("keydown", handleKeydown); //키 누르기,, addEventListener함수는 handlekeydown 암묵적으로 event 전달됌.
}

appStart(); //함수 호출하여 로직 실행
