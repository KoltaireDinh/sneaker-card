const sneakers = [
  {
    name: "Air Max 270",
    price: "$150",
    image: "image/am270.png",
    description: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for a super-soft ride.",
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b, #f06595)",
    details: {
      productDetails: "The Air Max 270 is inspired by the Air Max 93 and Air Max 180, featuring Nike's first lifestyle Air Max shoe that showcases the largest Max Air unit to date. The heel unit delivers unrivaled comfort and a striking visual statement.",
      specifications: {
        "Brand": "Nike",
        "Model": "Air Max 270",
        "Type": "Lifestyle",
        "Upper Material": "Mesh/Synthetic",
        "Sole": "Rubber with Air Max technology",
        "Weight": "310g (size 9)"
      },
      rating: {
        stars: 4.5,
        text: "4.5/5 (2,847 reviews)"
      },
      features: [
        "270 degrees of visible Air Max cushioning",
        "Breathable mesh upper",
        "Heel pull tab for easy on/off",
        "Padded collar for comfort",
        "Durable rubber outsole"
      ]
    }
  },
  {
    name: "Jordan 1 Retro",
    price: "$170",
    image: "image/jd1retro.png",
    description: "The Air Jordan 1 Retro High OG brings back the classic silhouette.",
    color: "#1e3a8a",
    gradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    details: {
      productDetails: "An icon returns with the Jordan 1 Retro High OG. Featuring premium leather upper and the original colorways that started it all. This is the shoe that launched a legacy and changed basketball forever.",
      specifications: {
        "Brand": "Jordan",
        "Model": "Air Jordan 1 Retro High OG",
        "Type": "Basketball/Lifestyle",
        "Upper Material": "Premium Leather",
        "Sole": "Rubber with Air cushioning",
        "Weight": "395g (size 9)"
      },
      rating: {
        stars: 4.7,
        text: "4.7/5 (5,234 reviews)"
      },
      features: [
        "Premium leather construction",
        "Air-Sole unit in forefoot",
        "Solid rubber outsole",
        "Classic high-top silhouette",
        "Iconic Jumpman branding"
      ]
    }
  },
  {
    name: "Adidas Ultraboost",
    price: "$180",
    image: "image/ultraboost.png",
    description: "Experience endless energy with every step. BOOST midsole and Primeknit upper.",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    details: {
      productDetails: "The Ultraboost features revolutionary BOOST technology that returns energy with every step. The Primeknit upper adapts to your foot for a personalized fit, while the Continental rubber outsole provides superior traction.",
      specifications: {
        "Brand": "Adidas",
        "Model": "Ultraboost 22",
        "Type": "Running",
        "Upper Material": "Primeknit",
        "Sole": "Continental Rubber with BOOST",
        "Weight": "320g (size 9)"
      },
      rating: {
        stars: 4.6,
        text: "4.6/5 (3,921 reviews)"
      },
      features: [
        "BOOST midsole for energy return",
        "Primeknit adaptive upper",
        "Continental rubber outsole",
        "Torsion System for midfoot support",
        "Heel counter for stability"
      ]
    }
  },
  {
    name: "Vans Old Skool",
    price: "$65",
    image: "image/vans.png",
    description: "The iconic Vans Old Skool with the classic side stripe and waffle outsole.",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    details: {
      productDetails: "The Old Skool is Vans' classic skate shoe and the first to feature the iconic sidestripe. Built with a durable suede and canvas upper, reinforced toe caps, supportive padded collars, and signature rubber waffle outsoles.",
      specifications: {
        "Brand": "Vans",
        "Model": "Old Skool",
        "Type": "Skate/Lifestyle",
        "Upper Material": "Suede/Canvas",
        "Sole": "Vulcanized rubber waffle",
        "Weight": "280g (size 9)"
      },
      rating: {
        stars: 4.4,
        text: "4.4/5 (8,762 reviews)"
      },
      features: [
        "Iconic side stripe design",
        "Durable suede and canvas upper",
        "Reinforced toe caps",
        "Padded collar for comfort",
        "Signature waffle outsole"
      ]
    }
  },
  {
    name: "Converse Chuck 70",
    price: "$85",
    image: "image/chucktaylor.png",
    description: "The Chuck Taylor All Star '70 is a vintage-inspired take on the classic design.",
    color: "#6d28d9",
    gradient: "linear-gradient(135deg, #6d28d9, #a78bfa)",
    details: {
      productDetails: "The Chuck 70 celebrates the original Chuck Taylor All Star from the 1970s. Enhanced with premium materials, vintage details, and modern cushioning for improved comfort and durability.",
      specifications: {
        "Brand": "Converse",
        "Model": "Chuck Taylor All Star '70",
        "Type": "Lifestyle",
        "Upper Material": "Canvas",
        "Sole": "Rubber with OrthoLite insole",
        "Weight": "290g (size 9)"
      },
      rating: {
        stars: 4.3,
        text: "4.3/5 (4,156 reviews)"
      },
      features: [
        "Vintage 1970s construction",
        "Premium canvas upper",
        "OrthoLite insole for cushioning",
        "Higher rubber sidewall",
        "Cotton laces with vintage styling"
      ]
    }
  }
];

