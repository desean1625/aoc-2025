
function parseInput(text){
    let [ranges,items] = text.trim().split("\n\n")
    items = items.split("\n").map(v=>parseInt(v))
    ranges = ranges.split("\n").map(r=>r.split("-").map(v=>parseInt(v)))
    return [ranges,items]
}

/**
 * 
 * @param {[number[][],number[]]} input 
 * @returns 
 */
function part1([ranges,items]=input){
    let sum = 0
    for(let item of items){
        let fresh = ranges.reduce((a,range)=>a||isFresh(item,range),false)
        if(fresh){
            sum++
        }
    }
    return sum
}
/**
 * 
 * @param {number} item 
 * @param {[number,number]} range 
 * @returns 
 */
function isFresh(item,[min,max] = range){
    if(item >= min && item <=max){
        return true
    }
    return false
}
/**
 * 
 * @param {[number[][],number[]]} input 
 * @returns 
 */
function part2([ranges,items]=input){
    let overlapped = []
    ranges = ranges.sort((a,b)=>a[0]-b[0])
    for(let [min,max] of ranges){
        let doesOverlap = overlapped.findIndex(([low,high])=>{
            if(min>=low && min <=high){
                return true
            }
            return false
        })
        if(doesOverlap !== -1){
            let range = overlapped[doesOverlap]
            //expand the range
            overlapped[doesOverlap] = [Math.min(min,range[0]),Math.max(max,range[1])] 

        }else{
            overlapped.push([min,max])
        }
    }
    console.log(overlapped)
    sum = overlapped.reduce((a,[min,max])=>{
        return a+(max-min+1)
    },0)
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
