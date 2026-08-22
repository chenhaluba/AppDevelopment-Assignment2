const board = document.getElementById("board");

const directionSelect = document.getElementById("direction");
const justifySelect = document.getElementById("justify");
const alignSelect = document.getElementById("align");
const wrapSelect = document.getElementById("wrap");

const levelCounter = document.getElementById("levelCounter");
const levelTitle = document.getElementById("levelTitle");
const instruction = document.getElementById("instruction");
const attemptsText = document.getElementById("attempts");
const message = document.getElementById("message");
const levelButtons = document.getElementById("levelButtons");

const checkButton = document.getElementById("checkButton");
const resetButton = document.getElementById("resetButton");
const helpButton = document.getElementById("helpButton");

const helpModal = document.getElementById("helpModal");
const helpTitle = document.getElementById("helpTitle");
const helpEnglish = document.getElementById("helpEnglish");
const helpHebrew = document.getElementById("helpHebrew");
const closeHelpButton = document.getElementById("closeHelpButton");
const gotItButton = document.getElementById("gotItButton");

const successModal = document.getElementById("successModal");
const successCard = document.getElementById("successCard");
const successIcon = document.getElementById("successIcon");
const successLabel = document.getElementById("successLabel");
const successTitle = document.getElementById("successTitle");
const successText = document.getElementById("successText");
const successAttempts = document.getElementById("successAttempts");
const continueButton = document.getElementById("continueButton");

const levels = [
    {
        title: "Center the Row",
        instruction: "Arrange the hearts in one row at the top and center the group horizontally.",
        help: "Keep all hearts in one horizontal row at the top and move the whole group to the center.",
        helpHebrew: "סדרו את הלבבות בשורה אחת בחלק העליון ומרכזו את כל הקבוצה לרוחב הלוח.",
        items: 4,
        solution: { flexDirection: "row", justifyContent: "center", alignItems: "flex-start", flexWrap: "nowrap" }
    },
    {
        title: "Spread Them Out",
        instruction: "Arrange the hearts in one row at the top, with equal space between them from edge to edge.",
        help: "The first and last hearts should be at opposite edges, with equal space between the hearts.",
        helpHebrew: "סדרו את הלבבות בשורה אחת בחלק העליון, עם הלב הראשון והאחרון בקצוות מנוגדים ורווח שווה בין הלבבות.",
        items: 4,
        solution: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "nowrap" }
    },
    {
        title: "Build a Column",
        instruction: "Arrange the hearts from top to bottom and center the column horizontally.",
        help: "Place the hearts in one vertical column starting at the top and center the whole column.",
        helpHebrew: "סדרו את הלבבות מלמעלה למטה בטור אנכי אחד ומרכזו את כל הטור לרוחב הלוח.",
        items: 4,
        solution: { flexDirection: "column", justifyContent: "flex-start", alignItems: "center", flexWrap: "nowrap" }
    },
    {
        title: "Reverse and Drop",
        instruction: "Arrange the hearts in one reversed row at the bottom-right of the board.",
        help: "Keep one horizontal row, reverse the order of the hearts and place the whole row at the bottom-right.",
        helpHebrew: "סדרו את הלבבות בשורה אופקית אחת, הפכו את הסדר שלהם ומקמו את כל השורה בפינה הימנית התחתונה.",
        items: 4,
        solution: { flexDirection: "row-reverse", justifyContent: "flex-start", alignItems: "flex-end", flexWrap: "nowrap" }
    },
    {
        title: "Perfect Center",
        instruction: "Arrange the hearts in one row and center the group horizontally and vertically.",
        help: "Keep one horizontal row and place the whole group in the exact center of the board.",
        helpHebrew: "סדרו את הלבבות בשורה אחת ומקמו את כל הקבוצה בדיוק במרכז הלוח, גם לרוחב וגם לגובה.",
        items: 4,
        solution: { flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "nowrap" }
    },
    {
        title: "Bottom Column",
        instruction: "Arrange the hearts in one vertical column at the bottom and center it horizontally.",
        help: "Place the hearts in one vertical column, move the whole column to the bottom and center it horizontally.",
        helpHebrew: "סדרו את הלבבות בטור אנכי אחד בתחתית ומרכזו את כל הטור לרוחב הלוח.",
        items: 4,
        solution: { flexDirection: "column", justifyContent: "flex-end", alignItems: "center", flexWrap: "nowrap" }
    },
    {
        title: "Make It Wrap",
        instruction: "Arrange the hearts in multiple rows at the top and center the hearts in each row.",
        help: "Allow the hearts to move onto new rows and keep the hearts horizontally centered in each row.",
        helpHebrew: "אפשרו ללבבות לעבור לשורות נוספות בחלק העליון ומרכזו את הלבבות בכל שורה.",
        items: 9,
        solution: { flexDirection: "row", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }
    },
    {
        title: "Reverse, Wrap and Spread",
        instruction: "Arrange the hearts in wrapped rows at the top, reverse their order and spread each row from edge to edge.",
        help: "Allow the hearts to wrap onto new rows, reverse their direction and create equal space between the hearts across each row.",
        helpHebrew: "אפשרו ללבבות לעבור לשורות נוספות, הפכו את כיוון השורה וצרו רווח שווה בין הלבבות לאורך כל שורה.",
        items: 10,
        solution: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }
    }
];

