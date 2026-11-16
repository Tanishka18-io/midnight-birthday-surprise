
/* =========================================
   MIDNIGHT BIRTHDAY SURPRISE
   For Adarsh Raj Yadav ❤️
   IST: Asia/Kolkata
========================================= */

// -----------------------------------------
// 1. TEST MODE
// -----------------------------------------

const testMode =
    new URLSearchParams(window.location.search).get("test") === "1";

const nowAtStart = Date.now();

const birthdaySchedule = testMode
    ? {
        firstMessage: new Date(nowAtStart + 10000),
        secondMessage: new Date(nowAtStart + 20000),
        thirdMessage: new Date(nowAtStart + 30000),
        birthday: new Date(nowAtStart + 40000)
    }
    : {
        firstMessage: new Date("2026-11-16T23:00:00+05:30"),
        secondMessage: new Date("2026-11-16T23:30:00+05:30"),
        thirdMessage: new Date("2026-11-16T23:50:00+05:30"),
        birthday: new Date("2026-11-17T00:00:00+05:30")
    };


// -----------------------------------------
// 2. GET WEBSITE ELEMENTS
// -----------------------------------------

const screens = {
    welcome: document.getElementById("welcome-screen"),
    first: document.getElementById("message-11"),
    second: document.getElementById("message-1130"),
    third: document.getElementById("message-1150"),
    birthday: document.getElementById("birthday-screen"),
    memory: document.getElementById("memory-screen"),
    letter: document.getElementById("letter-screen")
};

let lastScheduleStage = null;
let confettiStarted = false;


// -----------------------------------------
// 3. SHOW SCREEN
// -----------------------------------------

function showScreen(screenName) {

    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
        screen.classList.add("hidden");
    });

    const selectedScreen = screens[screenName];

    if (selectedScreen) {
        selectedScreen.classList.remove("hidden");
        selectedScreen.classList.add("active");
        window.scrollTo(0, 0);
    }
}


// -----------------------------------------
// 4. COUNTDOWN FORMAT
// -----------------------------------------

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

function getTimeParts(targetDate) {

    const difference = Math.max(
        0,
        targetDate.getTime() - Date.now()
    );

    return {
        hours: Math.floor(difference / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000)
    };
}


// -----------------------------------------
// 5. MAIN COUNTDOWN
// -----------------------------------------

function updateCountdown(targetDate) {

    const time = getTimeParts(targetDate);

    document.getElementById("hours").textContent =
        formatNumber(time.hours);

    document.getElementById("minutes").textContent =
        formatNumber(time.minutes);

    document.getElementById("seconds").textContent =
        formatNumber(time.seconds);
}


// -----------------------------------------
// 6. FINAL COUNTDOWN
// -----------------------------------------

function createMidnightCountdown() {

    const messageCard = document.querySelector(
        "#message-1150 .message-card"
    );

    if (
        !messageCard ||
        document.getElementById("midnight-timer")
    ) return;

    const timer = document.createElement("div");

    timer.id = "midnight-timer";
    timer.className = "countdown-box";

    timer.innerHTML = `
        <p>Until your birthday begins ❤️</p>

        <div id="countdown">
            <div>
                <span id="final-hours">00</span>
                <small>Hours</small>
            </div>

            <div>
                <span id="final-minutes">00</span>
                <small>Minutes</small>
            </div>

            <div>
                <span id="final-seconds">00</span>
                <small>Seconds</small>
            </div>
        </div>
    `;

    messageCard.appendChild(timer);
}

function updateFinalCountdown() {

    const time = getTimeParts(birthdaySchedule.birthday);

    const hours = document.getElementById("final-hours");
    const minutes = document.getElementById("final-minutes");
    const seconds = document.getElementById("final-seconds");

    if (hours && minutes && seconds) {
        hours.textContent = formatNumber(time.hours);
        minutes.textContent = formatNumber(time.minutes);
        seconds.textContent = formatNumber(time.seconds);
    }
}


