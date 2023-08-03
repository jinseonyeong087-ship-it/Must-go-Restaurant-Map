const arr = [1, 2, 3, 4];

arr.slice(1, 2);

console.log(arr.slice(1, 3));

arr[0] = 100;
console.log(arr);

// 배열 삭제
arr.splice(0, 1);
console.log(arr);

// 객체 create
let userInfo = {
  email: "1234@1234.com",
  passwork: "1234"
};

// 객체 read
console.log(userInfo.email);
console.log(userInfo["email"]);

// 객체 update
userInfo.email = "updated";
console.log(userInfo.email);

// 객체 delete
delete userInfo.email;
console.log(userInfo);


/* 연습 */
const nameList = ["짱구", "철수"];

nameList.push("훈이");
console.log(nameList);

nameList[1] = "유리";
console.log(nameList);

nameList.splice(0, 1);
console.log(nameList);