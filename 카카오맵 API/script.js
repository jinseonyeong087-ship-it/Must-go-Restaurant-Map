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
    category: "중식"
  }, 
  {
    title: "꼬뱅", 
    address: "경북 경산시 청운로 13-1",
    url: "https://naver.me/xivSiUBF",
    category: "패스트푸드"
  },
  {
    title: "카츠디나인",
    address: "경북 경산시 청운로 5",
    url: "https://naver.me/F0KwVPcu",
    category: "일식"
  }
]

/**
 * 여러개 마커 찍기
 */
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

async function setMap() {
  for (var i = 0; i < dataset.length; i ++) {
    // 마커를 생성합니다
    let coords = await getCoordsByAddress(dataset[i].address);
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: coords, // 마커를 표시할 위치
    });
  }
}

// 주소-좌표 변환 함수
function getCoordsByAddress(address) {
  return new Promise((resolve, regect) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          resolve(coords);
          return;
        }
        regect(new Error("getCoordsByAddress Error: not Vaild Address"));
    });   
  });
}

setMap();