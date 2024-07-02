# Evix Frontend Deploy Setting

에비드넷 서버에 FrontEnd 서버를 구동하기 위한 방법을 제공한다.

해당 docker-compose 파일은 docker image가 이미 생성되어 repository에 올라가 있다는 가정으로 작성되었다.

## Docker 이미지 생성 이후 진행 방법 가이드

1. 193.122.113.74 서버에 접속 (SSH)
2. /home/ubuntu/evix-front 로 이동
    > cd evix-front  
    > 해당 폴더에 준비된 docker-compose.yml 파일을 복사해 준다.
3. 기존에 구동중인 서버 종료 및 이미지 제거
    > docker-compose down
4. docker-compose.yml 파일 수정 (버전 변경의 경우)
    > vi docker-compose.yml  (문서 수정)  
    > 파일 수정으로 진입  
    > 문서내 services: > ecoa-front: > image: > {version_name}   
    > {version_name} 을 최신 빌드된 바이너리 버전명으로 수정 및 저장
5. 서비스 구동
    > docker-compose up -d
6. 웹사이트 진입하여 서비스 정상동작 확인
---