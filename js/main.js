import questions from "./questions.js";


const form = document.getElementById("questionTypes");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedCategories = [];
    for (const pair of formData.entries()) {
        if (pair[1] === "on") {
            selectedCategories.push(pair[0]);
        }
    }
    const behavioralQuestions = [];
    const cstheoryQuestions = [];
    const remainingQuestions = [];
    for (const category of selectedCategories) {
        if (category === "behavioral") {
            behavioralQuestions.push(...questions[category])
        } else if (category === "cs-theory") {
            cstheoryQuestions.push(...questions[category])
        } else {
            remainingQuestions.push(...questions[category]);
        }
    }
    questionPicker(behavioralQuestions, cstheoryQuestions, remainingQuestions)

});

function questionPicker(behavioralQuestions, cstheoryQuestions, remainingQuestions, totalNumberOfQuestions = 10) {
    let randomQuestions = new Set;
    if (behavioralQuestions.length > 0) {
        // pick 2-3 behavorial questions

        let quantity = (Math.floor(Math.random() * 2) + 1) + 1
        // edge cases for too few questions selected to reach total number of 10
        if (quantity + remainingQuestions.length + cstheoryQuestions.length < 10) { quantity = 10 - remainingQuestions.length - cstheoryQuestions.length }
        console.log(quantity)
        let questionIndices = numberSet(quantity, behavioralQuestions.length)
        for (let index of questionIndices) {
            randomQuestions.add(behavioralQuestions[index])
        }
    }
    totalNumberOfQuestions = totalNumberOfQuestions - randomQuestions.size - (cstheoryQuestions.length > 0 ? 1 : 0)
    let questionIndices = numberSet(totalNumberOfQuestions, remainingQuestions.length)
    for (let index of questionIndices) {
        randomQuestions.add(remainingQuestions[index])
    }
    if (cstheoryQuestions.length > 0) {
        // pick 1 cs-theory question with a higher probability of lower numbers/"easier" questions
        randomQuestions.add(cstheoryQuestions[weightedRandom(1, cstheoryQuestions.length)])
    }
    listQuestions(randomQuestions)
}

function numberSet(desired = 0, max = 0) {
    // condition makes sure while loop isn't sticky
    if (max < desired) { desired = max }
    const set = new Set;
    while (set.size < desired) {
        set.add(Math.floor(Math.random() * max))
    }
    return [...set]
}

function weightedRandom(min, max) {
    return Math.round(max / (Math.random() * max + min));
}

function listQuestions(randomQuestions) {
    for (let each of randomQuestions) {
        console.log(each)
    }
}
