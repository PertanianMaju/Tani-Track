/**
 * TaniTrack - Main Application Controller
 * Mengelola state data, LocalStorage, routing SPA, modal form, kalkulasi otomatis, BEP, Tema Dark/Light, dan 4 Bahasa (ID, EN, TH, JP).
 */

// Key LocalStorage
const STORAGE_KEY = 'tanitrack_data_v1';
const THEME_KEY = 'tanitrack_theme_v1';
const LANG_KEY = 'tanitrack_lang_v1';

// App State
let state = {
    lands: [],
    expenses: [],
    harvests: [],
    activeTab: 'beranda',
    dashboardFilterLand: 'all',
    reportFilterLand: 'all',
    editingItem: { type: null, id: null },
    theme: 'light',
    language: 'id'
};

// --- Inisialisasi Aplikasi ---
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    initTheme();
    initLanguage();
    setupNavigation();
    setupModals();
    setupFormListeners();
    setupFilters();
    renderAllViews();
});

/**
 * Memuat state dari LocalStorage atau menginisialisasi dengan INITIAL_DATA
 */
function loadStateFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            state.lands = Array.isArray(parsed.lands) ? parsed.lands : [];
            state.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
            state.harvests = Array.isArray(parsed.harvests) ? parsed.harvests : [];
        } catch (e) {
            console.error('Gagal membaca LocalStorage, memuat dummy data', e);
            state.lands = [...INITIAL_DATA.lands];
            state.expenses = [...INITIAL_DATA.expenses];
            state.harvests = [...INITIAL_DATA.harvests];
            saveStateToStorage();
        }
    } else {
        state.lands = [...INITIAL_DATA.lands];
        state.expenses = [...INITIAL_DATA.expenses];
        state.harvests = [...INITIAL_DATA.harvests];
        saveStateToStorage();
    }
}

/**
 * Menyimpan state ke LocalStorage
 */
function saveStateToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        lands: state.lands,
        expenses: state.expenses,
        harvests: state.harvests
    }));
}

/**
 * Inisialisasi & Switch Tema (Dark Mode / Light Mode)
 */
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    renderDashboardCharts(state.lands, state.expenses, state.harvests, state.dashboardFilterLand);
}

/**
 * Inisialisasi & Switch Bahasa (ID, EN, TH, JP)
 */
function initLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY) || 'id';
    const langSel = document.getElementById('langSelect');
    if (langSel) {
        langSel.value = savedLang;
        langSel.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    setLanguage(savedLang);
}

function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations();
    renderAllViews();
}

function getDict() {
    return TRANSLATIONS[state.language] || TRANSLATIONS.id;
}

function applyTranslations() {
    const dict = getDict();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keyPath = el.getAttribute('data-i18n').split('.');
        let val = dict;
        for (const k of keyPath) {
            if (val && val[k] !== undefined) {
                val = val[k];
            } else {
                val = null;
                break;
            }
        }

        if (val && typeof val === 'string') {
            el.textContent = val;
        }
    });

    // Update placeholders
    const searchInput = document.getElementById('searchExpenseInput');
    if (searchInput) {
        searchInput.placeholder = dict.biaya.searchPlaceholder;
    }
}

/**
 * Reset Data ke Data Contoh (Preset Demo Data)
 */
function resetToPresetData() {
    if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke Data Contoh usahatani? Data yang telah diubah akan diganti.')) {
        state.lands = [...INITIAL_DATA.lands];
        state.expenses = [...INITIAL_DATA.expenses];
        state.harvests = [...INITIAL_DATA.harvests];
        saveStateToStorage();
        renderAllViews();
        showToast('Data berhasil di-reset ke Data Contoh!', 'success');
    }
}

/**
 * Hapus Semua Data
 */
function clearAllData() {
    if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus SELURUH data lahan, biaya, dan hasil panen? Action ini tidak dapat dibatalkan.')) {
        state.lands = [];
        state.expenses = [];
        state.harvests = [];
        saveStateToStorage();
        renderAllViews();
        showToast('Seluruh data berhasil dihapus.', 'danger');
    }
}

// --- Navigation SPA ---
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-link-btn');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    const heroCta = document.getElementById('btnStartRecording');
    if (heroCta) {
        heroCta.addEventListener('click', () => switchTab('dashboard'));
    }
}

function switchTab(tabId) {
    state.activeTab = tabId;
    
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.page-view').forEach(view => {
        if (view.id === `page-${tabId}`) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });

    renderAllViews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Formatters & Helper Utilities ---
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(amount || 0);
}

function formatNumber(num, decimals = 1) {
    return new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: 0
    }).format(num || 0);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const langMap = { id: 'id-ID', en: 'en-US', th: 'th-TH', ja: 'ja-JP' };
    return new Intl.DateTimeFormat(langMap[state.language] || 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date);
}

