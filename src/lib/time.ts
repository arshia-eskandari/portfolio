export function timeTester(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completed waiting for ${seconds} seconds.`);
    }, seconds * 1000);
  });
}
