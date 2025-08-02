// DOM Elements
const unifiedSearch = document.getElementById('unifiedSearch');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const resultsContainer = document.getElementById('resultsContainer');
const clearResults = document.getElementById('clearResults');
const newsContainer = document.getElementById('newsContainer');
const newsLoading = document.getElementById('newsLoading');
const newsCategories = document.querySelectorAll('.news-category');
const contactForm = document.getElementById('contactForm');

// Enhanced Security and IP Blocker Configuration
const SECURITY_CONFIG = {
    // IP Blocker Settings
    ipBlocker: {
        enabled: true,
        maxRequestsPerMinute: 10,
        maxFormSubmissionsPerHour: 5,
        blockedIPs: new Set(),
        suspiciousIPs: new Set(),
        allowedCountries: ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'NL', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE', 'IE', 'NZ', 'JP', 'SG', 'KR'],
        blockedCountries: ['RU', 'CN', 'KP', 'IR', 'SY', 'VE', 'CU'],
        torExitNodes: new Set(),
        proxyIPs: new Set(),
        vpnIPs: new Set()
    },
    
    // Security Monitoring
    security: {
        enableF12Detection: true,
        enableRightClickProtection: true,
        enableCopyProtection: true,
        enableViewSourceProtection: true,
        enableIPValidation: true,
        enableRateLimiting: true,
        enableGeolocationBlocking: true
    },
    
    // Enhanced News System
    enhancedNews: {
        debugMode: true,
        maxRetries: 3,
        timeout: 10000,
        cacheExpiry: 300000 // 5 minutes
    }
};

// Security state management
let securityState = {
    requestCount: 0,
    lastRequestTime: 0,
    formSubmissionCount: 0,
    lastFormSubmissionTime: 0,
    currentIP: null,
    userCountry: null,
    securityEnabled: true,
    violations: []
};

// State management
let currentNewsCategory = 'copywriting';
let isSearchMode = false;
let defaultNewsData = [];
let searchTimeout;

// Enhanced News Aggregation System
let enhancedNewsSystem = null;

// Copywriting Resources Database
const copywritingResources = [
    {
        title: "The Ultimate Guide to Writing Compelling Ad Copy",
        source: "CopyCraft",
        snippet: "Learn the proven techniques for creating ad copy that converts. From headlines to CTAs, master the art of persuasive writing.",
        category: "ad-copy"
    },
    {
        title: "SEO Copywriting: How to Rank Higher in Search Results",
        source: "CopyCraft",
        snippet: "Discover the secrets of SEO copywriting that helps your content rank higher in search engines while engaging readers.",
        category: "seo"
    },
    {
        title: "Email Marketing Copy That Drives Action",
        source: "CopyCraft",
        snippet: "Transform your email campaigns with copywriting strategies that increase open rates and drive conversions.",
        category: "email"
    },
    {
        title: "Landing Page Copywriting Best Practices",
        source: "CopyCraft",
        snippet: "Create landing pages that convert visitors into customers with these proven copywriting techniques.",
        category: "landing-page"
    },
    {
        title: "Social Media Copywriting for Better Engagement",
        source: "CopyCraft",
        snippet: "Master the art of writing compelling social media posts that increase engagement and drive traffic.",
        category: "social-media"
    },
    {
        title: "Product Description Writing That Sells",
        source: "CopyCraft",
        snippet: "Learn how to write product descriptions that highlight benefits and drive sales for your e-commerce business.",
        category: "product-description"
    },
    {
        title: "Blog Post Copywriting: From Ideas to Published Content",
        source: "CopyCraft",
        snippet: "A comprehensive guide to writing blog posts that engage readers and establish your authority in your industry.",
        category: "blog"
    },
    {
        title: "Copywriting Psychology: Understanding Your Audience",
        source: "CopyCraft",
        snippet: "Dive deep into the psychology of copywriting and learn how to connect with your target audience on a deeper level.",
        category: "psychology"
    }
];

// News Categories for Google News with enhanced keywords
const newsCategoriesMap = {
    'copywriting': 'copywriting+content+writing+marketing+copywriter',
    'marketing': 'digital+marketing+advertising+branding+growth+hacking',
    'advertising': 'advertising+ads+marketing+campaigns+PPC+social+media+ads',
    'business': 'business+entrepreneurship+startup+small+business+leadership'
};

// Enhanced News Categories for aggregation
const enhancedNewsCategories = {
    'AI': 'artificial+intelligence+machine+learning+AI+technology',
    'Marketing': 'digital+marketing+advertising+branding+growth+hacking',
    'Cybersecurity': 'cybersecurity+security+hacking+threat+intelligence',
    'Business': 'business+entrepreneurship+startup+leadership+strategy',
    'Tech': 'technology+innovation+startup+tech+trends',
    'Bioengineering': 'bioengineering+biotechnology+health+medical+innovation',
    'Robotics': 'robotics+automation+AI+technology+innovation',
    'Space': 'space+NASA+spacex+astronomy+technology',
    'Crypto': 'cryptocurrency+blockchain+bitcoin+crypto+trading',
    'Transportation': 'transportation+automotive+electric+vehicles+innovation'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing CopyCraft Pro website with enhanced security...');
    
    // Initialize security system first
    initializeSecuritySystem();
    
    // Initialize enhanced news system
    initializeEnhancedNewsSystem();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load default news
    loadDefaultNews();
    
    // Initialize ad space
    initializeAdSpace();
    
    console.log('✅ CopyCraft Pro website initialized successfully with security features!');
    
    // Debug: Export security state for console access
    window.CopyCraftSecurity = {
        config: SECURITY_CONFIG,
        state: securityState,
        checkRateLimit: checkRateLimit,
        showSecurityAlert: showSecurityAlert
    };
});

// Initialize Enhanced News System with Security
function initializeEnhancedNewsSystem() {
    try {
        // Check if enhanced news system is available
        if (typeof EnhancedNewsFeedAggregator !== 'undefined') {
            enhancedNewsSystem = new EnhancedNewsFeedAggregator();
            console.log('✅ Enhanced news system initialized');
            
            // Debug: Check if articles are loaded
            if (enhancedNewsSystem.allArticles && enhancedNewsSystem.allArticles.length > 0) {
                console.log(`📰 Loaded ${enhancedNewsSystem.allArticles.length} articles from enhanced news system`);
            } else {
                console.log('⚠️ No articles found in enhanced news system');
            }
        } else {
            console.log('⚠️ Enhanced news system not available, using fallback');
        }
    } catch (error) {
        console.error('❌ Error initializing enhanced news system:', error);
    }
}

