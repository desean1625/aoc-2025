
function parseInput(text){
    t = text.trim().split("\n")
    let operators = t.splice(t.length-1,1)[0]
    let columns = []
    for(let line of t){
      line.matchAll(/(\d+)/g).forEach((value,index)=>{
            if(!columns[index]){
                columns[index] = []
            }
            columns[index].push(parseInt(value,10))
            }
        )
    }
    return {columns,operators:operators.split(/\s+/)}
}
function parseInput2(text){
    t = text.split("\n")
    let operatorsLine = t.splice(t.length-2,2)[0]
    let operators = [...operatorsLine.matchAll(/([+*])/g)]
    let columns = []
    operators.forEach((op,index)=>{
        let col = []
        let start = op.index
        let next = operators[index+1]
        let stop = next?next.index-1:operatorsLine.length
        for(let line of t){
            col.push(line.slice(start,stop))
        }
       columns.push(col)
    })
    return {columns,operators:operators.map(v=>v[0])}
}
/**
 * @param {string[]} col
 */
rightToLeft = (col)=>{
    let numbers = Array(col.length).fill("")
    let sorted = [...col].sort((a,b) => b.length-a.length)
    let startSize = sorted[0].length-1;
        col.forEach((value,index)=>{
           for(let size = startSize;size>=0;size--){
            let char = value.charAt(size)||""
            numbers[startSize-size]+=char
           }
        })

    return numbers.filter(v=>v !== "").map(v=>parseInt(v.trim(),10))
}
/**
 * 
 * @param {*} input 
 * @returns 
 */
function part1({columns,operators}){
  let sum = 0
    for(let index in columns){
       let col = columns[index].map(v=>parseInt(v))
       let op = operators[index]
       let result = col.slice(1).reduce((a,b)=>op =="+"?a+b:a*b,col[0])
       sum+=result
    }
    return sum
}
/**
 * 
 * @param {} input 
 * @returns 
 */
function part2({columns,operators}=input){
  let sum = 0
  operators
    for(let index in columns){
       let col = columns[index]
       let op = operators[index]
       col = rightToLeft(col)
       let result = col.slice(1).reduce((a,b)=>op =="+"?a+b:a*b,col[0])
       sum+=result
       if(isNaN(sum)){
        debugger
       }
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
run(()=>part2(parseInput2(rawInput)))
