export function timeTester(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completed waiting for ${seconds} seconds.`);
    }, seconds * 1000);
  });
}

export function formatReadableDate(date: Date): string {
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