// -----------------------------------------
// 7. MIDNIGHT CONFETTI
// -----------------------------------------

function launchConfetti() {

    if (confettiStarted) return;

    confettiStarted = true;

    const colors = [
        "#ffb6cb",
        "#ffd700",
        "#ffffff",
        "#f080a7",
        "#d9a7ff"
    ];

    for (let i = 0; i < 100; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 8000);
    }
}


// -----------------------------------------
// 8. MUSIC PLAYER
// -----------------------------------------

const audio = document.getElementById("birthday-audio");
const musicButton = document.getElementById("music-toggle");
const musicPlayer = document.getElementById("music-player");

musicButton.addEventListener("click", async () => {

    try {

        if (audio.paused) {

            await audio.play();

            musicButton.textContent = "❚❚ Pause Our Song";

        } else {

            audio.pause();

            musicButton.textContent = "♫ Play Our Song";
        }

    } catch (error) {

        console.error("Music could not play:", error);

        musicButton.textContent = "Music unavailable";
    }
});


// -----------------------------------------
// 9. SECRET ENVELOPE
// -----------------------------------------

const envelope = document.getElementById("envelope");

const openEnvelopeButton =
    document.getElementById("open-envelope");

const letterContent =
    document.getElementById("letter-content");

openEnvelopeButton.addEventListener("click", () => {

    envelope.classList.add("open");

    letterContent.classList.remove("hidden");

    openEnvelopeButton.textContent =
        "Your letter is open ❤️";

    openEnvelopeButton.disabled = true;

});


// -----------------------------------------
// 10. BIRTHDAY SCHEDULE
// -----------------------------------------

function checkBirthdaySchedule() {

    const now = Date.now();

    let currentStage;

    if (now >= birthdaySchedule.birthday.getTime()) {

        currentStage = "birthday";

    } else if (now >= birthdaySchedule.thirdMessage.getTime()) {

        currentStage = "third";

    } else if (now >= birthdaySchedule.secondMessage.getTime()) {

        currentStage = "second";

    } else if (now >= birthdaySchedule.firstMessage.getTime()) {

        currentStage = "first";

    } else {

        currentStage = "welcome";
    }

    if (currentStage !== lastScheduleStage) {

        lastScheduleStage = currentStage;

        showScreen(currentStage);

        if (currentStage === "third") {
            createMidnightCountdown();
        }

        if (currentStage === "birthday") {

            musicPlayer.classList.remove("hidden");

            launchConfetti();

        }
    }

    if (currentStage === "welcome") {
        updateCountdown(birthdaySchedule.firstMessage);
    }

    if (currentStage === "third") {
        updateFinalCountdown();
    }
}


// -----------------------------------------
// 11. MEMORY LANE NAVIGATION
// -----------------------------------------

document.getElementById("memory-button")
    .addEventListener("click", () => {

        showScreen("memory");

    });


// -----------------------------------------
// 12. PERSONAL LETTER NAVIGATION
// -----------------------------------------

document.getElementById("letter-button")
    .addEventListener("click", () => {

        showScreen("letter");

    });


// -----------------------------------------
// 13. FLOATING HEARTS
// -----------------------------------------

function createFloatingHearts() {

    const container = document.getElementById("hearts");

    const symbols = ["❤️", "💕", "💗", "💖", "✨"];

    for (let i = 0; i < 20; i++) {

        const heart = document.createElement("span");

        heart.className = "heart";

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 10 + "s";

        heart.style.animationDuration =
            (7 + Math.random() * 8) + "s";

        container.appendChild(heart);
    }
}


// -----------------------------------------
// 14. START WEBSITE
// -----------------------------------------

createFloatingHearts();

checkBirthdaySchedule();

setInterval(checkBirthdaySchedule, 1000);

if (testMode) {
    console.log("TEST MODE ENABLED");
    console.log("Birthday stages will change every 10 seconds.");
} else {
    console.log("Birthday surprise scheduled for 17 November 2026 IST ❤️");
}
