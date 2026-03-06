const products = [
    {
        id: 1,
        name: "LOKI R7 Professional Racket",
        category: "racket",
        price: 15499,
        image: "Product Images/Loki R7 1.jpg",
        images: [
            "Product Images/Loki R7 1.jpg",
            "Product Images/Loki R7 2.jpg",
            "Product Images/Loki R7 3.jpg",
            "Product Images/Loki R7 4.jpg",
            "Product Images/Loki R7 5.jpg"
        ],
        rating: 5,
        description: "Elevate your game with the LOKI R7. Designed for professional offensive players, offering phenomenal speed and intense spin."
    },
    {
        id: 2,
        name: "LOKI R6 Racket",
        category: "racket",
        price: 13499,
        image: "Product Images/Loki R6 1.jpg",
        images: [
            "Product Images/Loki R6 1.jpg",
            "Product Images/Loki R6 2.jpg",
            "Product Images/Loki R6 3.jpg",
            "Product Images/Loki R6 4.jpg",
            "Product Images/Loki R6 5.jpg"
        ],
        rating: 4.8,
        description: "The LOKI R6 provides the perfect balance of attack and defense. Great for intermediate and advanced players."
    },
    {
        id: 3,
        name: "LOKI R5 Racket",
        category: "racket",
        price: 11499,
        image: "Product Images/LOKI R5 1.jpg",
        images: [
            "Product Images/LOKI R5 1.jpg",
            "Product Images/LOKI R5 2.jpg",
            "Product Images/LOKI R5 3.jpg",
            "Product Images/LOKI R5 4.jpg",
            "Product Images/LOKI R5 5.jpg"
        ],
        rating: 4.7,
        description: "Experience exceptional control with LOKI R5, the standard choice for competitive players refining their spin techniques."
    },
    {
        id: 4,
        name: "LOKI R4 Racket",
        category: "racket",
        price: 8999,
        image: "Product Images/LOKI R4 1.jpg",
        images: [
            "Product Images/LOKI R4 1.jpg",
            "Product Images/LOKI R4 2.jpg",
            "Product Images/LOKI R4 3.jpg",
            "Product Images/LOKI R4 4.jpg",
            "Product Images/LOKI R4 5.jpg"
        ],
        rating: 4.5,
        description: "LOKI R4 is well-suited for fast-paced players who need quick reflex advantages at the table."
    },
    {
        id: 5,
        name: "LOKI R2 Racket",
        category: "racket",
        price: 5999,
        image: "Product Images/LOKI R2 1.jpg",
        images: [
            "Product Images/LOKI R2 1.jpg",
            "Product Images/LOKI R2 2.jpg",
            "Product Images/LOKI R2 3.jpg",
            "Product Images/LOKI R2 4.jpg",
            "Product Images/LOKI R2 5.jpg"
        ],
        rating: 4.3,
        description: "LOKI R2 provides the comfort and reliable bounce needed for beginners and intermediate trainees."
    },
    {
        id: 6,
        name: "LOKI E7 Racket",
        category: "racket",
        price: 6499,
        image: "Product Images/LOKI E7 1.jpg",
        images: [
            "Product Images/LOKI E7 1.jpg",
            "Product Images/LOKI E7 2.jpg",
            "Product Images/LOKI E7 3.jpg",
            "Product Images/LOKI E7 4.jpg",
            "Product Images/LOKI E7 5.jpg"
        ],
        rating: 4.6,
        description: "The LOKI E7 features a sophisticated handle and improved sweet spot for dynamic ball striking."
    },
    {
        id: 7,
        name: "BTC 501 Carbon Master",
        category: "racket",
        price: 18999,
        image: "Product Images/BTC 501 1.png",
        images: [
            "Product Images/BTC 501 1.png",
            "Product Images/BTC 501 2.png",
            "Product Images/BTC 501 3.png",
            "Product Images/BTC 501 4.png"
        ],
        rating: 5.0,
        description: "BTC 501 Carbon Master provides ultra-premium carbon layers for extreme loopers and aggressive attackers."
    },
    {
        id: 8,
        name: "BTC 401 Pro",
        category: "racket",
        price: 15999,
        image: "Product Images/BTC 401 1.png",
        images: [
            "Product Images/BTC 401 1.png",
            "Product Images/BTC 401 2.png",
            "Product Images/BTC 401 3.png",
            "Product Images/BTC 401 4.png",
            "Product Images/BTC 401 5.png",
            "Product Images/BTC 401 6.png"
        ],
        rating: 4.9,
        description: "BTC 401 Pro combines flex and stiffness logically for versatile all-style players aiming for high competition."
    },
    {
        id: 9,
        name: "BTC 301 Classic",
        category: "racket",
        price: 12999,
        image: "Product Images/BTC 301 1.png",
        images: [
            "Product Images/BTC 301 1.png",
            "Product Images/BTC 301 2.png",
            "Product Images/BTC 301 3.png",
            "Product Images/BTC 301 4.png",
            "Product Images/BTC 301 5.png",
            "Product Images/BTC 301 6.png"
        ],
        rating: 4.7,
        description: "A classic 5-ply wood blade that gives remarkable feeling and acoustic feedback on every shot."
    },
    {
        id: 10,
        name: "BTC 201 Starter",
        category: "racket",
        price: 9999,
        image: "Product Images/BTC 201 1.png",
        images: [
            "Product Images/BTC 201 1.png",
            "Product Images/BTC 201 2.png",
            "Product Images/BTC 201 3.png",
            "Product Images/BTC 201 4.png",
            "Product Images/BTC 201 5.png"
        ],
        rating: 4.5,
        description: "The gateway into competitive table tennis, providing high-quality rubber components."
    },
    {
        id: 11,
        name: "K500 Elite Control",
        category: "racket",
        price: 10999,
        image: "Product Images/K500 1.jpg",
        images: [
            "Product Images/K500 1.jpg",
            "Product Images/K500 2.jpg",
            "Product Images/K500 3.jpg",
            "Product Images/K500 4.jpg"
        ],
        rating: 4.6,
        description: "Designed for defensive playstyles emphasizing backspin and placement."
    },
    {
        id: 12,
        name: "K300 Standard",
        category: "racket",
        price: 7999,
        image: "Product Images/K300 1.jpg",
        images: [
            "Product Images/K300 1.jpg",
            "Product Images/K300 2.jpg",
            "Product Images/K300 3.jpg",
            "Product Images/K300 4.jpg",
            "Product Images/K300 5.jpg"
        ],
        rating: 4.2,
        description: "Affordable and reliable paddle to enjoy games with family and friends."
    },
    {
        id: 13,
        name: "Butterfly 3-Star Balls",
        category: "ball",
        price: 1499,
        image: "Product Images/Butterfuly balls 1.jpg",
        images: [
            "Product Images/Butterfuly balls 1.jpg",
            "Product Images/Butterfuly balls 2.jpg",
            "Product Images/Butterfuly balls 3.jpg",
            "Product Images/Butterfuly balls 4.jpg"
        ],
        rating: 5,
        description: "ITTF approved tournament balls from Butterfly. Best suited for high-level match play."
    },
    {
        id: 14,
        name: "Nittaku Premium Balls",
        category: "ball",
        price: 1999,
        image: "Product Images/NITTAKU BALLS 1.png",
        images: [
            "Product Images/NITTAKU BALLS 1.png",
            "Product Images/NITTAKU BALLS 2.png",
            "Product Images/NITTAKU  BALLS 3.jpeg",
            "Product Images/NITTAKU  BALLS 4.jpeg"
        ],
        rating: 4.9,
        description: "World-renowned for unmatched roundness and durability."
    },
    {
        id: 15,
        name: "Shield Training Balls",
        category: "ball",
        price: 899,
        image: "Product Images/SHEILD BALLS 1.png",
        images: [
            "Product Images/SHEILD BALLS 1.png",
            "Product Images/SHEILD BALLS 2.png",
            "Product Images/SHEILD BALLS 3.png",
            "Product Images/SHEILD BALLS 4.png",
            "Product Images/SHEILD BALLS 5.png"
        ],
        rating: 4.3,
        description: "A great pack of training balls suitable for multi-ball drills and robot practice."
    },
    {
        id: 16,
        name: "Youyixi Professional Balls",
        category: "ball",
        price: 1299,
        image: "Product Images/YOUYIXI BALLS 1.png",
        images: [
            "Product Images/YOUYIXI BALLS 1.png",
            "Product Images/YOUYIXI BALLS 2.png",
            "Product Images/YOUYIXI BALLS 3.png"
        ],
        rating: 4.4,
        description: "Seamless precision and very long-lasting, ideal for extended intense training sessions."
    },
    {
        id: 17,
        name: "Volta Pro Tournament Net",
        category: "net",
        price: 3599,
        image: "Product Images/NET.png",
        images: [
            "Product Images/NET.png",
            "Product Images/NET 2.jpg",
            "Product Images/NET 3.jpg"
        ],
        rating: 4.8,
        description: "Heavy-duty steel clip-on net set with tension adjustment for a perfectly taut regulation setup."
    }
];
