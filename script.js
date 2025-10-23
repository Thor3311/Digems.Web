
    // search engine
    // Data contoh (bisa diganti dengan API call)
const searchData = [
    {
        id: 1,
        title: "Belajar JavaScript Modern",
        content: "JavaScript adalah bahasa pemrograman yang sangat powerful untuk pengembangan web. Dalam tutorial ini kita akan mempelajari ES6+ features, async/await, dan best practices terbaru.",
        category: "programming",
        tags: ["javascript", "web", "frontend"],
        date: "2024-01-15",
        author: "John Doe",
        readTime: "5 min"
    },
    {
        id: 2,
        title: "CSS Grid Layout Tutorial",
        content: "CSS Grid memungkinkan kita membuat layout yang kompleks dengan mudah. Pelajari cara menggunakan grid-template-areas, fr units, dan responsive grid design.",
        category: "programming",
        tags: ["css", "layout", "responsive"],
        date: "2024-01-12",
        author: "Jane Smith",
        readTime: "8 min"
    },
    {
        id: 3,
        title: "UI/UX Design Principles",
        content: "Prinsip desain antarmuka pengguna yang baik meliputi konsistensi, feedback, dan simplicity. Pelajari bagaimana membuat pengalaman pengguna yang menyenangkan.",
        category: "design",
        tags: ["design", "ui", "ux"],
        date: "2024-01-10",
        author: "Mike Johnson",
        readTime: "6 min"
    },
    {
        id: 4,
        title: "React.js untuk Pemula",
        content: "React adalah library JavaScript populer untuk membangun user interface. Mulai dari komponen dasar hingga state management dengan hooks.",
        category: "programming",
        tags: ["react", "javascript", "frontend"],
        date: "2024-01-08",
        author: "Sarah Wilson",
        readTime: "10 min"
    },
    {
        id: 5,
        title: "Startup Business Model Canvas",
        content: "Business Model Canvas membantu startup mendefinisikan model bisnis mereka. Pelajari 9 blok bangunan penting untuk kesuksesan bisnis.",
        category: "business",
        tags: ["business", "startup", "canvas"],
        date: "2024-01-05",
        author: "David Brown",
        readTime: "7 min"
    },
    {
        id: 6,
        title: "Python Data Analysis dengan Pandas",
        content: "Pandas adalah library Python yang powerful untuk analisis data. Pelajari manipulasi data, cleaning, dan visualization dengan contoh nyata.",
        category: "programming",
        tags: ["python", "data", "analysis"],
        date: "2024-01-03",
        author: "Lisa Chen",
        readTime: "12 min"
    },
    {
        id: 7,
        title: "Responsive Web Design",
        content: "Teknik membuat website yang tampil optimal di semua device. Gunakan media queries, flexible grids, dan responsive images.",
        category: "design",
        tags: ["responsive", "css", "web"],
        date: "2023-12-28",
        author: "Alex Kumar",
        readTime: "9 min"
    },
    {
        id: 8,
        title: "Node.js Backend Development",
        content: "Bangun backend yang scalable dengan Node.js dan Express. Pelajari routing, middleware, database integration, dan deployment.",
        category: "programming",
        tags: ["nodejs", "backend", "javascript"],
        date: "2023-12-25",
        author: "Robert Taylor",
        readTime: "11 min"
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const resultsContainer = document.getElementById('resultsContainer');
const resultsStats = document.getElementById('resultsStats');
const loadingIndicator = document.getElementById('loadingIndicator');
const noResults = document.getElementById('noResults');

// Search Configuration
const config = {
    minSearchLength: 2,
    debounceDelay: 300,
    maxResults: 50
};

// Initialize Search Engine
class SearchEngine {
    constructor(data) {
        this.data = data;
        this.currentResults = [];
        this.initEventListeners();
    }

    initEventListeners() {
        // Search on button click
        searchButton.addEventListener('click', () => {
            this.performSearch();
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Real-time search with debounce
        searchInput.addEventListener('input', this.debounce(() => {
            if (searchInput.value.length >= config.minSearchLength || searchInput.value.length === 0) {
                this.performSearch();
            }
        }, config.debounceDelay));

        // Filter changes
        categoryFilter.addEventListener('change', () => {
            this.performSearch();
        });

        sortBy.addEventListener('change', () => {
            this.displayResults(this.currentResults);
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const category = categoryFilter.value;

        // Show loading
        this.showLoading();

        // Simulate API delay
        setTimeout(() => {
            let results = this.data;

            // Filter by search term
            if (searchTerm.length >= config.minSearchLength) {
                results = results.filter(item =>
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.content.toLowerCase().includes(searchTerm) ||
                    item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    item.author.toLowerCase().includes(searchTerm)
                );
            }

            // Filter by category
            if (category) {
                results = results.filter(item => item.category === category);
            }

            // Store current results
            this.currentResults = results;

            // Display results
            this.displayResults(results);

            // Hide loading
            this.hideLoading();
        }, 500);
    }

    displayResults(results) {
        // Sort results
        const sortedResults = this.sortResults(results);

        // Update stats
        this.updateStats(sortedResults.length);

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Show/hide no results message
        if (sortedResults.length === 0) {
            noResults.style.display = 'block';
            resultsContainer.style.display = 'none';
            return;
        } else {
            noResults.style.display = 'none';
            resultsContainer.style.display = 'grid';
        }

        // Display each result
        sortedResults.forEach(item => {
            const resultElement = this.createResultElement(item);
            resultsContainer.appendChild(resultElement);
        });
    }

    sortResults(results) {
        const sortValue = sortBy.value;
        
        switch (sortValue) {
            case 'newest':
                return [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'oldest':
                return [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
            case 'relevance':
            default:
                return results;
        }
    }

    createResultElement(item) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        resultDiv.addEventListener('click', () => {
            this.handleResultClick(item);
        });

        const highlightedTitle = this.highlightText(item.title, searchTerm);
        const highlightedContent = this.highlightText(item.content.substring(0, 150) + '...', searchTerm);

        resultDiv.innerHTML = `
            <h3>${highlightedTitle}</h3>
            <p>${highlightedContent}</p>
            <div class="result-meta">
                <span class="result-tag">${item.category}</span>
                <span>Oleh: ${item.author}</span>
                <span>${item.date}</span>
                <span>${item.readTime} baca</span>
            </div>
            <div class="tags">
                ${item.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
            </div>
        `;

        return resultDiv;
    }

    highlightText(text, searchTerm) {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    updateStats(count) {
        const searchTerm = searchInput.value.trim();
        let statsText = '';

        if (searchTerm) {
            statsText = `Ditemukan ${count} hasil untuk "${searchTerm}"`;
        } else {
            statsText = `Menampilkan ${count} artikel`;
        }

        if (categoryFilter.value) {
            statsText += ` dalam kategori "${categoryFilter.options[categoryFilter.selectedIndex].text}"`;
        }

        resultsStats.textContent = statsText;
    }

    showLoading() {
        loadingIndicator.style.display = 'block';
        resultsContainer.style.display = 'none';
        noResults.style.display = 'none';
    }

    hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    handleResultClick(item) {
        // Simulate opening article
        alert(`Membuka artikel: ${item.title}\n\nFitur ini bisa diarahkan ke halaman detail artikel.`);
        
        // Dalam implementasi nyata, bisa redirect ke:
        // window.location.href = `/article/${item.id}`;
    }
}

// Initialize search engine ketika DOM siap
document.addEventListener('DOMContentLoaded', () => {
    const searchEngine = new SearchEngine(searchData);
    
    // Perform initial search to show all articles
    searchEngine.performSearch();
});

// Optional: Add some utility functions
const utils = {
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
};