// Initialize Security System
function initializeSecuritySystem() {
    console.log('🔒 Initializing Security System...');
    
    // Initialize IP validation
    initializeIPValidation();
    
    // Initialize security monitoring
    if (SECURITY_CONFIG.security.enableF12Detection) {
        initializeF12Detection();
    }
    
    if (SECURITY_CONFIG.security.enableRightClickProtection) {
        initializeRightClickProtection();
    }
    
    if (SECURITY_CONFIG.security.enableCopyProtection) {
        initializeCopyProtection();
    }
    
    if (SECURITY_CONFIG.security.enableViewSourceProtection) {
        initializeViewSourceProtection();
    }
    
    console.log('✅ Security System Initialized');
}

// IP Validation and Geolocation
async function initializeIPValidation() {
    try {
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        securityState.currentIP = data.ip;
        
        // Get geolocation data
        const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const geoData = await geoResponse.json();
        securityState.userCountry = geoData.country_code;
        
        console.log(`🌍 IP: ${data.ip}, Country: ${geoData.country_code}`);
        
        // Check if IP is blocked
        if (SECURITY_CONFIG.ipBlocker.blockedCountries.includes(geoData.country_code)) {
            handleBlockedCountry(geoData.country_code);
        }
        
        // Check for TOR exit nodes, proxies, etc.
        await checkIPReputation(data.ip);
        
    } catch (error) {
        console.error('Error initializing IP validation:', error);
    }
}

// Check IP reputation against blocklists
async function checkIPReputation(ip) {
    try {
        // Check against TOR exit nodes
        const torResponse = await fetch(`https://check.torproject.org/exit-addresses`);
        const torData = await torResponse.text();
        const torIPs = torData.match(/\d+\.\d+\.\d+\.\d+/g) || [];
        
        if (torIPs.includes(ip)) {
            SECURITY_CONFIG.ipBlocker.torExitNodes.add(ip);
            console.log('🚨 TOR exit node detected');
        }
        
        // Check against proxy lists (simplified)
        const proxyLists = [
            'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
            'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt'
        ];
        
        for (const proxyList of proxyLists) {
            try {
                const proxyResponse = await fetch(proxyList);
                const proxyData = await proxyResponse.text();
                const proxyIPs = proxyData.match(/\d+\.\d+\.\d+\.\d+/g) || [];
                
                if (proxyIPs.includes(ip)) {
                    SECURITY_CONFIG.ipBlocker.proxyIPs.add(ip);
                    console.log('🚨 Proxy IP detected');
                    break;
                }
            } catch (error) {
                // Continue with next list
            }
        }
        
    } catch (error) {
        console.error('Error checking IP reputation:', error);
    }
}

