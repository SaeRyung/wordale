let attempts = 0; //시도 횟수
let index = 0; //다음 칸으로 넘어가기 위해

function appStart() {
  const handleEnterkey = () => {
    //정답확인
  };

  const handleKeydown = (event) => {
    //event는 들어가는 값
    //특정 키 뽑고 현재 위치 업데이트

    const key = event.key.toUpperCase(); //대문자로 출력하도록
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    ); //변수 쓰고 싶을 때 백틱 사용

    if (event.key === "Enter") {
      //엔터키 눌렸을때
      //console.log("엔터키!");
      handleEnterkey();
    } else if (index === 5) return;
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; //다음칸 넘어가기
    }
  };

  window.addEventListener("keydown", handleKeydown); //키 누르기,, addEventListener함수는 handlekeydown 암묵적으로 event 전달됌.
}

appStart(); //함수 호출하여 로직 실행
