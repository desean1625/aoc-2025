let rawInput = document.querySelector("pre").innerText
function parseInput(text){
    t = text.trim().split("\n").map(line=>line.split("").map(v=>parseInt(v,10)))
    return t
}
let input = parseInput(rawInput)
function run(fn){
    start = performance.now()
    let results = fn()
    console.log(`result:${results}, took:${performance.now() - start}`)
}
/**
 * 
 * @param {number[]} bank 
 * @param {number} startIndex 
 * @param {number} remaining 
 */
function extractHighestFrom(bank,startIndex,remaining){
    for(let s =9;s>0;s--){
        let index = bank.indexOf(s,startIndex);
        if(index!=-1 && bank.length+1 -index > remaining){
            return {voltage:bank[index],index}
        }
    }
    throw Error("For some reason we never found a number....")
}
/**
 * 
 * @param {number[][]} input 
 * @returns 
 */
function part1(input){
    let voltages = []
    for(let bank of input){
        firstbank: for(let i = 9;i>0;i--){
            let first = bank.findIndex((v)=>v===i);
            if(first !== -1){
                for(let s =9;s>0;s--){
                    let second = bank.indexOf(s,first+1);
                    if(second !== -1){
                        voltages.push(parseInt(`${bank[first]}${bank[second]}`))
                        break firstbank
                    }
                }
            }
        }
    }
    return voltages.reduce((a,b)=>a+b,0)
}
/**
 * 
 * @param {number[][]} input 
 * @returns 
 */
function part2(input){
    let voltages = []
    let steps = 12
    for(let bank of input){
        let index = -1
        let numbers = []
        for(let toggles=steps;toggles>0;toggles--){
            let result = extractHighestFrom(bank,index+1,toggles);
            index=result.index
            numbers.push(result.voltage)
        }
        voltages.push(parseInt(numbers.join("")))
    }
    console.log(voltages)
    return voltages.reduce((a,b)=>a+b,0)
}
console.log("part1")
run(()=>part1(input))
console.log("part2")
run(()=>part2(input))