function getLandNameById(landId) {
    const land = state.lands.find(l => l.id === landId);
    return land ? land.name : 'Lahan Tidak Ditemukan';
}

function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// --- Modals Setup ---
function setupModals() {
    const overlays = document.querySelectorAll('.modal-overlay');
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    document.querySelectorAll('.modal-close, .btn-cancel-modal').forEach(btn => {
        btn.addEventListener('click', () => closeAllModals());
    });
}

function openModal(modalId, isEdit = false, itemData = null) {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });

    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (form) form.reset();

    populateLandSelects();

    if (isEdit && itemData) {
        state.editingItem = { 
            type: modalId.replace('modal', '').toLowerCase(), 
            id: itemData.id 
        };
        populateFormForEdit(modalId, itemData);
    } else {
        state.editingItem = { type: null, id: null };
        const today = new Date().toISOString().split('T')[0];
        if (modalId === 'modalExpense') document.getElementById('expenseDateInput').value = today;
        if (modalId === 'modalHarvest') {
            document.getElementById('harvestDateInput').value = today;
            updateHarvestPreview();
        }
    }

    modal.classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    state.editingItem = { type: null, id: null };
}

function populateLandSelects() {
    const selects = [
        'expenseLandSelect', 'harvestLandSelect', 
        'pageExpenseLandSelect', 'pageHarvestLandSelect',
        'dashboardLandFilter', 'reportLandFilter'
    ];

    const dict = getDict();

    selects.forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;

        const isFilter = id.includes('Filter');
        const currentValue = sel.value;

        sel.innerHTML = isFilter 
            ? `<option value="all">${dict.dashboard.allLands}</option>` 
            : `<option value="" disabled selected>-- ${dict.biaya.landLabel} --</option>`;

        state.lands.forEach(land => {
            const opt = document.createElement('option');
            opt.value = land.id;
            opt.textContent = `${land.name} (${land.commodity})`;
            sel.appendChild(opt);
        });

        if (currentValue && sel.querySelector(`option[value="${currentValue}"]`)) {
            sel.value = currentValue;
        } else if (!isFilter && state.lands.length > 0) {
            sel.value = state.lands[0].id;
        }
    });
}

function populateFormForEdit(modalId, data) {
    const dict = getDict();
    if (modalId === 'modalLand') {
        document.getElementById('landNameInput').value = data.name;
        document.getElementById('landAreaInput').value = data.area;
        document.getElementById('landCommodityInput').value = data.commodity;
        document.getElementById('landAgeInput').value = data.age || '';
        document.getElementById('landLocationInput').value = data.location || '';
        document.getElementById('modalLandTitle').textContent = dict.lahan.formTitle;
    } else if (modalId === 'modalExpense') {
        document.getElementById('expenseDateInput').value = data.date;
        document.getElementById('expenseLandSelect').value = data.landId;
        document.getElementById('expenseCategorySelect').value = data.category;
        document.getElementById('expenseNoteInput').value = data.note;
        document.getElementById('expenseAmountInput').value = data.amount;
        document.getElementById('modalExpenseTitle').textContent = dict.biaya.formTitle;
    } else if (modalId === 'modalHarvest') {
        document.getElementById('harvestDateInput').value = data.date;
        document.getElementById('harvestLandSelect').value = data.landId;
        document.getElementById('harvestCommodityInput').value = data.commodity;
        document.getElementById('harvestQuantityInput').value = data.quantity;
        document.getElementById('harvestUnitInput').value = data.unit;
        document.getElementById('harvestPriceInput').value = data.pricePerUnit;
        updateHarvestPreview();
        document.getElementById('modalHarvestTitle').textContent = dict.panen.formTitle;
    }
}

// --- CRUD Handlers ---

function handleSaveLand(name, area, commodity, age, location, isEdit = false, id = null) {
    name = (name || '').trim();
    area = parseFloat(area) || 0;
    commodity = (commodity || '').trim();
    age = (age || '').trim();
    location = (location || '').trim();

    if (!name || area <= 0 || !commodity) {
        showToast('Mohon isi Nama Lahan, Luas Lahan (ha), dan Komoditas!', 'danger');
        return false;
    }

    if (isEdit && id) {
        const idx = state.lands.findIndex(l => l.id === id);
        if (idx !== -1) {
            state.lands[idx] = { ...state.lands[idx], name, area, commodity, age, location };
            showToast('Data lahan berhasil diperbarui!', 'success');
        }
    } else {
        const newLand = {
            id: generateId('land'),
            name, area, commodity, age, location,
            createdAt: new Date().toISOString().split('T')[0]
        };
        state.lands.push(newLand);
        showToast('🌾 Data Lahan Baru Berhasil Disimpan!', 'success');
    }

    saveStateToStorage();
    renderAllViews();
    return true;
}

