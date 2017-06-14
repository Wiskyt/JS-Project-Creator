require('colors');
var Utils = module.exports = {};

Utils.version = '0.4.0a';

Utils.owl = `
＜￣｀ヽ、　　　　　　　／ ￣ ＞
　ゝ、　　＼　／⌒ヽ,ノ 　  /´
　　　ゝ、   （ ( ͡◉ ͜> ͡◉) ／
　　 　　>　 　 　,ノ
　　　　　∠_,,,/´
`;

Utils.logIntro = function() {
   console.log(this.owl.yellow);
   console.log(("   JS Project Creator v" + this.version).green);
   console.log(" Answer questions by Yes or No (y/n)\n")
}

Utils.pleaseWait = function() {
   console.log("\n Creating files and downloading dependencies.. this may take a while. \n".red);
}

Utils.clearConsole = function () {
  return process.stdout.write('\033c');
}