// function squere(number){
//     return number*number;
// }

// let squere = function(number){
//     return number*number;
// }

// let squere = (number) => {
//     return number*number;
// }

let squere = (number) => number*number;
// let squere = number => number*number;
console.log(squere(5));

// function add(a,b){
//     return a+b;
// }

// let add = function(a,b){
//     return a+b;
// }

// let add = (a,b) => {
//     return a+b;
// }

let add = (a,b) => a+b;
console.log(add(7,6));

let isDrinkAge = (age) => {
    let age2=14;
    if(age2>=21){
        return "You are allowed to drink leggally in the USA";
    }
    else {
        return " you are two young to drink";
    }
}