function handleSaveExpense(date, landId, category, note, amount, isEdit = false, id = null) {
    date = date || new Date().toISOString().split('T')[0];
    landId = landId || (state.lands.length > 0 ? state.lands[0].id : '');
    category = category || 'Biaya lainnya';
    note = (note || '').trim();
    amount = parseFloat(amount) || 0;

    if (!landId) {
        showToast('Belum ada lahan terdaftar. Mohon daftarkan Lahan terlebih dahulu!', 'danger');
        return false;
    }

    if (amount <= 0 || !note) {
        showToast('Mohon isi Keterangan dan Jumlah Biaya (Rp) dengan benar!', 'danger');
        return false;
    }

    if (isEdit && id) {
        const idx = state.expenses.findIndex(ex => ex.id === id);
        if (idx !== -1) {
            state.expenses[idx] = { ...state.expenses[idx], date, landId, category, note, amount };
            showToast('Catatan biaya berhasil diperbarui!', 'success');
        }
    } else {
        const newExp = {
            id: generateId('exp'),
            date, landId, category, note, amount
        };
        state.expenses.push(newExp);
        showToast('💸 Catatan Biaya Usaha Tani Berhasil Disimpan!', 'success');
    }

    saveStateToStorage();
    renderAllViews();
    return true;
}

function handleSaveHarvest(date, landId, commodity, quantity, unit, pricePerUnit, isEdit = false, id = null) {
    date = date || new Date().toISOString().split('T')[0];
    landId = landId || (state.lands.length > 0 ? state.lands[0].id : '');
    commodity = (commodity || '').trim();
    quantity = parseFloat(quantity) || 0;
    unit = (unit || 'kg').trim();
    pricePerUnit = parseFloat(pricePerUnit) || 0;

    if (!landId) {
        showToast('Belum ada lahan terdaftar. Mohon daftarkan Lahan terlebih dahulu!', 'danger');
        return false;
    }

    if (quantity <= 0 || pricePerUnit <= 0 || !commodity) {
        showToast('Mohon lengkapi Komoditas, Jumlah Panen, dan Harga Jual!', 'danger');
        return false;
    }

    if (isEdit && id) {
        const idx = state.harvests.findIndex(h => h.id === id);
        if (idx !== -1) {
            state.harvests[idx] = { ...state.harvests[idx], date, landId, commodity, quantity, unit, pricePerUnit };
            showToast('Data panen berhasil diperbarui!', 'success');
        }
    } else {
        const newHrv = {
            id: generateId('hrv'),
            date, landId, commodity, quantity, unit, pricePerUnit
        };
        state.harvests.push(newHrv);
        showToast('🌽 Catatan Hasil Panen Berhasil Disimpan!', 'success');
    }

    saveStateToStorage();
    renderAllViews();
    return true;
}

