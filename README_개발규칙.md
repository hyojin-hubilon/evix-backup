# Evix Frontend 개발 규칙

## Branch 생성 규칙

티켓 처리를 위한 브랜치 생성규칙을 공유한다.

### 주요 branch 설명
- main, dev : 초기 개발된 부분으로 향후 미사용
- v1/develop : typescript로 제작된 1차 메인 branch

### jira 와 매칭되는 브랜치 생성 방법
- 지라 이슈 번호를 이용하여 branch 생성한다. `feature/{지라번호}`
(e.g. DCT-27 을 브랜치 이름으로 정의)
- 이슈 번호 외 추가 코멘트를 추가하고 싶은 경우 `feature/{지라번호}-{코멘트}` 로 생성
- 특정 이슈의 `하위 브랜치(기능)`의 경우 `feature/{지라번호}_{임의번호 or 코멘트}` 를 추가

## prettierrc 설정 및 적용
- 코드 개발 개발 이후 커밋 전 prettier 를 통하여 코드 정리 필수
- /.prettierrc 파일내 정의된 설정에 맞춰서 코드정리가 되는지 확인 필요

## 코드 생성 폴더 정의
- src/page : Router에서 이동 할 수 있는 화면
- src/layout : 화면 구성 틀. Page와 묶여서 같이 보여지게 되는 부분
- src/layout/LadingLayout : Landing page에서 사용
- src/layout/MainLayout : DashBoard page에서 사용
- src/components : page, layout 내 모두 사용가능한 components 정의
- src/apis : 서버 연동 API 들에 대해서 정의
- src/menu-items : navigation 내 static item 들을 정의
- src/utils : 앱 전체에서 사용할 Utility 기능을 수행하는 것들을 정의
- src/types : 앱 전체에서 사용되는 type 및 interface 들을 정의. 
    - `파일 내부`에서만 사용되는 interface / type 은 src/types 에 포함되지 않도록 한다.
- src/store : 전역으로 사용하는 redux 셋팅
- src/routes : Router 데이터 정의

## component 파일 생성 위치 규칙 
- component 파일의 생성이 필요할 경우 각 layout, page 폴더에 components 폴더를 생성하고 파일을 생성한다.
- src/componenets 폴더는 전역적으로 사용가능한 componenets에 대해서만 추가를 수행한다.

## 코드 커밋 관련
- 기본적으로 코드는 review 를 진행할 수 있도록 merge request 를 요청한다.
- `안효진` , `이수환` 중 한명에게 코드 리뷰를 신청

## 서버요청 관련 기능 개발시 필요사항 정리
- [API 파일을 생성하는 위치 정리](#api-파일-생성-위치-정리)
- [interface 네이밍 규칙 정리](#api-연동-interface-네이밍-규칙)

### API 파일 생성 위치 정리
- src/types : 요청에 필요한 body 및 Response 데이터 정의
- src/apis : 서버 요청을 위한 실제 요청 함수 정의

### API 연동 interface 네이밍 규칙
- 요청 body 명 : {사용할 명칭}`Req`
- 응답 contents 명 : {사용할 명칭}`Res`

## i18n  텍스트 지원을 위한 규칙 정의
en.json, kr.json 내부에 영문/한글을 지원하기 위한 데이터 정의 수행

- 하위 depth 생성시 네이밍 규칙
    > 1. 단어의 경우 `소문자`만 사용
    > 2. 단어 연결의 경우 소문자`_`소문자`_`소문자 형식으로 이름 정리

- 최종문구에 대한 property 이름 정의
    > 영어 문장 앞 단어 3~5개 이내로 추출 하여 `소문자_소문자_소문자` 형식으로 정의  
    > e.g) I am a very smart. >> `"i_am_a_very": "I am a very smart."` 로 정의



