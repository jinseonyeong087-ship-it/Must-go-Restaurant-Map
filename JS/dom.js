// // 엘리먼트 선택 예제
// console.log(document.querySelector("div.welcome")); // 해당 선택자로 선택되는 요소를 선택
// console.log(document.querySelectorAll("div")); // 해당 선택자로 선택되는 요소를 모두 선택 (배열)
// console.log(document.getElementsByTagName("div")); // 해당 태그 이름의 요소를 모두 선택 (배열)
// console.log(document.getElementById("hi")); // 해당 아이디의 요소를 선택
// console.log(document.getElementsByClassName("welcome")); // 해당 클래스에 속한 요소를 모두 선택 (배열)


// const divTag = document.querySelector("div");
// console.log(divTag);

// divTag.style.color = "red";

// divTag.innerText = "안녕하세요";
// divTag.style.fontSize = "30px";
// divTag.style.color = "blue";


// const container = document.querySelector(".container");
// console.log(container);

// // 부모 태그
// console.log(container.parentElement);
// // 자식 태그
// console.log(container.children);
// // 형제 태그
// console.log(container.nextElementSibling);

// // div.inner를 선택
// let inner = document.querySelector(".inner");
// // <div>태그 생성
// let element = document.createElement("div");
// // text 노드 hello 생성
// let hello = document.createTextNode("hello");
// // <div>hello</div>로 만들기
// element.appendChild(hello);
// // div.inner에 element 추가
// inner.appendChild(element);

const productsData = [
  { title: "감자칩", weight: 300 },
  { title: "칙촉", weight: 100 },
  { title: "고구마칩", weight: 300 },
  { title: "오잉", weight: 50 },
];

const app = document.querySelector("#app");

app.innerHTML = `<div class="item">상품명 : ${productsData.title}, 무게 ${productsData.weight}g</div>`;

let result = "";
for (data of productsData) {
  result += `<div class="item">상품명 : ${data.title}, 무게 ${data.weight}g</div>`;
}
app.innerHTML = result;