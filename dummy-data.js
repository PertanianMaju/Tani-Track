/**
 * Data Contoh (Dummy Data) TaniTrack
 * Menyediakan data awal usahatani realistis untuk keperluan demonstrasi tugas kuliah.
 */

const INITIAL_DATA = {
    lands: [
        {
            id: 'land-1',
            name: 'Sawah Block A (Padi)',
            area: 1.2,
            commodity: 'Padi Ciherang',
            age: '65 Hari',
            location: 'Desa Sukamaju, Subang',
            createdAt: '2026-05-10'
        },
        {
            id: 'land-2',
            name: 'Ladang Horti B (Cabai)',
            area: 0.5,
            commodity: 'Cabai Merah Keriting',
            age: '45 Hari',
            location: 'Desa Banjarsari, Pangalengan',
            createdAt: '2026-06-01'
        }
    ],
    expenses: [
        {
            id: 'exp-1',
            landId: 'land-1',
            date: '2026-05-12',
            category: 'Benih/Bibit',
            note: 'Pembelian Benih Padi Unggul Label Biru 30 kg',
            amount: 450000
        },
        {
            id: 'exp-2',
            landId: 'land-1',
            date: '2026-05-15',
            category: 'Tenaga kerja',
            note: 'Upah Traktor & Pengolahan Tanah (2 HOK)',
            amount: 1200000
        },
        {
            id: 'exp-3',
            landId: 'land-1',
            date: '2026-05-20',
            category: 'Pupuk',
            note: 'Pupuk Urea & NPK Phonska Subsidized 150 kg',
            amount: 850000
        },
        {
            id: 'exp-4',
            landId: 'land-1',
            date: '2026-06-05',
            category: 'Pestisida',
            note: 'Insektisida Pembasmi Sundep & Fungisida',
            amount: 320000
        },
        {
            id: 'exp-5',
            landId: 'land-1',
            date: '2026-06-15',
            category: 'Tenaga kerja',
            note: 'Upah Penyiangan Rumput & Pemupukan Susulan',
            amount: 600000
        },
        {
            id: 'exp-6',
            landId: 'land-2',
            date: '2026-06-02',
            category: 'Benih/Bibit',
            note: 'Bibit Cabai Merah Hybrid F1 10 Pack',
            amount: 650000
        },
        {
            id: 'exp-7',
            landId: 'land-2',
            date: '2026-06-10',
            category: 'Pupuk',
            note: 'Pupuk Kandang Ayam 50 Karung & Mulsa Plastik',
            amount: 1400000
        },
        {
            id: 'exp-8',
            landId: 'land-2',
            date: '2026-06-25',
            category: 'Pestisida',
            note: 'Fungisida Antraknosa & Perekat',
            amount: 280000
        },
        {
            id: 'exp-9',
            landId: 'land-1',
            date: '2026-07-20',
            category: 'Transportasi',
            note: 'Sewa Pikap Angkut Hasil Panen ke Tengkulak',
            amount: 350000
        },
        {
            id: 'exp-10',
            landId: 'land-2',
            date: '2026-07-25',
            category: 'Biaya lainnya',
            note: 'BBM Pompa Air Irigasi & Karung Kemasan',
            amount: 250000
        }
    ],
    harvests: [
        {
            id: 'hrv-1',
            landId: 'land-1',
            date: '2026-07-20',
            commodity: 'Padi Gabah Kering Panen (GKP)',
            quantity: 5800,
            unit: 'kg',
            pricePerUnit: 6500
        },
        {
            id: 'hrv-2',
            landId: 'land-2',
            date: '2026-07-24',
            commodity: 'Cabai Merah Segar (Petik I)',
            quantity: 450,
            unit: 'kg',
            pricePerUnit: 35000
        },
        {
            id: 'hrv-3',
            landId: 'land-2',
            date: '2026-08-02',
            commodity: 'Cabai Merah Segar (Petik II)',
            quantity: 620,
            unit: 'kg',
            pricePerUnit: 38000
        }
    ]
};
