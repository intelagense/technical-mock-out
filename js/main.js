fetch('js/questions.json')
    .then(response => response.json())
    .then(data => {
        const behavioralQuestions = data.behavioral;
        const technicalQuestions = data.technical;

        // console.log(behavioralQuestions);
        // console.log(programmingQuestions);
    });


