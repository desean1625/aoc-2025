
function parseInput(text){
    t = text.trim().split("\n").map(line=>line.split("").map(v=>parseInt(v,10)))
    return t
}

/**
 * 
 * @param {*} input 
 * @returns 
 */
function part1(input){
  let sum = 0
    for(let x of input){
        sum+=x
    }
    return sum
}
/**
 * 
 * @param {*} input 
 * @returns 
 */
function part2(input){
  let sum = 0
    for(let x of input){
        sum+=x
    }
    return sum
}



let rawInput = document.querySelector("pre").innerText
let input = parseInput(rawInput)
function run(fn){
    start = performance.now()
    let results = fn()
    console.log(`result:${results}, took:${performance.now() - start}`)
}

console.log("part1")
run(()=>part1(input))
console.log("part2")
run(()=>part2(input))
