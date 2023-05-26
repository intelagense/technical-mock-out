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
        // picks at least 1 cs-theory question with a higher probability of lower numbers/"easier" questions
        let questionIndices = weightedSet(10 - randomQuestions.size, cstheoryQuestions.length)
        for (let index of questionIndices) {
            randomQuestions.add(cstheoryQuestions[index])
        }
    }
    // problems are now found, call the function display the list
    listQuestions([...randomQuestions])
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

/// /// /// /// blame devon and freedom
function weightedSet(desired, max, stdev = 50, mean = 0) {
    const result = new Set();

    while (result.size < desired) {
        const u = 1 - Math.random(); // Converting [0,1) to (0,1]
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        const num = Math.floor(z * stdev + mean);

        if (num < 0 || num > max) continue;
        result.add(Math.floor(z * stdev + mean));
    }

    return [...result];
}

function logWeightedSetFrequency(desired, max, X) {
    const frequency = {};

    for (let i = 0; i < X; i++) {
        const result = weightedSet(desired, max);
        result.forEach(num => {
            frequency[num] = frequency[num] ? frequency[num] + 1 : 1;
        });
    }

    const sorted = Object.keys(frequency).sort((a, b) => a - b);

    sorted.forEach(key => {
        console.log(`${key}: ${frequency[key]}`);
    });
}

// logWeightedSetFrequency(10, 100, 100);
/// /// /// ///

function listQuestions(randomQuestions) {
    // get reference to the ordered list element
    let olList = document.getElementById("olList");

    if (olList.hasChildNodes()) {
        clearList()
    }

    // loop through the data array and create list items
    for (let i = 0; i < randomQuestions.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = randomQuestions[i];
        olList.appendChild(listItem);
    }

    const listItems = document.querySelectorAll('#olList li');

    listItems.forEach((item, index) => {
        const number = document.createElement('span');
        number.classList.add('number');
        number.textContent = `${index + 1}. `;
        item.insertBefore(number, item.firstChild);
    });

    document.querySelector('#my-modal').checked = true;
}

function clearList() {
    var listElements = document.querySelectorAll("#olList li");
    let li;
    for (let i = 0; (li = listElements[i]); i++) {
        li.parentNode.removeChild(li);
    }
}