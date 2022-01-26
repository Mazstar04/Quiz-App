const questions = [
    {
        q: "Who is Mazeedah?",
        a: ["Star  Girl", "Boss Lady", "Mazstar", "All of the above"],
        c: 3,
        p: -1,
    },
    {
        q: "Who is Toyyib?",
        a: ["Error", "Object not set to an instance", "Null reference", "All of the above"],
        c: 3,
        p: -1,
    },
    {
        q: "What is CLH?",
        a: ["Code Learners Hub", "Boss Lady", "Mazstar", "All of the above"],
        c: 0,
        p: -1,
    },
    {
        q: "What is Pollination?",
        a: ["Igbe", "Reproduction btw Plants", "Shit", "None of the above"],
        c: 1,
        p: -1,
    },
    {
        q: "Who is Popsicle?",
        a: ["Sweet Girl", "Idiot", "Candy", "Fool"],
        c: 0,
        p: -1,
    },
    
];
const usernameInput = document.querySelector('#input');
const player = document.querySelector('#player');
player.textContent = localStorage.getItem('username') ?? "anonymous";
const question = document.querySelector('#question');
const options = document.querySelectorAll('.option');
const opt1 = document.querySelector('#option1');
const opt2 = document.querySelector('#option2');
const opt3 = document.querySelector('#option3');
const opt4 = document.querySelector('#option4');
const prev = document.querySelector('#prev-btn');
const next = document.querySelector('#next-btn'); 
const btn = document.querySelector('.btn');
const pages = document.querySelector('.pages');
const submit = document.querySelector('#submit-btn');
let questionNumber = 0;

const insertPage = () => {
    questions.forEach((q, index) => {
        const page = document.createElement('div');
        page.classList.add('page');
        page.id = index;
        page.textContent = index + 1;
        pages.appendChild(page);
    });
}

insertPage();
const page = document.querySelectorAll('.page');

const setQuestions = () => {

    questions.forEach((q, index) => {

        if (index === questionNumber) {
            question.textContent = q.q;
            opt1.textContent = q.a[0];
            opt2.textContent = q.a[1];
            opt3.textContent = q.a[2];
            opt4.textContent = q.a[3];

            options.forEach(o => {
                if (q.p === o.dataset['opt']) {
                    o.classList.add('active');
                }
                else {
                    o.classList.remove('active');
                }
            })

            page.forEach(p => {

                if (parseInt(p.id) === questionNumber) {
                    p.classList.add('active');
                }
                else {
                    p.classList.remove('active');
                }

                if (questions[p.id].p != -1) {
                    p.classList.add('answered');
                }

            })

            if (questionNumber === 0) {
                btn.removeChild(prev);
            }
            else {
                btn.removeChild(pages);
                btn.appendChild(prev);
                btn.appendChild(pages);
            }

            if (questionNumber === (questions.length - 1)) {
                btn.removeChild(next);
            }
            else {

                btn.appendChild(next);
            }
        }


    });
}
setQuestions();

const nextQuestion = () => {
    if (questionNumber < (questions.length - 1)) {
        questionNumber += 1;
    }
    setQuestions();
};

const prevQuestion = () => {
    if (questionNumber > 0) {
        questionNumber -= 1;
    }
    setQuestions();
}

const goToPage = (e) => {

    page.forEach(p => {
        if (p.classList.contains('active')) {
            p.classList.remove('active');
        }
    })
    e.target.classList.add('active');
    questionNumber = parseInt(e.target.id);
    setQuestions();
}

const pickAnswer = (e) => {
    questions[questionNumber].p = e.target.dataset['opt'];
    setQuestions();

}

const calculateEstimate = () => {
    let totalQuestions = questions.length;
    let unansweredQuestions = 0;
    let correct = 0;
    questions.forEach(q => {
        if (q.p === -1) {
            unansweredQuestions += 1;
        }
        else if (q.p == q.c) {
            correct += 1;
        }
        console.log(q.p, q.c)
    });

    let percentage = (correct / totalQuestions) * 100;
    let confirmation;
    if (unansweredQuestions > 0) {
        confirmation = window.confirm(`Are you sure you want to submit? you have ${unansweredQuestions} questions unanswered`);
        if (confirmation === true) {
            location.pathname = "/end.html";
        }
    }
    else {
        confirmation = window.confirm(`Are you sure you want to submit?`);
        if (confirmation === true) {
            location.pathname = "/end.html";
        }
    }
    localStorage.setItem('score', percentage);
}

next.addEventListener('click', nextQuestion);
prev.addEventListener('click', prevQuestion);
page.forEach(p => p.addEventListener('click', goToPage));
options.forEach(c => c.addEventListener('click', pickAnswer));
submit.addEventListener('click', calculateEstimate);
