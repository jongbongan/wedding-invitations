/**
 * 모바일 청첩장 내용 설정 파일
 * 따옴표 안의 내용만 수정하면 화면에 자동으로 반영됩니다.
 */
window.WEDDING_DATA = {
  page: {
    title: "안종봉과 김다솔의 결혼식",
    description: "저희 두 사람의 결혼식에 초대합니다.",
    // 비워두면 현재 페이지 주소를 공유합니다.
    shareUrl: "",
  },

  // 날짜는 반드시 아래 형식과 같이 한국 시간대(+09:00)를 포함해 입력하세요.
  weddingDate: "2026-12-12T14:00:00+09:00",

  groom: {
    fullName: "안종봉",
    firstName: "종봉",
    father: "안춘기",
    mother: "이정순",
    order: "장남",
  },

  bride: {
    fullName: "김다솔",
    firstName: "다솔",
    father: "김종희",
    mother: "유연화",
    order: "장녀",
  },

  invitation: {
    // 줄바꿈은 \n으로 입력합니다. 빈 줄은 \n\n입니다.
    message:
      "서로의 하루를 아끼며 걸어온 두 사람이\n이제 같은 곳을 바라보며 새로운 길을 시작합니다.\n\n귀한 걸음으로 함께하시어\n따뜻한 축복을 나누어 주시면 감사하겠습니다.",
  },

  venue: {
    name: "이라운지 서울대점",
    hall: "이라운지 웨딩홀",
    address: "서울 관악구 관악로 1 서울대학교 관악캠퍼스 310동",
    tel: "Tel. 02-875-7761",
    links: {
      naverMap: "https://naver.me/5N15n4Vu",
      kakaoMap: "https://kko.to/AkKE0iCLp6",
      tmap: "https://tmap.life/2e5510e3",
    },
        travel: [
      {
        title: "대중교통",
        description:
          "2호선 서울대입구역 3번 출구에서 5511번, 5513번 버스 승차\n2호선 낙성대역 4번 출구에서 관악02-1번 버스 승차\n신림선 관악산역 1번 출구에서 5516번 버스 승차",
      },
      {
        title: "자가용",
        description:
          "정문 입차 시 계속 직진 후 신소재연구소 지나 제2공학관 앞 주차요원 유도에 따라 주차\n후문 입차 시 관악사 삼거리에서 좌회전 후 직진, 제2공학관 앞 주차요원 유도에 따라 주차\n출차 시 직원에게 '2시간 무료 주차권' 수령 후 출차",
      },
    ],
  },

  images: {
    cover: {
      src: "./assets/cover.jpg",
      alt: "신랑 신부 대표 사진",
    },
    // 1·4·7번 자리는 가로로 넓게(1.5:1) 잘려서 표시됩니다.
    // 세로 사진을 넓은 자리에 둘 때는 position으로 어느 부분을 보여줄지 정합니다. (예: "center 30%" = 위쪽 위주)
    gallery: [
      { src: "./assets/photo-04.jpg", alt: "창가 웨딩 사진" },
      { src: "./assets/photo-07.jpg", alt: "베일 속 두 사람" },
      { src: "./assets/photo-10.jpg", alt: "흰 창가 웨딩 사진" },
      { src: "./assets/photo-02.jpg", alt: "야외 정원 웨딩 사진", position: "center 40%" },
      { src: "./assets/photo-01.jpg", alt: "스튜디오 웨딩 사진" },
      { src: "./assets/photo-08.jpg", alt: "신랑 독사진" },
      { src: "./assets/cover.jpg", alt: "아치 창가 웨딩 사진", position: "center 30%" },
      { src: "./assets/photo-03.jpg", alt: "야외 웨딩 사진" },
      { src: "./assets/photo-09.jpg", alt: "아치 아래 두 사람" },
    ],
    // 오시는 길 섹션에 표시되는 약도입니다. 비워두면 표시되지 않습니다.
    map: {
      src: "./assets/map.jpg",
      alt: "이라운지 웨딩홀 약도 (서울대학교 관악캠퍼스)",
    },
  },

  contacts: {
    groom: [
      { relation: "신랑", name: "안종봉", phone: "010-3757-8409" },
      { relation: "신랑 아버지", name: "안춘기", phone: "010-5240-8409" },
      { relation: "신랑 어머니", name: "이정순", phone: "010-6712-8409" },
    ],
    bride: [
      { relation: "신부", name: "김다솔", phone: "010-9917-4880" },
      { relation: "신부 아버지", name: "김종희", phone: "010-3791-5626" },
      { relation: "신부 어머니", name: "유연화", phone: "010-7797-9080" },
    ],
  },

  accounts: {
    groom: [
      { relation: "신랑", name: "안종봉", bank: "농협", number: "312-0034-6825-61" },
      { relation: "아버지", name: "안춘기", bank: "농협", number: "095-02-095120" },
      { relation: "어머니", name: "이정순", bank: "농협", number: "417110-56-008771" },
    ],
    bride: [
      { relation: "신부", name: "김다솔", bank: "토스뱅크", number: "1001-7649-8103" },
      { relation: "아버지", name: "김종희", bank: "은행명", number: "미정" },
      { relation: "어머니", name: "유연화", bank: "기업", number: "5290-4341-301019" },
    ],
  },
};
