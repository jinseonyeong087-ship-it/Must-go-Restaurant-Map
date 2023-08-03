const arr = [5, 6, 7, 8];

// in: 배열의 인덱스를 반환
for (let index in arr) {
  console.log(arr[index]);
}

// of: 배열의 원소를 반환
for (let item of arr) {
  console.log(item);
}

const jsonArr = {email: "123", password: "1234"};
for (let key in jsonArr) {
  console.log(jsonArr[key]);
}