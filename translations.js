/**
 * TaniTrack - Multi-language Dictionary (ID, EN, TH, JP)
 * Menyediakan terjemahan lengkap untuk 4 bahasa.
 */

const TRANSLATIONS = {
    // -------------------------------------------------------------
    // 1. INDONESIAN (id)
    // -------------------------------------------------------------
    id: {
        brand: 'TaniTrack',
        brandSub: 'Manajemen Usaha Tani',
        nav: {
            beranda: '🏠 Beranda',
            dashboard: '📊 Dashboard',
            lahan: '🌾 Data Lahan',
            biaya: '💸 Biaya Usaha Tani',
            panen: '🌽 Hasil Panen',
            laporan: '📑 Laporan & BEP'
        },
        hero: {
            badge: '🌱 Solusi Digital Usaha Tani Modern',
            title: 'Kelola Usaha Tani & Hitung BEP Secara Otomatis',
            subtitle: 'TaniTrack membantu mahasiswa pertanian dan petani Indonesia mencatat biaya operasional, hasil penjualan panen, serta menghitung Keuntungan, R/C Ratio, dan Titik Impas (BEP) secara otomatis dan akurat.',
            btnStart: '🚀 Mulai Mencatat Sekarang',
            btnDemo: '📊 Lihat Dashboard & BEP'
        },
        features: {
            title: 'Fitur Unggulan TaniTrack',
            subtitle: 'Aplikasi sederhana, modern, dan rapi yang dapat diakses dari HP maupun Laptop.',
            f1Title: 'Pencatatan Biaya Usaha Tani',
            f1Desc: 'Catat pengeluaran benih, pupuk, pestisida, hingga upah tenaga kerja (HOK) secara terstruktur.',
            f2Title: 'Pencatatan & Simpan Hasil Panen',
            f2Desc: 'Simpan catatan hasil panen dengan mudah. Sistem menghitung otomatis Total Pendapatan = Hasil Panen × Harga Jual.',
            f3Title: 'Analisis R/C Ratio & BEP',
            f3Desc: 'Ketahui titik impas produksi (BEP Produksi) dan titik impas harga (BEP Harga) untuk mengukur tingkat efisiensi usahatani Anda.'
        },
        demoBanner: {
            title: '🎓 Presets Demo Siap Dipresentasikan',
            desc: 'Website telah dilengkapi dengan Data Contoh usahatani Padi & Cabai realistis untuk kemudahan tugas kuliah.',
            btnReset: '🔄 Reset Data Contoh'
        },
        dashboard: {
            title: 'Dashboard Usaha Tani',
            subtitle: 'Ringkasan kondisi keuangan, kelayakan usaha, dan analisis BEP.',
            filterLabel: 'Filter Lahan:',
            allLands: '🌱 Semua Lahan Usaha Tani',
            totalExpense: 'Total Biaya',
            expenseSub: 'Total pengeluaran',
            totalRevenue: 'Total Pendapatan',
            revenueSub: 'Hasil penjualan panen',
            netProfit: 'Total Keuntungan',
            rcRatio: 'R/C Ratio',
            bepProd: 'BEP Produksi',
            bepProdSub: 'Titik Impas Panen',
            bepPrice: 'BEP Harga',
            bepPriceSub: 'Harga Impas Minimal',
            landArea: 'Luas Lahan',
            areaSub: 'Total area terdaftar',
            chart1Title: '📊 Perbandingan Biaya vs Pendapatan',
            chart2Title: '🍕 Distribusi Kategori Biaya Usaha Tani',
            recentTitle: '🕒 Transaksi Terakhir'
        },
        lahan: {
            title: '🌾 Data Lahan Usaha Tani',
            subtitle: 'Kelola dan tambahkan petak lahan pertanian Anda.',
            btnAddModal: '➕ Modal Tambah Lahan',
            formTitle: '📝 Formulir Input / Tambah Data Lahan Baru',
            nameLabel: 'Nama Lahan',
            areaLabel: 'Luas Lahan (Hektar / ha)',
            commodityLabel: 'Komoditas Utama',
            ageLabel: 'Umur Tanaman',
            locationLabel: 'Lokasi Lahan',
            btnSave: '💾 Simpan Data Lahan',
            listTitle: 'Daftar Lahan Terdaftar',
            emptyText: 'Belum Ada Data Lahan. Gunakan formulir di atas untuk mendaftarkan lahan usahatani Anda.'
        },
        biaya: {
            title: '💸 Biaya Usaha Tani',
            subtitle: 'Catat dan simpan seluruh pengeluaran operasional usaha tani Anda.',
            btnAddModal: '➕ Modal Catat Biaya',
            formTitle: '📝 Formulir Input / Tambah Biaya Usaha Tani Baru',
            dateLabel: 'Tanggal Pengeluaran',
            landLabel: 'Pilih Lahan Usaha Tani',
            categoryLabel: 'Kategori Biaya',
            noteLabel: 'Keterangan / Rincian Biaya',
            amountLabel: 'Jumlah Biaya (Rp)',
            btnSave: '💾 Simpan Biaya Usaha Tani',
            searchPlaceholder: '🔍 Cari keterangan/lahan...',
            allCategories: 'Semua Kategori Biaya',
            totalFooter: 'TOTAL BIAYA KESELURUHAN:',
            emptyText: 'Tidak ada pencatatan biaya usahatani yang cocok.'
        },
        panen: {
            title: '🌽 Hasil Panen',
            subtitle: 'Catat dan simpan hasil panen serta harga jual komoditas.',
            btnAddModal: '💾 Modal Simpan Hasil Panen',
            formTitle: '📝 Formulir Input / Simpan Hasil Panen Baru',
            dateLabel: 'Tanggal Panen',
            landLabel: 'Pilih Lahan Usaha Tani',
            commodityLabel: 'Komoditas Panen',
            qtyLabel: 'Jumlah Panen',
            unitLabel: 'Satuan Panen',
            priceLabel: 'Harga Jual / Satuan (Rp)',
            estRevenue: 'Estimasi Total Pendapatan Panen:',
            btnSave: '💾 Simpan Hasil Panen',
            totalFooter: 'TOTAL PENDAPATAN KESELURUHAN:',
            emptyText: 'Belum ada pencatatan hasil panen usahatani.'
        },
        laporan: {
            title: '📑 Laporan Keuangan & BEP Usaha Tani',
            subtitle: 'Evaluasi rasio R/C dan analisis titik impas Break Even Point.',
            btnPrint: '🖨️ Cetak Laporan / PDF',
            headerTitle: 'LAPORAN KEUANGAN & ANALISIS BEP USAHA TANI',
            headerSub: 'TaniTrack - Sistem Pencatatan & Evaluasi Usahatani',
            printedOn: 'Dicetak pada:',
            summaryTitle: 'Ringkasan Keuangan Usahatani',
            bepBoxTitle: '🧮 Analisis Break Even Point (BEP / Titik Impas)',
            bepProdTitle: 'BEP Produksi (Volume Impas)',
            bepPriceTitle: 'BEP Harga (Harga Impas Minimal)',
            categoryBreakdownTitle: 'Rincian Alokasi Biaya Usaha Tani (Berdasarkan Kategori)',
            catHeader: 'Kategori Biaya',
            amountHeader: 'Jumlah Total Pengeluaran (Rp)',
            percentHeader: 'Persentase Alokasi (%)',
            formulasTitle: '📌 Rumus Lengkap Analisis Usaha Tani & BEP:'
        },
        categories: {
            'Benih/Bibit': 'Benih/Bibit',
            'Pupuk': 'Pupuk',
            'Pestisida': 'Pestisida',
            'Tenaga kerja': 'Tenaga kerja',
            'Transportasi': 'Transportasi',
            'Biaya lainnya': 'Biaya lainnya'
        },
        badges: {
            untung: 'Untung',
            rugi: 'Rugi',
            impas: 'Impas (BEP)',
            layak: '✓ Layak & Menguntungkan',
            tidakLayak: 'Tidak Layak / Rugi',
            noData: 'Belum Ada Data',
            aboveBep: '✓ Di Atas BEP (Melampaui Impas)',
            belowBep: '⚠️ Di Bawah BEP Produksi'
        },
        common: {
            edit: '✏️ Edit',
            delete: '🗑️ Hapus',
            cancel: 'Batal',
            save: 'Simpan',
            actions: 'Aksi',
            date: 'Tanggal',
            land: 'Lahan',
            commodity: 'Komoditas',
            quantity: 'Jumlah',
            price: 'Harga Jual',
            revenue: 'Pendapatan',
            expense: 'Biaya',
            note: 'Keterangan'
        }
    },

    // -------------------------------------------------------------
    // 2. ENGLISH (en)
    // -------------------------------------------------------------
    en: {
        brand: 'TaniTrack',
        brandSub: 'Farm Activity & Finance Management',
        nav: {
            beranda: '🏠 Home',
            dashboard: '📊 Dashboard',
            lahan: '🌾 Land Data',
            biaya: '💸 Farm Expenses',
            panen: '🌽 Harvest Yield',
            laporan: '📑 Report & BEP'
        },
        hero: {
            badge: '🌱 Smart Digital Farming Solution',
            title: 'Manage Farm Activities & Calculate BEP Automatically',
            subtitle: 'TaniTrack empowers agriculture students and farmers to track operational costs, harvest revenues, and automatically compute Net Profit, R/C Ratio, and Break Even Point (BEP).',
            btnStart: '🚀 Start Recording Now',
            btnDemo: '📊 View Dashboard & BEP'
        },
        features: {
            title: 'TaniTrack Key Features',
            subtitle: 'Simple, modern, and intuitive web application accessible on both Mobile & Laptop.',
            f1Title: 'Structured Expense Logging',
            f1Desc: 'Keep itemized records of seeds, fertilizers, pesticides, labor hours, and transportation.',
            f2Title: 'Harvest Revenue & Yield Logging',
            f2Desc: 'Save harvest logs easily. Automatic computation: Revenue = Quantity × Unit Price.',
            f3Title: 'R/C Ratio & BEP Analysis',
            f3Desc: 'Determine Production BEP and Price BEP to evaluate the economic feasibility of your farm.'
        },
        demoBanner: {
            title: '🎓 Assignment Demo Presets Ready',
            desc: 'Pre-loaded with realistic Rice & Chili pepper farming data for immediate presentation.',
            btnReset: '🔄 Reset Demo Data'
        },
        dashboard: {
            title: 'Farm Management Dashboard',
            subtitle: 'Financial summary, feasibility indicators, and Break Even Point analysis.',
            filterLabel: 'Filter Land:',
            allLands: '🌱 All Farm Plots',
            totalExpense: 'Total Expenses',
            expenseSub: 'Cumulative cost outlays',
            totalRevenue: 'Total Revenue',
            revenueSub: 'Total harvest sales',
            netProfit: 'Net Profit',
            rcRatio: 'R/C Ratio',
            bepProd: 'Production BEP',
            bepProdSub: 'Break Even Yield (kg)',
            bepPrice: 'Price BEP',
            bepPriceSub: 'Min Break Even Price',
            landArea: 'Total Area',
            areaSub: 'Registered farm acreage',
            chart1Title: '📊 Expenses vs Revenue Comparison',
            chart2Title: '🍕 Farm Cost Category Allocation',
            recentTitle: '🕒 Recent Transactions'
        },
        lahan: {
            title: '🌾 Farm Land Plots Data',
            subtitle: 'Manage and register your agricultural farm plots.',
            btnAddModal: '➕ Add Land Modal',
            formTitle: '📝 Register New Farm Land Plot',
            nameLabel: 'Land Plot Name',
            areaLabel: 'Land Area (Hectares / ha)',
            commodityLabel: 'Main Crop Commodity',
            ageLabel: 'Crop Age / Stage',
            locationLabel: 'Land Location',
            btnSave: '💾 Save Land Plot',
            listTitle: 'Registered Farm Plots',
            emptyText: 'No land plots registered yet. Use the form above to add your farm land.'
        },
        biaya: {
            title: '💸 Farm Operational Expenses',
            subtitle: 'Record and track all operational input costs for your farming activities.',
            btnAddModal: '➕ Log Expense Modal',
            formTitle: '📝 Form: Log New Farm Expense',
            dateLabel: 'Expense Date',
            landLabel: 'Select Farm Plot',
            categoryLabel: 'Expense Category',
            noteLabel: 'Description / Item Details',
            amountLabel: 'Amount Cost (IDR / Rp)',
            btnSave: '💾 Save Farm Expense',
            searchPlaceholder: '🔍 Search description or plot...',
            allCategories: 'All Expense Categories',
            totalFooter: 'CUMULATIVE TOTAL EXPENSES:',
            emptyText: 'No matching expense records found.'
        },
        panen: {
            title: '🌽 Harvest Yield & Revenue',
            subtitle: 'Record harvest yields and market selling prices.',
            btnAddModal: '💾 Save Harvest Modal',
            formTitle: '📝 Form: Record & Save Harvest Yield',
            dateLabel: 'Harvest Date',
            landLabel: 'Select Farm Plot',
            commodityLabel: 'Harvest Commodity',
            qtyLabel: 'Harvest Yield Quantity',
            unitLabel: 'Unit (kg, ton, box)',
            priceLabel: 'Selling Price per Unit (Rp)',
            estRevenue: 'Estimated Total Revenue:',
            btnSave: '💾 Save Harvest Log',
            totalFooter: 'CUMULATIVE TOTAL REVENUE:',
            emptyText: 'No harvest yield records logged yet.'
        },
        laporan: {
            title: '📑 Financial Report & BEP Analysis',
            subtitle: 'R/C Ratio evaluation and Break Even Point feasibility assessment.',
            btnPrint: '🖨️ Print Report / PDF',
            headerTitle: 'FARM FINANCIAL REPORT & BEP ANALYSIS',
            headerSub: 'TaniTrack - Agricultural Record & Feasibility System',
            printedOn: 'Printed date:',
            summaryTitle: 'Farm Financial Summary',
            bepBoxTitle: '🧮 Break Even Point (BEP) Analysis',
            bepProdTitle: 'Production BEP (Volume)',
            bepPriceTitle: 'Price BEP (Min Selling Price)',
            categoryBreakdownTitle: 'Cost Breakdown by Category',
            catHeader: 'Cost Category',
            amountHeader: 'Total Outlay Amount (Rp)',
            percentHeader: 'Allocation Percentage (%)',
            formulasTitle: '📌 Agricultural Feasibility Formulas Used:'
        },
        categories: {
            'Benih/Bibit': 'Seeds / Seedlings',
            'Pupuk': 'Fertilizers',
            'Pestisida': 'Pesticides',
            'Tenaga kerja': 'Labor / HOK',
            'Transportasi': 'Transportation',
            'Biaya lainnya': 'Other Overhead'
        },
        badges: {
            untung: 'Profitable',
            rugi: 'Net Loss',
            impas: 'Break Even (BEP)',
            layak: '✓ Feasible & Profitable',
            tidakLayak: 'Infeasible / Loss',
            noData: 'No Data Yet',
            aboveBep: '✓ Above BEP (Surpassing Impas)',
            belowBep: '⚠️ Below Production BEP'
        },
        common: {
            edit: '✏️ Edit',
            delete: '🗑️ Delete',
            cancel: 'Cancel',
            save: 'Save',
            actions: 'Actions',
            date: 'Date',
            land: 'Land Plot',
            commodity: 'Crop Commodity',
            quantity: 'Quantity',
            price: 'Selling Price',
            revenue: 'Revenue',
            expense: 'Expense',
            note: 'Description'
        }
    },

    // -------------------------------------------------------------
    // 3. THAI (th) - ภาษาไทย
    // -------------------------------------------------------------
    th: {
        brand: 'TaniTrack',
        brandSub: 'ระบบจัดการฟาร์มและการเงิน',
        nav: {
            beranda: '🏠 หน้าแรก',
            dashboard: '📊 แดชบอร์ด',
            lahan: '🌾 ข้อมูลที่ดิน',
            biaya: '💸 ค่าใช้จ่ายฟาร์ม',
            panen: '🌽 ผลผลิตพืชผล',
            laporan: '📑 รายงาน & BEP'
        },
        hero: {
            badge: '🌱 โซลูชันการเกษตรดิจิทัลสมัยใหม่',
            title: 'จัดการฟาร์มและคำนวณ BEP โดยอัตโนมัติ',
            subtitle: 'TaniTrack ช่วยให้นักศึกษาเกษตรและเกษตรกรบันทึกต้นทุน รายได้จากการเก็บเกี่ยว และคำนวณกำไรสุทธิ อัตราส่วน R/C และจุดคุ้มทุน (BEP) แม่นยำ',
            btnStart: '🚀 เริ่มบันทึกข้อมูล',
            btnDemo: '📊 ดูแดชบอร์ด & BEP'
        },
        features: {
            title: 'คุณสมบัติเด่นของ TaniTrack',
            subtitle: 'แอปพลิเคชันเว็บที่ทันสมัย ใช้งานง่าย บนมือถือและแล็ปท็อป',
            f1Title: 'บันทึกค่าใช้จ่ายอย่างเป็นระบบ',
            f1Desc: 'บันทึกเมล็ดพันธุ์ ปุ๋ย ยาฆ่าแมลง ค่าแรงงาน และค่าขนส่งอย่างชัดเจน',
            f2Title: 'บันทึกผลผลิตและรายได้',
            f2Desc: 'บันทึกการเก็บเกี่ยวง่ายๆ ระบบคำนวณรายได้ = ปริมาณ × ราคาต่อหน่วย',
            f3Title: 'วิเคราะห์อัตราส่วน R/C & BEP',
            f3Desc: 'คำนวณจุดคุ้มทุนการผลิต (BEP Produksi) และราคาคุ้มทุน (BEP Harga)'
        },
        demoBanner: {
            title: '🎓 พร้อมสำหรับการนำเสนอตัวอย่าง',
            desc: 'มีข้อมูลตัวอย่างการทำนาข้าวและพริกเพื่อความสะดวกในการนำเสนอ',
            btnReset: '🔄 รีเซ็ตข้อมูลตัวอย่าง'
        },
        dashboard: {
            title: 'แดชบอร์ดการจัดการฟาร์ม',
            subtitle: 'สรุปสถานะการเงิน ตัวชี้วัด และการวิเคราะห์จุดคุ้มทุน (BEP)',
            filterLabel: 'กรองที่ดิน:',
            allLands: '🌱 พื้นที่เกษตรทั้งหมด',
            totalExpense: 'ค่าใช้จ่ายทั้งหมด',
            expenseSub: 'ยอดรวมค่าใช้จ่าย',
            totalRevenue: 'รายได้ทั้งหมด',
            revenueSub: 'ยอดขายจากการเก็บเกี่ยว',
            netProfit: 'กำไรสุทธิ',
            rcRatio: 'อัตราส่วน R/C',
            bepProd: 'BEP การผลิต',
            bepProdSub: 'ปริมาณคุ้มทุน (กก.)',
            bepPrice: 'BEP ราคา',
            bepPriceSub: 'ราคาขายคุ้มทุนขั้นต่ำ',
            landArea: 'พื้นที่รวม',
            areaSub: 'พื้นที่ลงทะเบียนทั้งหมด',
            chart1Title: '📊 เปรียบเทียบค่าใช้จ่ายกับรายได้',
            chart2Title: '🍕 สัดส่วนหมวดหมู่ค่าใช้จ่าย',
            recentTitle: '🕒 ธุรกรรมล่าสุด'
        },
        lahan: {
            title: '🌾 ข้อมูลแปลงที่ดินเกษตร',
            subtitle: 'จัดการและเพิ่มแปลงที่ดินเกษตรของคุณ',
            btnAddModal: '➕ ป๊อปอัพเพิ่มที่ดิน',
            formTitle: '📝 แบบฟอร์มเพิ่มแปลงที่ดินใหม่',
            nameLabel: 'ชื่อแปลงที่ดิน',
            areaLabel: 'ขนาดพื้นที่ (เฮกตาร์ / ha)',
            commodityLabel: 'พืชหลักที่ปลูก',
            ageLabel: 'อายุพืช / ระยะเวลา',
            locationLabel: 'ที่ตั้งแปลงที่ดิน',
            btnSave: '💾 บันทึกข้อมูลที่ดิน',
            listTitle: 'รายการแปลงที่ดินที่ลงทะเบียน',
            emptyText: 'ยังไม่มีข้อมูลที่ดิน ใช้ฟอร์มด้านบนเพื่อลงทะเบียน'
        },
        biaya: {
            title: '💸 บันทึกค่าใช้จ่ายฟาร์ม',
            subtitle: 'บันทึกต้นทุนการดำเนินงานทั้งหมดของฟาร์ม',
            btnAddModal: '➕ ป๊อปอัพเพิ่มค่าใช้จ่าย',
            formTitle: '📝 แบบฟอร์มบันทึกค่าใช้จ่ายฟาร์ม',
            dateLabel: 'วันที่จ่ายเงิน',
            landLabel: 'เลือกแปลงที่ดิน',
            categoryLabel: 'หมวดหมู่ค่าใช้จ่าย',
            noteLabel: 'รายละเอียด / คำอธิบาย',
            amountLabel: 'จำนวนเงิน (รูเปียห์ / Rp)',
            btnSave: '💾 บันทึกค่าใช้จ่าย',
            searchPlaceholder: '🔍 ค้นหารายละเอียด/แปลงที่ดิน...',
            allCategories: 'หมวดหมู่ทั้งหมด',
            totalFooter: 'รวมค่าใช้จ่ายทั้งหมด:',
            emptyText: 'ไม่พบรายการค่าใช้จ่ายที่ตรงกัน'
        },
        panen: {
            title: '🌽 บันทึกผลผลิตพืชผล',
            subtitle: 'บันทึกปริมาณผลผลิตและราคาขายตลาด',
            btnAddModal: '💾 ป๊อปอัพบันทึกผลผลิต',
            formTitle: '📝 แบบฟอร์มบันทึกผลผลิตพืชผล',
            dateLabel: 'วันที่เก็บเกี่ยว',
            landLabel: 'เลือกแปลงที่ดิน',
            commodityLabel: 'ผลผลิตพืชผล',
            qtyLabel: 'ปริมาณผลผลิต',
            unitLabel: 'หน่วย (กก., ตัน, ถุง)',
            priceLabel: 'ราคาขายต่อหน่วย (Rp)',
            estRevenue: 'ประมาณการรายได้รวม:',
            btnSave: '💾 บันทึกผลผลิต',
            totalFooter: 'รวมรายได้ทั้งหมด:',
            emptyText: 'ยังไม่มีการบันทึกผลผลิตพืชผล'
        },
        laporan: {
            title: '📑 รายงานการเงิน & BEP',
            subtitle: 'ประเมินอัตราส่วน R/C และวิเคราะห์จุดคุ้มทุน Break Even Point',
            btnPrint: '🖨️ พิมพ์รายงาน / PDF',
            headerTitle: 'รายงานการเงินและการวิเคราะห์ BEP ฟาร์ม',
            headerSub: 'TaniTrack - ระบบบันทึกและประเมินผลการเกษตร',
            printedOn: 'พิมพ์เมื่อ:',
            summaryTitle: 'สรุปการเงินฟาร์ม',
            bepBoxTitle: '🧮 การวิเคราะห์จุดคุ้มทุน (BEP)',
            bepProdTitle: 'BEP การผลิต (ปริมาณ)',
            bepPriceTitle: 'BEP ราคา (ราคาขั้นต่ำ)',
            categoryBreakdownTitle: 'รายละเอียดค่าใช้จ่ายตามหมวดหมู่',
            catHeader: 'หมวดหมู่ค่าใช้จ่าย',
            amountHeader: 'จำนวนเงินรวม (Rp)',
            percentHeader: 'สัดส่วน (%)',
            formulasTitle: '📌 สูตรการคำนวณทางเศรษฐศาสตร์เกษตร:'
        },
        categories: {
            'Benih/Bibit': 'เมล็ดพันธุ์/ต้นกล้า',
            'Pupuk': 'ปุ๋ย',
            'Pestisida': 'ยากำจัดศัตรูพืช',
            'Tenaga kerja': 'ค่าแรงงาน',
            'Transportasi': 'ค่าขนส่ง',
            'Biaya lainnya': 'ค่าใช้จ่ายอื่น ๆ'
        },
        badges: {
            untung: 'มีกำไร',
            rugi: 'ขาดทุน',
            impas: 'เท่าทุน (BEP)',
            layak: '✓ คุ้มค่าและมีกำไร',
            tidakLayak: 'ไม่คุ้มค่า / ขาดทุน',
            noData: 'ยังไม่มีข้อมูล',
            aboveBep: '✓ สูงกว่า BEP (เกินจุดคุ้มทุน)',
            belowBep: '⚠️ ต่ำกว่า BEP การผลิต'
        },
        common: {
            edit: '✏️ แก้ไข',
            delete: '🗑️ ลบ',
            cancel: 'ยกเลิก',
            save: 'บันทึก',
            actions: 'การจัดการ',
            date: 'วันที่',
            land: 'แปลงที่ดิน',
            commodity: 'พืชผล',
            quantity: 'ปริมาณ',
            price: 'ราคาขาย',
            revenue: 'รายได้',
            expense: 'ค่าใช้จ่าย',
            note: 'รายละเอียด'
        }
    },

    // -------------------------------------------------------------
    // 4. JAPANESE (ja) - 日本語
    // -------------------------------------------------------------
    ja: {
        brand: 'TaniTrack',
        brandSub: '農地＆農業財務管理システム',
        nav: {
            beranda: '🏠 ホーム',
            dashboard: '📊 ダッシュボード',
            lahan: '🌾 農地データ',
            biaya: '💸 農業費用',
            panen: '🌽 収穫結果',
            laporan: '📑 レポート＆BEP'
        },
        hero: {
            badge: '🌱 スマートデジタル農業ソリューション',
            title: '農作業管理＆BEP（損益分岐点）自動計算',
            subtitle: 'TaniTrackは、農業専攻の学生や農家向けに、生産コスト、収穫売上、純利益、R/C比率、損益分岐点（BEP）を自動的かつ正確に計算します。',
            btnStart: '🚀 今すぐ記録を開始',
            btnDemo: '📊 ダッシュボード＆BEPを表示'
        },
        features: {
            title: 'TaniTrackの主な機能',
            subtitle: 'スマホやパソコンから簡単にアクセスできるモダンでシンプルアプリ。',
            f1Title: '体系的な費用記録',
            f1Desc: '種苗、肥料、農薬、人件費（作業時間）、輸送費を詳細に分類して保存。',
            f2Title: '収穫量と売上の記録',
            f2Desc: '収穫結果を簡単に保存。売上総額＝収穫量×単価を自動計算。',
            f3Title: 'R/C比率と損益分岐点分析',
            f3Desc: '生産損益分岐点（BEP Produksi）と価格損益分岐点（BEP Harga）を明示。'
        },
        demoBanner: {
            title: '🎓 授業発表用デモデータ搭載',
            desc: '水稲およびトウガラシ栽培のリアルなサンプルデータがあらかじめセットされています。',
            btnReset: '🔄 デモデータをリセット'
        },
        dashboard: {
            title: '農業管理ダッシュボード',
            subtitle: '財務状況、妥当性指標、損益分岐点（BEP）の総合概要。',
            filterLabel: '農地フィルタ:',
            allLands: '🌱 すべての農地',
            totalExpense: '総費用',
            expenseSub: '累計生産コスト',
            totalRevenue: '総収入',
            revenueSub: '収穫物売上合計',
            netProfit: '純利益',
            rcRatio: 'R/C比率',
            bepProd: '生産損益分岐点',
            bepProdSub: '損益分岐収穫量 (kg)',
            bepPrice: '価格損益分岐点',
            bepPriceSub: '最低損益分岐価格',
            landArea: '総農地面積',
            areaSub: '登録済み農地合計',
            chart1Title: '📊 費用対収入の比較',
            chart2Title: '🍕 費用カテゴリー別割合',
            recentTitle: '🕒 最近の取引履歴'
        },
        lahan: {
            title: '🌾 農地データ管理',
            subtitle: '管理する農地区画の登録および編集。',
            btnAddModal: '➕ 農地追加モーダル',
            formTitle: '📝 新規農地の入力フォーム',
            nameLabel: '農地名',
            areaLabel: '面積 (ヘクタール / ha)',
            commodityLabel: '主要栽培作目',
            ageLabel: '生育日数 / 作期',
            locationLabel: '農地の所在地',
            btnSave: '💾 農地データを保存',
            listTitle: '登録済み農地一覧',
            emptyText: '農地データがありません。上のフォームから登録してください。'
        },
        biaya: {
            title: '💸 農業生産費用記録',
            subtitle: '農作業にかかるすべての経費・資材コストを記録。',
            btnAddModal: '➕ 費用記録モーダル',
            formTitle: '📝 新規農業費用の入力フォーム',
            dateLabel: '支出年月日',
            landLabel: '対象農地を選択',
            categoryLabel: '費用カテゴリー',
            noteLabel: '摘要・品目詳細',
            amountLabel: '金額 (ルピア / Rp)',
            btnSave: '💾 費用データを保存',
            searchPlaceholder: '🔍 摘要または農地を検索...',
            allCategories: '全カテゴリー',
            totalFooter: '費用総合計:',
            emptyText: '該当する費用データが見つかりません。'
        },
        panen: {
            title: '🌽 収穫結果＆売上記録',
            subtitle: '収穫量および市場販売価格を記録・保存。',
            btnAddModal: '💾 収穫保存モーダル',
            formTitle: '📝 新規収穫結果の入力フォーム',
            dateLabel: '収穫年月日',
            landLabel: '対象農地を選択',
            commodityLabel: '収穫作物名',
            qtyLabel: '収穫量',
            unitLabel: '単位 (kg, トン, 袋)',
            priceLabel: '販売単価 (Rp)',
            estRevenue: '推定売上合計:',
            btnSave: '💾 収穫データを保存',
            totalFooter: '収入総合計:',
            emptyText: '収穫結果データがありません。'
        },
        laporan: {
            title: '📑 財務レポート＆BEP分析',
            subtitle: 'R/C比率の評価および損益分岐点（Break Even Point）分析。',
            btnPrint: '🖨️ レポート印刷 / PDF',
            headerTitle: '農業財務レポート＆BEP損益分岐点分析',
            headerSub: 'TaniTrack - 農業記録および経営評価システム',
            printedOn: '印刷日時:',
            summaryTitle: '農業財務概要',
            bepBoxTitle: '🧮 損益分岐点（BEP）分析',
            bepProdTitle: '生産損益分岐点（数量）',
            bepPriceTitle: '価格損益分岐点（最低単価）',
            categoryBreakdownTitle: 'カテゴリー別費用内訳',
            catHeader: '費用カテゴリー',
            amountHeader: '支出合計額 (Rp)',
            percentHeader: '構成比 (%)',
            formulasTitle: '📌 農業経済評価の計算式:'
        },
        categories: {
            'Benih/Bibit': '種子・苗',
            'Pupuk': '肥料',
            'Pestisida': '農薬・防除費',
            'Tenaga kerja': '労務費・人件費',
            'Transportasi': '輸送・運賃',
            'Biaya lainnya': 'その他諸経費'
        },
        badges: {
            untung: '黒字（利益）',
            rugi: '赤字（損失）',
            impas: 'トントン（BEP）',
            layak: '✓ 経営良好・収益性高',
            tidakLayak: '収益性低・改善必要',
            noData: 'データなし',
            aboveBep: '✓ BEP超過 (損益分岐達成)',
            belowBep: '⚠️ BEP未満 (生産量不足)'
        },
        common: {
            edit: '✏️ 編集',
            delete: '🗑️ 削除',
            cancel: 'キャンセル',
            save: '保存',
            actions: '操作',
            date: '日付',
            land: '農地',
            commodity: '作目',
            quantity: '数量',
            price: '販売単価',
            revenue: '収入',
            expense: '費用',
            note: '摘要'
        }
    }
};
