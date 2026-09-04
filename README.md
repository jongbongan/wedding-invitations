# 모바일 청첩장 템플릿

별도의 설치나 빌드 없이 GitHub Pages에 바로 올릴 수 있는 정적 웹사이트입니다.

## 1. 내용 수정

`wedding-data.js`만 열어서 다음 내용을 수정하세요.

- 신랑·신부 이름과 부모님 성함
- 예식 날짜와 시간
- 예식장 이름, 주소, 전화번호
- 네이버 지도·카카오맵·티맵 링크
- 대중교통과 주차 안내
- 연락처와 계좌번호
- 초대 문구

날짜는 다음 형식을 유지해야 합니다.

```javascript
weddingDate: "2027-05-15T13:00:00+09:00"
```

## 2. 사진 교체

`assets` 폴더에 실제 사진을 넣고 `wedding-data.js`의 파일명을 변경하세요.

```javascript
images: {
  cover: {
    src: "./assets/cover.webp",
    alt: "신랑 신부 대표 사진",
  },
  gallery: [
    { src: "./assets/photo-01.webp", alt: "웨딩 사진 1" },
    { src: "./assets/photo-02.webp", alt: "웨딩 사진 2" },
  ],
},
```

권장 사항:

- 형식: WebP 또는 최적화한 JPEG
- 대표 사진: 세로형, 가로 1200px 내외
- 갤러리 사진: 긴 변 1600px 내외
- 사진 한 장당 가능하면 500KB 이하
- 파일명은 영문 소문자와 숫자로 작성

## 3. 미리보기

`index.html`을 브라우저에서 열면 바로 확인할 수 있습니다. 공유·클립보드 기능까지 정확히 확인하려면 이 폴더에서 간단한 로컬 서버를 실행하세요.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`에 접속합니다.

## 4. GitHub Pages 배포

### 전용 저장소를 사용하는 경우

1. GitHub에서 `wedding-invitation` 저장소를 만듭니다.
2. 이 폴더 안의 파일을 저장소 최상단에 넣습니다.
3. 커밋하고 `main` 브랜치에 push합니다.
4. 저장소의 `Settings → Pages`로 이동합니다.
5. `Deploy from a branch`, `main`, `/(root)`를 선택하고 저장합니다.

배포 주소 예시:

```text
https://jongbongan.github.io/wedding-invitation/
```

### 기존 GitHub 블로그에 넣는 경우

기존 `jongbongan.github.io` 저장소 안에 `wedding` 폴더를 만들고 이 파일들을 넣습니다. 이 경우 이 템플릿의 `.nojekyll` 파일은 넣지 않아도 됩니다.

```text
jongbongan.github.io/
└── wedding/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── wedding-data.js
    └── assets/
```

주소는 다음과 같습니다.

```text
https://jongbongan.github.io/wedding/
```

## 5. 개인정보 주의

- GitHub Pages의 HTML, 전화번호, 계좌번호와 사진은 공개됩니다.
- `noindex` 메타 태그를 넣어 검색 노출을 줄였지만 접근을 차단하는 기능은 아닙니다.
- 사진을 올리기 전에 위치정보와 촬영정보(EXIF)를 제거하는 것을 권장합니다.
- 템플릿에 들어 있는 `000-0000-0000` 등의 예시 정보를 반드시 실제 정보로 교체하세요.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| `index.html` | 청첩장 화면 구조 |
| `style.css` | 색상, 글꼴, 모바일 레이아웃 |
| `script.js` | 달력, D-Day, 갤러리, 복사·공유 기능 |
| `wedding-data.js` | 결혼식 정보와 사진 목록 |
| `assets/` | 대표 사진과 갤러리 사진 |

참고한 프로젝트: <https://github.com/juhonamnam/wedding-invitation>  
참고 프로젝트의 코드를 복사하지 않고, 정보 구성과 기능 범위를 참고하여 독립적인 정적 템플릿으로 작성했습니다.
