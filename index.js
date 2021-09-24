import readline from 'readline';

export default function spinner() {
  let timer;
  const frames = ['⏳', '🔨', '🪣 ', '🧽', '📦', '🔎', '💈'];
  const interval = 800;
  const std = process.stdout;
  let internalMsg;

  function clearCursor() {
    readline.clearLine(std, 0);
    readline.cursorTo(std, 0);
  }

  return {
    start(msg) {
      internalMsg = msg;
      std.write('\u001B[?25l');
      let index = 0;
      timer = setInterval(() => {
        let now = frames[index];
        if (now === undefined) {
          index = 0;
          now = frames[index];
        }
        clearCursor();
        const magentaColor = '\x1b[35m';
        std.write(now);
        std.write(` ${magentaColor} ${msg} `);
        index = index >= frames.length ? 0 : index + 1;
      }, interval);
    },

    stop() {
      clearInterval(timer);
      clearCursor();
      const greenColor = '\x1b[32m';
      std.write(`${greenColor} ${internalMsg} — Completed ✅`);
      std.write('\u001B[?25h');
    },
  };
}
