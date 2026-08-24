// Complete Real Amul Juices and Beverages Product Catalog with High-Res Studio Photography
(function () {
    const PRODUCTS = [
        {
            id: "amul-kool-rose",
            name: "Amul Kool Gold Exotic Rose Flavour",
            category: "flavoured-milk",
            tag: "Signature Rose Milk",
            badge: "Hero Special",
            badgeColor: "bg-primary",
            price: 25,
            originalPrice: 30,
            rating: 4.9,
            reviewsCount: 612,
            volume: "200ml Bottle",
            image: "./images/amul-kool-rose.png",
            description: "Amul's iconic sterilized flavoured milk infused with natural rose extracts and rich toned milk. Delivering refreshing floral sweetness and pure milk nutrition in every sip.",
            ingredients: "Standardised Milk, Sugar, Permitted Synthetic Food Colour (INS 127) and Added Natural Identical Rose Flavour.",
            nutritional: { calories: "88 kcal", carbohydrates: "12.0g", protein: "3.2g", fat: "3.0g", calcium: "120mg" },
            packs: [
                { size: "200 ml Pet Bottle", price: 25 },
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "Pack of 6 Cans", price: 145 },
                { size: "Pack of 12 Cans (Party Pack)", price: 280 }
            ],
            colorGradient: "from-pink-500 via-rose-500 to-pink-600",
            accentColor: "#E91E63",
            icon: "local_florist",
            flavour: "Exotic Rose"
        },
        {
            id: "amul-mango-shake",
            name: "Amul Mango Shake (Real Alphonso)",
            category: "shakes-lassi",
            tag: "100% Real Alphonso Mango",
            badge: "Bestseller",
            badgeColor: "bg-amber-500",
            price: 25,
            originalPrice: 30,
            rating: 4.9,
            reviewsCount: 540,
            volume: "200ml Pouch",
            image: "./images/amul-mango-shake.jpg",
            description: "Rich, luscious mango milkshake made with sun-ripened Ratnagiri Alphonso mango pulp and thick creamy Amul milk. Convenient on-the-go spout pouch with easy-sip cap.",
            ingredients: "Standardised Milk, Alphonso Mango Pulp (25%), Sugar, Vitamin A & D Enriched, Natural Identical Flavour.",
            nutritional: { calories: "98 kcal", carbohydrates: "15.2g", naturalSugar: "13.8g", protein: "3.1g", vitaminA: "45mcg" },
            packs: [
                { size: "200 ml Spout Pouch", price: 25 },
                { size: "Pack of 6 Pouches (200ml)", price: 140 },
                { size: "Pack of 12 Pouches (Family Pack)", price: 270 }
            ],
            colorGradient: "from-amber-400 via-yellow-500 to-orange-500",
            accentColor: "#F59E0B",
            icon: "local_florist",
            flavour: "Alphonso Mango Shake"
        },
        {
            id: "amul-mango-milk",
            name: "Amul Mango Milk (The Royal Taste)",
            category: "flavoured-milk",
            tag: "Royal Alphonso with Dry Fruits",
            badge: "Royal Special",
            badgeColor: "bg-yellow-500",
            price: 25,
            originalPrice: 30,
            rating: 4.8,
            reviewsCount: 470,
            volume: "200ml Can",
            image: "./images/amul-mango-milk.jpg",
            description: "Thick, royal mango flavoured milk made with real mango nectar and pure Amul milk, garnished with almond and pistachio notes. A nutritious traditional delight.",
            ingredients: "Standardised Milk, Alphonso Mango Pulp (20%), Sugar, Saffron & Nut Essence, Permitted Stabilizer.",
            nutritional: { calories: "94 kcal", carbohydrates: "14.6g", naturalSugar: "13.0g", protein: "3.2g", calcium: "115mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "Pack of 6 Cans (200ml)", price: 145 },
                { size: "Pack of 12 Cans (Party Pack)", price: 280 }
            ],
            colorGradient: "from-yellow-400 via-amber-400 to-yellow-600",
            accentColor: "#EAB308",
            icon: "water_drop",
            flavour: "Royal Mango Milk"
        },
        {
            id: "amul-arabica-cafe",
            name: "Amul Arabica Café Cold Coffee",
            category: "flavoured-milk",
            tag: "Made with 100% Arabica Beans",
            badge: "Energy Pick",
            badgeColor: "bg-stone-800",
            price: 30,
            originalPrice: 35,
            rating: 4.9,
            reviewsCount: 720,
            volume: "200ml Can",
            image: "./images/amul-arabica-cafe.jpg",
            description: "Crafted from single-origin 100% roasted Arabica coffee beans brewed to perfection and blended with rich chilled Amul milk. The ultimate instant caffeine refreshment on the go.",
            ingredients: "Toned Milk, Sugar, 100% Arabica Coffee Extract (2.2%), Cocoa Solids, Acidity Regulator (INS 339(ii)).",
            nutritional: { calories: "96 kcal", carbohydrates: "13.5g", protein: "3.4g", fat: "3.2g", caffeine: "42mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 30 },
                { size: "250 ml Tetra Prisma", price: 35 },
                { size: "Pack of 6 Cans", price: 175 }
            ],
            colorGradient: "from-amber-900 via-stone-800 to-stone-950",
            accentColor: "#78350F",
            icon: "coffee",
            flavour: "Arabica Roast Coffee"
        },
        {
            id: "amul-coconut-water",
            name: "Amul Cool Tender Coconut Water",
            category: "fruit-juices",
            tag: "100% Natural Electrolytes",
            badge: "Hydration Hit",
            badgeColor: "bg-emerald-600",
            price: 25,
            originalPrice: 30,
            rating: 4.9,
            reviewsCount: 512,
            volume: "200ml Can",
            image: "./images/amul-coconut-water.jpg",
            description: "Pure, chilled tender coconut water packed straight from coastal Indian coconut groves. Loaded with potassium, bio-active enzymes, and natural electrolytes for instant rehydration.",
            ingredients: "100% Natural Tender Coconut Water, Bio-Preservative (INS 224), Vitamin C.",
            nutritional: { calories: "22 kcal", carbohydrates: "5.4g", naturalSugar: "4.8g", potassium: "240mg", sodium: "18mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "Pack of 6 Cans (200ml)", price: 145 },
                { size: "Pack of 12 Cans (Summer Pack)", price: 280 }
            ],
            colorGradient: "from-emerald-500 via-green-600 to-teal-700",
            accentColor: "#059669",
            icon: "eco",
            flavour: "Tender Coconut"
        },
        {
            id: "amul-pista-milk",
            name: "Amul Pista Milk (The Royal Taste)",
            category: "flavoured-milk",
            tag: "Crunchy Pistachio & Saffron",
            badge: "Nutri Special",
            badgeColor: "bg-lime-600",
            price: 25,
            originalPrice: 30,
            rating: 4.8,
            reviewsCount: 380,
            volume: "200ml Can",
            image: "./images/amul-pista-milk.jpg",
            description: "Traditional rich green pistachio flavoured milk churned with premium California pistachios and wholesome Amul toned milk. Rich in antioxidants and healthy proteins.",
            ingredients: "Standardised Milk, Sugar, Pistachio Extract (Pista), Natural Identical Flavours, Saffron.",
            nutritional: { calories: "92 kcal", carbohydrates: "12.8g", protein: "3.5g", fat: "3.2g", calcium: "125mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "Pack of 6 Cans (200ml)", price: 145 }
            ],
            colorGradient: "from-lime-400 via-emerald-500 to-green-600",
            accentColor: "#65A30D",
            icon: "nature",
            flavour: "Shahi Pista"
        },
        {
            id: "amul-strawberry-milk",
            name: "Amul Strawberry Milk (The Royal Taste)",
            category: "flavoured-milk",
            tag: "Fresh Mahabaleshwar Strawberries",
            badge: "Popular",
            badgeColor: "bg-rose-500",
            price: 25,
            originalPrice: 30,
            rating: 4.8,
            reviewsCount: 430,
            volume: "200ml Can",
            image: "./images/amul-strawberry-milk.jpg",
            description: "Delicious pink strawberry milk infused with sun-ripened Mahabaleshwar strawberry pulp and smooth homogenized Amul milk. Bursting with berry aroma and creamy joy.",
            ingredients: "Standardised Milk, Sugar, Real Strawberry Puree, Permitted Colour (INS 127), Calcium Enriched.",
            nutritional: { calories: "89 kcal", carbohydrates: "12.4g", protein: "3.2g", fat: "3.0g", calcium: "120mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "Pack of 6 Cans (200ml)", price: 145 }
            ],
            colorGradient: "from-rose-400 via-pink-500 to-rose-600",
            accentColor: "#F43F5E",
            icon: "favorite",
            flavour: "Fresh Strawberry"
        },
        {
            id: "amul-tru-guava",
            name: "Amul Tru Pink Guava with Chilli",
            category: "fruit-juices",
            tag: "Pink Guava & Mild Spice",
            badge: "Chef's Pick",
            badgeColor: "bg-pink-600",
            price: 20,
            originalPrice: 25,
            rating: 4.9,
            reviewsCount: 485,
            volume: "200ml Can",
            image: "./images/amul-tru-guava.jpg",
            description: "Velvety, exotic pink guava juice seasoned with a hint of rock salt and mild Indian red chilli. An authentic street-style taste sensation packed with Vitamin C and dietary fibre.",
            ingredients: "Water, Pink Guava Pulp (22%), Sugar, Iodized Salt, Red Chilli Powder, Black Salt, Acidity Regulator (INS 330), Vitamin C.",
            nutritional: { calories: "56 kcal", carbohydrates: "13.8g", naturalSugar: "11.5g", dietaryFiber: "1.4g", vitaminC: "26mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 20 },
                { size: "Pack of 6 Cans (200ml)", price: 110 },
                { size: "1 Litre Family Pack", price: 75 }
            ],
            colorGradient: "from-pink-500 via-rose-500 to-pink-600",
            accentColor: "#EC4899",
            icon: "eco",
            flavour: "Spiced Pink Guava"
        },
        {
            id: "amul-fruit-masti",
            name: "Amul Fruit Masti Fruitful Delight",
            category: "fruit-juices",
            tag: "With Real Mixed Fruit Juice",
            badge: "Immunity",
            badgeColor: "bg-orange-500",
            price: 20,
            originalPrice: 25,
            rating: 4.8,
            reviewsCount: 390,
            volume: "200ml Can",
            image: "./images/amul-fruit-masti.jpg",
            description: "A harmonious medley of real fruit juices including Apple, Orange, Alphonso Mango, Pink Guava, and Grapes. Loaded with essential antioxidants and natural fruit goodness.",
            ingredients: "Water, Mixed Fruit Juice Concentrate (Apple, Orange, Mango, Guava, Grape 25%), Sugar, Acidity Regulator (INS 330), Vitamin A, C & E.",
            nutritional: { calories: "52 kcal", carbohydrates: "13.0g", naturalSugar: "11.8g", protein: "0.3g", vitaminC: "28mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 20 },
                { size: "Pack of 6 Cans (200ml)", price: 110 },
                { size: "1 Litre Family Pack", price: 75 }
            ],
            colorGradient: "from-rose-400 via-orange-400 to-amber-500",
            accentColor: "#F97316",
            icon: "brightness_7",
            flavour: "Mixed Fruit Delight"
        },
        {
            id: "amul-kesar-milk",
            name: "Amul Kesar Flavoured Milk",
            category: "flavoured-milk",
            tag: "Pure Kashmir Saffron Threads",
            badge: "Royal Special",
            badgeColor: "bg-amber-600",
            price: 25,
            originalPrice: 30,
            rating: 4.8,
            reviewsCount: 510,
            volume: "200ml Can",
            image: "./images/amul-kesar-milk.jpg",
            description: "Infused with genuine Kashmir saffron (Kesar) and pure Amul standardised milk. An auspicious and royal Indian beverage that provides wholesome energy, calcium, and vitality.",
            ingredients: "Standardised Milk, Sugar, Saffron Extract (Kesar Threads), Permitted Stabilizer, Natural Identical Flavours.",
            nutritional: { calories: "90 kcal", carbohydrates: "12.2g", protein: "3.3g", fat: "3.1g", calcium: "125mg" },
            packs: [
                { size: "200 ml Aluminium Can", price: 25 },
                { size: "200 ml Pet Bottle", price: 25 },
                { size: "Pack of 6 Cans", price: 145 }
            ],
            colorGradient: "from-yellow-400 via-amber-500 to-yellow-600",
            accentColor: "#B8860B",
            icon: "grade",
            flavour: "Kashmiri Kesar"
        }
    ];

    let currentCategory = "all";
    let searchQuery = "";
    let currentSort = "popular";

    function getProducts() {
        return PRODUCTS;
    }

    function getProductById(id) {
        return PRODUCTS.find(p => p.id === id);
    }

    function filterAndSortProducts() {
        let filtered = PRODUCTS.filter(product => {
            const matchesCategory = currentCategory === "all" || product.category === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  product.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  product.flavour.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        switch (currentSort) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default: // popularity / reviews
                filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
                break;
        }

        return filtered;
    }

    function renderProductGrid() {
        const container = document.getElementById("product-grid-container");
        const countEl = document.getElementById("product-count-label");
        if (!container) return;

        const products = filterAndSortProducts();
        if (countEl) {
            countEl.innerText = `Showing ${products.length} Amul Beverages`;
        }

        if (products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full py-16 text-center">
                    <div class="w-20 h-20 mx-auto bg-pink-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <span class="material-icons text-4xl text-primary">search_off</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No juices found</h3>
                    <p class="text-gray-500 text-sm mb-6">We couldn't find any drinks matching "${searchQuery}".</p>
                    <button onclick="window.AmulProducts.resetFilters()" class="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all">
                        Reset Filters
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return `
                <div class="bg-white dark:bg-surface-dark rounded-3xl p-4 border border-gray-100 dark:border-gray-800 hover:border-primary/40 dark:hover:border-primary/40 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 relative">
                    <!-- Top Badges -->
                    <div class="flex justify-between items-start mb-2.5 z-10">
                        <span class="${product.badgeColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            ${product.badge}
                        </span>
                        <span class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            ${discount}% OFF
                        </span>
                    </div>

                    <!-- Real Product Studio Photography Card -->
                    <div onclick="window.AmulProducts.openQuickView('${product.id}')" class="relative h-64 rounded-2xl bg-gray-50 dark:bg-gray-800/40 p-1 flex items-center justify-center cursor-pointer overflow-hidden shadow-inner group/img border border-gray-100 dark:border-gray-700/50">
                        <!-- High-Res Bottle/Pack Studio Image -->
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 rounded-xl" loading="lazy" />

                        <!-- Amul Taste of India Badge -->
                        <div class="absolute top-2.5 left-2.5 bg-white/95 text-primary text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md font-display uppercase tracking-wider">
                            Amul
                        </div>

                        <!-- Bottom Tag -->
                        <div class="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between text-white shadow-sm">
                            <span class="text-xs font-bold truncate">${product.flavour}</span>
                            <span class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md">${product.volume}</span>
                        </div>
                    </div>

                    <!-- Product Details -->
                    <div class="mt-3.5 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center gap-1 mb-1">
                                <div class="flex text-amber-400 text-xs">
                                    ${'★'.repeat(Math.floor(product.rating))}
                                </div>
                                <span class="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">${product.rating}</span>
                                <span class="text-xs text-gray-400">(${product.reviewsCount})</span>
                            </div>
                            <h4 onclick="window.AmulProducts.openQuickView('${product.id}')" class="font-display font-bold text-base text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer line-clamp-1">
                                ${product.name}
                            </h4>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                ${product.description}
                            </p>
                        </div>

                        <!-- Pricing & Add to Cart -->
                        <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div>
                                <div class="flex items-baseline gap-1.5">
                                    <span class="text-xl font-extrabold text-gray-900 dark:text-white">₹${product.price}</span>
                                    <span class="text-xs text-gray-400 line-through">₹${product.originalPrice}</span>
                                </div>
                                <span class="text-[10px] text-emerald-600 font-medium block">Fresh Stock • Ready</span>
                            </div>
                            <button onclick="window.AmulCart.addToCart('${product.id}')" class="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-95">
                                <span class="material-icons text-base">shopping_cart</span>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function openQuickView(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const modal = document.getElementById("quickview-modal");
        const modalContent = document.getElementById("quickview-modal-content");
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center p-6 md:p-8">
                <!-- Left: Full High-Res Authentic Studio Product Photography Showcase -->
                <div class="h-80 md:h-[450px] rounded-3xl bg-gray-50 dark:bg-gray-800/60 p-1 flex items-center justify-center relative overflow-hidden shadow-xl group border border-gray-100 dark:border-gray-700">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                    
                    <div class="absolute top-4 left-4 bg-white/95 text-primary font-black px-3.5 py-1 rounded-full text-xs font-display shadow-lg">
                        AMUL TASTE OF INDIA
                    </div>
                    
                    <div class="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl text-white flex justify-between items-center text-xs">
                        <span class="font-bold">${product.flavour}</span>
                        <span class="font-semibold bg-white/20 px-2.5 py-0.5 rounded-lg">${product.volume}</span>
                    </div>
                </div>

                <!-- Right: Product Description & Details -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            ${product.badge}
                        </span>
                        <div class="flex items-center gap-1 text-sm font-bold text-amber-500">
                            <span>★</span> <span>${product.rating}</span>
                            <span class="text-xs text-gray-400 font-normal">(${product.reviewsCount} verified reviews)</span>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-2xl md:text-3xl font-display font-black text-gray-900 dark:text-white leading-tight">
                            ${product.name}
                        </h2>
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                            ${product.description}
                        </p>
                    </div>

                    <!-- Ingredients Statement -->
                    <div class="p-3 bg-pink-50/50 dark:bg-pink-950/20 rounded-2xl border border-pink-100 dark:border-pink-900/40 text-xs">
                        <span class="font-bold text-gray-700 dark:text-gray-300 block mb-0.5">Ingredients:</span>
                        <span class="text-gray-600 dark:text-gray-400 leading-normal">${product.ingredients}</span>
                    </div>

                    <!-- Nutritional Details -->
                    <div class="bg-surface-light dark:bg-gray-800/60 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Nutritional Values (Approx per 100ml)</h4>
                        <div class="grid grid-cols-4 gap-2 text-center text-xs">
                            <div class="bg-white dark:bg-surface-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div class="text-gray-400 text-[10px]">Energy</div>
                                <div class="font-bold text-gray-800 dark:text-gray-200">${product.nutritional.calories}</div>
                            </div>
                            <div class="bg-white dark:bg-surface-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div class="text-gray-400 text-[10px]">Carbs</div>
                                <div class="font-bold text-gray-800 dark:text-gray-200">${product.nutritional.carbohydrates}</div>
                            </div>
                            <div class="bg-white dark:bg-surface-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div class="text-gray-400 text-[10px]">Protein</div>
                                <div class="font-bold text-gray-800 dark:text-gray-200">${product.nutritional.protein || '0.2g'}</div>
                            </div>
                            <div class="bg-white dark:bg-surface-dark p-2 rounded-xl border border-gray-100 dark:border-gray-700">
                                <div class="text-gray-400 text-[10px]">${product.nutritional.calcium ? 'Calcium' : product.nutritional.potassium ? 'Potassium' : product.nutritional.caffeine ? 'Caffeine' : 'Vit C'}</div>
                                <div class="font-bold text-primary">${product.nutritional.calcium || product.nutritional.potassium || product.nutritional.caffeine || product.nutritional.vitaminC || 'Natural'}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Pack Selection -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Pack Size</label>
                        <div class="space-y-2" id="quickview-pack-options">
                            ${product.packs.map((pack, idx) => `
                                <label class="flex items-center justify-between p-3 rounded-2xl border ${idx === 0 ? 'border-primary bg-pink-50/50 dark:bg-pink-950/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} cursor-pointer transition-all">
                                    <div class="flex items-center gap-3">
                                        <input type="radio" name="quickview_pack" value="${idx}" ${idx === 0 ? 'checked' : ''} class="text-primary focus:ring-primary h-4 w-4">
                                        <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">${pack.size}</span>
                                    </div>
                                    <span class="text-xs sm:text-sm font-extrabold text-primary">₹${pack.price}</span>
                                </label>
                            `).join("")}
                        </div>
                    </div>

                    <!-- Add Button -->
                    <div class="flex gap-4 pt-2">
                        <button onclick="window.AmulProducts.addSelectedPackToCart('${product.id}')" class="flex-1 bg-primary hover:bg-primary-dark text-white py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-98 transition-all">
                            <span class="material-icons text-xl">shopping_bag</span>
                            <span>Add Pack to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }

    function addSelectedPackToCart(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const selectedRadio = document.querySelector('input[name="quickview_pack"]:checked');
        const packIndex = selectedRadio ? parseInt(selectedRadio.value) : 0;
        const selectedPack = product.packs[packIndex] || product.packs[0];

        window.AmulCart.addToCart(productId, selectedPack.size, selectedPack.price, 1);
        closeQuickView();
    }

    function closeQuickView() {
        const modal = document.getElementById("quickview-modal");
        if (!modal) return;
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
    }

    function setCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll(".category-filter-btn").forEach(btn => {
            if (btn.dataset.category === cat) {
                btn.classList.add("bg-primary", "text-white", "shadow-md");
                btn.classList.remove("bg-white", "dark:bg-surface-dark", "text-gray-700", "dark:text-gray-300");
            } else {
                btn.classList.remove("bg-primary", "text-white", "shadow-md");
                btn.classList.add("bg-white", "dark:bg-surface-dark", "text-gray-700", "dark:text-gray-300");
            }
        });
        renderProductGrid();
    }

    function setSearch(query) {
        searchQuery = query;
        renderProductGrid();
    }

    function setSort(sortVal) {
        currentSort = sortVal;
        renderProductGrid();
    }

    function resetFilters() {
        currentCategory = "all";
        searchQuery = "";
        currentSort = "popular";
        const searchInput = document.getElementById("product-search-input");
        if (searchInput) searchInput.value = "";
        const sortSelect = document.getElementById("product-sort-select");
        if (sortSelect) sortSelect.value = "popular";
        setCategory("all");
    }

    document.addEventListener("DOMContentLoaded", () => {
        renderProductGrid();

        const searchInput = document.getElementById("product-search-input");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                setSearch(e.target.value);
            });
        }

        const sortSelect = document.getElementById("product-sort-select");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                setSort(e.target.value);
            });
        }
    });

    window.AmulProducts = {
        getProducts,
        getProductById,
        renderProductGrid,
        openQuickView,
        closeQuickView,
        addSelectedPackToCart,
        setCategory,
        setSearch,
        setSort,
        resetFilters
    };
})();