// --- Setup Form Event Listeners ---
function setupFormListeners() {
    const formLand = document.getElementById('formLand');
    if (formLand) {
        formLand.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveLand(
                document.getElementById('landNameInput').value,
                document.getElementById('landAreaInput').value,
                document.getElementById('landCommodityInput').value,
                document.getElementById('landAgeInput').value,
                document.getElementById('landLocationInput').value,
                state.editingItem.type === 'land',
                state.editingItem.id
            );
            if (success) closeAllModals();
        });
    }

    const pageFormLand = document.getElementById('pageFormLand');
    if (pageFormLand) {
        pageFormLand.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveLand(
                document.getElementById('pageLandNameInput').value,
                document.getElementById('pageLandAreaInput').value,
                document.getElementById('pageLandCommodityInput').value,
                document.getElementById('pageLandAgeInput').value,
                document.getElementById('pageLandLocationInput').value
            );
            if (success) pageFormLand.reset();
        });
    }

    const formExpense = document.getElementById('formExpense');
    if (formExpense) {
        formExpense.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveExpense(
                document.getElementById('expenseDateInput').value,
                document.getElementById('expenseLandSelect').value,
                document.getElementById('expenseCategorySelect').value,
                document.getElementById('expenseNoteInput').value,
                document.getElementById('expenseAmountInput').value,
                state.editingItem.type === 'expense',
                state.editingItem.id
            );
            if (success) closeAllModals();
        });
    }

    const pageFormExpense = document.getElementById('pageFormExpense');
    if (pageFormExpense) {
        pageFormExpense.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveExpense(
                document.getElementById('pageExpenseDateInput').value,
                document.getElementById('pageExpenseLandSelect').value,
                document.getElementById('pageExpenseCategorySelect').value,
                document.getElementById('pageExpenseNoteInput').value,
                document.getElementById('pageExpenseAmountInput').value
            );
            if (success) {
                pageFormExpense.reset();
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('pageExpenseDateInput').value = today;
            }
        });
    }

    const formHarvest = document.getElementById('formHarvest');
    if (formHarvest) {
        const qtyInput = document.getElementById('harvestQuantityInput');
        const priceInput = document.getElementById('harvestPriceInput');
        const landSelect = document.getElementById('harvestLandSelect');

        if (qtyInput) qtyInput.addEventListener('input', updateHarvestPreview);
        if (priceInput) priceInput.addEventListener('input', updateHarvestPreview);

        if (landSelect) {
            landSelect.addEventListener('change', () => {
                const selectedLand = state.lands.find(l => l.id === landSelect.value);
                if (selectedLand && !document.getElementById('harvestCommodityInput').value) {
                    document.getElementById('harvestCommodityInput').value = selectedLand.commodity;
                }
                updateHarvestPreview();
            });
        }

        formHarvest.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveHarvest(
                document.getElementById('harvestDateInput').value,
                document.getElementById('harvestLandSelect').value,
                document.getElementById('harvestCommodityInput').value,
                document.getElementById('harvestQuantityInput').value,
                document.getElementById('harvestUnitInput').value,
                document.getElementById('harvestPriceInput').value,
                state.editingItem.type === 'harvest',
                state.editingItem.id
            );
            if (success) closeAllModals();
        });
    }

    const pageFormHarvest = document.getElementById('pageFormHarvest');
    if (pageFormHarvest) {
        const pQtyInput = document.getElementById('pageHarvestQuantityInput');
        const pPriceInput = document.getElementById('pageHarvestPriceInput');
        const pLandSelect = document.getElementById('pageHarvestLandSelect');

        function updatePageHarvestPreview() {
            const qty = parseFloat(document.getElementById('pageHarvestQuantityInput').value) || 0;
            const price = parseFloat(document.getElementById('pageHarvestPriceInput').value) || 0;
            const prevEl = document.getElementById('pageHarvestTotalPreview');
            if (prevEl) prevEl.textContent = formatCurrency(qty * price);
        }

        if (pQtyInput) pQtyInput.addEventListener('input', updatePageHarvestPreview);
        if (pPriceInput) pPriceInput.addEventListener('input', updatePageHarvestPreview);

        if (pLandSelect) {
            pLandSelect.addEventListener('change', () => {
                const selectedLand = state.lands.find(l => l.id === pLandSelect.value);
                if (selectedLand && !document.getElementById('pageHarvestCommodityInput').value) {
                    document.getElementById('pageHarvestCommodityInput').value = selectedLand.commodity;
                }
                updatePageHarvestPreview();
            });
        }

        pageFormHarvest.addEventListener('submit', (e) => {
            e.preventDefault();
            const success = handleSaveHarvest(
                document.getElementById('pageHarvestDateInput').value,
                document.getElementById('pageHarvestLandSelect').value,
                document.getElementById('pageHarvestCommodityInput').value,
                document.getElementById('pageHarvestQuantityInput').value,
                document.getElementById('pageHarvestUnitInput').value,
                document.getElementById('pageHarvestPriceInput').value
            );
            if (success) {
                pageFormHarvest.reset();
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('pageHarvestDateInput').value = today;
                updatePageHarvestPreview();
            }
        });
    }
}

/**
 * Update Live Calculations inside Harvest Modal Form (Revenue & Live BEP Check)
 */
function updateHarvestPreview() {
    const qty = parseFloat(document.getElementById('harvestQuantityInput')?.value) || 0;
    const price = parseFloat(document.getElementById('harvestPriceInput')?.value) || 0;
    const landId = document.getElementById('harvestLandSelect')?.value;

    const previewRevenueEl = document.getElementById('harvestTotalPreview');
    const previewBepEl = document.getElementById('harvestBepPreview');

    const totalRevenue = qty * price;
    if (previewRevenueEl) {
        previewRevenueEl.textContent = formatCurrency(totalRevenue);
    }

    if (previewBepEl) {
        if (!landId || landId === '') {
            previewBepEl.textContent = 'Pilih lahan untuk melihat BEP Titik Impas';
            return;
        }

        const landExpenses = state.expenses
            .filter(e => e.landId === landId)
            .reduce((sum, e) => sum + Number(e.amount), 0);

        if (landExpenses === 0) {
            previewBepEl.textContent = 'Belum ada pengeluaran biaya tercatat untuk lahan ini.';
        } else {
            const bepHarga = qty > 0 ? (landExpenses / qty) : 0;
            const bepProduksi = price > 0 ? (landExpenses / price) : 0;
            
            let statusText = '';
            if (price > bepHarga && qty > 0) {
                statusText = ` ✅ (Harga Anda Rp ${price.toLocaleString('id-ID')}/satuan di atas BEP Harga ${formatCurrency(bepHarga)})`;
            } else if (price < bepHarga && price > 0) {
                statusText = ` ⚠️ (Harga Anda di bawah BEP Harga ${formatCurrency(bepHarga)})`;
            }

            previewBepEl.innerHTML = `
                <strong>BEP Harga Impas:</strong> ${formatCurrency(bepHarga)}/satuan | 
                <strong>BEP Panen Minimal:</strong> ${formatNumber(bepProduksi)} satuan
                <div style="margin-top:0.2rem; font-weight:600;">${statusText}</div>
            `;
        }
    }
}

