//validating functions
function validateIsNumber(age, height, weight, argv) {
    if(isNaN(age) || isNaN(height) || isNaN(weight)) {
        console.log(
            `Make sure your age, height and weight is inputted as a number!
            Your current input:
            Age: ${argv[3]}
            Height: ${argv[5]}
            Weight: ${argv[6]}`);
        process.exit();
    }
}

function validateAge(age){
    if(age < 20){
        console.log(`you're too young, please wait ${20 - age} more years to use the tool`
        )
        process.exit();
    }
}

function validateWeight(weight){
    if(weight < 30 || weight > 300){
        console.log(`Please seek professional help!`)
        process.exit();
    }
}

function validateGender(gender){
    if(gender !== "male" && gender !== "female"){
        console.log(`Please fill in your gender daily: male or female!`, gender)
        process.exit();
    }
}

function validateExcersize(excersize){
    if(excersize !== "yes" && excersize !== "no"){
        console.log(`Please fill in if you excersize daily with yes or no!`, excersize)
        process.exit();
    }
}

//processing functions
function bmiCalc(weight, height) {
    var bmi = Math.round((weight / (height * height)) * 10) / 10;
    return bmi;
}

function upperLimit(height) {
    var aimHigh = Math.round(25 * (height * height));
    return aimHigh
}

function lowerLimit(height) {
    var aimLow = Math.round(18.5 * (height * height));
    return aimLow
}

function bmrCalc(weight, height, age, excersize, male) {
    if(excersize === true && male === true){
        var bmr = 1.6 * (Math.round((10 * weight) + (6.25 * (height * 100)) - (5 * age)) + 50);
        return bmr
    }
    else if(excersize === true && male === false){
        var bmr = 1.6 * (Math.round((10 * weight) + (6.25 * (height * 100)) - (5 * age)) - 150);
        return bmr
    }
    else if(excersize === false && male === true){
        var bmr = 1.4 * (Math.round((10 * weight) + (6.25 * (height * 100)) - (5 * age)) + 50);
        return bmr
    }
    else {
        var bmr = 1.4 * (Math.round((10 * weight) + (6.25 * (height * 100)) - (5 * age)) - 150);
        return bmr
    }
}

function ifExcersize(excersize){
    if(excersize === true){
        return ""
    }
    if(excersize === false){
        return `
    * If you would excersize daily you could eat more!
`;}
}

function calIntake(bodyMassIndex, BasicMetabolicRate) {
    if (bodyMassIndex > 25) {
        return BasicMetabolicRate - 500;
    }
    else if (bodyMassIndex < 18.5) {
        return BasicMetabolicRate + 500;
    }
    else {
        return "the same";
    }
}

function calDuration(bodyMassIndex, weight, upperLimit, lowerLimit) {
    if (bodyMassIndex > 25) {
        return Math.round((weight - upperLimit) / 0.5);
    }
    else if (bodyMassIndex < 18.5) {
        return Math.round((lowerLimit - weight) / 0.5);
    }
    else {
        return "coming"
    }
}

function finalAdvise(bodyMassIndex){
    if (bodyMassIndex > 25) {
        return "Why don't you go for a run?";
    }
    else if (bodyMassIndex < 18.5) {
        return "You should eat a snickers sometimes!"
    }
    else {
        return "Keep it steady"
    }
}

function formatOutput(userObject){
    return `
    **************
    BMI calculator
    **************
    
    * Name: ${userObject.name}
    * Age: ${userObject.age} y/o
    * Gender: ${userObject.gender}
    * Excercise daily: ${userObject.doesExcersize}
    * Height: ${userObject.height}m
    * Weight: ${userObject.weight}kg
    
    ***************
        results
    ***************
    
    * Your bmi is: ${userObject.bmi}
    * Your bmr is: ${userObject.bmr}
    
    ***************
        advise
    ***************
    
    * Ideal weight is between: ${userObject.lowerlimit}kg and ${userObject.upperlimit}kg
    
    * To get healthy your intake should be ${userObject.dailyIntake} 
      for ${userObject.duration} weeks.
        ${userObject.bmradvise}
    * Our advise is: ${userObject.finalComment}
    `
}

function bmiCalculator(){
// get variables from user
// var readline = require("readline-sync");

// var name = readline.question('May I have your name? ');
// var isAge = readline.question('May I have your age? ');
// var isMale = readline.question('What is your gender? ') === "male" ? true : false;
// var doesExcersize = readline.question('Do you excercize daily, yes or no? ') === "yes" ? true : false;
// var heightInM = readline.question('What is your height? ');
// var weightInKg = readline.question('What is your weight? ');

// gets variables via process.argv
const name = process.argv[2];
const isAge = Number(process.argv[3]);
const doesExcersize = process.argv[4] === "yes" ? true : false;
const heightInM = parseFloat(process.argv[5]);
const weightInKg = Number(process.argv[6]);
const isMale = process.argv[7] === "male" ? true : false;

console.log(weightInKg);

//Validation of numeric input
validateIsNumber(isAge, heightInM, weightInKg, process.argv);
validateAge(isAge);
validateWeight(weightInKg);
validateExcersize(process.argv[4]);
validateGender(process.argv[7]);

//Process input to calculate 
const bmi = bmiCalc(weightInKg, heightInM);
const aimHigh = upperLimit(heightInM);
const aimLow = lowerLimit(heightInM);
const bmr = bmrCalc(weightInKg, heightInM, isAge, doesExcersize, isMale)
const bmrAdvise = ifExcersize(doesExcersize);
const dailyIntake = calIntake(bmi, bmr);
const duration = calDuration(bmi, weightInKg, aimHigh, aimLow);
const finalComment = finalAdvise(bmi);

const userData = {
    name: name,
    age: isAge,
    doesExcersize: process.argv[4],
    height: heightInM,
    weight: weightInKg,
    gender: process.argv[7],
    bmi: bmi,
    upperlimit: aimHigh,
    lowerlimit: aimLow,
    bmr: bmr,
    bmradvise: bmrAdvise,
    dailyIntake: dailyIntake,
    duration: duration,
    finalComment: finalComment,
}

//creates the final report
const output = formatOutput(userData);
console.log(output);
}

bmiCalculator();
