# MonkeyRefrigerator
##### 최종 수정 : 220410 정재빈 
Douzone Zoo MonekeyRefrigerator : 더존 동물원 원숭이 냉장고
- 자취생, 주부, 요리를 잘못하는 아버지도 다양한 레시피로 요리를 해먹자 
- 레시피 데이터를 이용한 웹 어플리케이션 서비스
--- 
## git을 모르겠어요 <a href="#git" style= " font-size:35px">click!!</a> 
--- 

## 구성
#### 프로젝트 구성 : 요구사항 분석 -> 계획 -> 설계 -> 구현 -> 시험
#### 발표 구성 : 요구사항 분석(문제인식, 문제분석, 해결전제) -> 전략 -> 전략에 대한 문제점-> 해결방안

### [스토리보드](https://ovenapp.io/view/RY03iHLvicj9EbCmSsBtuFAkUPoPhPvK/WtQlw)
### [플로우차트]()
### [ERD](https://aquerytool.com/aquerymain/index/?rurl=9813bafe-98ff-43ee-b8db-9fec37264918)
### [API문서](https://docs.google.com/spreadsheets/d/1sNnvS_xTT11h36ptsI6zyGYK5P7Y7mFk6cYkF9kuIX8/edit?usp=sharing)
---

## 전체 구성 단계 (SPA 형식)

### 역할분담( 4/1~ )

- 아이디어 기획, 구상
  - 재빈, 상윤, 희수, 우형 
- DB 설계 , 데이터 추가 , DB 연동(테스트) 
  - 상윤, 재빈
- 스토리 보드 , 플로우 차트(간략히)
  - 희수, 우형

역할분담 : 기능별로 나누기(1인 front + back)

## 기능별 역할분담( 4/6~ )
  - 회원 
    - 희수, 우형
  - 게시물
    - 재빈, 상윤
    
---

## 기능 (★★★기능 우선순위 포함★★★)

### 1순위
- 회원가입
  - 이메일, 비밀번호, 닉네임, 이름 , 직업ID, 성별, 생년월일 
- 이메일, 닉네임 중복검사
- 로그인 -- jwt token
- 로그아웃
- 프로필 조회 -> mypage

- 레시피 게시물 목록 전체조회
- 레시피 게시물 무한 스크롤
- 레시피 게시물 조회수순 조회 -- x
- 레시피 게시물 날짜순 조회-- x
- 레시피 게시물 추천순(좋아요수순) 조회
- 레시피 게시물 상세조회
- 레시피 게시물 저장
  - 회원ID, 제목, 내용, 난이도, 조리시간ID, 순위, 부재료, 태그명, 종류별ID
- 레시피 게시물 다중 이미지 업로드
- 현재 레시피 게시물 유저의 다른 레시피 게시물 조회
- 레시피 랭크 게시물 조회 -> 인기 게시물 BEST10 조회: 조회수와 댓글의 비율 이용 - 상윤

- 레시피 냉장고 : 내가 가지고 있는 재료를 이용하여 내가 가지고 있는 재료별 검색 ★ 
- 레시피 게시물 제목별 검색
- 레시피 게시물 종류별 검색 

- 레시피 게시물 - 회원 스크랩 저장, 조회, 삭제
- 레시피 게시물 - 회원 좋아요 저장 , 조회, 삭제
 
### 2순위 -- 일단 여기까지 만듭니다.
- 이메일 인증(회원가입 부분) 
- 아이디/비밀번호 찾기 -> 이메일 인증을 통한 비밀번호 변경

- 레시피 게시물 댓글 조회 저장 
- 레시피 게시물 대댓글 조회, 저장 
- 게시물 스크랩 + 좋아요+ 조회수 + 댓글수가 많은 유명셰프 조회 
- 레시피 투표 -> 가장 인기있는 best10으로 이달의 레시피, 이주의 레시피 - 희수

### 3순위
- 소셜 로그인(카카오, 구글)
- 프로필 수정 
- 프로필 검색
- 회원가입 프로필 사진 업로드
- 회원 탈퇴 
- 아이디(이메일), 비밀번호 정규 표현식(이메일 : @ .com , 비밀번호 : 8자~16자 영어, 숫자 ,특수문자 필수 포함) 
- 레시피 게시물 오픈그래프 공유 (인스타, 페이스북 ,카카오)

### 4순위
- 휴대폰 인증, 카카오 지갑 인증(회원가입)
- 자동입력방지(로그인 -> 로봇이 아닙니다. 영문자 적으세요)
- 카카오톡 채널

### 99순위 
- 농수산물 식품 가격 API를 이용한 평균 가격 측정(예정) -> 평균금액 

---

### 개발 환경 도구 : vscode

### 기술 스택:
- javascript , node.js
- front-end : react.js 
- back-end : express.js
- DB : oracle

### 버전관리 및 소스코드 관리 :
- git

---

### git flow, git 명령어, git 컨벤션 

<a id="git"></a>

▶▶▶▶▶ upstream main을 받을때는 rebase나 merge를 합시다. ◀◀◀◀◀ <br>
▶▶▶▶▶ 받기전에  add , commit 필수!!!◀◀◀◀◀

```
- 원격 개인저장소 및 원격 조직 저장소에 올리기
- 올리기전에 pull이나 fetch로 변경점 확인

git fetch upstream
git rebase upstream/main
```

##### git 기본 명령어

```
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

```

##### team4 git commit 컨벤션 
▶▶▶▶▶ 직관!!!◀◀◀◀◀
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

##### local에 upastream 최신화 후 작업하기 
▶▶▶▶▶ 중요!!!◀◀◀◀◀

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
git rebase --continue

한번 확인 하라는 창 뜹니다 :wq

... 작업 중...

--- 작업 후 ---
git add . 
git commit -m "feat:3/23, 메인페이지 완료나 진행중"
git push origin main


그리고 pull request
pull request 시 title과 content에 커밋메시지 보다 더 구체적으로 적어주세요.
```

---

##### background-color
rgb(242,243,245)

##### font
- 다양한 google Fonts 및 kopub체 , 배달의 민족체, 엘리스체
- 헤더 팀명: Jua체 
- 헤더 nav: kopub체
- 컨테이너(본문) : Do Hyeon체
- 푸터: kopub체

##### icon
- [material](https://material.io/search.html?q=filled)



