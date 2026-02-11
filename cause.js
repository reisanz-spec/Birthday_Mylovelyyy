 // Reasons database
 const reasons = [
    { 
        text: "Kamu orang yang baik dan bisa menghargai banget, aku merasa beruntung kita bisa punya hubungan sedekat dan senyaman ini. 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Semoga harimu dipenuhi dengan cinta, tawa, dan kebahagiaan yang tak pernah usai.. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Semoga kesuksesan dan kebahagiaan selalu menyertaimu, dan semoga Allah mengabulkan segala apa yang paling diinginkan oleh hatimu. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Tetaplah menjadi gadis luar biasa seperti yang aku kenal yang selalu menebarkan energi positif di sekitarmu. Semoga tahun ini menjadi tahun yang paling membahagiakan untukmu! 🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}


// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
// function createFloatingElement() {
//     const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
//     const element = document.createElement('div');
//     element.className = 'floating';
//     element.textContent = elements[Math.floor(Math.random() * elements.length)];
//     element.style.left = Math.random() * window.innerWidth + 'px';
//     element.style.top = Math.random() * window.innerHeight + 'px';
//     element.style.fontSize = (Math.random() * 20 + 10) + 'px';
//     document.body.appendChild(element);

//     gsap.to(element, {
//         y: -500,
//         duration: Math.random() * 10 + 10,
//         opacity: 0,
//         onComplete: () => element.remove()
//     });
// }

// Custom cursor (same as before)
// const cursor = document.querySelector('.custom-cursor');
// document.addEventListener('mousemove', (e) => {
//     gsap.to(cursor, {
//         x: e.clientX - 15,
//         y: e.clientY - 15,
//         duration: 0.2
//     });
// });

// // Create initial floating elements
// setInterval(createFloatingElement, 2000);

function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐', '🌷', '💘'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    
    // Posisi awal di bawah layar agar muncul dari bawah
    const startX = Math.random() * window.innerWidth;
    element.style.left = startX + 'px';
    element.style.top = (window.innerHeight + 50) + 'px'; // Mulai dari luar layar bawah
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.position = 'fixed';
    element.style.pointerEvents = 'none'; // Biar tidak menghalangi klik
    element.style.zIndex = '999';
    
    document.body.appendChild(element);

    // Animasi GSAP yang lebih kompleks
    gsap.to(element, {
        y: -(window.innerHeight + 200), // Naik sampai melewati atas layar
        x: startX + (Math.random() * 200 - 100), // Melengkung ke kiri/kanan
        rotation: Math.random() * 360, // Berputar perlahan
        duration: Math.random() * 5 + 8, // Durasi sedikit lebih cepat agar dinamis
        ease: "power1.out",
        opacity: 0,
        onComplete: () => element.remove()
    });

    // Efek "Swaying" (Ayunan) samping agar lebih natural
    gsap.to(element, {
        x: "+=30", 
        duration: 2, 
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut"
    });
}

// Panggil fungsi secara berkala
setInterval(createFloatingElement, 400);

window.addEventListener('mousemove', (e) => {
    // Munculkan elemen kecil hanya sesekali agar tidak terlalu ramai
    if (Math.random() > 0.9) { 
        const spark = document.createElement('div');
        spark.textContent = '✨';
        spark.style.position = 'fixed';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.pointerEvents = 'none';
        document.body.appendChild(spark);

        gsap.to(spark, {
            y: -50,
            opacity: 0,
            scale: 2,
            duration: 1,
            onComplete: () => spark.remove()
        });
    }
});

// Animasi foto saat baru masuk
gsap.from(".heart-frame", {
    duration: 2,
    scale: 0,
    opacity: 0,
    rotation: -180,
    ease: "elastic.out(1, 0.5)",
    delay: 0.5
});

// Efek Detak Jantung (Heartbeat)
gsap.to(".heart-frame", {
    scale: 1.05,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

const song = document.getElementById('birthdaySong');
const button = document.querySelector('.cta-button');

// Play saat klik pertama
if (button && song) {
    button.addEventListener('click', () => {
        localStorage.setItem("musicOn", "true");
        song.volume = 0.6;
        song.play();
    });
}

// Auto play di halaman berikutnya
window.addEventListener('load', () => {
    if (localStorage.getItem("musicOn") === "true" && song) {
        song.volume = 0.6;
        song.play().catch(() => {});
    }
});
