// 기명함수: 호이스팅(끌어올리기) 지원
function sum(start, target) {
  let result = 0;
  for (let i = start; i <= target; i++) {
    result = result + i;
  }
  return result;
};

console.log(sum(10, 30));

// 익명함수: 호이스팅 미지원
// console.log(annoymous_sum(10, 30));

const annoymous_sum = function(start, target) {
  let result = 0;
  for (let i = start; i <= target; i++) {
    result = result + i;
  }
  return result;
};

console.log(annoymous_sum(10, 30));

