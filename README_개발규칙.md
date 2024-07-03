# Evix Frontend 개발 규칙

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
- src/types : 앱 전체에서 사용되는 type 및 interface 들을 정의
- src/store : 전역으로 사용하는 redux 셋팅
- src/routes : Router 데이터 정의

## component 파일 생성 위치 규칙 
- component 파일의 생성이 필요할 경우 각 layout, page 폴더에 components 폴더를 생성하고 파일을 생성한다.
- src/componenets 폴더는 전역적으로 사용가능한 componenets에 대해서만 추가를 수행한다.

