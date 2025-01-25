
// Exercise Program to reverse the string

// function reverseString (str){
//       return str.split("").reverse().join("");
// }

// console.log(reverseString("Perfume"))

// .............................................

// Exercise Program to find Largest Number in a Array

// function findLargestNumber(arr){
//         return Math.max(...arr);
// }
// console.log(findLargestNumber([33,44,22,55,33,66,77])) 

// ..............................................

// // fizzBuzz Program Exercise

// function fizzBuzz(){
//   for(i=1; i <= 100; i++){
//       if(i % 3 === 0 && i % 5 === 0 ){
//         console.log("fizzBuzz");
//       }
//       else if (i % 3 === 0){
//         console.log("fizz");
//       }
//       else if (i % 5 === 0){
//         console.log("buzz");
//       }
//       else{
//         console.log(i);
//       }
//   }
// }

// fizzBuzz();

//...............................................

// Exercise Program to do sum of an Array ...................

// function sumArray(arr){
//     return arr.reduce((sum, num) => sum + num,0)
// }
// console.log(sumArray([2,3,4,5,6]));

// ...........................................................

// const number = parseInt(prompt('Enter the number of terms: '));
// let n1 = 0, n2 = 1, nextTerm;

// console.log('Fibonacci Series:');

// for (let i = 1; i <= number; i++) {
//     console.log(n1);
//     nextTerm = n1 + n2;
//     n1 = n2;
//     n2 = nextTerm;
// }

// ........ Program to Check is string Palindrome ....................

// function isPalindrome(str){
//         const reversed = str.split("").reverse().join("");
//         return str === reversed;
// }

// console.log(isPalindrome("noon"));
// console.log(isPalindrome("Paralyzed"));
// console.log(isPalindrome("racecar"));

// ......... Fictorial Program Exercise ..............................

function fictorial(num){
    if(num === 0 || num === 1){
        return 1;
    }
    return num * fictorial(num -1);
}

console.log(fictorial(3))
