/**
 * TaniTrack - Chart Manager (Chart.js Integration)
 * Mengelola rendering dan update grafik interaktif pada Dashboard dengan dukungan Tema Dark/Light & Bahasa.
 */

let landComparisonChartInstance = null;
let categoryExpenseChartInstance = null;

/**
 * Inisialisasi atau Update Grafik Dashboard
 */
function renderDashboardCharts(lands, expenses, harvests, selectedLandId = 'all') {
    renderLandComparisonChart(lands, expenses, harvests, selectedLandId);
    renderCategoryExpenseChart(expenses, selectedLandId);
}

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        textColor: isDark ? '#cbd5e1' : '#334155',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
        borderColor: isDark ? '#1c2541' : '#ffffff'
    };
}

/**
 * Grafik 1: Perbandingan Biaya vs Pendapatan per Lahan
 */
function renderLandComparisonChart(lands, expenses, harvests, selectedLandId) {
    const ctx = document.getElementById('chartLandComparison');
    if (!ctx) return;

    const colors = getChartColors();
    const activeLands = selectedLandId === 'all' 
        ? lands 
        : lands.filter(l => l.id === selectedLandId);

    const lang = state?.language || 'id';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.id;

    const labels = activeLands.map(l => l.name);
    const expenseData = activeLands.map(l => {
        return expenses
            .filter(e => e.landId === l.id)
            .reduce((sum, e) => sum + Number(e.amount), 0);
    });

    const revenueData = activeLands.map(l => {
        return harvests
            .filter(h => h.landId === l.id)
            .reduce((sum, h) => sum + (Number(h.quantity) * Number(h.pricePerUnit)), 0);
    });

    if (landComparisonChartInstance) {
        landComparisonChartInstance.destroy();
    }

    landComparisonChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.length ? labels : ['-'],
            datasets: [
                {
                    label: dict.dashboard.totalExpense + ' (Rp)',
                    data: expenseData.length ? expenseData : [0],
                    backgroundColor: '#ef4444',
                    borderRadius: 6,
                    maxBarThickness: 45
                },
                {
                    label: dict.dashboard.totalRevenue + ' (Rp)',
                    data: revenueData.length ? revenueData : [0],
                    backgroundColor: '#10b981',
                    borderRadius: 6,
                    maxBarThickness: 45
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: colors.textColor,
                        font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
                        padding: 16,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colors.textColor,
                        font: { family: 'Plus Jakarta Sans', size: 11 },
                        callback: function(value) {
                            if (value >= 1000000) return 'Rp ' + (value / 1000000) + ' Jt';
                            if (value >= 1000) return 'Rp ' + (value / 1000) + ' Rb';
                            return 'Rp ' + value;
                        }
                    },
                    grid: { color: colors.gridColor }
                },
                x: {
                    ticks: { color: colors.textColor, font: { family: 'Plus Jakarta Sans', size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
}

/**
 * Grafik 2: Alokasi Kategori Biaya Usaha Tani (Doughnut Chart)
 */
function renderCategoryExpenseChart(expenses, selectedLandId) {
    const ctx = document.getElementById('chartCategoryExpense');
    if (!ctx) return;

    const colors = getChartColors();
    const lang = state?.language || 'id';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.id;

    const filteredExpenses = selectedLandId === 'all'
        ? expenses
        : expenses.filter(e => e.landId === selectedLandId);

    const categoriesRaw = ['Benih/Bibit', 'Pupuk', 'Pestisida', 'Tenaga kerja', 'Transportasi', 'Biaya lainnya'];
    const categoriesTranslated = categoriesRaw.map(cat => dict.categories[cat] || cat);

    const categoryColors = ['#0d9488', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];

    const categorySums = categoriesRaw.map(cat => {
        return filteredExpenses
            .filter(e => e.category === cat)
            .reduce((sum, e) => sum + Number(e.amount), 0);
    });

    const hasData = categorySums.some(val => val > 0);

    if (categoryExpenseChartInstance) {
        categoryExpenseChartInstance.destroy();
    }

    categoryExpenseChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: hasData ? categoriesTranslated : [dict.badges.noData],
            datasets: [{
                data: hasData ? categorySums : [1],
                backgroundColor: hasData ? categoryColors : ['#334155'],
                borderWidth: 2,
                borderColor: colors.borderColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: colors.textColor,
                        font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
                        padding: 14,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    enabled: hasData,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.parsed || 0;
                            let formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
                            return ` ${label}: ${formatted}`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}