// Handle blocked country access
function handleBlockedCountry(countryCode) {
    console.log(`🚫 Access blocked from country: ${countryCode}`);
    showSecurityAlert(`Access denied from your location (${countryCode})`);
    
    // Optionally redirect or show blocked page
    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Access Denied</h1>
            <p>Access to this website is not available from your location.</p>
            <p>Country: ${countryCode}</p>
        </div>
    `;
}

// Security Monitoring Functions
function initializeF12Detection() {
    let devtools = { open: false };
    const threshold = 160;
    
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                handleSecurityViolation('F12');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            handleSecurityViolation('F12');
        }
    });
}

function initializeRightClickProtection() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        handleSecurityViolation('right-click');
    });
}

function initializeCopyProtection() {
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        handleSecurityViolation('copy');
    });
    
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        handleSecurityViolation('cut');
    });
}

function initializeViewSourceProtection() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'U') {
            e.preventDefault();
            handleSecurityViolation('view-source');
        }
    });
}

function handleSecurityViolation(type) {
    const violations = {
        'F12': getRandomF12Joke(),
        'right-click': getRandomRightClickJoke(),
        'copy': getRandomCopyJoke(),
        'cut': getRandomCutJoke(),
        'view-source': getRandomViewSourceJoke()
    };
    
    securityState.violations.push({
        type: type,
        timestamp: new Date().toISOString(),
        ip: securityState.currentIP,
        country: securityState.userCountry
    });
    
    showSecurityAlert(violations[type] || 'Security violation detected.');
    console.warn(`🚨 Security violation: ${type}`);
}

// Random right-click jokes
function getRandomRightClickJoke() {
    const jokes = [
        "Right-click? More like wrong-click! 😄",
        "Nice try! But this isn't a right-click kind of website! 🎯",
        "Right-click denied! Try left-click instead! 👈",
        "Oops! Right-click is taking a coffee break! ☕",
        "Right-click says: 'Not today, friend!' 🛡️",
        "Right-click is on vacation! Try again later! 🏖️",
        "Right-click? In this economy? 😂",
        "Right-click is currently being shy! 🙈",
        "Right-click says: 'I'm not that kind of button!' 🎭",
        "Right-click is busy saving the world! 🌍",
        "Right-click? More like night-click! (Because it's not working!) 🌙",
        "Right-click is practicing social distancing! 📏",
        "Right-click says: 'I'm not your average right-click!' 🎪",
        "Right-click is currently being fabulous! ✨",
        "Right-click? That's so 2020! 😎",
        "Right-click is having an existential crisis! 🤔",
        "Right-click says: 'I'm not that easy!' 😏",
        "Right-click is currently being mysterious! 🕵️",
        "Right-click? In this neighborhood? 😅",
        "Right-click is busy being awesome! 🚀"
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Random F12 jokes
function getRandomF12Joke() {
    const jokes = [
        "F12? More like F-no! 😄",
        "Developer tools? In this economy? 😂",
        "F12 is currently on a lunch break! 🍕",
        "F12 says: 'I'm not that kind of key!' 🎭",
        "F12 is busy debugging the universe! 🌌",
        "F12? That's so last season! 😎",
        "F12 is having a midlife crisis! 🤔",
        "F12 says: 'I'm not that easy!' 😏",
        "F12 is currently being mysterious! 🕵️",
        "F12? In this neighborhood? 😅",
        "F12 is busy being awesome! 🚀",
        "F12 is practicing social distancing! 📏",
        "F12 says: 'Not today, developer!' 🛡️",
        "F12 is on vacation! Try again later! 🏖️",
        "F12 is currently being shy! 🙈"
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Random copy jokes
function getRandomCopyJoke() {
    const jokes = [
        "Copy? More like nope-y! 😄",
        "Copying is so 2020! 😂",
        "Copy says: 'I'm not that kind of function!' 🎭",
        "Copy is busy being original! ✨",
        "Copy? That's not very creative! 🎨",
        "Copy is having an existential crisis! 🤔",
        "Copy says: 'I'm not that easy!' 😏",
        "Copy is currently being mysterious! 🕵️",
        "Copy? In this economy? 😅",
        "Copy is busy being awesome! 🚀",
        "Copy is practicing social distancing! 📏",
        "Copy says: 'Not today, copier!' 🛡️",
        "Copy is on vacation! Try again later! 🏖️",
        "Copy is currently being shy! 🙈",
        "Copy is busy saving the world! 🌍"
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Random cut jokes
function getRandomCutJoke() {
    const jokes = [
        "Cut? More like don't! 😄",
        "Cutting is so aggressive! 😂",
        "Cut says: 'I'm not that kind of function!' 🎭",
        "Cut is busy being peaceful! ✌️",
        "Cut? That's not very nice! 🎨",
        "Cut is having an existential crisis! 🤔",
        "Cut says: 'I'm not that easy!' 😏",
        "Cut is currently being mysterious! 🕵️",
        "Cut? In this economy? 😅",
        "Cut is busy being awesome! 🚀",
        "Cut is practicing social distancing! 📏",
        "Cut says: 'Not today, cutter!' 🛡️",
        "Cut is on vacation! Try again later! 🏖️",
        "Cut is currently being shy! 🙈",
        "Cut is busy saving the world! 🌍"
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Random view source jokes
function getRandomViewSourceJoke() {
    const jokes = [
        "View source? More like view force! 😄",
        "View source? In this economy? 😂",
        "View source is currently on a lunch break! 🍕",
        "View source says: 'I'm not that kind of function!' 🎭",
        "View source is busy debugging the universe! 🌌",
        "View source? That's so last season! 😎",
        "View source is having a midlife crisis! 🤔",
        "View source says: 'I'm not that easy!' 😏",
        "View source is currently being mysterious! 🕵️",
        "View source? In this neighborhood? 😅",
        "View source is busy being awesome! 🚀",
        "View source is practicing social distancing! 📏",
        "View source says: 'Not today, viewer!' 🛡️",
        "View source is on vacation! Try again later! 🏖️",
        "View source is currently being shy! 🙈"
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
}

// Rate Limiting
function checkRateLimit() {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    
    // Reset counters if time has passed
    if (now - securityState.lastRequestTime > oneMinute) {
        securityState.requestCount = 0;
    }
    
    if (now - securityState.lastFormSubmissionTime > oneHour) {
        securityState.formSubmissionCount = 0;
    }
    
    // Check limits
    if (securityState.requestCount >= SECURITY_CONFIG.ipBlocker.maxRequestsPerMinute) {
        return false;
    }
    
    if (securityState.formSubmissionCount >= SECURITY_CONFIG.ipBlocker.maxFormSubmissionsPerHour) {
        return false;
    }
    
    // Increment request count
    securityState.requestCount++;
    securityState.lastRequestTime = now;
    
    return true;
}

// Security Alert System
function showSecurityAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'security-alert';
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        animation: slideIn 0.3s ease;
    `;
    
    alert.textContent = message;
    
    // Add animation styles if not already present
    if (!document.querySelector('#security-styles')) {
        const style = document.createElement('style');
        style.id = 'security-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .security-alert { animation: slideIn 0.3s ease; }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alert);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 5000);
}

// Initialize all event listeners
function initializeEventListeners() {
    // Search functionality with enhanced behavior
    searchBtn.addEventListener('click', performSearch);
    unifiedSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search input handling with auto-search
    unifiedSearch.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        const config = window.CONFIG?.search || {
            debounceTime: 800,
            minQueryLength: 3,
            autoSearch: true
        };
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (query.length === 0) {
            // User cleared the input, show default news
            isSearchMode = false;
            showDefaultNews();
        } else if (query.length >= config.minQueryLength && config.autoSearch) {
            // User is typing, perform auto-search after a short delay
            searchTimeout = setTimeout(() => {
                isSearchMode = true;
                hideDefaultNews();
                performSearch(); // Auto-search as user types
            }, config.debounceTime);
        }
    });

    // Clear results
    clearResults.addEventListener('click', clearSearchResults);

    // News category switching
    newsCategories.forEach(category => {
        category.addEventListener('click', function() {
            switchNewsCategory(this.dataset.category);
        });
    });

    // Contact form submission
    contactForm.addEventListener('submit', handleContactForm);

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Perform unified search with keyword-based article aggregation and security
async function performSearch() {
    const query = unifiedSearch.value.trim();
    if (!query) {
        // If no query, show default news
        showDefaultNews();
        return;
    }

    // Security check: Rate limiting
    if (SECURITY_CONFIG.security.enableRateLimiting && !checkRateLimit()) {
        showSecurityAlert('Too many search requests. Please wait before trying again.');
        return;
    }

    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    showSearchResults();
    resultsContainer.innerHTML = '<div class="loading">🔍 Analyzing articles and extracting keywords...</div>';

    try {
        let results = [];

        // Primary focus: Search all aggregated articles by keywords
        console.log(`🔍 Searching enhanced news for: "${query}"`);
        const enhancedNewsResults = await searchEnhancedNews(query);
        
        if (enhancedNewsResults.length > 0) {
            console.log(`✅ Found ${enhancedNewsResults.length} articles in enhanced news`);
            results = enhancedNewsResults;
            displaySearchResults(results, query, 'aggregated-articles');
        } else {
            console.log('⚠️ No articles found in enhanced news, trying copywriting resources');
            // Fallback to copywriting resources if no aggregated articles found
            resultsContainer.innerHTML = '<div class="loading">📝 No aggregated articles found. Searching copywriting resources...</div>';
            const copywritingResults = searchCopywritingResources(query);
            
            if (copywritingResults.length > 0) {
                console.log(`✅ Found ${copywritingResults.length} copywriting resources`);
                results = copywritingResults;
                displaySearchResults(results, query, 'copywriting');
            } else {
                console.log('⚠️ No copywriting resources found, trying Google News');
                // Final fallback to Google News
                resultsContainer.innerHTML = '<div class="loading">🌐 No copywriting resources found. Searching Google News...</div>';
                const newsResults = await searchGoogleNews(query);
                results = newsResults;
                displaySearchResults(results, query, 'news');
            }
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="message">
                    <p>No articles found for "${query}". Try different keywords or search options.</p>
                    <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                        💡 Tip: Try broader keywords or check if the enhanced news system is loaded properly.
                    </p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Search error:', error);
        resultsContainer.innerHTML = '<div class="message error">An error occurred while searching. Please try again.</div>';
    }
}

// Search enhanced news system with keyword analysis and labeling
async function searchEnhancedNews(query) {
    if (!enhancedNewsSystem) {
        console.log('⚠️ Enhanced news system not available');
        return [];
    }

    try {
        // Get all articles from enhanced news system
        const allArticles = enhancedNewsSystem.allArticles || [];
        
        console.log(`📊 Enhanced news system has ${allArticles.length} articles available`);
        
        if (allArticles.length === 0) {
            console.log('⚠️ No articles found in enhanced news system');
            
            // Try to reload articles if none are available
            if (enhancedNewsSystem.loadArticles) {
                console.log('🔄 Attempting to reload articles...');
                await enhancedNewsSystem.loadArticles();
                const reloadedArticles = enhancedNewsSystem.allArticles || [];
                console.log(`📊 Reloaded ${reloadedArticles.length} articles`);
                
                if (reloadedArticles.length === 0) {
                    return [];
                }
            } else {
                return [];
            }
        }
        
        // Filter articles based on query with enhanced keyword analysis
        const searchTerm = query.toLowerCase();
        const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
        
        console.log(`🔍 Filtering articles for: "${searchTerm}" (${searchWords.length} words)`);
        
        const filteredArticles = allArticles.filter(article => {
            const title = (article.title || '').toLowerCase();
            const description = (article.description || '').toLowerCase();
            const category = (article.category || '').toLowerCase();
            
            // Enhanced keyword matching with headline analysis
            const headlineKeywords = extractKeywordsFromHeadline(title);
            const descriptionKeywords = extractKeywordsFromText(description);
            
            // Check for exact phrase match first
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                return true;
            }
            
            // Check for individual word matches in headline and description
            const wordMatches = searchWords.filter(word => 
                title.includes(word) || description.includes(word) || 
                headlineKeywords.includes(word) || descriptionKeywords.includes(word)
            );
            
            // Return true if at least 30% of search words match (more lenient for article discovery)
            return wordMatches.length >= Math.ceil(searchWords.length * 0.3);
        });

        console.log(`📋 Found ${filteredArticles.length} matching articles`);

        // Analyze and label articles based on headlines
        const labeledArticles = filteredArticles.map(article => {
            const primaryKeyword = analyzePrimaryKeyword(article.title, article.description);
            const articleCategory = categorizeArticleByHeadline(article.title);
            
            return {
                title: article.title,
                source: article.source || article.feedName || 'Aggregated News',
                snippet: article.description || article.summary || '',
                url: article.link || article.url,
                publishedAt: article.pubDate || article.publishedAt,
                type: 'aggregated-articles',
                category: articleCategory,
                primaryKeyword: primaryKeyword,
                image: article.image || article.thumbnail,
                googleNewsUrl: generateGoogleNewsUrl(primaryKeyword, articleCategory),
                relevance: calculateArticleRelevance(article, searchTerm, searchWords)
            };
        });

        // Sort by relevance and return top results
        const sortedArticles = labeledArticles
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 15); // Show more results for better discovery

        console.log(`✅ Returning ${sortedArticles.length} sorted articles`);
        return sortedArticles;

    } catch (error) {
        console.error('❌ Error searching enhanced news:', error);
        return [];
    }
}

