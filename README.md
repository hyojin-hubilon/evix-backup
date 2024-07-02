# Evix Frontend new setting


## Run react-application for develop 

```bash
cd client
npm install
npm run dev
```

## How to build docker image for deployment

DockerImage를 생성하는 방법을 가이드 한다.

### 준비사항
1. 빌드하려는 PC(or 서버)에 docker 가 설치되어 있어야함
2. 코드 구조가 client, server 폴더가 각각 존재해야하며 해당 폴더 위에 Dockerfile이 있어야함

### Docker Image 빌드
docker image는 아래의 명령어로 간단하게 생성가능하다.  
sudo command는 상황에 따라 없어도 된다
```bash
# Docker image 빌드
sudo docker build -t ecoa-frontend:{version name e.g. 1.0.0} .
# 정상적으로 이미지 생성이 되었는지 확인
sudo docker images -a | grep ecoa
```

### Docker Image 배포

이미지를 업로드 하기전에 repository에 로그인을 수행해야 한다.
[여기](https://evix-dct.atlassian.net/browse/DCT-28?focusedCommentId=10063)에 로그인 방법을 설명해 두었다. (ID/PASS도 있기 때문에 해당 문서에서는 포함하지 않았음)

```bash
# docker image에 대해서 tag를 생성
# 앞의 {version name} 은 로컬에서 생성된 dockerfile의 버전명이며
# 뒤의 {version name} 은 repository에 저장할 버전명이다
sudo docker tag ecoa-frontend:{version name} icn.ocir.io/cnahm0uo3g0f/evix-dct/ecoa-frontend:{version name}    
# 태깅한 이미지를 업로드 한다.
sudo docker push icn.ocir.io/cnahm0uo3g0f/evix-dct/ecoa-frontend:{version name} 
```

