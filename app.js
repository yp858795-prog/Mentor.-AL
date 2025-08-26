// Application state and data
let appState = {
    selectedExamType: null,
    currentExamQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    examDuration: 30 * 60 * 1000, // default 30 mins in ms
    examTimer: null,
    examStartTime: null,
    performanceData: null
};

// Complete database of exam questions (sample)
const examDatabase = {
    "IIT_JEE": {
        "physics": [
            {
                "id": "IIT_P001",
                "question": "A particle moves in a circle of radius R with constant angular velocity ω. The magnitude of average acceleration over a quarter circle is:",
                "options": ["ω²R√2/π", "2ω²R/π", "ω²R/π", "ω²R√2/(π√2)"],
                "correct_answer": 0,
                "difficulty": "medium",
                "topic": "Circular Motion",
                "solution": "For motion in quarter circle, change in velocity = ω²R√2, time = π/(2ω), so average acceleration = 2ω²R√2/π",
                "answer_rate": 0.4,
                "average_time": 120,
                "year": "2023"
            },
            {
                "id": "IIT_P002",
                "question": "The coefficient of linear expansion of brass is 2 × 10⁻⁵ /°C. If the length of a brass rod at 0°C is 1m, what will be its length at 100°C?",
                "options": ["1.002 m", "1.02 m", "1.2 m", "2 m"],
                "correct_answer": 0,
                "difficulty": "easy",
                "topic": "Thermal Physics",
                "solution": "ΔL = L₀αΔT = 1 × 2×10⁻⁵ × 100 = 0.002m, so final length = 1.002m",
                "answer_rate": 0.8,
                "average_time": 90,
                "year": "2022"
            },
            {
                "id": "IIT_P003",
                "question": "A charged particle enters a uniform magnetic field perpendicular to its velocity. If the particle follows a helical path, what can be inferred about the initial velocity?",
                "options": ["Velocity was purely perpendicular to B", "Velocity had components parallel and perpendicular to B", "Velocity was purely parallel to B", "Cannot be determined"],
                "correct_answer": 1,
                "difficulty": "hard",
                "topic": "Electromagnetic Fields",
                "solution": "For helical motion, velocity must have both parallel and perpendicular components to magnetic field",
                "answer_rate": 0.25,
                "average_time": 180,
                "year": "2023"
            }
        ],
        "chemistry": [
            {
                "id": "IIT_C001",
                "question": "Which of the following has the highest bond dissociation energy?",
                "options": ["C-C", "N≡N", "O=O", "F-F"],
                "correct_answer": 1,
                "difficulty": "medium",
                "topic": "Chemical Bonding",
                "solution": "N≡N triple bond has highest bond dissociation energy among given options",
                "answer_rate": 0.45,
                "average_time": 110,
                "year": "2022"
            },
            {
                "id": "IIT_C002",
                "question": "Calculate the pH of 0.1 M solution of a weak acid with Ka = 1 × 10⁻⁵",
                "options": ["2", "3", "5", "7"],
                "correct_answer": 1,
                "difficulty": "hard",
                "topic": "Acid-Base Equilibrium",
                "solution": "For weak acid: pH = ½(pKa - log C) = ½(5 - log(0.1)) = ½(5 + 1) = 3",
                "answer_rate": 0.3,
                "average_time": 200,
                "year": "2023"
            },
            {
                "id": "IIT_C003",
                "question": "What is the molecular formula of benzene?",
                "options": ["C₆H₆", "C₆H₁₂", "C₆H₁₄", "C₆H₁₀"],
                "correct_answer": 0,
                "difficulty": "easy",
                "topic": "Organic Chemistry",
                "solution": "Benzene has 6 carbon atoms and 6 hydrogen atoms, formula C₆H₆",
                "answer_rate": 0.85,
                "average_time": 45,
                "year": "2021"
            }
        ],
        "mathematics": [
            {
                "id": "IIT_M001",
                "question": "If f(x) = x³ - 3x² + 2x - 1, find f'(1)",
                "options": ["-2", "-1", "0", "1"],
                "correct_answer": 0,
                "difficulty": "medium",
                "topic": "Differential Calculus",
                "solution": "f'(x) = 3x² - 6x + 2, so f'(1) = 3(1)² - 6(1) + 2 = 3 - 6 + 2 = -1",
                "answer_rate": 0.55,
                "average_time": 120,
                "year": "2023"
            },
            {
                "id": "IIT_M002",
                "question": "Find the number of ways to arrange the letters of MATHEMATICS",
                "options": ["11!/2!×2!", "11!/2!", "10!/2!×2!", "11!"],
                "correct_answer": 0,
                "difficulty": "hard",
                "topic": "Permutations and Combinations",
                "solution": "MATHEMATICS has 11 letters with M repeated 2 times and A repeated 2 times. Arrangements = 11!/(2!×2!)",
                "answer_rate": 0.35,
                "average_time": 160,
                "year": "2022"
            },
            {
                "id": "IIT_M003",
                "question": "What is the derivative of eˣ?",
                "options": ["eˣ", "x·eˣ⁻¹", "eˣ·ln(x)", "1/eˣ"],
                "correct_answer": 0,
                "difficulty": "easy",
                "topic": "Differential Calculus",
                "solution": "The derivative of eˣ is eˣ itself",
                "answer_rate": 0.8,
                "average_time": 60,
                "year": "2021"
            }
        ]
    },
    "NEET": {
        "physics": [
            {
                "id": "NEET_P001",
                "question": "A ball is thrown vertically upward with initial velocity 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
                "options": ["10 m", "20 m", "30 m", "40 m"],
                "correct_answer": 1,
                "difficulty": "medium",
                "topic": "Kinematics",
                "solution": "Using v² = u² - 2gh, at max height v=0, so h = u²/2g = 400/20 = 20m",
                "answer_rate": 0.6,
                "average_time": 100,
                "year": "2023"
            },
            {
                "id": "NEET_P002",
                "question": "What is the SI unit of electric current?",
                "options": ["Volt", "Ampere", "Coulomb", "Watt"],
                "correct_answer": 1,
                "difficulty": "easy",
                "topic": "Current Electricity",
                "solution": "The SI unit of electric current is Ampere (A)",
                "answer_rate": 0.9,
                "average_time": 45,
                "year": "2021"
            },
            {
                "id": "NEET_P003",
                "question": "In which type of radioactive decay does the mass number remain unchanged?",
                "options": ["Alpha decay", "Beta decay", "Gamma decay", "Both beta and gamma"],
                "correct_answer": 3,
                "difficulty": "hard",
                "topic": "Nuclear Physics",
                "solution": "In both beta and gamma decay, mass number remains unchanged as no nucleons are emitted",
                "answer_rate": 0.35,
                "average_time": 140,
                "year": "2023"
            }
        ],
        "chemistry": [
            {
                "id": "NEET_C001",
                "question": "Which of the following is an example of a Lewis acid?",
                "options": ["NH₃", "H₂O", "BF₃", "OH⁻"],
                "correct_answer": 2,
                "difficulty": "medium",
                "topic": "Acids and Bases",
                "solution": "BF₃ can accept electron pairs, making it a Lewis acid",
                "answer_rate": 0.5,
                "average_time": 90,
                "year": "2022"
            },
            {
                "id": "NEET_C002",
                "question": "What is the oxidation state of Cr in K₂Cr₂O₇?",
                "options": ["+3", "+4", "+5", "+6"],
                "correct_answer": 3,
                "difficulty": "easy",
                "topic": "Redox Reactions",
                "solution": "K₂Cr₂O₇: 2(+1) + 2x + 7(-2) = 0, solving gives x = +6",
                "answer_rate": 0.75,
                "average_time": 80,
                "year": "2023"
            },
            {
                "id": "NEET_C003",
                "question": "Which biomolecule contains both amino and carboxyl functional groups?",
                "options": ["Carbohydrates", "Lipids", "Proteins", "Nucleic acids"],
                "correct_answer": 2,
                "difficulty": "hard",
                "topic": "Biomolecules",
                "solution": "Amino acids (building blocks of proteins) contain both amino (-NH₂) and carboxyl (-COOH) groups",
                "answer_rate": 0.4,
                "average_time": 130,
                "year": "2022"
            }
        ],
        "biology": [
            {
                "id": "NEET_B001",
                "question": "Which organelle is known as the powerhouse of the cell?",
                "options": ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
                "correct_answer": 1,
                "difficulty": "easy",
                "topic": "Cell Biology",
                "solution": "Mitochondria produces ATP through cellular respiration, hence called powerhouse",
                "answer_rate": 0.95,
                "average_time": 30,
                "year": "2021"
            },
            {
                "id": "NEET_B002",
                "question": "During photosynthesis, oxygen is released from:",
                "options": ["CO₂", "H₂O", "Glucose", "Chlorophyll"],
                "correct_answer": 1,
                "difficulty": "medium",
                "topic": "Plant Physiology",
                "solution": "During light reaction, water molecules are split releasing oxygen",
                "answer_rate": 0.65,
                "average_time": 95,
                "year": "2023"
            },
            {
                "id": "NEET_B003",
                "question": "Which hormone regulates the circadian rhythm in humans?",
                "options": ["Insulin", "Melatonin", "Adrenaline", "Thyroxine"],
                "correct_answer": 1,
                "difficulty": "hard",
                "topic": "Human Physiology",
                "solution": "Melatonin, produced by pineal gland, regulates sleep-wake cycle",
                "answer_rate": 0.3,
                "average_time": 150,
                "year": "2022"
            }
        ]
    },
    "UPSC": {
        "history": [
            {
                "id": "UPSC_H001",
                "question": "The Quit India Movement was launched in which year?",
                "options": ["1940", "1942", "1944", "1946"],
                "correct_answer": 1,
                "difficulty": "easy",
                "topic": "Freedom Struggle",
                "solution": "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942",
                "answer_rate": 0.8,
                "average_time": 60,
                "year": "2023"
            },
            {
                "id": "UPSC_H002",
                "question": "Who among the following was the first Governor-General of independent India?",
                "options": ["Lord Wavell", "Lord Mountbatten", "C. Rajagopalachari", "Lord Irwin"],
                "correct_answer": 1,
                "difficulty": "medium",
                "topic": "Modern India",
                "solution": "Lord Mountbatten was the first Governor-General of independent India from 1947-1948",
                "answer_rate": 0.55,
                "average_time": 90,
                "year": "2022"
            },
            {
                "id": "UPSC_H003",
                "question": "The concept of 'Drain of Wealth' was propounded by:",
                "options": ["Bal Gangadhar Tilak", "Dadabhai Naoroji", "Gopal Krishna Gokhale", "Lala Lajpat Rai"],
                "correct_answer": 1,
                "difficulty": "hard",
                "topic": "Economic History",
                "solution": "Dadabhai Naoroji propounded the drain theory in his book 'Poverty and Un-British Rule in India'",
                "answer_rate": 0.4,
                "average_time": 120,
                "year": "2023"
            }
        ],
        "geography": [
            {
                "id": "UPSC_G001",
                "question": "Which is the largest state in India by area?",
                "options": ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra"],
                "correct_answer": 2,
                "difficulty": "easy",
                "topic": "Physical Geography",
                "solution": "Rajasthan is the largest state in India by area (342,239 sq km)",
                "answer_rate": 0.85,
                "average_time": 45,
                "year": "2021"
            },
            {
                "id": "UPSC_G002",
                "question": "The Western Ghats are also known as:",
                "options": ["Sahyadri", "Nilgiri", "Aravalli", "Vindhya"],
                "correct_answer": 0,
                "difficulty": "medium",
                "topic": "Indian Geography",
                "solution": "The Western Ghats are locally known as Sahyadri mountains",
                "answer_rate": 0.6,
                "average_time": 75,
                "year": "2022"
            },
            {
                "id": "UPSC_G003",
                "question": "Which ocean current is responsible for the moderate climate of Western Europe?",
                "options": ["Gulf Stream", "Labrador Current", "California Current", "Benguela Current"],
                "correct_answer": 0,
                "difficulty": "hard",
                "topic": "World Geography",
                "solution": "The Gulf Stream brings warm waters from the Gulf of Mexico, moderating Western Europe's climate",
                "answer_rate": 0.35,
                "average_time": 135,
                "year": "2023"
            }
        ],
        "polity": [
            {
                "id": "UPSC_P001",
                "question": "How many fundamental rights are guaranteed by the Indian Constitution?",
                "options": ["5", "6", "7", "8"],
                "correct_answer": 1,
                "difficulty": "easy",
                "topic": "Fundamental Rights",
                "solution": "Currently, there are 6 fundamental rights after the removal of right to property in 1978",
                "answer_rate": 0.7,
                "average_time": 55,
                "year": "2022"
            },
            {
                "id": "UPSC_P002",
                "question": "The concept of 'Concurrent List' in Indian federalism is borrowed from:",
                "options": ["USA", "UK", "Australia", "Canada"],
                "correct_answer": 2,
                "difficulty": "medium",
                "topic": "Federalism",
                "solution": "The concept of Concurrent List is borrowed from the Australian Constitution",
                "answer_rate": 0.45,
                "average_time": 100,
                "year": "2023"
            },
            {
                "id": "UPSC_P003",
                "question": "Which Article of the Constitution deals with the Right to Constitutional Remedies?",
                "options": ["Article 30", "Article 31", "Article 32", "Article 33"],
                "correct_answer": 2,
                "difficulty": "hard",
                "topic": "Constitutional Provisions",
                "solution": "Article 32, called the 'Heart and Soul' of Constitution by Dr. Ambedkar, deals with Right to Constitutional Remedies",
                "answer_rate": 0.25,
                "average_time": 140,
                "year": "2022"
            }
        ]
    }
};