// Extract keywords from headline
function extractKeywordsFromHeadline(headline) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    
    return headline
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

// Extract keywords from text
function extractKeywordsFromText(text) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

// Analyze primary keyword from headline and description
function analyzePrimaryKeyword(headline, description) {
    const headlineKeywords = extractKeywordsFromHeadline(headline);
    const descriptionKeywords = extractKeywordsFromText(description);
    
    // Combine and count keyword frequency
    const allKeywords = [...headlineKeywords, ...descriptionKeywords];
    const keywordCount = {};
    
    allKeywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });
    
    // Return the most frequent keyword
    const sortedKeywords = Object.entries(keywordCount)
        .sort(([,a], [,b]) => b - a);
    
    return sortedKeywords.length > 0 ? sortedKeywords[0][0] : 'technology';
}

// Categorize article by headline analysis
function categorizeArticleByHeadline(headline) {
    const headlineLower = headline.toLowerCase();
    
    // AI and Machine Learning
    if (headlineLower.includes('ai') || headlineLower.includes('artificial intelligence') || 
        headlineLower.includes('machine learning') || headlineLower.includes('deep learning') ||
        headlineLower.includes('neural network') || headlineLower.includes('chatgpt') ||
        headlineLower.includes('openai') || headlineLower.includes('gpt')) {
        return 'AI & Machine Learning';
    }
    
    // Cybersecurity
    if (headlineLower.includes('cybersecurity') || headlineLower.includes('security') ||
        headlineLower.includes('hack') || headlineLower.includes('breach') ||
        headlineLower.includes('threat') || headlineLower.includes('vulnerability') ||
        headlineLower.includes('malware') || headlineLower.includes('ransomware')) {
        return 'Cybersecurity';
    }
    
    // Marketing and Business
    if (headlineLower.includes('marketing') || headlineLower.includes('business') ||
        headlineLower.includes('startup') || headlineLower.includes('entrepreneur') ||
        headlineLower.includes('growth') || headlineLower.includes('revenue') ||
        headlineLower.includes('strategy') || headlineLower.includes('brand')) {
        return 'Marketing & Business';
    }
    
    // Technology
    if (headlineLower.includes('tech') || headlineLower.includes('technology') ||
        headlineLower.includes('innovation') || headlineLower.includes('digital') ||
        headlineLower.includes('software') || headlineLower.includes('app') ||
        headlineLower.includes('platform') || headlineLower.includes('system')) {
        return 'Technology';
    }
    
    // Robotics and Automation
    if (headlineLower.includes('robot') || headlineLower.includes('automation') ||
        headlineLower.includes('autonomous') || headlineLower.includes('drone') ||
        headlineLower.includes('manufacturing') || headlineLower.includes('industrial')) {
        return 'Robotics & Automation';
    }
    
    // Space and Science
    if (headlineLower.includes('space') || headlineLower.includes('nasa') ||
        headlineLower.includes('satellite') || headlineLower.includes('astronomy') ||
        headlineLower.includes('research') || headlineLower.includes('scientific') ||
        headlineLower.includes('discovery')) {
        return 'Space & Science';
    }
    
    // Health and Bioengineering
    if (headlineLower.includes('health') || headlineLower.includes('medical') ||
        headlineLower.includes('bio') || headlineLower.includes('genetic') ||
        headlineLower.includes('drug') || headlineLower.includes('treatment') ||
        headlineLower.includes('clinical')) {
        return 'Health & Bioengineering';
    }
    
    // Cryptocurrency and Blockchain
    if (headlineLower.includes('crypto') || headlineLower.includes('bitcoin') ||
        headlineLower.includes('blockchain') || headlineLower.includes('nft') ||
        headlineLower.includes('defi') || headlineLower.includes('token')) {
        return 'Cryptocurrency & Blockchain';
    }
    
    // Transportation and Energy
    if (headlineLower.includes('transport') || headlineLower.includes('vehicle') ||
        headlineLower.includes('electric') || headlineLower.includes('energy') ||
        headlineLower.includes('solar') || headlineLower.includes('battery') ||
        headlineLower.includes('tesla') || headlineLower.includes('ev')) {
        return 'Transportation & Energy';
    }
    
    // Gaming and Entertainment
    if (headlineLower.includes('game') || headlineLower.includes('gaming') ||
        headlineLower.includes('entertainment') || headlineLower.includes('streaming') ||
        headlineLower.includes('esports') || headlineLower.includes('virtual reality')) {
        return 'Gaming & Entertainment';
    }
    
    // Default category
    return 'Technology & Innovation';
}

