export async function sayHi() {
  return new Promise((resolve) => {
    resolve(console.log("hai"));
  });
}
