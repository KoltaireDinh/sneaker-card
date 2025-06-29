// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtPOcFwQkSFrolAx_Wji9qanVdgxBxe2A",
    authDomain: "sneaker-card-sso.firebaseapp.com",
    projectId: "sneaker-card-sso",
    storageBucket: "sneaker-card-sso.firebasestorage.app",
    messagingSenderId: "523474142869",
    appId: "1:523474142869:web:a543e197f19fbb8137bd9c",
    measurementId: "G-H8K1L9ZTRV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
// Sneakers data
const sneakers = [{
        name: "Air Max 270",
        price: "$150",
        image: "images/am270.png",
        description: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for a super-soft ride.",
        color: "#ff6b6b",
        gradient: "linear-gradient(135deg, #ff6b6b, #f06595)",
        details: {
            productDetails: "The Air Max 270 is inspired by the Air Max 93 and Air Max 180, featuring Nike's first lifestyle Air Max shoe that showcases the largest Max Air unit to date.",
            specifications: {
                Brand: "Nike",
                Model: "Air Max 270",
                Type: "Lifestyle",
                "Upper Material": "Mesh/Synthetic",
                Sole: "Rubber with Air Max technology",
                Weight: "310g (size 9)",
            },
            rating: {
                stars: 4.5,
                text: "4.5/5 (2,847 reviews)",
            },
            features: [
                "270 degrees of visible Air Max cushioning",
                "Breathable mesh upper",
                "Heel pull tab for easy on/off",
                "Padded collar for comfort",
                "Durable rubber outsole",
            ],
        },
    },
    {
        name: "Jordan 1 Retro",
        price: "$170",
        image: "images/jd1retro.png",
        description: "The Air Jordan 1 Retro High OG brings back the classic silhouette.",
        color: "#1e3a8a",
        gradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        details: {
            productDetails: "An icon returns with the Jordan 1 Retro High OG. Featuring premium leather upper and the original colorways that started it all.",
            specifications: {
                Brand: "Jordan",
                Model: "Air Jordan 1 Retro High OG",
                Type: "Basketball/Lifestyle",
                "Upper Material": "Premium Leather",
                Sole: "Rubber with Air cushioning",
                Weight: "395g (size 9)",
            },
            rating: {
                stars: 4.7,
                text: "4.7/5 (5,234 reviews)",
            },
            features: [
                "Premium leather construction",
                "Air-Sole unit in forefoot",
                "Solid rubber outsole",
                "Classic high-top silhouette",
                "Iconic Jumpman branding",
            ],
        },
    },
    {
        name: "Adidas Ultraboost",
        price: "$180",
        image: "images/ultraboost.png",
        description: "Experience endless energy with every step. BOOST midsole and Primeknit upper.",
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981, #34d399)",
        details: {
            productDetails: "The Ultraboost features revolutionary BOOST technology that returns energy with every step.",
            specifications: {
                Brand: "Adidas",
                Model: "Ultraboost 22",
                Type: "Running",
                "Upper Material": "Primeknit",
                Sole: "Continental Rubber with BOOST",
                Weight: "320g (size 9)",
            },
            rating: {
                stars: 4.6,
                text: "4.6/5 (3,921 reviews)",
            },
            features: [
                "BOOST midsole for energy return",
                "Primeknit adaptive upper",
                "Continental rubber outsole",
                "Torsion System for midfoot support",
                "Heel counter for stability",
            ],
        },
    },
    {
        name: "Converse Chuck 70",
        price: "$85",
        image: "images/chucktaylor.png",
        description: "The Chuck Taylor All Star '70 is a vintage-inspired take on the classic design.",
        color: "#6d28d9",
        gradient: "linear-gradient(135deg, #6d28d9, #a78bfa)",
        details: {
            productDetails: "The Chuck 70 celebrates the original Chuck Taylor All Star from the 1970s. Enhanced with premium materials, vintage details, and modern cushioning for improved comfort and durability.",
            specifications: {
                Brand: "Converse",
                Model: "Chuck Taylor All Star '70",
                Type: "Lifestyle",
                "Upper Material": "Canvas",
                Sole: "Rubber with OrthoLite insole",
                Weight: "290g (size 9)",
            },
            rating: {
                stars: 4.3,
                text: "4.3/5 (4,156 reviews)",
            },
            features: [
                "Vintage 1970s construction",
                "Premium canvas upper",
                "OrthoLite insole for cushioning",
                "Higher rubber sidewall",
                "Cotton laces with vintage styling",
            ],
        },
    },
    {
        name: "Vans Old Skool",
        price: "$65",
        image: "images/vans.png",
        description: "The iconic Vans Old Skool with the classic side stripe and waffle outsole.",
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
        details: {
            productDetails: "The Old Skool is Vans' classic skate shoe and the first to feature the iconic sidestripe. Built with a durable suede and canvas upper, reinforced toe caps, supportive padded collars, and signature rubber waffle outsoles.",
            specifications: {
                Brand: "Vans",
                Model: "Old Skool",
                Type: "Skate/Lifestyle",
                "Upper Material": "Suede/Canvas",
                Sole: "Vulcanized rubber waffle",
                Weight: "280g (size 9)",
            },
            rating: {
                stars: 4.4,
                text: "4.4/5 (8,762 reviews)",
            },
            features: [
                "Iconic side stripe design",
                "Durable suede and canvas upper",
                "Reinforced toe caps",
                "Padded collar for comfort",
                "Signature waffle outsole",
            ],
        },
    },
];