// Calculate article relevance score
function calculateArticleRelevance(article, searchTerm, searchWords) {
    const title = article.title.toLowerCase();
    const description = (article.description || '').toLowerCase();
    let score = 0;
    
    // Exact phrase match gets highest score
    if (title.includes(searchTerm)) score += 20;
    if (description.includes(searchTerm)) score += 15;
    
    // Individual word matches
    searchWords.forEach(word => {
        if (title.includes(word)) score += 5;
        if (description.includes(word)) score += 3;
        if (article.category && article.category.toLowerCase().includes(word)) score += 2;
    });
    
    // Boost score for recent articles
    if (article.publishedAt) {
        const publishDate = new Date(article.publishedAt);
        const now = new Date();
        const daysDiff = (now - publishDate) / (1000 * 60 * 60 * 24);
        if (daysDiff <= 1) score += 10; // Very recent
        else if (daysDiff <= 7) score += 5; // Recent
        else if (daysDiff <= 30) score += 2; // Somewhat recent
    }
    
    return score;
}

// Search copywriting resources with enhanced matching
function searchCopywritingResources(query) {
    const searchTerm = query.toLowerCase();
    const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
    
    return copywritingResources.filter(resource => {
        const title = resource.title.toLowerCase();
        const snippet = resource.snippet.toLowerCase();
        const category = resource.category.toLowerCase();
        
        // Check for exact phrase match first
        if (title.includes(searchTerm) || snippet.includes(searchTerm)) {
            return true;
        }
        
        // Check for individual word matches
        const wordMatches = searchWords.filter(word => 
            title.includes(word) || snippet.includes(word) || category.includes(word)
        );
        
        // Return true if at least 50% of search words match
        return wordMatches.length >= Math.ceil(searchWords.length * 0.5);
    }).map(resource => ({
        ...resource,
        type: 'copywriting',
        relevance: calculateRelevance(resource, searchTerm, searchWords)
    })).sort((a, b) => b.relevance - a.relevance); // Sort by relevance
}

// Calculate relevance score for search results
function calculateRelevance(resource, searchTerm, searchWords) {
    const title = resource.title.toLowerCase();
    const snippet = resource.snippet.toLowerCase();
    let score = 0;
    
    // Exact phrase match gets highest score
    if (title.includes(searchTerm)) score += 10;
    if (snippet.includes(searchTerm)) score += 8;
    
    // Individual word matches
    searchWords.forEach(word => {
        if (title.includes(word)) score += 3;
        if (snippet.includes(word)) score += 2;
        if (resource.category.includes(word)) score += 1;
    });
    
    return score;
}

// Generate Google News URL with enhanced parameters
function generateGoogleNewsUrl(query, category = null) {
    const config = window.CONFIG?.googleNews || {
        baseUrl: "https://news.google.com/search",
        parameters: {
            hl: "en-US",
            gl: "US",
            ceid: "US:en"
        }
    };
    
    // Add category-specific keywords if provided
    let searchQuery = query;
    if (category && enhancedNewsCategories[category]) {
        searchQuery = `${query} ${enhancedNewsCategories[category].replace(/\+/g, ' ')}`;
    }
    
    const params = new URLSearchParams({
        q: searchQuery,
        ...config.parameters
    });
    
    return `${config.baseUrl}?${params.toString()}`;
}