// --- Setup Filters ---
function setupFilters() {
    const dashFilter = document.getElementById('dashboardLandFilter');
    if (dashFilter) {
        dashFilter.addEventListener('change', (e) => {
            state.dashboardFilterLand = e.target.value;
            renderDashboard();
        });
    }

    const reportFilter = document.getElementById('reportLandFilter');
    if (reportFilter) {
        reportFilter.addEventListener('change', (e) => {
            state.reportFilterLand = e.target.value;
            renderReportView();
        });
    }

    const searchExpense = document.getElementById('searchExpenseInput');
    if (searchExpense) {
        searchExpense.addEventListener('input', () => renderExpensesTable());
    }

    const filterCategory = document.getElementById('filterExpenseCategory');
    if (filterCategory) {
        filterCategory.addEventListener('change', () => renderExpensesTable());
    }
}

// --- Delete Handlers ---
function deleteLand(id) {
    const land = state.lands.find(l => l.id === id);
    if (!land) return;

    if (confirm(`Apakah Anda yakin ingin menghapus lahan "${land.name}"? Catatan biaya dan panen terkait akan tetap tersimpan.`)) {
        state.lands = state.lands.filter(l => l.id !== id);
        saveStateToStorage();
        renderAllViews();
        showToast('Lahan berhasil dihapus.', 'success');
    }
}

function deleteExpense(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan biaya ini?')) {
        state.expenses = state.expenses.filter(ex => ex.id !== id);
        saveStateToStorage();
        renderAllViews();
        showToast('Catatan biaya dihapus.', 'success');
    }
}

function deleteHarvest(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan hasil panen ini?')) {
        state.harvests = state.harvests.filter(h => h.id !== id);
        saveStateToStorage();
        renderAllViews();
        showToast('Catatan panen dihapus.', 'success');
    }
}

// --- Edit Handlers ---
function editLand(id) {
    const land = state.lands.find(l => l.id === id);
    if (!land) return;
    openModal('modalLand', true, land);
}

function editExpense(id) {
    const exp = state.expenses.find(e => e.id === id);
    if (!exp) return;
    openModal('modalExpense', true, exp);
}

function editHarvest(id) {
    const hrv = state.harvests.find(h => h.id === id);
    if (!hrv) return;
    openModal('modalHarvest', true, hrv);
}

// --- Rendering Views ---
function renderAllViews() {
    populateLandSelects();
    renderDashboard();
    renderLandsView();
    renderExpensesTable();
    renderHarvestsTable();
    renderReportView();
    applyTranslations();
}

/**
 * 1. Render Dashboard Page
 */
