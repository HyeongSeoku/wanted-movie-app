# wanted-movie-app
원티드 프리온보딩 2주차 개인과제입니다.

영화를 검색하고 즐겨찾기 등록/수정이 가능한 서비스입니다.
---

## 데모 영상


### 파일 구조
```
.
├── App.tsx
├── assets
├── components
│   ├── bookMarkCard
│   │   ├── bookMarkCard.module.scss
│   │   └── index.tsx
│   ├── bookMarkListContainer
│   │   ├── bookMarkListContainer.module.scss
│   │   └── index.tsx
│   ├── darkMode
│   │   ├── darkMode.module.scss
│   │   └── index.tsx
│   ├── loader
│   │   ├── index.tsx
│   │   └── loader.module.scss
│   ├── modal
│   │   ├── index.tsx
│   │   └── modal.module.scss
│   ├── movieCard
│   │   ├── index.tsx
│   │   └── movieCard.module.scss
│   ├── navBar
│   │   ├── index.tsx
│   │   └── navBar.module.scss
│   └── searchInput
│       ├── index.tsx
│       └── searchInput.module.scss
├── images
│   └── notfound.png
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── routes
│   ├── BookMark
│   │   ├── BookMark.module.scss
│   │   └── index.tsx
│   ├── NotFound404
│   │   ├── NotFound404.module.scss
│   │   └── index.tsx
│   ├── Route.module.scss
│   ├── Search
│   │   ├── Search.module.scss
│   │   ├── index.tsx
│   │   └── searchMethod.tsx
│   └── index.tsx
├── setupTests.ts
├── styles
│   ├── base
│   │   ├── _fonts.scss
│   │   ├── _more.scss
│   │   └── _reset.scss
│   ├── constants
│   │   ├── _colors.scss
│   │   ├── _levels.scss
│   │   └── _sizes.scss
│   ├── index.js
│   ├── index.scss
│   └── mixins
│       ├── _animation.scss
│       ├── _flexbox.scss
│       ├── _position.scss
│       ├── _responsive.scss
│       └── _visual.scss
├── test.txt
├── types
│   └── types.d.ts
└── utils
    ├── apis
    │   └── api.tsx
    ├── atoms
    │   └── atom.ts
    └── constants
        ├── componentsData.tsx
        └── standard.tsx

24 directories, 51 files

```

## 기본 구현
- [x] 하단 메뉴
- [x] 영화 검색
- [x] 검색 결과 표시
- [x] Infinite scroll
- [x] 즐겨찾기 등록/삭제 기능


## 세부 설명

### 검색
![search_mini_demo](https://user-images.githubusercontent.com/48541850/168460854-b0721d1b-d54b-4091-92e5-094e1e15cbad.gif)

**💁 구현 설명**
    
    검색을 담당하는 searchInput 컴포넌트에서 검색어가 입력되면 api가 실행되고 
    recoil로 관리되는 데이터에 검색 데이터를 set해주도록 구현했습니다.
    간단한 예외 처리를 진행해주었으며, sticky속성을 이용해 검색창이 항상 떠있도록 구현하였습니다.


**❗️ 어려웠던 점**

    크게 어려운 점은 없었으나, 예외처리가 api status 값에 따라 처리할 수 없어서
    살짝 헤맸습니다.

**⭐️ 자랑할 점**

    예외 처리를 진행한 점
    로딩중임을 알 수 있도록 처리한 것

---

### 검색 스크롤
![search_scroll_mini_demo](https://user-images.githubusercontent.com/48541850/168460887-3cf1656b-fb5e-4bbf-84ba-ec195ae9d91d.gif)

**💁 구현 설명**
    
    


**❗️ 어려웠던 점**


**⭐️ 자랑할 점**


---
### 모달
![modal_mini_demo](https://user-images.githubusercontent.com/48541850/168460947-63c1ded3-f2bf-4078-815f-9190fc59b967.gif)

**💁**

**❗️**

**⭐️**


---

### 즐겨찾기

![bookMark_mini_demo](https://user-images.githubusercontent.com/48541850/168460892-0a674651-5bf0-42f4-94a0-2b3fc09f7aad.gif)
**💁**

**❗️**

**⭐️**

---

### 드래그 앤 드롭
![dnd_mini_demo](https://user-images.githubusercontent.com/48541850/168460895-ad351372-f8c1-45a7-b5d7-b4f2eaf78cfa.gif)
**💁**

**❗️**

**⭐️**

---

## 선택 구현
- [ ] 즐겨찾기 목록 순서 조정 (드래그 & 드롭)


## 기술 스택
- React
- TypeScript
- 

## 보완 사항
- 세부 디테일 디자인 수정
- 디렉토리 구조 수정
- 중복 타입 선언 제거
- 검색 로직 및 즐겨찾기 로직 최적화
- 추가 데이터를 통한 좀 더 다양한 정보 랜더링 (https://imdb-api.com/) [imdbID 활용]