// Search Google News with enhanced relevance
async function searchGoogleNews(query) {
    const categoryKeywords = newsCategoriesMap[currentNewsCategory] || 'copywriting+marketing';
    
    // Create more relevant news results based on the current category and search query
    const mockNewsResults = [
        {
            title: `Latest ${query} trends in ${currentNewsCategory} industry`,
            source: getCategorySpecificSource(currentNewsCategory),
            snippet: `Discover the latest developments in ${query} and how they're shaping the future of ${currentNewsCategory}.`,
            url: generateGoogleNewsUrl(query, currentNewsCategory),
            publishedAt: new Date().toISOString(),
            type: 'news',
            googleNewsUrl: generateGoogleNewsUrl(query, currentNewsCategory)
        },
        {
            title: `How ${query} is revolutionizing ${currentNewsCategory} practices`,
            source: getCategorySpecificSource(currentNewsCategory),
            snippet: `Experts weigh in on how ${query} is changing the way professionals approach ${currentNewsCategory}.`,
            url: generateGoogleNewsUrl(query + ' ' + currentNewsCategory),
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            type: 'news',
            googleNewsUrl: generateGoogleNewsUrl(query + ' ' + currentNewsCategory)
        },
        {
            title: `The future of ${query} in ${currentNewsCategory} for 2024`,
            source: getCategorySpecificSource(currentNewsCategory),
            snippet: `A comprehensive look at what's ahead for ${query} and its impact on ${currentNewsCategory} strategies.`,
            url: generateGoogleNewsUrl(query + ' 2024 ' + currentNewsCategory),
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            type: 'news',
            googleNewsUrl: generateGoogleNewsUrl(query + ' 2024 ' + currentNewsCategory)
        }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockNewsResults;
}

// Get category-specific news sources
function getCategorySpecificSource(category) {
    const sources = {
        'copywriting': 'Copywriting Weekly',
        'marketing': 'Marketing Today',
        'advertising': 'Advertising Age',
        'business': 'Business Weekly'
    };
    return sources[category] || 'Industry News';
}

// Display search results with keyword-based labeling
function displaySearchResults(results, query, resultType = 'mixed') {
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="message">
                <p>No articles found for "${query}". Try different keywords or search options.</p>
            </div>
        `;
        return;
    }

    // Add result type indicator based on configuration
    const config = window.CONFIG?.search || { showResultType: true };
    let resultTypeIndicator = '';
    
    if (config.showResultType) {
        if (resultType === 'aggregated-articles') {
            resultTypeIndicator = `<div class="result-type-indicator aggregated-articles-indicator"><i class="fas fa-newspaper"></i> Aggregated Articles (${results.length} results for "${query}")</div>`;
        } else if (resultType === 'copywriting') {
            resultTypeIndicator = '<div class="result-type-indicator copywriting-indicator"><i class="fas fa-pen-fancy"></i> Copywriting Resources</div>';
        } else if (resultType === 'news') {
            resultTypeIndicator = '<div class="result-type-indicator news-indicator"><i class="fas fa-newspaper"></i> Google News Results</div>';
        }
    }

    const resultsHTML = results.map(result => `
        <div class="result-item">
            <div class="result-title">
                <a href="${result.url || '#'}" target="_blank" ${result.googleNewsUrl ? `onclick="handleNewsClick(event, '${result.googleNewsUrl}')"` : ''}>${result.title}</a>
                ${result.type === 'aggregated-articles' ? `<span class="badge aggregated-articles">${result.category || 'Technology'}</span>` : 
                  result.type === 'copywriting' ? '<span class="badge copywriting">Copywriting</span>' : 
                  '<span class="badge news">News</span>'}
            </div>
            <div class="result-source">
                ${result.source}
                ${result.primaryKeyword ? `<span class="keyword-tag">#${result.primaryKeyword}</span>` : ''}
            </div>
            <div class="result-snippet">${result.snippet}</div>
            <div class="result-meta">
                ${result.publishedAt ? `<div class="result-date">${formatDate(result.publishedAt)}</div>` : ''}
                ${result.category && result.type === 'aggregated-articles' ? `<div class="result-category">${result.category}</div>` : ''}
                ${result.googleNewsUrl ? `
                    <a href="${result.googleNewsUrl}" target="_blank" class="google-news-link" title="View on Google News">
                        <i class="fas fa-external-link-alt"></i> Google News
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = resultTypeIndicator + resultsHTML;
}

// Show search results section
function showSearchResults() {
    searchResults.style.display = 'block';
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

// Clear search results
function clearSearchResults() {
    searchResults.style.display = 'none';
    unifiedSearch.value = '';
    resultsContainer.innerHTML = '';
    isSearchMode = false;
    showDefaultNews();
}

// Load default news
async function loadDefaultNews() {
    await loadNewsByCategory('copywriting');
}

// Switch news category
async function switchNewsCategory(category) {
    // Update active category button
    newsCategories.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    currentNewsCategory = category;
    
    if (!isSearchMode) {
        await loadNewsByCategory(category);
    }
}

// Load news by category
async function loadNewsByCategory(category) {
    showNewsLoading();
    
    try {
        // Try enhanced news system first
        if (enhancedNewsSystem) {
            const enhancedNewsData = await getEnhancedNewsByCategory(category);
            if (enhancedNewsData.length > 0) {
                defaultNewsData = enhancedNewsData;
                displayNews(enhancedNewsData);
                hideNewsLoading();
                return;
            }
        }
        
        // Fallback to regular news data
        const newsData = await fetchNewsData(category);
        defaultNewsData = newsData; // Store for later use
        displayNews(newsData);
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<div class="message error">Failed to load news. Please try again later.</div>';
    } finally {
        hideNewsLoading();
    }
}

// Get enhanced news by category
async function getEnhancedNewsByCategory(category) {
    if (!enhancedNewsSystem) {
        return [];
    }

    try {
        const allArticles = enhancedNewsSystem.allArticles || [];
        
        // Filter by category
        const categoryArticles = allArticles.filter(article => 
            article.category && article.category.toLowerCase() === category.toLowerCase()
        );

        // Convert to unified format
        return categoryArticles.map(article => ({
            title: article.title,
            source: article.source || article.feedName || 'Enhanced News',
            excerpt: article.description || article.summary || '',
            url: article.link || article.url,
            publishedAt: article.pubDate || article.publishedAt,
            image: article.image || article.thumbnail,
            googleNewsUrl: generateGoogleNewsUrl(article.title, article.category)
        })).slice(0, 6); // Limit to 6 results for display

    } catch (error) {
        console.error('Error getting enhanced news by category:', error);
        return [];
    }
}

// Show default news
function showDefaultNews() {
    if (defaultNewsData.length > 0) {
        displayNews(defaultNewsData);
    } else {
        loadNewsByCategory(currentNewsCategory);
    }
}

// Hide default news
function hideDefaultNews() {
    newsContainer.innerHTML = '<div class="message">Start typing to search for specific content...</div>';
}

// Display news
function displayNews(newsData) {
    const newsHTML = newsData.map(news => `
        <div class="news-item">
            <div class="news-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-content">
                <h3 class="news-title">
                    <a href="${news.url}" target="_blank" onclick="handleNewsClick(event, '${news.googleNewsUrl}')">${news.title}</a>
                </h3>
                <div class="news-source">${news.source}</div>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <span>${formatDate(news.publishedAt)}</span>
                    <div class="news-actions">
                        <a href="${news.url}" target="_blank" class="read-more">Read More →</a>
                        <a href="${news.googleNewsUrl}" target="_blank" class="google-news-link" title="View on Google News">
                            <i class="fas fa-external-link-alt"></i> Google News
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    newsContainer.innerHTML = newsHTML;
}

// Show news loading
function showNewsLoading() {
    newsLoading.style.display = 'block';
    newsContainer.style.opacity = '0.5';
}

// Hide news loading
function hideNewsLoading() {
    newsLoading.style.display = 'none';
    newsContainer.style.opacity = '1';
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        
    } catch (error) {
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before the form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize ad space
function initializeAdSpace() {
    const adSpace = document.getElementById('adSpace');
    
    // Simulate ad loading
    setTimeout(() => {
        adSpace.innerHTML = `
            <div class="ad-content">
                <h4>Premium Copywriting Services</h4>
                <p>Get professional copywriting that converts</p>
                <button class="ad-cta">Learn More</button>
            </div>
        `;
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
}

// Handle news click with fallback to Google News
function handleNewsClick(event, googleNewsUrl) {
    // Try to open the original URL first
    const originalUrl = event.target.href;
    
    // If the original URL fails or is not accessible, redirect to Google News
    try {
        // For demo purposes, we'll always redirect to Google News
        // In a real implementation, you might want to check if the original URL is accessible
        event.preventDefault();
        window.open(googleNewsUrl, '_blank');
    } catch (error) {
        // Fallback to Google News if there's an error
        event.preventDefault();
        window.open(googleNewsUrl, '_blank');
    }
}

// Real Google News Integration (for production use)
// Note: This would require a news API service like NewsAPI, GNews, or similar
async function searchGoogleNewsAPI(query) {
    // Example implementation with a real API
    /*
    const API_KEY = 'your_api_key_here';
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&language=en&sortBy=publishedAt`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data.articles.map(article => ({
        title: article.title,
        source: article.source.name,
        snippet: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        type: 'news',
        googleNewsUrl: `https://news.google.com/search?q=${encodeURIComponent(article.title)}&hl=en-US&gl=US&ceid=US:en`
    }));
    */
    
    // For demo purposes, return mock data
    return searchGoogleNews(query);
}

// Fetch news data with enhanced category-specific content
async function fetchNewsData(category) {
    const categoryKeywords = newsCategoriesMap[category] || 'copywriting+marketing';
    
    // Create category-specific news data
    const categoryNewsData = getCategorySpecificNews(category);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return categoryNewsData;
}

// Get category-specific news data
function getCategorySpecificNews(category) {
    const today = new Date();
    const newsTemplates = {
        'copywriting': [
            {
                title: "AI-Powered Copywriting Tools Transforming the Industry in 2024",
                source: "Copywriting Weekly",
                excerpt: "Artificial intelligence is revolutionizing copywriting with tools that help create more engaging, personalized content faster than ever before.",
                publishedAt: new Date(today.getTime() - 1800000).toISOString(), // 30 minutes ago
                url: generateGoogleNewsUrl("AI copywriting tools 2024", category),
                image: "ai-copywriting",
                googleNewsUrl: generateGoogleNewsUrl("AI copywriting tools 2024", category)
            },
            {
                title: "The Psychology Behind High-Converting Headlines",
                source: "Copywriting Psychology",
                excerpt: "New research reveals the psychological triggers that make headlines irresistible and drive higher click-through rates.",
                publishedAt: new Date(today.getTime() - 3600000).toISOString(), // 1 hour ago
                url: generateGoogleNewsUrl("psychology headlines conversion", category),
                image: "headlines",
                googleNewsUrl: generateGoogleNewsUrl("psychology headlines conversion", category)
            },
            {
                title: "Email Copywriting Strategies That Boost Open Rates by 300%",
                source: "Email Marketing Pro",
                excerpt: "Discover the latest email copywriting techniques that are dramatically increasing open rates and engagement.",
                publishedAt: new Date(today.getTime() - 5400000).toISOString(), // 1.5 hours ago
                url: generateGoogleNewsUrl("email copywriting open rates", category),
                image: "email-marketing",
                googleNewsUrl: generateGoogleNewsUrl("email copywriting open rates", category)
            },
            {
                title: "SEO Copywriting: Balancing Keywords with Natural Flow",
                source: "SEO Copywriting Today",
                excerpt: "Learn how to write SEO-optimized content that ranks well while maintaining excellent readability and user engagement.",
                publishedAt: new Date(today.getTime() - 7200000).toISOString(), // 2 hours ago
                url: generateGoogleNewsUrl("SEO copywriting keywords readability", category),
                image: "seo-copywriting",
                googleNewsUrl: generateGoogleNewsUrl("SEO copywriting keywords readability", category)
            },
            {
                title: "Social Media Copywriting Trends for 2024",
                source: "Social Media Copy",
                excerpt: "Stay ahead with these emerging social media copywriting trends that are reshaping digital marketing strategies.",
                publishedAt: new Date(today.getTime() - 9000000).toISOString(), // 2.5 hours ago
                url: generateGoogleNewsUrl("social media copywriting trends 2024", category),
                image: "social-media",
                googleNewsUrl: generateGoogleNewsUrl("social media copywriting trends 2024", category)
            },
            {
                title: "Landing Page Copywriting: The Complete Guide",
                source: "Conversion Copywriting",
                excerpt: "Master the art of landing page copywriting with proven techniques that convert visitors into customers.",
                publishedAt: new Date(today.getTime() - 10800000).toISOString(), // 3 hours ago
                url: generateGoogleNewsUrl("landing page copywriting conversion", category),
                image: "landing-page",
                googleNewsUrl: generateGoogleNewsUrl("landing page copywriting conversion", category)
            }
        ],
        'marketing': [
            {
                title: "Digital Marketing Trends That Will Dominate 2024",
                source: "Marketing Today",
                excerpt: "From AI-powered campaigns to voice search optimization, discover the marketing trends that will shape the industry this year.",
                publishedAt: new Date(today.getTime() - 1800000).toISOString(),
                url: generateGoogleNewsUrl("digital marketing trends 2024", category),
                image: "digital-marketing",
                googleNewsUrl: generateGoogleNewsUrl("digital marketing trends 2024", category)
            },
            {
                title: "Growth Hacking Strategies for Startups",
                source: "Growth Marketing Weekly",
                excerpt: "Learn the growth hacking techniques that successful startups use to scale rapidly and acquire customers efficiently.",
                publishedAt: new Date(today.getTime() - 3600000).toISOString(),
                url: generateGoogleNewsUrl("growth hacking startups", category),
                image: "growth-hacking",
                googleNewsUrl: generateGoogleNewsUrl("growth hacking startups", category)
            },
            {
                title: "Brand Building in the Digital Age",
                source: "Brand Strategy Today",
                excerpt: "How to build a strong brand presence in today's digital landscape with effective marketing strategies.",
                publishedAt: new Date(today.getTime() - 5400000).toISOString(),
                url: generateGoogleNewsUrl("brand building digital marketing", category),
                image: "brand-building",
                googleNewsUrl: generateGoogleNewsUrl("brand building digital marketing", category)
            },
            {
                title: "Content Marketing ROI: Measuring What Matters",
                source: "Content Marketing Institute",
                excerpt: "Discover the key metrics and strategies for measuring the return on investment in content marketing campaigns.",
                publishedAt: new Date(today.getTime() - 7200000).toISOString(),
                url: generateGoogleNewsUrl("content marketing ROI metrics", category),
                image: "content-marketing",
                googleNewsUrl: generateGoogleNewsUrl("content marketing ROI metrics", category)
            },
            {
                title: "Influencer Marketing: The New Rules of Engagement",
                source: "Influencer Marketing Weekly",
                excerpt: "Navigate the evolving landscape of influencer marketing with updated strategies and best practices.",
                publishedAt: new Date(today.getTime() - 9000000).toISOString(),
                url: generateGoogleNewsUrl("influencer marketing strategies", category),
                image: "influencer-marketing",
                googleNewsUrl: generateGoogleNewsUrl("influencer marketing strategies", category)
            },
            {
                title: "Customer Journey Mapping for Better Marketing",
                source: "Customer Experience Today",
                excerpt: "Learn how to map customer journeys to create more effective marketing campaigns and improve conversion rates.",
                publishedAt: new Date(today.getTime() - 10800000).toISOString(),
                url: generateGoogleNewsUrl("customer journey mapping marketing", category),
                image: "customer-journey",
                googleNewsUrl: generateGoogleNewsUrl("customer journey mapping marketing", category)
            }
        ],
        'advertising': [
            {
                title: "Programmatic Advertising: The Future of Ad Buying",
                source: "Advertising Age",
                excerpt: "How programmatic advertising is revolutionizing the way brands buy and place ads across digital platforms.",
                publishedAt: new Date(today.getTime() - 1800000).toISOString(),
                url: generateGoogleNewsUrl("programmatic advertising future", category),
                image: "programmatic",
                googleNewsUrl: generateGoogleNewsUrl("programmatic advertising future", category)
            },
            {
                title: "Social Media Advertising Trends for 2024",
                source: "Social Media Advertising Today",
                excerpt: "Stay ahead of the curve with the latest social media advertising trends and strategies.",
                publishedAt: new Date(today.getTime() - 3600000).toISOString(),
                url: generateGoogleNewsUrl("social media advertising trends 2024", category),
                image: "social-ads",
                googleNewsUrl: generateGoogleNewsUrl("social media advertising trends 2024", category)
            },
            {
                title: "PPC Campaign Optimization Strategies",
                source: "PPC Weekly",
                excerpt: "Master the art of PPC campaign optimization with proven strategies that improve ROI and reduce costs.",
                publishedAt: new Date(today.getTime() - 5400000).toISOString(),
                url: generateGoogleNewsUrl("PPC campaign optimization", category),
                image: "ppc",
                googleNewsUrl: generateGoogleNewsUrl("PPC campaign optimization", category)
            },
            {
                title: "Creative Advertising: Breaking Through the Noise",
                source: "Creative Advertising Today",
                excerpt: "Learn how to create advertising campaigns that stand out in today's crowded digital landscape.",
                publishedAt: new Date(today.getTime() - 7200000).toISOString(),
                url: generateGoogleNewsUrl("creative advertising campaigns", category),
                image: "creative-ads",
                googleNewsUrl: generateGoogleNewsUrl("creative advertising campaigns", category)
            },
            {
                title: "Video Advertising: The Rise of Short-Form Content",
                source: "Video Marketing Weekly",
                excerpt: "How short-form video content is transforming advertising and creating new opportunities for brands.",
                publishedAt: new Date(today.getTime() - 9000000).toISOString(),
                url: generateGoogleNewsUrl("video advertising short-form content", category),
                image: "video-ads",
                googleNewsUrl: generateGoogleNewsUrl("video advertising short-form content", category)
            },
            {
                title: "Retargeting Strategies That Convert",
                source: "Retargeting Today",
                excerpt: "Master the art of retargeting with strategies that bring back potential customers and drive conversions.",
                publishedAt: new Date(today.getTime() - 10800000).toISOString(),
                url: generateGoogleNewsUrl("retargeting strategies conversion", category),
                image: "retargeting",
                googleNewsUrl: generateGoogleNewsUrl("retargeting strategies conversion", category)
            }
        ],
        'business': [
            {
                title: "Startup Funding Trends in 2024",
                source: "Business Weekly",
                excerpt: "An analysis of the latest startup funding trends and what investors are looking for in 2024.",
                publishedAt: new Date(today.getTime() - 1800000).toISOString(),
                url: generateGoogleNewsUrl("startup funding trends 2024", category),
                image: "startup-funding",
                googleNewsUrl: generateGoogleNewsUrl("startup funding trends 2024", category)
            },
            {
                title: "Leadership Strategies for Remote Teams",
                source: "Leadership Today",
                excerpt: "Effective leadership strategies for managing and motivating remote teams in the post-pandemic workplace.",
                publishedAt: new Date(today.getTime() - 3600000).toISOString(),
                url: generateGoogleNewsUrl("leadership remote teams", category),
                image: "remote-leadership",
                googleNewsUrl: generateGoogleNewsUrl("leadership remote teams", category)
            },
            {
                title: "Small Business Growth Strategies",
                source: "Small Business Weekly",
                excerpt: "Proven strategies for small business growth in today's competitive market landscape.",
                publishedAt: new Date(today.getTime() - 5400000).toISOString(),
                url: generateGoogleNewsUrl("small business growth strategies", category),
                image: "small-business",
                googleNewsUrl: generateGoogleNewsUrl("small business growth strategies", category)
            },
            {
                title: "Entrepreneurship: Building a Successful Business",
                source: "Entrepreneur Weekly",
                excerpt: "Essential insights for entrepreneurs looking to build and scale successful businesses.",
                publishedAt: new Date(today.getTime() - 7200000).toISOString(),
                url: generateGoogleNewsUrl("entrepreneurship successful business", category),
                image: "entrepreneurship",
                googleNewsUrl: generateGoogleNewsUrl("entrepreneurship successful business", category)
            },
            {
                title: "Digital Transformation in Business",
                source: "Digital Business Today",
                excerpt: "How businesses are embracing digital transformation to stay competitive and meet evolving customer needs.",
                publishedAt: new Date(today.getTime() - 9000000).toISOString(),
                url: generateGoogleNewsUrl("digital transformation business", category),
                image: "digital-transformation",
                googleNewsUrl: generateGoogleNewsUrl("digital transformation business", category)
            },
            {
                title: "Customer Experience: The Key to Business Success",
                source: "Customer Experience Weekly",
                excerpt: "Why customer experience is becoming the primary differentiator for businesses in today's market.",
                publishedAt: new Date(today.getTime() - 10800000).toISOString(),
                url: generateGoogleNewsUrl("customer experience business success", category),
                image: "customer-experience",
                googleNewsUrl: generateGoogleNewsUrl("customer experience business success", category)
            }
        ]
    };

    return newsTemplates[category] || newsTemplates['copywriting'];
}

// Add CSS for badges
const style = document.createElement('style');
style.textContent = `
    .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-left: 0.5rem;
    }
    
    .badge.copywriting {
        background: #e3f2fd;
        color: #1976d2;
    }
    
    .badge.enhanced-news {
        background: #e8f5e8;
        color: #2e7d32;
    }
    
    .badge.news {
        background: #f3e5f5;
        color: #7b1fa2;
    }
    
    .result-date {
        color: #999;
        font-size: 0.85rem;
        margin-top: 0.5rem;
    }
    
    .read-more {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
    }
    
    .read-more:hover {
        text-decoration: underline;
    }
    
    .ad-content {
        text-align: center;
        padding: 1rem;
    }
    
    .ad-content h4 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .ad-content p {
        color: #666;
        margin-bottom: 1rem;
    }
    
    .ad-cta {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .ad-cta:hover {
        transform: translateY(-1px);
    }
    
    .loading {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .enhanced-news-indicator {
        background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
        color: white;
    }
`;
document.head.appendChild(style); 