function renderDashboard() {
    const dict = getDict();
    const landId = state.dashboardFilterLand;

    const filteredExpenses = landId === 'all' 
        ? state.expenses 
        : state.expenses.filter(e => e.landId === landId);

    const filteredHarvests = landId === 'all' 
        ? state.harvests 
        : state.harvests.filter(h => h.landId === landId);

    const filteredLands = landId === 'all' 
        ? state.lands 
        : state.lands.filter(l => l.id === landId);

    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalRevenue = filteredHarvests.reduce((sum, h) => sum + (Number(h.quantity) * Number(h.pricePerUnit)), 0);
    const profit = totalRevenue - totalExpenses;
    
    const rcRatio = totalExpenses > 0 ? (totalRevenue / totalExpenses) : (totalRevenue > 0 ? 99 : 0);

    const totalHarvestQty = filteredHarvests.reduce((sum, h) => sum + Number(h.quantity), 0);
    const avgPrice = totalHarvestQty > 0 ? (totalRevenue / totalHarvestQty) : 0;

    const bepProduksi = avgPrice > 0 ? (totalExpenses / avgPrice) : 0;
    const bepHarga = totalHarvestQty > 0 ? (totalExpenses / totalHarvestQty) : 0;

    const totalArea = filteredLands.reduce((sum, l) => sum + Number(l.area), 0);

    const dashExpEl = document.getElementById('dashTotalExpense');
    if (dashExpEl) dashExpEl.textContent = formatCurrency(totalExpenses);
    
    const dashRevEl = document.getElementById('dashTotalRevenue');
    if (dashRevEl) dashRevEl.textContent = formatCurrency(totalRevenue);
    
    const profitEl = document.getElementById('dashTotalProfit');
    if (profitEl) profitEl.textContent = formatCurrency(profit);
    
    const profitBadge = document.getElementById('dashProfitBadge');
    if (profitBadge) {
        if (profit > 0) {
            profitBadge.className = 'badge badge-success';
            profitBadge.textContent = dict.badges.untung;
        } else if (profit < 0) {
            profitBadge.className = 'badge badge-danger';
            profitBadge.textContent = dict.badges.rugi;
        } else {
            profitBadge.className = 'badge badge-warning';
            profitBadge.textContent = dict.badges.impas;
        }
    }

    const rcEl = document.getElementById('dashRcRatio');
    if (rcEl) rcEl.textContent = rcRatio > 0 ? rcRatio.toFixed(2) : '-';
    
    const rcBadge = document.getElementById('dashRcBadge');
    if (rcBadge) {
        if (rcRatio > 1) {
            rcBadge.className = 'badge badge-success';
            rcBadge.textContent = dict.badges.layak;
        } else if (rcRatio === 1) {
            rcBadge.className = 'badge badge-warning';
            rcBadge.textContent = dict.badges.impas;
        } else if (rcRatio > 0) {
            rcBadge.className = 'badge badge-danger';
            rcBadge.textContent = dict.badges.tidakLayak;
        } else {
            rcBadge.className = 'badge badge-neutral';
            rcBadge.textContent = dict.badges.noData;
        }
    }

    const dashAreaEl = document.getElementById('dashTotalArea');
    if (dashAreaEl) dashAreaEl.textContent = `${totalArea.toFixed(1)} ha`;

    const dashBepProdEl = document.getElementById('dashBepProduksi');
    if (dashBepProdEl) {
        dashBepProdEl.textContent = bepProduksi > 0 ? `${formatNumber(bepProduksi)} kg` : '-';
    }

    const dashBepPriceEl = document.getElementById('dashBepHarga');
    if (dashBepPriceEl) {
        dashBepPriceEl.textContent = bepHarga > 0 ? `${formatCurrency(bepHarga)}/kg` : '-';
    }

    const bepBadgeEl = document.getElementById('dashBepBadge');
    if (bepBadgeEl) {
        if (totalHarvestQty >= bepProduksi && bepProduksi > 0) {
            bepBadgeEl.className = 'badge badge-success';
            bepBadgeEl.textContent = dict.badges.aboveBep;
        } else if (totalHarvestQty > 0) {
            bepBadgeEl.className = 'badge badge-danger';
            bepBadgeEl.textContent = dict.badges.belowBep;
        } else {
            bepBadgeEl.className = 'badge badge-neutral';
            bepBadgeEl.textContent = dict.badges.noData;
        }
    }

    renderDashboardCharts(state.lands, state.expenses, state.harvests, landId);
    renderRecentActivities(filteredExpenses, filteredHarvests);
}

