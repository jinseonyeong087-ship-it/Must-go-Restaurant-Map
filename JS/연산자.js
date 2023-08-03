console.log(1===1);
console.log(1=="1"); // 등호 두 개: 데이터 타입 상관없이 값만 비교
console.log(1==="1"); // 등호 세 개: 데이터 타입까지 비교

var height = 165;
var idealWeight = (height - 100) * 0.9;

console.log("당신의 키는 ", height, "cm이며 적정 체중은 ", idealWeight, "kg입니다");
console.log(`당신의 키는 ${height}cm이며 적정체중은 ${idealWeight}kg입니다.`)