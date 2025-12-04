function parseInput(text) {
  t = text
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  return t;
}

let directions = {
  topleft: [-1, -1],
  top: [0, -1],
  topright: [1, -1],
  leftcenter: [-1, 0],
  //center: [0, 0],
  right: [1, 0],
  bottomleft: [-1, 1],
  bottom: [0, 1],
  bottomright: [1, 1],
};
function countNeighbors(grid,x,y){
    let sum = 0
    for(let [xd,yd] of Object.values(directions)){
        let point = grid[y+yd]?grid[y+yd][x+xd]||".":"."
        if(point !== "."){
            sum++
        }
    }
    return sum
}
/**
 *
 * @param {*} input
 * @returns
 */
function part1(input) {
  let sum = 0;
  let gridSize = {
    x: input[0].length,
    y: input.length,
  };
  for(let y =0;y<gridSize.y;y++){
    for(let x =0;x<gridSize.x;x++){
        if(input[y][x] === "."){
            continue
        }
        let nextTo = countNeighbors(input,x,y)
        if(nextTo <4){
            input[y][x] = `${nextTo}`
            sum++
        }
    }
  }
  return sum;
}
/**
 *
 * @param {string[][]} input
 * @returns
 */
function part2(input) {
  let sum = 0
  let running = true;
  while(running){
    let step = part1(input)
    if(step == 0){
        break
    }
    //Reset
    input.forEach((row,y)=>row.forEach((_,x)=>{
        if(!Number.isNaN(parseInt(input[y][x]))){
            input[y][x] = "."
        }
    }))
    sum += step
    
  }
  return sum;
}

let rawInput = document.querySelector("pre").innerText;
let input = parseInput(rawInput);
function run(fn) {
  start = performance.now();
  let results = fn();
  console.log(`result:${results}, took:${performance.now() - start}`);
}

console.log("part1");
run(() => part1(input));
console.log("part2");
run(() => part2(input));