// Exam Metadata
const examMetadata = {
    IIT_JEE: {
        full_name: "Indian Institute of Technology Joint Entrance Examination",
        subjects: ["physics", "chemistry", "mathematics"],
        total_marks: 300,
        duration_minutes: 180,
        description: "Gateway to premier engineering institutes in India"
    },
    NEET: {
        full_name: "National Eligibility cum Entrance Test",
        subjects: ["physics", "chemistry", "biology"],
        total_marks: 720,
        duration_minutes: 180,
        description: "Medical entrance exam for MBBS and BDS courses"
    },
    UPSC: {
        full_name: "Union Public Service Commission",
        subjects: ["history", "geography", "polity"],
        total_marks: 400,
        duration_minutes: 120,
        description: "Civil services examination for administrative roles"
    }
};

// DOM Functions

// Show and hide sections
function showSection(sectionId) {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
    if (sectionId === 'question-bank') {
        displayQuestions();
    }
    if (sectionId === 'analytics') {
        renderPerformanceChart();
    }
}

// Load subjects for exam type in Create Exam form
function loadSubjects(examType) {
    const container = document.getElementById('subjectSelection');
    container.innerHTML = '';
    if (!examType) return;
    let subjects = examMetadata[examType].subjects;
    subjects.forEach(sub => {
        let label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="subjects" value="${sub}" checked> ${capitalize(sub)}`;
        container.appendChild(label);
    });
}

// Capitalize the first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter questions by search
function filterQuestions() {
    const search = document.getElementById('questionSearch').value.toLowerCase();
    const container = document.getElementById('questionList');
    container.innerHTML = '';
    let found = 0;
    Object.keys(examDatabase).forEach(examType => {
        let subjects = examDatabase[examType];
        Object.keys(subjects).forEach(subject => {
            subjects[subject].forEach(q => {
                if (q.question.toLowerCase().includes(search)) {
                    found++;
                    container.appendChild(createQuestionCard(q, examType, subject));
                }
            });
        });
    });
    if (found === 0) {
        container.innerHTML = '<p>No questions found.</p>';
    }
}

// Create question card element
function createQuestionCard(questionObj, examType, subject) {
    const card = document.createElement('div');
    card.className = 'question-card';

    let difficultyClass = "";
    if (questionObj.difficulty === 'easy') difficultyClass = 'difficulty-easy';
    else if (questionObj.difficulty === 'medium') difficultyClass = 'difficulty-medium';
    else if (questionObj.difficulty === 'hard') difficultyClass = 'difficulty-hard';

    card.innerHTML = `
        <h4>${capitalize(subject)}: ${questionObj.question}</h4>
        <p><strong>Difficulty:</strong> <span class="${difficultyClass}">${capitalize(questionObj.difficulty)}</span></p>
        <p><strong>Year:</strong> ${questionObj.year}</p>
        <p><strong>Topic:</strong> ${questionObj.topic}</p>
        <p><strong>Answer Options:</strong></p>
        <ul>
            ${questionObj.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
        </ul>
    `;
    return card;
}

// Display all questions in bank
function displayQuestions() {
    const container = document.getElementById('questionList');
    container.innerHTML = '';
    Object.keys(examDatabase).forEach(examType => {
        let subjects = examDatabase[examType];
        Object.keys(subjects).forEach(subject => {
            subjects[subject].forEach(q => {
                container.appendChild(createQuestionCard(q, examType, subject));
            });
        });
    });
}

// Handle form submit to generate exam
document.getElementById('createExamForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const examType = this.examType.value;
    if (!examType) {
        alert('Please select an exam type');
        return;
    }
    const difficulty = this.difficultyLevel.value;
    const numQuestions = parseInt(this.numQuestions.value);
    const duration = parseInt(this.examDuration.value);
    const subjects = Array.from(this.querySelectorAll('input[name=subjects]:checked')).map(chk => chk.value);

    if (subjects.length === 0) {
        alert('Please select at least one subject');
        return;
    }

    // Filter questions
    let allQuestions = [];
    subjects.forEach(sub => {
        allQuestions = allQuestions.concat(examDatabase[examType][sub]);
    });

    // Filter by difficulty unless 'mixed'
    if (difficulty !== 'mixed') {
        allQuestions = allQuestions.filter(q => q.difficulty === difficulty);
    }

    // Shuffle and pick required number
    allQuestions = shuffleArray(allQuestions).slice(0, numQuestions);

    appState.selectedExamType = examType;
    appState.currentExamQuestions = allQuestions;
    appState.examDuration = duration * 60 * 1000;
    appState.userAnswers = {};
    appState.currentQuestionIndex = 0;
    appState.performanceData = null;
    clearInterval(appState.examTimer);

    renderExamPreview();
    showSection('create-exam');
});

// Shuffle utility
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Render exam preview
function renderExamPreview() {
    const container = document.getElementById('examPreview');
    if (!appState.currentExamQuestions.length) {
        container.innerHTML = '<p>No questions found for your selection.</p>';
        return;
    }
    let html = `<h3>Exam Preview - ${capitalize(appState.selectedExamType)}</h3>`;
    html += `<p>Questions: ${appState.currentExamQuestions.length}, Duration: ${appState.examDuration / 60000} minutes</p>`;

    appState.currentExamQuestions.forEach((q, idx) => {
        let diffClass = q.difficulty === 'easy' ? 'difficulty-easy' : (q.difficulty === 'medium' ? 'difficulty-medium' : 'difficulty-hard');
        html += `
            <div class="question-card">
                <h4>Q${idx + 1}: ${q.question}</h4>
                <p><strong>Difficulty:</strong> <span class="${diffClass}">${capitalize(q.difficulty)}</span></p>
                <ul>
                    ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Chart rendering placeholder (you can expand this with real data after exams)
function renderPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    if (appState.performanceChart) {
        appState.performanceChart.destroy();
    }
    appState.performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'History', 'Geography', 'Polity'],
            datasets: [{
                label: 'Accuracy %',
                data: [80, 75, 85, 70, 90, 65, 60], // sample data
                backgroundColor: [
                    'rgba(33, 128, 141, 0.7)',
                    'rgba(192, 21, 47, 0.7)',
                    'rgba(33, 128, 141, 0.7)',
                    'rgba(168, 75, 47, 0.7)',
                    'rgba(230, 129, 97, 0.7)',
                    'rgba(192, 21, 47, 0.7)',
                    'rgba(33, 128, 141, 0.7)'
                ],
                borderColor: 'rgba(0,0,0,0.4)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// Initialize app to show home section on page load
showSection('home');
