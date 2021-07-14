function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo(fromDate) {
  while (true) {
    fromDate.setDay(fromDate.getDay() + 1);
    console.log(new Date(fromDate));
    await sleep(1000);
  }
}

demo(new Date('2021-03-20T12:00:00.000Z'));