let currentLevel = 0;
let attempts = 0;
let highestLevel = Number(localStorage.getItem("highestLevel"));

if (Number.isNaN(highestLevel) || highestLevel < 0 || highestLevel > levels.length) {
    highestLevel = 0;
}

function createLevelButtons() {
    levelButtons.innerHTML = "";

    for (let i = 0; i < levels.length; i++) {
        const button = document.createElement("button");
        button.textContent = i + 1;
        button.className = "level-button";

        if (i === currentLevel) {
            button.classList.add("current");
        } else if (i < highestLevel) {
            button.classList.add("completed");
        }

        if (i > highestLevel) {
            button.disabled = true;
        }

        button.addEventListener("click", function () {
            if (i <= highestLevel) {
                currentLevel = i;
                loadLevel();
            }
        });

        levelButtons.appendChild(button);
    }
}

function createHearts() {
    board.innerHTML = "";

    for (let i = 0; i < levels[currentLevel].items; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "♥";
        board.appendChild(heart);
    }
}

function updateBoard() {
    board.style.flexDirection = directionSelect.value;
    board.style.justifyContent = justifySelect.value;
    board.style.alignItems = alignSelect.value;
    board.style.flexWrap = wrapSelect.value;
}

function resetValues() {
    directionSelect.value = "row";
    justifySelect.value = "flex-start";
    alignSelect.value = "flex-start";
    wrapSelect.value = "nowrap";
    updateBoard();
}

function clearFeedback() {
    message.textContent = "";
    message.className = "message";
    board.classList.remove("board-correct", "board-wrong");
}

function loadLevel() {
    const level = levels[currentLevel];

    levelCounter.textContent = "Level " + (currentLevel + 1) + " of " + levels.length;
    levelTitle.textContent = level.title;
    instruction.textContent = level.instruction;
    attempts = 0;
    attemptsText.textContent = "Attempts: 0";

    clearFeedback();
    createHearts();
    resetValues();
    createLevelButtons();
}

function checkSolution() {
    attempts++;
    attemptsText.textContent = "Attempts: " + attempts;

    const solution = levels[currentLevel].solution;
    const correct =
        directionSelect.value === solution.flexDirection &&
        justifySelect.value === solution.justifyContent &&
        alignSelect.value === solution.alignItems &&
        wrapSelect.value === solution.flexWrap;

    board.classList.remove("board-wrong");

    if (correct) {
        message.textContent = "";
        board.classList.add("board-correct");

        if (currentLevel === highestLevel && highestLevel < levels.length) {
            highestLevel++;
            localStorage.setItem("highestLevel", highestLevel);
        }

        createLevelButtons();
        showSuccess();
        return;
    }

    message.textContent = "Not quite. Try a different combination.";
    message.className = "message error";
    board.classList.remove("board-correct");
    void board.offsetWidth;
    board.classList.add("board-wrong");
}

function resetLevel() {
    attempts = 0;
    attemptsText.textContent = "Attempts: 0";
    clearFeedback();
    resetValues();
}

function showHelp() {
    const level = levels[currentLevel];
    helpTitle.textContent = level.title;
    helpEnglish.textContent = level.help;
    helpHebrew.textContent = level.helpHebrew;
    helpModal.classList.add("show");
}

function closeHelp() {
    helpModal.classList.remove("show");
}

function showSuccess() {
    const lastLevel = currentLevel === levels.length - 1;

    if (lastLevel) {
        successCard.classList.add("game-complete");
        successIcon.textContent = "♥ ♥ ♥";
        successLabel.textContent = "YOU DID IT!";
        successTitle.textContent = "Flex Hearts Complete";
        successText.textContent = "You completed all 8 levels and mastered the Flexbox challenge.";
        successAttempts.textContent = "8 / 8 LEVELS COMPLETED";
        continueButton.textContent = "Play Again";
    } else {
        successCard.classList.remove("game-complete");
        successIcon.textContent = "♥";
        successLabel.textContent = "LEVEL COMPLETE";
        successTitle.textContent = "Great job!";
        successText.textContent = "You completed Level " + (currentLevel + 1) + ".";
        successAttempts.textContent = "Attempts: " + attempts;
        continueButton.textContent = "Continue →";
    }

    successModal.classList.add("show");
}

function continueGame() {
    successModal.classList.remove("show");

    if (currentLevel === levels.length - 1) {
        currentLevel = 0;
    } else {
        currentLevel++;
    }

    loadLevel();
}

directionSelect.addEventListener("change", updateBoard);
justifySelect.addEventListener("change", updateBoard);
alignSelect.addEventListener("change", updateBoard);
wrapSelect.addEventListener("change", updateBoard);

checkButton.addEventListener("click", checkSolution);
resetButton.addEventListener("click", resetLevel);
helpButton.addEventListener("click", showHelp);
closeHelpButton.addEventListener("click", closeHelp);
gotItButton.addEventListener("click", closeHelp);
continueButton.addEventListener("click", continueGame);

loadLevel();