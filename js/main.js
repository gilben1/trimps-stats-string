// Calculates significant figures with suffixes K/M/B/T, e.g. 1234 = 1.23K
function sigfig(num, sigfigs_opt) {
  // Set default sigfigs to 3
  sigfigs_opt = (typeof sigfigs_opt === "undefined") ? 3 : sigfigs_opt;
  // Only assigns sig figs and suffixes for numbers > 1
  if (num <= 1) return num.toPrecision(sigfigs_opt);
  // Calculate for numbers > 1
  var power10 = log10(num);
  var power10ceiling = Math.floor(power10) + 1;
  // 0 = '', 1 = 'K', 2 = 'M', 3 = 'B', 4 = 'T'
  var SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  // 100: power10 = 2, suffixNum = 0, suffix = ''
  // 1000: power10 = 3, suffixNum = 1, suffix = 'K'
  var suffixNum = Math.floor(power10 / 3);
  var suffix = (typeof SUFFIXES[suffixNum] === "undefined") ? "e" + (suffixNum * 3) : SUFFIXES[suffixNum];
  // Would be 1 for '', 1000 for 'K', 1000000 for 'M', etc.
  var suffixPower10 = Math.pow(10, suffixNum * 3);
  var base = num / suffixPower10;
  var baseRound = base.toPrecision(sigfigs_opt);
  return baseRound + suffix;
}

function log10(num) {
  // Per http://stackoverflow.com/questions/3019278/how-can-i-specify-the-base-for-math-log-in-javascript#comment29970629_16868744
  // Handles floating-point errors log10(1000) otherwise fails at (2.99999996)
  return (Math.round(Math.log(num) / Math.LN10 * 1e6) / 1e6);
}


let name_input = document.getElementById('name-input');
let save_input = document.getElementById('save-input');
let importButton = document.getElementById('input-button');
let outputU1 = document.getElementById('output-u1');
let outputU2 = document.getElementById('output-u2');

importButton.addEventListener('click', () => {
    let convertedData = LZString.decompressFromBase64(save_input.value)
    convertedData = JSON.parse(convertedData);
    
    // Pull the stats we want out
    let u1hze = convertedData.global.highestLevelCleared + 1;
    let u2hze = convertedData.global.highestRadonLevelCleared + 1;
    let totalHe = sigfig(convertedData.global.totalHeliumEarned);
    let totalRd = sigfig(convertedData.global.totalRadonEarned);
    let achievePercent = sigfig(convertedData.global.achievementBonus);
    let cinfReward = sigfig(convertedData.global.totalSquaredReward);

    outputU1.innerHTML = name_input.value + " | z" + u1hze + " " + totalHe + " He " + cinfReward + "%"
    outputU2.innerHTML = name_input.value + " | z" + u2hze + " " + totalRd + " Rn " + cinfReward + "%"
})