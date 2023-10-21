function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResult() {
  try {
    const draw1 = await luckyDraw("Tina");
    console.log(draw1);
    const draw2 = await luckyDraw("Jorge");
    console.log(draw2);
    const draw3 = await luckyDraw("Julien");
    console.log(draw3);
  } catch (error) {
    console.log(error);
  }
}

getResult();
