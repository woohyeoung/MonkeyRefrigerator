# MonkeyRefrigerator
Douzone Zoo MonekeyRefrigerator : 더존 동물원 원숭이 냉장고
- 레시피 데이터를 이용한 웹 어플리케이션 서비스

## git flow, git 명령어, git 컨벤션
<a href="#git" style= " font-size:35px">click!!</a> 

## 구성
#### 프로젝트 구성 : 요구사항 분석 -> 계획 -> 설계 -> 구현 -> 시험
#### 발표 구성 : 요구사항 분석(문제인식, 문제분석, 해결전제) -> 전략 -> 전략에 대한 문제점-> 해결방안

## 전체 구성 단계

## 기능
- 회원가입
- 로그인
- 레시피 게시판 목록
- 레시피 게시판 상세조회
- 인기 게시물: 조회수, 댓글
- 필터 
   - 카테고리별, 재료별   
- 레시피 냉장고

### 개발 환경 도구 : vscode

### 기술 스택: react.js node.js express.js

### git flow, git 명령어, git 컨벤션 

<a id="git"></a>

받기전에  add , commit 필수!!!
- 원격 개인저장소 및 원격 조직 저장소에 올리기
- 올리기전에 pull이나 fetch로 변경점 확인

▶▶▶▶▶ upstream main을 받을때는 rebase나 merge를 
git fetch upstream
git rebase upstream/main

--- 기본 올리는 명령어

1. add : 변경된 파일 스테이징

. 모든 파일 스테이징
git add .

원하는 파일만 스테이징
git add web/css/main.css

2. commit : 변경된 파일 추가 및 삭제 및 변경 사항, 변경점 기록 
git commit -m "커밋 메시지"

3. push : 원격저장소에 변경된 파일 올리기
git push origin main
```
- team4 git commit 컨벤션
```
추가시
feat:3/18, add news menu 
feat:3/18, add index.html  
feat:3/18, 메인페이지 추가
feat:3/18, 장소 메뉴 추가
fix:3/19, fix location.html
docs:3/20, add web/js
refator:3/21, refactor web/js/main.js
```

- local에 upastream 최신화 후 작업하기
```
--- 작업 전 upstream/main 과 merge , 병합, 합치기 (소스트리에 pull 이라고 생각합시다.)

git fetch upstream

git add .

git commit -m "merge,feat:3/23, merge to upstream main before, feat 메인페이지 진행중"

git rebase upstream/main

<여기서 충돌나면 충돌 고쳐주세요>
충돌을 다 고쳤다면

git add .
git commit -m "merge: fix conflict and merge to upstream main"

... 작업 중...

--- 작업 후 ---
git add . 
git commit -m "feat:3/23, 메인페이지 완료나 진행중"
git push origin main


그리고 pull request
pull request 시 title과 content에 커밋메시지 보다 더 구체적으로 적어주세요.
```

- git 명령어 
```
- 깃 초기 셋팅(원하는 본인의 디렉토리에서)
git init

- 프로젝트 clone
git clone 주소

- 원격 연결 확인
git remote -v

- 원격 연결
git remote add upstream 조직주소
git remote add origin 개인주소

- pull : 원격 저장소의 정보를 가져오면서 자동으로 로컬 브랜치에 병합(Merge)까지 수행해주는 명령어 
git pull upstream main

==================================================

##### background-color
##### font
- 다양한 google Fonts 및 kopub체 , 배달의 민족체, 엘리스체

헤더 팀명: Jua체 
헤더 nav: kopub체
컨테이너(본문) : Do Hyeon체
푸터: kopub체
##### icon
- [material](https://material.io/search.html?q=filled)

##### 최종 수정 : 220401 정재빈 