let currentIndex = Math.floor(Math.random() * sneakers.length);
let likedSneakers = new Set();
let slideshowTimeout;

const nameEl = document.getElementById('sneakerName');
const priceEl = document.getElementById('sneakerPrice');
const descEl = document.getElementById('sneakerDescription');
const imageEl = document.getElementById('sneakerImage');
const progressBar = document.getElementById('progressBar');
const likeBtn = document.getElementById('likeBtn');
const card = document.getElementById('card');
const container = document.querySelector('.container');
const backgroundImage = document.getElementById('backgroundImage');
const backgroundOverlay = document.getElementById('backgroundOverlay');
const expandBtn = document.getElementById('expandBtn');
const productDetailsEl = document.getElementById('productDetails');
const specsListEl = document.getElementById('specsList');
const ratingStarsEl = document.getElementById('ratingStars');
const ratingTextEl = document.getElementById('ratingText');
const featuresListEl = document.getElementById('featuresList');

let isExpanded = false;

function updateTheme(sneaker) {
  document.documentElement.style.setProperty('--theme-gradient', sneaker.gradient);
  document.documentElement.style.setProperty('--theme-color', sneaker.color);
  
  // Update background image
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

  // Update detailed information
  updateCardDetails(sneaker);

  likeBtn.classList.toggle('liked', likedSneakers.has(sneaker.name));

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });

  progressBar.style.animation = 'none';
  progressBar.offsetHeight;
  progressBar.style.animation = 'progress 5s linear forwards';
}

function updateCardDetails(sneaker) {
  const details = sneaker.details;
  
  // Update product details
  productDetailsEl.textContent = details.productDetails;
  
  // Update specifications
  specsListEl.innerHTML = '';
  Object.entries(details.specifications).forEach(([key, value]) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="spec-label">${key}:</span>
      <span class="spec-value">${value}</span>
    `;
    specsListEl.appendChild(li);
  });
  
  // Update rating
  const fullStars = Math.floor(details.rating.stars);
  const hasHalfStar = details.rating.stars % 1 !== 0;
  let starsHtml = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '★';
  }
  if (hasHalfStar) {
    starsHtml += '☆';
  }
  
  ratingStarsEl.textContent = starsHtml;
  ratingTextEl.textContent = details.rating.text;
  
  // Update features
  featuresListEl.innerHTML = '';
  details.features.forEach(feature => {
    const div = document.createElement('div');
    div.textContent = `• ${feature}`;
    div.style.marginBottom = '5px';
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
  const indicator = document.getElementById('indicator');
  indicator.innerHTML = '';
  sneakers.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCard();
      startSlideshow();
    });
    indicator.appendChild(dot);
  });
}

function startSlideshow() {
  clearTimeout(slideshowTimeout);
  progressBar.style.animation = 'none';
  progressBar.offsetHeight;
  progressBar.style.animation = 'progress 5s linear forwards';
  slideshowTimeout = setTimeout(() => {
    nextSneaker();
  }, 5000);
}

likeBtn.addEventListener('click', () => {
  const name = sneakers[currentIndex].name;
  if (likedSneakers.has(name)) {
    likedSneakers.delete(name);
  } else {
    likedSneakers.add(name);
  }
  updateCard();
});

document.getElementById('nextBtn').addEventListener('click', nextSneaker);
document.getElementById('prevBtn').addEventListener('click', prevSneaker);

expandBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  container.classList.toggle('expanded', isExpanded);
  card.classList.toggle('expanded', isExpanded);
  expandBtn.classList.toggle('expanded', isExpanded);
  
  if (isExpanded) {
    clearTimeout(slideshowTimeout);
  } else {
    startSlideshow();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSneaker();
  if (e.key === 'ArrowLeft') prevSneaker();
});

card.addEventListener('mouseenter', () => clearTimeout(slideshowTimeout));
card.addEventListener('mouseleave', startSlideshow);

createIndicators();
updateCard();
startSlideshow();