function renderRecentActivities(expenses, harvests) {
    const tbody = document.getElementById('dashRecentTableBody');
    if (!tbody) return;

    const dict = getDict();
    const combined = [
        ...expenses.map(e => ({ ...e, type: 'biaya' })),
        ...harvests.map(h => ({ ...h, type: 'panen' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    if (combined.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state">${dict.biaya.emptyText}</td></tr>`;
        return;
    }

    tbody.innerHTML = combined.map(item => {
        if (item.type === 'biaya') {
            const translatedCat = dict.categories[item.category] || item.category;
            return `
                <tr>
                    <td><span class="badge badge-danger">${dict.common.expense}</span></td>
                    <td>${formatDate(item.date)}</td>
                    <td>${getLandNameById(item.landId)}</td>
                    <td>${item.note || translatedCat}</td>
                    <td style="font-weight:700; color:var(--danger);">- ${formatCurrency(item.amount)}</td>
                </tr>
            `;
        } else {
            const revenue = item.quantity * item.pricePerUnit;
            return `
                <tr>
                    <td><span class="badge badge-success">${dict.common.revenue}</span></td>
                    <td>${formatDate(item.date)}</td>
                    <td>${getLandNameById(item.landId)}</td>
                    <td>${item.commodity} (${item.quantity} ${item.unit})</td>
                    <td style="font-weight:700; color:var(--primary);">+ ${formatCurrency(revenue)}</td>
                </tr>
            `;
        }
    }).join('');
}

/**
 * 2. Render Data Lahan Page
 */
function renderLandsView() {
    const container = document.getElementById('landsGridContainer');
    if (!container) return;

    const dict = getDict();

    if (state.lands.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🌾</div>
                <h3>${dict.lahan.emptyText}</h3>
            </div>
        `;
        return;
    }

    container.innerHTML = state.lands.map(land => {
        const landExpCount = state.expenses.filter(e => e.landId === land.id).length;
        const landHrvCount = state.harvests.filter(h => h.landId === land.id).length;

        return `
            <div class="card land-card card-hover">
                <div>
                    <div class="land-card-header">
                        <div>
                            <h3 class="land-name">${land.name}</h3>
                            <div class="land-location">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                ${land.location || '-'}
                            </div>
                        </div>
                        <span class="badge badge-success">${land.commodity}</span>
                    </div>

                    <div class="land-details">
                        <div class="detail-item">
                            <div class="detail-label">${dict.lahan.areaLabel}</div>
                            <div class="detail-val">${land.area} ha</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">${dict.lahan.ageLabel}</div>
                            <div class="detail-val">${land.age || '-'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">${dict.dashboard.totalExpense}</div>
                            <div class="detail-val">${landExpCount} Items</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">${dict.panen.title}</div>
                            <div class="detail-val">${landHrvCount} Items</div>
                        </div>
                    </div>
                </div>

                <div class="table-actions" style="justify-content: flex-end; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.8rem;">
                    <button class="btn btn-secondary btn-sm" onclick="editLand('${land.id}')">
                        ${dict.common.edit}
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteLand('${land.id}')">
                        ${dict.common.delete}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * 3. Render Biaya Usaha Tani Table
 */
function renderExpensesTable() {
    const tbody = document.getElementById('expensesTableBody');
    const totalFooter = document.getElementById('expensesTotalFooter');
    if (!tbody) return;

    const dict = getDict();
    const searchTerm = (document.getElementById('searchExpenseInput')?.value || '').toLowerCase();
    const filterCat = document.getElementById('filterExpenseCategory')?.value || 'all';

    let filtered = state.expenses;

    if (filterCat !== 'all') {
        filtered = filtered.filter(e => e.category === filterCat);
    }

    if (searchTerm) {
        filtered = filtered.filter(e => 
            e.note.toLowerCase().includes(searchTerm) || 
            e.category.toLowerCase().includes(searchTerm) ||
            getLandNameById(e.landId).toLowerCase().includes(searchTerm)
        );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalSum = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
    if (totalFooter) totalFooter.textContent = formatCurrency(totalSum);

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-state">${dict.biaya.emptyText}</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(item => {
        const translatedCat = dict.categories[item.category] || item.category;
        return `
            <tr>
                <td>${formatDate(item.date)}</td>
                <td><strong>${getLandNameById(item.landId)}</strong></td>
                <td><span class="badge badge-info">${translatedCat}</span></td>
                <td>${item.note || '-'}</td>
                <td style="font-weight:700; color:var(--text-dark);">${formatCurrency(item.amount)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="editExpense('${item.id}')" title="Edit">✏️</button>
                        <button class="action-btn delete" onclick="deleteExpense('${item.id}')" title="Delete">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * 4. Render Hasil Panen Table
 */
function renderHarvestsTable() {
    const tbody = document.getElementById('harvestsTableBody');
    const totalFooter = document.getElementById('harvestsTotalFooter');
    if (!tbody) return;

    const dict = getDict();
    const sorted = [...state.harvests].sort((a, b) => new Date(b.date) - new Date(a.date));
    const totalRevenueSum = sorted.reduce((sum, h) => sum + (Number(h.quantity) * Number(h.pricePerUnit)), 0);
    if (totalFooter) totalFooter.textContent = formatCurrency(totalRevenueSum);

    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-state">${dict.panen.emptyText}</td></tr>`;
        return;
    }

    tbody.innerHTML = sorted.map(item => {
        const totalRevenue = Number(item.quantity) * Number(item.pricePerUnit);
        return `
            <tr>
                <td>${formatDate(item.date)}</td>
                <td><strong>${getLandNameById(item.landId)}</strong></td>
                <td><span class="badge badge-success">${item.commodity}</span></td>
                <td style="font-weight:700;">${item.quantity} ${item.unit}</td>
                <td>${formatCurrency(item.pricePerUnit)} / ${item.unit}</td>
                <td style="font-weight:800; color:var(--primary);">${formatCurrency(totalRevenue)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="editHarvest('${item.id}')" title="Edit">✏️</button>
                        <button class="action-btn delete" onclick="deleteHarvest('${item.id}')" title="Delete">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * 5. Render Laporan Usaha Tani & BEP Breakdown Summary
 */
function renderReportView() {
    const dict = getDict();
    const landId = state.reportFilterLand;

    const filteredExpenses = landId === 'all' 
        ? state.expenses 
        : state.expenses.filter(e => e.landId === landId);

    const filteredHarvests = landId === 'all' 
        ? state.harvests 
        : state.harvests.filter(h => h.landId === landId);

    const totalExpense = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalRevenue = filteredHarvests.reduce((sum, h) => sum + (Number(h.quantity) * Number(h.pricePerUnit)), 0);
    const profit = totalRevenue - totalExpense;
    const rcRatio = totalExpense > 0 ? (totalRevenue / totalExpense) : (totalRevenue > 0 ? 99 : 0);

    const totalHarvestQty = filteredHarvests.reduce((sum, h) => sum + Number(h.quantity), 0);
    const avgPrice = totalHarvestQty > 0 ? (totalRevenue / totalHarvestQty) : 0;

    const bepProduksi = avgPrice > 0 ? (totalExpense / avgPrice) : 0;
    const bepHarga = totalHarvestQty > 0 ? (totalExpense / totalHarvestQty) : 0;

    const rptExp = document.getElementById('reportTotalExpense');
    if (rptExp) rptExp.textContent = formatCurrency(totalExpense);

    const rptRev = document.getElementById('reportTotalRevenue');
    if (rptRev) rptRev.textContent = formatCurrency(totalRevenue);

    const rptProfit = document.getElementById('reportProfit');
    if (rptProfit) rptProfit.textContent = formatCurrency(profit);

    const rptRc = document.getElementById('reportRcRatio');
    if (rptRc) rptRc.textContent = rcRatio > 0 ? rcRatio.toFixed(2) : '-';

    const rptBepProd = document.getElementById('reportBepProduksi');
    if (rptBepProd) rptBepProd.textContent = bepProduksi > 0 ? `${formatNumber(bepProduksi)} kg` : '-';

    const rptBepPrice = document.getElementById('reportBepHarga');
    if (rptBepPrice) rptBepPrice.textContent = bepHarga > 0 ? `${formatCurrency(bepHarga)}/kg` : '-';

    const evalBox = document.getElementById('reportEvalBox');
    const evalTitle = document.getElementById('reportEvalTitle');
    const evalText = document.getElementById('reportEvalText');

    if (evalBox && evalTitle && evalText) {
        if (rcRatio > 1) {
            evalBox.className = 'eval-box menguntungkan';
            evalTitle.textContent = `🎉 ${dict.badges.layak} (R/C Ratio > 1.00)`;
            evalText.innerHTML = `R/C Ratio: <strong>${rcRatio.toFixed(2)}</strong>. <br>
            BEP Produksi: <strong>${formatNumber(bepProduksi)} kg</strong> | Actual: <strong>${formatNumber(totalHarvestQty)} kg</strong>.`;
        } else if (rcRatio === 1) {
            evalBox.className = 'eval-box impas';
            evalTitle.textContent = `⚠️ ${dict.badges.impas}`;
            evalText.textContent = `Revenue matches total costs exactly (R/C = 1.00).`;
        } else if (rcRatio > 0) {
            evalBox.className = 'eval-box rugi';
            evalTitle.textContent = `🛑 ${dict.badges.tidakLayak}`;
            evalText.innerHTML = `R/C Ratio: <strong>${rcRatio.toFixed(2)}</strong>. BEP Harga: <strong>${formatCurrency(bepHarga)}/kg</strong>.`;
        } else {
            evalBox.className = 'eval-box impas';
            evalTitle.textContent = `ℹ️ ${dict.badges.noData}`;
            evalText.textContent = dict.lahan.emptyText;
        }
    }

    renderReportCategoryBreakdown(filteredExpenses);
}

function renderReportCategoryBreakdown(expenses) {
    const tbody = document.getElementById('reportCategoryBreakdownBody');
    if (!tbody) return;

    const dict = getDict();
    const categoriesRaw = ['Benih/Bibit', 'Pupuk', 'Pestisida', 'Tenaga kerja', 'Transportasi', 'Biaya lainnya'];
    const totalAllExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    tbody.innerHTML = categoriesRaw.map(cat => {
        const catSum = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0);
        const percentage = totalAllExpenses > 0 ? ((catSum / totalAllExpenses) * 100).toFixed(1) : '0.0';
        const translatedCat = dict.categories[cat] || cat;

        return `
            <tr>
                <td><strong>${translatedCat}</strong></td>
                <td>${formatCurrency(catSum)}</td>
                <td>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <div style="flex-grow:1; height:8px; background:var(--border-color); border-radius:4px; overflow:hidden;">
                            <div style="width:${percentage}%; height:100%; background:var(--primary);"></div>
                        </div>
                        <span style="font-weight:700; font-size:0.85rem; width:45px;">${percentage}%</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// --- Toast Feedback Alert ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✅' : '🚨'}</span>
        <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
