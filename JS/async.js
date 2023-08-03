// // 1
// console.log("1등!");
// // 2
// setTimeout(function () {
//   console.log("2등!");
// }, 2000);
//   // 3
//   setTimeout(function() {
// 	console.log('3등!');
// }, 2000);
// // => 2등과 3등이 동시에 출력됨

// // 1
// console.log("1등!");
// // 2
// setTimeout(function () {
//   console.log("2등!");
//   // 3
//   setTimeout(function() {
//     console.log('3등!');
//   }, 2000);
// }, 2000);

// const helloPromise = new Promise((resolve, reject) => {
//   // 생성 자체는 pending
//   let isSuccess = false;

//   if (!isSuccess) {
//     reject(false); // catch 호출
//     return;
//   }

//   console.log("1등");
//   setTimeout(() => {
//     resolve(); // then 호출
//   }, 2000);
// });

// helloPromise
//   .then((res) => {
//     console.log("2등");
//     return new Promise((resolve, reject) => {
//       setTimeout(() => resolve(), 2000);
//     });
//   })
//   .then((res) => {
//     console.log("3등");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   async function asyncFunction() {
//     console.log("1등");
//     await second();
//     await third();
//   }
  
  // function second() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("2등");
  //       resolve();
  //     }, 2000);
  //   });
  // }
  
  // function third() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("3등");
  //       resolve();
  //     }, 2000);
  //   });
  // }
  
  async function asyncFunction() {
    try {
      console.log(1);
      const result = await getResult();
      console.log(result);
      console.log(3);
    } catch (err) {
      console.log(err);
    }
  }
  
  function getResult() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("에러발생 예시"));
      }, 500);
    });
  }
  
  asyncFunction();