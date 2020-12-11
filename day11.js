/**
 --- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied? the correct answer is 2211
 */

 const fileParser = require('./file_parser')

 const seatThePassengers = () => {
  fileParser('day11').then(data => {
    const floorPlan = data.split('\n').map(row => row = row.split(''))
      let [copy, modified] = updateFloorPlan(floorPlan)
      while(modified) {
        [copy, modified] = updateFloorPlan(copy)
      }
    console.log(`there are ${countPassengers(copy)} occupied seats`)
  })
 }

 seatThePassengers()

 function numberOfNeighbors(row, column, floorPlan) {
  let topLeft = ''
  let top = ''
  let topRight = ''
  let left = ''
  let right = ''
  let bottomLeft = ''
  let bottom = ''
  let bottomRight = ''
  if (row - 1 >= 0) {
    if (column - 1 >= 0) {
      topLeft = floorPlan[row - 1][column - 1]
    }
    if (column + 1 < floorPlan[0].length) {
      topRight = floorPlan[row - 1][column + 1]
    }
    top = floorPlan[row - 1][column]
  }
  if (column - 1 >= 0) {
    left = floorPlan[row][column - 1]
  } 
  if (column + 1 < floorPlan[0].length) {
    right = floorPlan[row][column + 1]
  }
  if (row + 1 < floorPlan.length) {
    if (column - 1 >= 0) {
      bottomLeft = floorPlan[row + 1][column - 1]
    }
    if (column + 1 < floorPlan[0].length) {
      bottomRight = floorPlan[row + 1][column + 1]
    }
    bottom = floorPlan[row + 1][column]
  }
  neighbors = [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight]
  return neighbors.reduce((acc, currentVal) => {
    if (!currentVal) return acc
    const hasNeighbor = currentVal === '#'
    return hasNeighbor ? acc + 1 : acc
  } , 0)
 }

 let example = [
   ['#', '#', '#'], 
   ['#', '7', '4'], 
   ['#', '#', '#'],]

//  console.log(numberOfNeighbors(0,4, example))

function updateFloorPlan(floorPlan) {
  let copy = [];
  for(let row in floorPlan) {
    copy[row] = [...floorPlan[row]]
  }
 let modified = true;
   modified = false;
   for (let row in floorPlan) {
     for (let column in floorPlan[0]) {
         if (floorPlan[row][column] === 'L' && numberOfNeighbors(Number(row), Number(column), floorPlan) === 0) {
         copy[row][column] = '#';
         modified = true;
       } else if(floorPlan[row][column] === '#' && numberOfNeighbors(Number(row), Number(column), floorPlan) >= 4) {
         copy[row][column] = 'L';
         modified = true;
       } else {
         copy[row][column] = floorPlan[row][column]
       }
     }
 }
 return [copy, modified]
}
let example2 = [
  ['L', 'L', 'L'], 
  ['L', 'L', 'L'], 
  ['L', 'L', 'L'],]

// console.log(example2, updateFloorPlan(example2))

function countPassengers(floorPlan) {
  let count = 0;
  for (let row of floorPlan) {
    for (let seat of row) {
      if (seat === '#') count++
    }
  }
  return count;
}

// console.log(countPassengers(example2), countPassengers(example))