document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const homePage = document.getElementById("home-page");
    const quizPage = document.getElementById("quiz-page");
    const resultPage = document.getElementById("result-page");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const quizButtons = document.querySelectorAll(".quiz-btn");
    const quizTitle = document.getElementById("quiz-title");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const resultText = document.getElementById("result-text");
    const homeButton = document.getElementById("home-btn");
    let currentQuiz = null;
 let currentQuestionIndex = 0;
 let score = 0;
 const quizzes = {
 java: [
 { question: "What is Java?", options: ["Programming Language", "IDE", "Platform", 
"Browser"], answer: 0 },
 { question: "Which company developed Java?", options: ["Sun Microsystems", 
"Google", "Microsoft", "Apple"], answer: 0 },
 { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java},Verification Model", "Java Version Manager", "Java Visual Machine"], answer: 0 },
 { question: "Which keyword is used to inherit a class in Java?", options: ["extend", 
"extends", "inherit", "inherits"], answer: 1 },
 { question: "Which method is the entry point for Java programs?", options: ["main()", 
"start()", "run()", "begin()"], answer: 0 },
 { question: "What is a correct syntax to print in Java?", options: ["System.out.println()", 
"printf()", "console.log()", "echo()"], answer: 0 },
 { question: "Which is a valid data type in Java?", options: ["int", "number", "boolean", 
"var"], answer: 0 },
 { question: "How do you create an object in Java?", options: ["new ClassName()", 
"ClassName.new()", "object ClassName()", "new(object)"], answer: 0 },
 { question: "Which loop is a valid loop in Java?", options: ["for", "foreach", "loop", 
"while"], answer: 0 },
 { question: "Which operator is used to compare two values?", options: ["==", "=", 
"equals", "==="], answer: 0 }
 ],
 python: [
 { question: "What is Python?", options: ["Programming Language", "Snake", "Game", 
"IDE"], answer: 0 },
 { question: "Who developed Python?", options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Linus Torvalds"], answer: 0 },
 { question: "What is the correct file extension for Python files?", options: [".py", 
".java", ".cpp", ".html"], answer: 0 },
{ question: "How do you create a function in Python?", options: ["def functionName():", "function functionName(){}", "func functionName()", "createfunctionName()"], answer: 0 },
     { question: "How do you print in Python?", options: ["print()", "console.log()", 
    "printf()", "System.out.println()"], answer: 0 },
     { question: "What is the output of '2 ** 3' in Python?", options: ["8", "6", "9", "3"], 
    answer: 0 },
     { question: "Which data type is immutable?", options: ["tuple", "list", "dict", "set"], 
    answer: 0 },
     { question: "Which keyword is used for loops in Python?", options: ["for", "loop", 
    "foreach", "do"], answer: 0 },
     { question: "How do you import a module in Python?", options: ["import moduleName", "include moduleName", "require moduleName", "use moduleName"], answer: 
    0 },
     { question: "What is the default value of variables declared in Python?", options: 
    ["None", "0", "undefined", "null"], answer: 0 }
     ],
     c: [
     { question: "What is C?", options: ["Programming Language", "IDE", "Tool", 
    "Framework"], answer: 0 },
     { question: "Who developed C?", options: ["Dennis Ritchie", "James Gosling", "Guido  an Rossum", "Bjarne Stroustrup"], answer: 0 },
     { question: "What is the correct syntax to declare a variable in C?", options: ["int x;", 
    "var x;", "let x;", "declare int x;"], answer: 0 },
     { question: "Which operator is used to assign a value?", options: ["=", "==", "=>", "::"], 
    answer: 0 },
     { question: "What does 'printf()' do?", options: ["Prints text to console", "Reads input", 
    "Declares variables", "Compiles the code"], answer: 0 },
    { question: "What is the correct way to include a library in C?", options: ["#include <library>", "import library", "include library:", "require library:"], answer: 0 },
     { question: "How do you start a comment in C?", options: ["//", "/*", "<!--", "#"], 
    answer: 0 },
     { question: "Which loop is used in C?", options: ["for", "foreach", "loop", "while"], 
    answer: 0 },
     { question: "What is the return type of the 'main()' function?", options: ["int", "void", 
    "float", "string"], answer: 0 },
    { question: "How do you declare a constant in C?", options: ["const", "final", "let", 
"constant"], answer: 0 }
 ],
 html: [
 { question: "What is HTML?", options: ["Markup Language", "Programming ,Language", "Framework", "Database"], answer: 0 },
 { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", 
"High Text Markup Language", "Hyperlink Markup Language", "Hyper Tool Markup Language"], answer: 0 },
 { question: "What tag is used to create a hyperlink?", options: ["<a>", "<link>", 
"<href>", "<url>"], answer: 0 },
 { question: "What tag is used for headings?", options: ["<h1> to <h6>", "<head>", 
"<title>", "<header>"], answer: 0 },
 { question: "What tag is used to create a paragraph?", options: ["<p>", "<para>", 
"<par>", "<paragraph>"], answer: 0 },
 { question: "What tag is used for an image?", options: ["<img>", "<image>", "<pic>", 
"<src>"], answer: 0 },
 { question: "What attribute is used for image source?", options: ["src", "alt", "href", 
"img"], answer: 0 },
 { question: "What is the correct syntax for adding CSS to HTML?", options: ["<style>", 
"<css>", "<link>", "<head>"], answer: 0 },
 { question: "What is the root element of an HTML document?", options: ["<html>", 
"<head>", "<body>", "<root>"], answer: 0 },
 { question: "What tag is used to create a list?", options: ["<ul> or <ol>", "<list>", "<li>", 
"<menu>"], answer: 0 }
 ]
 };
 // Handle Login
 loginForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const username = document.getElementById("username").value;
 const password = document.getElementById("password").value;
 if (username === "user" && password === "1234") {
    loginPage.classList.add("hidden");
 homePage.classList.remove("hidden");
 } else {
 loginError.textContent = "Invalid username or password!";
 }
 });
 // Quiz Selection
 quizButtons.forEach((button) => {
 button.addEventListener("click", () => {
 const quizType = button.getAttribute("data-quiz");
 currentQuiz = quizzes[quizType];
 currentQuestionIndex = 0;
 score = 0;
 homePage.classList.add("hidden");
 quizPage.classList.remove("hidden");
 loadQuestion();
 });
 });
 // Load Questions
 function loadQuestion() {
 const questionData = currentQuiz[currentQuestionIndex];
quizTitle.textContent = `Question ${currentQuestionIndex + 1}`;
 questionEl.textContent = questionData.question;
 optionsEl.innerHTML = "";
 questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
 button.className = "option-btn";
 button.addEventListener("click", () => checkAnswer(index));
 optionsEl.appendChild(button);
 });
 nextButton.classList.add("hidden");
 }
 // Check Answer
 function checkAnswer(selectedIndex) {
 const questionData = currentQuiz[currentQuestionIndex];
 if (selectedIndex === questionData.answer) {
 score++;
 }
 nextButton.classList.remove("hidden");
 }
 // Next Button
 nextButton.addEventListener("click", () => {
 currentQuestionIndex++;
 if (currentQuestionIndex < currentQuiz.length) {
 loadQuestion();
 } else {
 quizPage.classList.add("hidden");
 resultPage.classList.remove("hidden");
resultText.textContent = `You scored ${score} out of ${currentQuiz.length}!`;
 }
 });
// Return to Home
 homeButton.addEventListener("click", () => {
 resultPage.classList.add("hidden");
 homePage.classList.remove("hidden");
 });
});
