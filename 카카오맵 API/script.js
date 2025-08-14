/**
 * DOM이 완전히 로드된 후에 실행되도록 감싸기
 */
document.addEventListener('DOMContentLoaded', () => {

  const categoryList = document.querySelector(".category-list");

  /** 
   * 지도 생성 및 확대 축소 컨트롤러
   */
  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.83, 128.75), //지도의 중심좌표.
    level: 5, //지도의 레벨(확대, 축소 정도)
  };

  var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
  // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  /**
   * 더미데이터 (제목, 주소, url, 카테고리)
   */
  const dataset = [
    {
      title: "나쁜짬뽕",
      address: "경북 경산시 계양로35길 13",
      url: "https://naver.me/IIZSbxES",
      category: "중식",
      img: "./nazzam.jpg"
    }, 
    {
      title: "푸른영대식당", 
      address: "경북 경산시 갑제길 18",
      url: "https://naver.me/Fk5Lh2CM",
      category: "한식",
      img: "./puyoung.jpg"
    },
    {
      title: "카츠디나인",
      address: "경북 경산시 청운로 5",
      url: "https://naver.me/F0KwVPcu",
      category: "일식",
      img: "./D9.jpg"
    }
  ];

  const searchResult = document.getElementById("search-result");

dataset.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("result-card");

  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <div class="result-info">
      <div class="title">${item.title}</div>
      <div class="address">${item.address}</div>
      <div class="category">${item.category}</div>
      <a href="${item.url}" target="_blank">바로가기</a>
    </div>
  `;

  searchResult.appendChild(card);
});


  /**
   * 여러개 마커 찍기
   */
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 오버레이/마커 저장
  let overlayArray = [];
  let markerArray = [];

  // 마커 이미지 경로
  var imageSrc = './static/img/marker-circle.png',
      imageSize = new kakao.maps.Size(20, 20),  // 마커 전체 크기 (꼬리 포함)
      imageOption = {
          offset: new kakao.maps.Point(10, 20)  
      };

  // 커스텀 마커 이미지 생성
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  // 정보창 DOM 레퍼런스
  const infoPanel = document.getElementById('info-panel');
  const infoImg = document.getElementById('info-img');
  const infoTitle = document.getElementById('info-title');
  const infoUrl = document.getElementById('info-url');
  const infoClose = document.getElementById('info-close');

  // 상세정보 닫기 버튼 클릭 시
infoClose.addEventListener('click', () => {
  infoPanel.classList.add('hidden');         // 패널 숨김
  categoryList.classList.remove('hidden');   // 카테고리 다시 표시
});

  /**
   * 하단 정보창에 내용 표시
   * @param {Object} data - dataset의 개별 가게 데이터
   */
  function showInfoPanel(data) {
    infoImg.src = data.img || '';
    infoTitle.textContent = data.title;
    infoUrl.href = data.url;
    infoPanel.classList.remove('hidden');
    categoryList.classList.add('hidden');      // 카테고리 숨김
  }

  /**
   * 말풍선 오버레이 컨텐츠 생성
   */
  function getOverlayContent(data) {
    return `
      <div class="custom-infowindow">
        ${data.title}
      </div>
    `;
  }

  /**
   * dataset 배열을 받아서 지도에 마커와 오버레이를 찍는 함수
   * @param {Array} dataset 
   */
  async function setMap(dataset) {
  // 주소-좌표 변환 객체
  const geocoder = new kakao.maps.services.Geocoder();

  overlayArray = [];
  markerArray = [];

  for (let i = 0; i < dataset.length; i++) {
    // 주소를 좌표로 변환
    let coords = await getCoordsByAddress(dataset[i].address);

    // 마커 생성
    let marker = new kakao.maps.Marker({
      map: map,
      position: coords,
      image: markerImage
    });
    markerArray.push(marker);

    // 커스텀 오버레이 생성
    let overlay = new kakao.maps.CustomOverlay({
      position: coords,
      content: getOverlayContent(dataset[i]),
      yAnchor: 1.2
    });
    overlayArray.push(overlay);

    // 카드 DOM 찾기
    const card = [...document.querySelectorAll(".result-card")].find(
      c => c.querySelector(".title").textContent === dataset[i].title
    );

    // 카드 클릭 이벤트
    card.addEventListener("click", () => {
      closeOverlays(); // 기존 오버레이 닫기
      overlay.setMap(map); // 현재 오버레이 열기
      map.panTo(marker.getPosition()); // 지도 중심 이동
      showInfoPanel(dataset[i]); // 하단 정보창 표시
    });

    // 마커 클릭 이벤트 
    kakao.maps.event.addListener(marker, 'click', function() {
      closeOverlays();
      overlay.setMap(map);
      map.panTo(coords);
      showInfoPanel(dataset[i]);
    });

    // 지도 클릭 시 오버레이, 정보창 닫기
    kakao.maps.event.addListener(map, 'click', function() {
      overlay.setMap(null);
      infoPanel.classList.add('hidden');
    });
  }
}


  /**
   * 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
   */
  function makeOverListener(map, marker, infowindow, coords) {
    return function() {
      // 클릭 시 다른 인포 윈도우 닫기
      closeInfoWindow();
      infowindow.open(map, marker);

      // 클릭한 곳으로 지도 중심 이동
      map.panTo(coords);
    };
  }

  let infowindowArray = [];

  /**
   * 모든 인포윈도우 닫기
   */
  function closeInfoWindow() {
    for (infowindow of infowindowArray) {
      infowindow.close();
    }
  }

  /**
   * 인포윈도우 닫는 클로저 생성
   */
  function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
  }

  /**
   * 주소를 받아 좌표 변환 (Promise 반환)
   * @param {String} address 
   * @returns {Promise<kakao.maps.LatLng>}
   */
  function getCoordsByAddress(address) {
    return new Promise((resolve, reject) => {
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(address, function(result, status) {
          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
            return;
          }
          reject(new Error("getCoordsByAddress Error: not Valid Address"));
      });   
    });
  }

  /**
   * 지도에 마커를 찍는 최초 실행
   */
  setMap(dataset);

  /**
   * 카테고리 분류
   */
  const categoryMap = {
    korea: "한식",
    china: "중식",
    japan: "일식",
    america: "양식",
    wheat: "분식",
    fast: "패스트푸드",
    dessert: "디저트",
    etc: "기타",
    chicken: "치킨",
    all: "전체"
  };

  categoryList.addEventListener("click", categoryHandler);

  /**
   * 카테고리 클릭 이벤트 핸들러
   * @param {Event} event 
   */
  function categoryHandler(event) {
    const categoryId = event.target.id;
    const category = categoryMap[categoryId];

    // 데이터 분류
    let categorizedDataSet = [];
    for (let data of dataset) {
      if (data.category === category) {
        categorizedDataSet.push(data);
      }
      else if (category === "전체") {
        categorizedDataSet.push(data);
      }
    }

    // 기존 마커 삭제
    closeMarker();

    // 기존 인포윈도우 닫기
    closeInfoWindow();

    setMap(categorizedDataSet);
  }

  /**
   * 오버레이 닫기
   */
  function closeOverlays() {
    overlayArray.forEach(o => o.setMap(null));
  }

  /**
   * 마커 닫기
   */
  function closeMarker() {
    for (marker of markerArray) {
      marker.setMap(null);
    }
  }
});
