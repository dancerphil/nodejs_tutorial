// min/max number in an array
var numbers = [5, 6, 2, 3, 7];

// using Math.min/Math.max apply
// This about equal to Math.max(numbers[0], ...)
// or Math.max(5, 6, ...)
var max = Math.max.apply(null, numbers); 
var min = Math.min.apply(null, numbers);
console.log(max,min)

var max = Math.max(numbers[0],numbers[1],numbers[2],numbers[3],numbers[4]); 
var min = Math.min(numbers[0],numbers[1],numbers[2],numbers[3],numbers[4]);
console.log(max,min)


// vs. simple loop based algorithm
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}
console.log(max,min)