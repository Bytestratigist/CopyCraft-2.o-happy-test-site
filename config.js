// CopyCraft Configuration File
// Update these settings to customize your website

const CONFIG = {
    // Website Information
    site: {
        name: "CopyCraft",
        tagline: "Professional Copywriting & News Platform",
        description: "Professional copywriting services with integrated news search and ad revenue optimization",
        url: "https://copycraft.com",
        email: "hello@copycraft.com",
        phone: "+1 (555) 123-4567"
    },

    // Google News API Configuration
    newsAPI: {
        enabled: false, // Set to true to enable real Google News API
        apiKey: "your_news_api_key_here", // Get from https://newsapi.org/
        baseUrl: "https://newsapi.org/v2",
        categories: {
            copywriting: "copywriting+marketing+writing",
            marketing: "digital+marketing+advertising",
            advertising: "advertising+marketing+ads",
            business: "business+entrepreneurship+startup"
        },
        maxResults: 6,
        language: "en",
        sortBy: "publishedAt"
    },

    // Google News URL Configuration
    googleNews: {
        baseUrl: "https://news.google.com/search",
        parameters: {
            hl: "en-US", // Language
            gl: "US",    // Country
            ceid: "US:en" // Edition
        },
        fallbackEnabled: true, // Enable fallback to Google News if original URL fails
        redirectToGoogleNews: true // Always redirect to Google News for demo
    },

    // Article Aggregation System Configuration
    articleAggregation: {
        enabled: true, // Enable article aggregation as primary search
        autoLoad: true, // Automatically load aggregated articles on page load
        maxResults: 15, // Maximum results to show from aggregated articles
        keywordAnalysis: true, // Enable keyword analysis and labeling
        headlineAnalysis: true, // Enable headline-based categorization
        categories: {
            'AI & Machine Learning': 'artificial+intelligence+machine+learning+AI+technology',
            'Cybersecurity': 'cybersecurity+security+hacking+threat+intelligence',
            'Marketing & Business': 'digital+marketing+advertising+business+startup',
            'Technology': 'technology+innovation+startup+tech+trends',
            'Robotics & Automation': 'robotics+automation+AI+technology+innovation',
            'Space & Science': 'space+NASA+spacex+astronomy+technology',
            'Health & Bioengineering': 'bioengineering+biotechnology+health+medical+innovation',
            'Cryptocurrency & Blockchain': 'cryptocurrency+blockchain+bitcoin+crypto+trading',
            'Transportation & Energy': 'transportation+automotive+electric+vehicles+innovation',
            'Gaming & Entertainment': 'gaming+entertainment+esports+virtual+reality'
        },
        fallbackToCopywriting: true, // Fallback to copywriting resources if no articles found
        fallbackToGoogleNews: true, // Fallback to Google News as final option
        showKeywordTags: true, // Show primary keyword tags in results
        showCategoryLabels: true // Show category labels in results
    },

    // Search Configuration
    search: {
        maxResults: 10,
        debounceTime: 800, // milliseconds for auto-search
        minQueryLength: 3,
        highlightTerms: true,
        saveHistory: true,
        maxHistoryItems: 10,
        autoSearch: true, // Enable auto-search as user types
        smartFallback: true, // Automatically fallback to Google News if no copywriting results
        showResultType: true // Show whether results are from copywriting or news
    },

    // Ad Configuration
    ads: {
        enabled: true,
        positions: {
            sidebar: true,
            content: false,
            footer: false
        },
        adSense: {
            enabled: false,
            clientId: "your_adsense_client_id",
            adSlots: {
                sidebar: "your_sidebar_ad_slot",
                content: "your_content_ad_slot",
                footer: "your_footer_ad_slot"
            }
        }
    },

    // Analytics Configuration
    analytics: {
        googleAnalytics: {
            enabled: false,
            trackingId: "GA_MEASUREMENT_ID"
        },
        facebookPixel: {
            enabled: false,
            pixelId: "your_pixel_id"
        },
        customEvents: {
            searchPerformed: true,
            newsViewed: true,
            contactSubmitted: true,
            serviceClicked: true
        }
    },

    // Contact Form Configuration
    contact: {
        services: [
            { value: "ad-copy", label: "Ad Copy" },
            { value: "website-content", label: "Website Content" },
            { value: "email-marketing", label: "Email Marketing" },
            { value: "blog-content", label: "Blog Content" },
            { value: "seo-copywriting", label: "SEO Copywriting" },
            { value: "social-media", label: "Social Media Copy" }
        ],
        responseTime: "Within 24 hours",
        autoReply: true,
        emailNotifications: true
    },

    // Social Media Links
    social: {
        linkedin: "https://linkedin.com/company/copycraft",
        twitter: "https://twitter.com/copycraft",
        facebook: "https://facebook.com/copycraft",
        instagram: "https://instagram.com/copycraft"
    },

    // Color Scheme (CSS Variables)
    colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#ff6b6b",
        success: "#28a745",
        warning: "#ffc107",
        error: "#dc3545",
        text: "#333333",
        textLight: "#666666",
        background: "#ffffff",
        backgroundLight: "#f8f9fa"
    },

    // Performance Settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        minifyAssets: true,
        cacheControl: true,
        compression: true
    },

    // SEO Configuration
    seo: {
        titleTemplate: "%s | CopyCraft",
        defaultTitle: "Professional Copywriting Services",
        defaultDescription: "Professional copywriting services with integrated news search and ad revenue optimization",
        keywords: "copywriting, content writing, ad copy, SEO copywriting, email marketing, website content",
        author: "CopyCraft",
        ogImage: "/images/og-image.jpg",
        twitterCard: "summary_large_image"
    },

    // Feature Flags
    features: {
        unifiedSearch: true,
        newsIntegration: true,
        contactForm: true,
        portfolio: true,
        services: true,
        mobileMenu: true,
        smoothScrolling: true,
        loadingAnimations: true
    },

    // Copywriting Resources Database
    resources: [
        {
            title: "The Ultimate Guide to Writing Compelling Ad Copy",
            source: "CopyCraft",
            snippet: "Learn the proven techniques for creating ad copy that converts. From headlines to CTAs, master the art of persuasive writing.",
            category: "ad-copy",
            tags: ["ad copy", "conversion", "headlines", "CTAs"]
        },
        {
            title: "SEO Copywriting: How to Rank Higher in Search Results",
            source: "CopyCraft",
            snippet: "Discover the secrets of SEO copywriting that helps your content rank higher in search engines while engaging readers.",
            category: "seo",
            tags: ["SEO", "search engines", "ranking", "content"]
        },
        {
            title: "Email Marketing Copy That Drives Action",
            source: "CopyCraft",
            snippet: "Transform your email campaigns with copywriting strategies that increase open rates and drive conversions.",
            category: "email",
            tags: ["email marketing", "open rates", "conversions", "campaigns"]
        },
        {
            title: "Landing Page Copywriting Best Practices",
            source: "CopyCraft",
            snippet: "Create landing pages that convert visitors into customers with these proven copywriting techniques.",
            category: "landing-page",
            tags: ["landing pages", "conversion", "visitors", "customers"]
        },
        {
            title: "Social Media Copywriting for Better Engagement",
            source: "CopyCraft",
            snippet: "Master the art of writing compelling social media posts that increase engagement and drive traffic.",
            category: "social-media",
            tags: ["social media", "engagement", "posts", "traffic"]
        },
        {
            title: "Product Description Writing That Sells",
            source: "CopyCraft",
            snippet: "Learn how to write product descriptions that highlight benefits and drive sales for your e-commerce business.",
            category: "product-description",
            tags: ["product descriptions", "e-commerce", "sales", "benefits"]
        },
        {
            title: "Blog Post Copywriting: From Ideas to Published Content",
            source: "CopyCraft",
            snippet: "A comprehensive guide to writing blog posts that engage readers and establish your authority in your industry.",
            category: "blog",
            tags: ["blog posts", "content", "authority", "readers"]
        },
        {
            title: "Copywriting Psychology: Understanding Your Audience",
            source: "CopyCraft",
            snippet: "Dive deep into the psychology of copywriting and learn how to connect with your target audience on a deeper level.",
            category: "psychology",
            tags: ["psychology", "audience", "connection", "target"]
        }
    ],

    // Portfolio Items
    portfolio: [
        {
            title: "E-commerce Brand",
            description: "Increased conversion rate by 45% through optimized product descriptions",
            stats: ["45% ↑ Conversion", "2.3x ROI"],
            category: "e-commerce",
            icon: "fas fa-chart-line"
        },
        {
            title: "SaaS Company",
            description: "Generated 300+ qualified leads through targeted email campaigns",
            stats: ["300+ Leads", "28% Open Rate"],
            category: "saas",
            icon: "fas fa-users"
        },
        {
            title: "Local Business",
            description: "Achieved first-page Google rankings for 15 target keywords",
            stats: ["15 Keywords", "Page 1 Rankings"],
            category: "local",
            icon: "fas fa-search"
        }
    ],

    // Services Configuration
    services: [
        {
            title: "Ad Copy",
            description: "Compelling advertising copy that converts and drives sales",
            icon: "fas fa-ad",
            features: ["Google Ads", "Social Media Ads", "Display Advertising"],
            category: "advertising"
        },
        {
            title: "Website Content",
            description: "SEO-optimized website content that ranks and engages",
            icon: "fas fa-globe",
            features: ["Landing Pages", "Product Descriptions", "About Pages"],
            category: "web-content"
        },
        {
            title: "Email Marketing",
            description: "Email campaigns that nurture leads and boost conversions",
            icon: "fas fa-envelope",
            features: ["Newsletter Content", "Drip Campaigns", "Promotional Emails"],
            category: "email"
        },
        {
            title: "Blog Content",
            description: "Engaging blog posts that establish authority and drive traffic",
            icon: "fas fa-blog",
            features: ["SEO Articles", "Thought Leadership", "Industry Insights"],
            category: "blog"
        }
    ]
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    // Make CONFIG available globally for browser use
    window.CONFIG = CONFIG;
} 