// App state
let currentIndex = Math.floor(Math.random() * sneakers.length);
let likedSneakers = new Set();
let slideshowTimeout;
let currentUser = null;
let isExpanded = false;

// DOM elements
const nameEl = document.getElementById("sneakerName");
const priceEl = document.getElementById("sneakerPrice");
const descEl = document.getElementById("sneakerDescription");
const imageEl = document.getElementById("sneakerImage");
const progressBar = document.getElementById("progressBar");
const likeBtn = document.getElementById("likeBtn");
const card = document.getElementById("card");
const container = document.querySelector(".container");
const backgroundImage = document.getElementById("backgroundImage");
const backgroundOverlay = document.getElementById("backgroundOverlay");
const expandBtn = document.getElementById("expandBtn");
const productDetailsEl = document.getElementById("productDetails");
const specsListEl = document.getElementById("specsList");
const ratingStarsEl = document.getElementById("ratingStars");
const ratingTextEl = document.getElementById("ratingText");
const featuresListEl = document.getElementById("featuresList");

// Auth elements
const authHeader = document.getElementById("authHeader");
const authButtons = document.getElementById("authButtons");
const userInfo = document.getElementById("userInfo");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const authModal = document.getElementById("authModal");
const modalLoginBtn = document.getElementById("modalLoginBtn");
const closeModal = document.getElementById("closeModal");
const modalBtnText = document.getElementById("modalBtnText");

// Authentication functions
function showAuthModal() {
    authModal.classList.add("show");
}

function hideAuthModal() {
    authModal.classList.remove("show");
}

function setLoadingState(button, loading) {
    if (loading) {
        button.innerHTML = '<div class="loading"></div> Signing in...';
        button.disabled = true;
    } else {
        button.innerHTML = `
      <svg class="google-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      ${button === loginBtn ? "Sign in with Google" : "Continue with Google"}`;
        button.disabled = false;
    }
}

function showToast(message, delay = 1000, duration = 3000) {
    setTimeout(() => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }, delay);
}

async function signInWithGoogle() {
    try {
        setLoadingState(loginBtn, true);
        setLoadingState(modalLoginBtn, true);

        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        console.log("User signed in:", user.displayName);
        hideAuthModal();
    } catch (error) {
        console.error("Error signing in:", error);

        if (error.code === "auth/popup-closed-by-user") {
            showToast("Sign in was cancelled. Please try again.");
        } else {
            showToast("Failed to sign in. Please try again.");
        }
    } finally {
        setLoadingState(loginBtn, false);
        setLoadingState(modalLoginBtn, false);
    }
}

