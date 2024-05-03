from fastapi import FastAPI #fastapi 패키지에서 FASTAPI 라이브러리 불러오기

app = FastAPI()

@app.get("/hello")#헬로라는 경로로 들어갔을때
def sayHello():
    return {"message": "안녕하세요 슈퍼코딩!"}

@app.get("/")#get: 그쪽으로 요청을 보낸다. 그냥 경로로 접근시
def sayWelcome():
    return {"message":"환영합니다!"}