async function signOut() {
    try {
        await auth.signOut();
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

function updateAuthUI(user) {
    if (user) {
        currentUser = user;
        authButtons.style.display = "none";
        userInfo.style.display = "flex";
        userAvatar.src =
            user.photoURL ||
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35"%3E%3Ccircle cx="17.5" cy="17.5" r="17.5" fill="%23ddd"/%3E%3Ctext x="17.5" y="22" text-anchor="middle" fill="%23666" font-family="Arial" font-size="14"%3E👤%3C/text%3E%3C/svg%3E';
        userName.textContent = user.displayName || "User";

        // Load user's liked sneakers from memory (in a real app, you'd load from Firestore)
        loadUserPreferences();
    } else {
        currentUser = null;
        authButtons.style.display = "flex";
        userInfo.style.display = "none";
        likedSneakers.clear();
        updateCard();
    }
}

function loadUserPreferences() {
    // In a real application, you would load user preferences from Firestore
    // For demo purposes, we'll keep the current liked sneakers
    updateCard();
}

function saveUserPreferences() {
    // In a real application, you would save user preferences to Firestore
    if (currentUser) {
        console.log("Saving preferences for user:", currentUser.uid);
        console.log("Liked sneakers:", Array.from(likedSneakers));
    }
}

// Sneaker app functions
function updateTheme(sneaker) {
    document.documentElement.style.setProperty(
        "--theme-gradient",
        sneaker.gradient
    );
    document.documentElement.style.setProperty("--theme-color", sneaker.color);

    backgroundImage.style.backgroundImage = `url(${sneaker.image})`;
    backgroundOverlay.style.background = sneaker.gradient;
}

function updateCard() {
    const sneaker = sneakers[currentIndex];
    updateTheme(sneaker);

    nameEl.textContent = sneaker.name;
    priceEl.textContent = sneaker.price;
    descEl.textContent = sneaker.description;
    imageEl.src = sneaker.image;
    imageEl.alt = sneaker.name;

    updateCardDetails(sneaker);

    likeBtn.classList.toggle("liked", likedSneakers.has(sneaker.name));

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });

    progressBar.style.animation = "none";
    progressBar.offsetHeight;
    progressBar.style.animation = "progress 5s linear forwards";
}

function updateCardDetails(sneaker) {
    const details = sneaker.details;

    productDetailsEl.textContent = details.productDetails;

    specsListEl.innerHTML = "";
    Object.entries(details.specifications).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span class="spec-label">${key}:</span>
      <span class="spec-value">${value}</span>
    `;
        specsListEl.appendChild(li);
    });

    const fullStars = Math.floor(details.rating.stars);
    const hasHalfStar = details.rating.stars % 1 !== 0;
    let starsHtml = "";

    for (let i = 0; i < fullStars; i++) {
        starsHtml += "★";
    }
    if (hasHalfStar) {
        starsHtml += "☆";
    }

    ratingStarsEl.textContent = starsHtml;
    ratingTextEl.textContent = details.rating.text;

    featuresListEl.innerHTML = "";
    details.features.forEach((feature) => {
        const div = document.createElement("div");
        div.textContent = `• ${feature}`;
        div.style.marginBottom = "5px";
        featuresListEl.appendChild(div);
    });
}

function nextSneaker() {
    currentIndex = (currentIndex + 1) % sneakers.length;
    updateCard();
    startSlideshow();
}

function prevSneaker() {
    currentIndex = (currentIndex - 1 + sneakers.length) % sneakers.length;
    updateCard();
    startSlideshow();
}

function createIndicators() {
    const indicator = document.getElementById("indicator");
    indicator.innerHTML = "";
    sneakers.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCard();
            startSlideshow();
        });
        indicator.appendChild(dot);
    });
}

function startSlideshow() {
    clearTimeout(slideshowTimeout);
    progressBar.style.animation = "none";
    progressBar.offsetHeight;
    progressBar.style.animation = "progress 5s linear forwards";
    slideshowTimeout = setTimeout(() => {
        nextSneaker();
    }, 5000);
}

// Event listeners
auth.onAuthStateChanged(updateAuthUI);

loginBtn.addEventListener("click", signInWithGoogle);
modalLoginBtn.addEventListener("click", signInWithGoogle);
logoutBtn.addEventListener("click", signOut);

closeModal.addEventListener("click", hideAuthModal);
authModal.addEventListener("click", (e) => {
    if (e.target === authModal) hideAuthModal();
});

likeBtn.addEventListener("click", () => {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const name = sneakers[currentIndex].name;
    if (likedSneakers.has(name)) {
        likedSneakers.delete(name);
    } else {
        likedSneakers.add(name);
    }
    updateCard();
    saveUserPreferences();
});

document.getElementById("nextBtn").addEventListener("click", nextSneaker);
document.getElementById("prevBtn").addEventListener("click", prevSneaker);

expandBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    container.classList.toggle("expanded", isExpanded);
    card.classList.toggle("expanded", isExpanded);
    expandBtn.classList.toggle("expanded", isExpanded);

    if (isExpanded) {
        clearTimeout(slideshowTimeout);
    } else {
        startSlideshow();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSneaker();
    if (e.key === "ArrowLeft") prevSneaker();
    if (e.key === "Escape") hideAuthModal();
});

card.addEventListener("mouseenter", () => clearTimeout(slideshowTimeout));
card.addEventListener("mouseleave", startSlideshow);

// Initialize app
createIndicators();
updateCard();
startSlideshow();

// Show welcome modal for first-time visitors
setTimeout(() => {
    if (!currentUser) {
        showAuthModal();
    }
}, 2000);