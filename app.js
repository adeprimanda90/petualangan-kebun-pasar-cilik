/* ==========================================================================
   PETUALANGAN KEBUN & PASAR CILIK - CORE GAME ENGINE (VANILLA JS)
   - Ilustrasi SVG Asli & Akurat untuk Buah/Sayur Indonesia (Manggis, Nanas Madu,
     Durian, Rambutan, Salak, Sawo, Pepaya, Belimbing, Jambu, Sirsak, dll.)
   - Pelafalan Bahasa Indonesia Natural (Dual-Engine: Neural id-ID + Offline Web Speech)
   - 10 Soal per Set Permainan, 60 Varian Buah/Sayur, 100 Koleksi Stiker
   ========================================================================== */

(() => {
  'use strict';

  const QUESTIONS_PER_SET = 10;

  // --------------------------------------------------------------------------
  // 1. LOCK SCREEN INTERACTIONS (ANTI-SCROLL, ANTI-CONTEXT MENU, ANTI-ZOOM)
  // --------------------------------------------------------------------------
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.target.closest('#albumGrid')) return;
      e.preventDefault();
    },
    { passive: false }
  );

  // --------------------------------------------------------------------------
  // 2. ILUSTRASI SVG BUAH & SAYUR ASLI INDONESIA (100% AKURAT SESUAI BENTUK ASLI)
  // --------------------------------------------------------------------------
  const SVG_ILLUSTRATIONS = {
    // MANGGIS: Kulit ungu tua kemerahan, mahkota daun hijau 4 kelopak, & isi putih bersih beruas
    manggis: `<svg viewBox="0 0 80 80">
      <path d="M30 16 C22 10, 18 18, 28 22 C20 26, 28 32, 36 24 L40 12 L44 24 C52 32, 60 26, 52 22 C62 18, 58 10, 50 16 Z" fill="#16a34a" stroke="#14532d" stroke-width="2"/>
      <rect x="37" y="6" width="6" height="12" rx="3" fill="#15803d"/>
      <circle cx="40" cy="46" r="26" fill="#581c87" stroke="#3b0764" stroke-width="2.5"/>
      <path d="M16 48 A24 24 0 0 0 64 48 Z" fill="#7e22ce"/>
      <ellipse cx="40" cy="52" rx="19" ry="14" fill="#fff1f2" stroke="#9f1239" stroke-width="2"/>
      <ellipse cx="32" cy="52" rx="6" ry="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <ellipse cx="40" cy="53" rx="6.5" ry="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <ellipse cx="48" cy="52" rx="6" ry="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    </svg>`,

    // NANAS MADU: Buah nanas kuning keemasan bersisik + mahkota daun hijau + potongan cincin nanas manis
    nanas_madu: `<svg viewBox="0 0 80 80">
      <path d="M36 24 L26 8 L38 16 L40 4 L44 16 L54 8 L46 24 Z" fill="#16a34a" stroke="#14532d" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cx="38" cy="48" rx="18" ry="23" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/>
      <path d="M25 36 L51 60 M22 48 L46 68 M30 28 L54 50 M51 36 L25 60 M54 48 L30 68 M46 28 L22 50" stroke="#fde047" stroke-width="2" opacity="0.8"/>
      <circle cx="58" cy="58" r="14" fill="#fde047" stroke="#d97706" stroke-width="2.5"/>
      <circle cx="58" cy="58" r="5" fill="#fef9c3" stroke="#f59e0b" stroke-width="1.5"/>
    </svg>`,

    // DELIMA: Buah delima merah bermahkota dengan belahan biji-biji merah berkilau
    delima: `<svg viewBox="0 0 80 80">
      <path d="M32 18 L28 8 L36 13 L40 6 L44 13 L52 8 L48 18 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
      <circle cx="40" cy="46" r="25" fill="#ef4444" stroke="#991b1b" stroke-width="2.5"/>
      <path d="M38 30 A18 18 0 0 1 60 56 A18 18 0 0 1 32 62 Z" fill="#fecdd3" stroke="#be123c" stroke-width="2"/>
      <circle cx="44" cy="44" r="3.5" fill="#be123c"/>
      <circle cx="51" cy="47" r="3.5" fill="#dc2626"/>
      <circle cx="42" cy="52" r="3.5" fill="#e11d48"/>
      <circle cx="49" cy="55" r="3.5" fill="#be123c"/>
      <circle cx="37" cy="48" r="3" fill="#dc2626"/>
    </svg>`,

    // RAMBUTAN: Buah merah berambut lengkung dengan kupasan daging putih
    rambutan: `<svg viewBox="0 0 80 80">
      <g stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" fill="none">
        <path d="M22 24 Q12 16 16 12"/><path d="M32 18 Q28 8 34 6"/><path d="M46 18 Q52 8 56 12"/>
        <path d="M58 26 Q68 20 68 26"/><path d="M18 38 Q8 36 10 42"/><path d="M62 40 Q72 38 70 44"/>
        <path d="M20 54 Q10 58 14 64"/><path d="M58 56 Q68 60 64 66"/><path d="M36 66 Q34 74 40 74"/>
      </g>
      <ellipse cx="40" cy="42" rx="22" ry="20" fill="#ef4444" stroke="#991b1b" stroke-width="2.5"/>
      <ellipse cx="46" cy="48" rx="14" ry="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <ellipse cx="44" cy="46" rx="5" ry="3" fill="#ffffff"/>
    </svg>`,

    // JAMBU AIR MERAH: Bentuk lonceng khas jambu air merah mengilap
    jambu_merah: `<svg viewBox="0 0 80 80">
      <path d="M40 14 Q52 6 58 14 Q48 22 40 14 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <path d="M32 18 C28 18, 24 32, 16 52 C12 62, 22 68, 32 66 C36 64, 44 64, 48 66 C58 68, 68 62, 64 52 C56 32, 52 18, 48 18 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5"/>
      <path d="M32 64 Q40 58 48 64" fill="none" stroke="#7f1d1d" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="32" cy="36" rx="4" ry="10" fill="#ffffff" opacity="0.45" transform="rotate(-15 32 36)"/>
    </svg>`,

    // JAMBU BIJI: Kulit hijau kekuningan dengan belahan daging merah muda berbiji
    jambu_biji: `<svg viewBox="0 0 80 80">
      <circle cx="32" cy="40" r="21" fill="#84cc16" stroke="#3f6212" stroke-width="2.5"/>
      <path d="M32 19 Q40 10 48 16 Q40 24 32 19 Z" fill="#16a34a"/>
      <circle cx="50" cy="48" r="20" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>
      <circle cx="50" cy="48" r="16" fill="#fb7185"/>
      <circle cx="47" cy="45" r="1.8" fill="#fef08a"/><circle cx="53" cy="46" r="1.8" fill="#fef08a"/>
      <circle cx="48" cy="52" r="1.8" fill="#fef08a"/><circle cx="53" cy="51" r="1.8" fill="#fef08a"/>
    </svg>`,

    // BUAH NAGA: Kulit merah magenta bersisik hijau dengan belahan putih berbintik biji hitam
    buah_naga: `<svg viewBox="0 0 80 80">
      <path d="M22 24 Q14 14 24 18 M54 22 Q64 14 56 26 M16 44 Q8 38 18 36 M62 42 Q72 36 60 48" stroke="#22c55e" stroke-width="4" stroke-linecap="round" fill="none"/>
      <ellipse cx="36" cy="42" rx="20" ry="24" fill="#e11d48" stroke="#881337" stroke-width="2.5"/>
      <circle cx="52" cy="52" r="17" fill="#f43f5e" stroke="#9f1239" stroke-width="2"/>
      <circle cx="52" cy="52" r="13" fill="#f8fafc"/>
      <circle cx="48" cy="48" r="1.3" fill="#0f172a"/><circle cx="55" cy="49" r="1.3" fill="#0f172a"/>
      <circle cx="51" cy="54" r="1.3" fill="#0f172a"/><circle cx="47" cy="56" r="1.3" fill="#0f172a"/>
      <circle cx="56" cy="55" r="1.3" fill="#0f172a"/>
    </svg>`,

    // LECI: Buah leci merah muda bertekstur bintil dengan daun hijau dan daging putih
    leci: `<svg viewBox="0 0 80 80">
      <path d="M26 16 Q42 8 56 18" stroke="#78350f" stroke-width="3" fill="none"/>
      <path d="M38 14 Q52 4 62 14 Q48 22 38 14 Z" fill="#16a34a"/>
      <circle cx="30" cy="44" r="18" fill="#f43f5e" stroke="#9f1239" stroke-width="2.5"/>
      <circle cx="50" cy="48" r="18" fill="#e11d48" stroke="#881337" stroke-width="2.5"/>
      <ellipse cx="50" cy="52" rx="12" ry="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    </svg>`,

    // BELIMBING: Buah belimbing kuning berusuk dengan irisan berbentuk bintang 5 sudut
    belimbing: `<svg viewBox="0 0 80 80">
      <ellipse cx="34" cy="40" rx="22" ry="15" transform="rotate(-25 34 40)" fill="#facc15" stroke="#ca8a04" stroke-width="2.5"/>
      <polygon points="52,26 57,39 71,40 60,49 64,62 52,54 40,62 44,49 33,40 47,39" fill="#fde047" stroke="#ca8a04" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="52" cy="46" r="3" fill="#a16207"/>
    </svg>`,

    // DURIAN: Kulit durian berduri tajam terbuka memperlihatkan daging durian kuning emas
    durian: `<svg viewBox="0 0 80 80">
      <rect x="37" y="6" width="6" height="12" rx="2" fill="#78350f"/>
      <polygon points="40,14 48,20 56,15 58,25 68,24 64,34 72,40 64,48 70,56 60,60 58,70 48,66 40,72 32,66 22,70 20,60 10,56 16,48 8,40 16,34 12,24 22,25 24,15 32,20" fill="#84cc16" stroke="#3f6212" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="31" cy="46" rx="9" ry="14" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <ellipse cx="49" cy="46" rx="9" ry="14" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
    </svg>`,

    // NANGKA: Buah nangka besar bertekstur dengan potongan daging buah nangka kuning tebal
    nangka: `<svg viewBox="0 0 80 80">
      <ellipse cx="34" cy="42" rx="20" ry="25" fill="#a3e635" stroke="#4d7c0f" stroke-width="2.5"/>
      <ellipse cx="52" cy="50" rx="11" ry="15" fill="#facc15" stroke="#b45309" stroke-width="2.5"/>
      <ellipse cx="62" cy="54" rx="9" ry="13" fill="#fde047" stroke="#b45309" stroke-width="2"/>
    </svg>`,

    // CEMPEDAK: Buah cempedak lonjong kuning kecokelatan terbuka berisi daging buah kuning tua
    cempedak: `<svg viewBox="0 0 80 80">
      <ellipse cx="40" cy="42" rx="18" ry="28" transform="rotate(-15 40 42)" fill="#ca8a04" stroke="#713f12" stroke-width="2.5"/>
      <ellipse cx="42" cy="44" rx="12" ry="20" transform="rotate(-15 42 44)" fill="#fef9c3"/>
      <circle cx="38" cy="34" r="6" fill="#f59e0b"/><circle cx="44" cy="42" r="6" fill="#facc15"/>
      <circle cx="38" cy="50" r="6" fill="#f59e0b"/><circle cx="45" cy="54" r="5.5" fill="#facc15"/>
    </svg>`,

    // DUKU: Dompolan buah duku bulat kuning kecokelatan di tangkai dengan satu buah terkupas
    duku: `<svg viewBox="0 0 80 80">
      <path d="M20 18 Q40 12 60 22" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="26" cy="36" r="13" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
      <circle cx="48" cy="34" r="13" fill="#fcd34d" stroke="#b45309" stroke-width="2"/>
      <circle cx="36" cy="52" r="14" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
      <circle cx="56" cy="54" r="13" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
      <circle cx="56" cy="54" r="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    </svg>`,

    // KELAPA HIJAU: Buah kelapa muda hijau utuh dengan bagian atas terkupas putih segar
    kelapa: `<svg viewBox="0 0 80 80">
      <ellipse cx="40" cy="46" rx="24" ry="24" fill="#22c55e" stroke="#15803d" stroke-width="2.5"/>
      <polygon points="22,30 40,18 58,30 52,36 28,36" fill="#f8fafc" stroke="#15803d" stroke-width="2"/>
      <ellipse cx="40" cy="30" rx="9" ry="4" fill="#bae6fd" stroke="#94a3b8" stroke-width="1.5"/>
    </svg>`,

    // SAWI HIJAU: Batang sawi pakcoy putih kehijauan dengan daun hijau lebar segar
    sawi_hijau: `<svg viewBox="0 0 80 80">
      <ellipse cx="30" cy="32" rx="16" ry="20" transform="rotate(-18 30 32)" fill="#16a34a" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="50" cy="32" rx="16" ry="20" transform="rotate(18 50 32)" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="40" cy="28" rx="15" ry="20" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
      <path d="M28 44 Q32 68 40 70 Q48 68 52 44 L44 38 L36 38 Z" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    </svg>`,

    // KACANG HIJAU: Polong hijau dan butiran biji kacang hijau bulat dengan titik putih
    kacang_hijau: `<svg viewBox="0 0 80 80">
      <path d="M16 40 Q38 18 64 28 Q46 50 16 40 Z" fill="#16a34a" stroke="#14532d" stroke-width="2.5"/>
      <circle cx="28" cy="56" r="10" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="28" cy="54" rx="3" ry="1.5" fill="#ffffff"/>
      <circle cx="48" cy="60" r="10" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="48" cy="58" rx="3" ry="1.5" fill="#ffffff"/>
      <circle cx="62" cy="48" r="9" fill="#16a34a" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="62" cy="46" rx="2.5" ry="1.3" fill="#ffffff"/>
    </svg>`,

    // SIRSAK: Buah sirsak hijau berduri lunak dengan belahan daging putih dan biji hitam
    sirsak: `<svg viewBox="0 0 80 80">
      <path d="M40 14 C22 14, 16 34, 24 54 C30 68, 40 72, 46 66 C58 56, 62 34, 54 20 C50 14, 44 14, 40 14 Z" fill="#16a34a" stroke="#14532d" stroke-width="2.5"/>
      <ellipse cx="48" cy="52" rx="15" ry="14" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <circle cx="44" cy="50" r="2.2" fill="#1e293b"/><circle cx="52" cy="48" r="2.2" fill="#1e293b"/>
      <circle cx="49" cy="56" r="2.2" fill="#1e293b"/>
    </svg>`,

    // KEDONDONG: Buah kedondong lonjong hijau segar di tangkai beserta belahan bijinya
    kedondong: `<svg viewBox="0 0 80 80">
      <path d="M24 14 Q42 10 56 20" stroke="#78350f" stroke-width="3" fill="none"/>
      <ellipse cx="30" cy="44" rx="15" ry="20" fill="#65a30d" stroke="#365314" stroke-width="2.5"/>
      <ellipse cx="52" cy="48" rx="15" ry="19" fill="#84cc16" stroke="#3f6212" stroke-width="2.5"/>
      <ellipse cx="52" cy="48" rx="10" ry="13" fill="#ecfccb"/>
      <circle cx="52" cy="48" r="5" fill="#eab308"/>
    </svg>`,

    // SRIKAYA: Buah srikaya hijau berbenjol-benjol khas dengan belahan putih manis
    srikaya: `<svg viewBox="0 0 80 80">
      <circle cx="30" cy="32" r="9" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <circle cx="42" cy="28" r="9" fill="#4ade80" stroke="#14532d" stroke-width="2"/>
      <circle cx="52" cy="34" r="9" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <circle cx="24" cy="44" r="9" fill="#4ade80" stroke="#14532d" stroke-width="2"/>
      <circle cx="38" cy="42" r="10" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <circle cx="56" cy="46" r="9" fill="#4ade80" stroke="#14532d" stroke-width="2"/>
      <circle cx="30" cy="56" r="9" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="48" cy="56" rx="14" ry="11" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
      <circle cx="44" cy="56" r="2.2" fill="#1e293b"/><circle cx="52" cy="56" r="2.2" fill="#1e293b"/>
    </svg>`,

    // PARE HIJAU: Sayur pare hijau memanjang dengan tekstur bergelombang khas
    pare_hijau: `<svg viewBox="0 0 80 80">
      <path d="M16 56 C12 48, 28 20, 58 16 C66 16, 68 26, 56 42 C42 58, 22 66, 16 56 Z" fill="#22c55e" stroke="#14532d" stroke-width="2.5"/>
      <path d="M24 50 Q36 36 54 24 M28 54 Q42 42 58 30" stroke="#86efac" stroke-width="3" stroke-dasharray="4 4" fill="none" stroke-linecap="round"/>
    </svg>`,

    // PEPAYA: Buah pepaya belah memanjang dengan daging oranye kemerahan & biji hitam di tengah
    pepaya: `<svg viewBox="0 0 80 80">
      <path d="M26 12 C16 24, 14 56, 30 68 C46 74, 64 56, 58 30 C54 16, 36 8, 26 12 Z" fill="#16a34a" stroke="#14532d" stroke-width="2.5"/>
      <path d="M29 17 C21 27, 19 53, 32 63 C44 68, 59 53, 54 32 C50 20, 37 14, 29 17 Z" fill="#f97316"/>
      <ellipse cx="39" cy="43" rx="9" ry="14" transform="rotate(-10 39 43)" fill="#fed7aa"/>
      <circle cx="37" cy="36" r="2.3" fill="#1e293b"/><circle cx="42" cy="39" r="2.3" fill="#1e293b"/>
      <circle cx="36" cy="43" r="2.3" fill="#1e293b"/><circle cx="41" cy="46" r="2.3" fill="#1e293b"/>
      <circle cx="38" cy="50" r="2.3" fill="#1e293b"/>
    </svg>`,

    // LABU: Buah labu oranye bulat berusuk (tanpa wajah seram Halloween)
    labu: `<svg viewBox="0 0 80 80">
      <path d="M38 18 Q42 6 50 10" stroke="#15803d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="26" cy="46" rx="14" ry="21" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
      <ellipse cx="54" cy="46" rx="14" ry="21" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
      <ellipse cx="40" cy="46" rx="16" ry="22" fill="#f97316" stroke="#9a3412" stroke-width="2"/>
    </svg>`,

    // KESEMEK: Buah kesemek oranye bulat pipih dengan kelopak daun hijau di atasnya
    kesemek: `<svg viewBox="0 0 80 80">
      <ellipse cx="40" cy="48" rx="25" ry="20" fill="#f97316" stroke="#c2410c" stroke-width="2.5"/>
      <path d="M24 28 Q40 22 56 28 Q46 38 40 34 Q34 38 24 28 Z" fill="#16a34a" stroke="#14532d" stroke-width="2"/>
      <ellipse cx="30" cy="42" rx="6" ry="3" fill="#ffffff" opacity="0.45" transform="rotate(-20 30 42)"/>
    </svg>`,

    // MARKISA: Buah markisa terbelah memperlihatkan bulir-bulir oranye keemasan segar
    markisa: `<svg viewBox="0 0 80 80">
      <circle cx="40" cy="44" r="24" fill="#d97706" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="40" cy="44" r="19" fill="#fef3c7"/>
      <circle cx="40" cy="44" r="15" fill="#f59e0b"/>
      <circle cx="35" cy="39" r="2" fill="#451a03"/><circle cx="45" cy="40" r="2" fill="#451a03"/>
      <circle cx="38" cy="47" r="2" fill="#451a03"/><circle cx="44" cy="48" r="2" fill="#451a03"/>
      <circle cx="34" cy="45" r="2" fill="#451a03"/>
    </svg>`,

    // APRIKOT: Buah aprikot oranye dengan belahan biji cokelat di tengah
    aprikot: `<svg viewBox="0 0 80 80">
      <circle cx="30" cy="42" r="18" fill="#fb923c" stroke="#c2410c" stroke-width="2.5"/>
      <circle cx="50" cy="48" r="18" fill="#fdba74" stroke="#c2410c" stroke-width="2.5"/>
      <ellipse cx="50" cy="48" rx="7" ry="9" fill="#78350f"/>
    </svg>`,

    // JERUK KEPROK: Jeruk oranye dengan juring-juring buah jeruk yang sudah dikupas
    jeruk_bali: `<svg viewBox="0 0 80 80">
      <circle cx="34" cy="42" r="20" fill="#f97316" stroke="#c2410c" stroke-width="2.5"/>
      <path d="M44 38 C56 32, 66 44, 58 58 C50 66, 38 58, 44 38 Z" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
      <path d="M36 46 C48 40, 58 52, 50 64 C42 70, 30 62, 36 46 Z" fill="#fdba74" stroke="#ea580c" stroke-width="2"/>
    </svg>`,

    // JERUK MANIS: Buah jeruk utuh berdaun dengan irisan bundar juring jeruk segar
    jeruk_manis: `<svg viewBox="0 0 80 80">
      <circle cx="32" cy="40" r="19" fill="#f97316" stroke="#c2410c" stroke-width="2.5"/>
      <path d="M32 20 Q42 12 48 18 Q40 26 32 20 Z" fill="#16a34a"/>
      <circle cx="52" cy="52" r="17" fill="#fde047" stroke="#ea580c" stroke-width="2.5"/>
      <circle cx="52" cy="52" r="13" fill="#fb923c"/>
      <path d="M52 39 V65 M39 52 H65 M43 43 L61 61 M61 43 L43 61" stroke="#fef9c3" stroke-width="2"/>
    </svg>`,

    // BAWANG MERAH: Dua siung bawang merah keunguan lengkap dengan garis kulit & akar
    bawang_merah: `<svg viewBox="0 0 80 80">
      <path d="M28 16 C16 32, 14 54, 28 62 C42 54, 40 32, 28 16 Z" fill="#a21caf" stroke="#701a75" stroke-width="2.5"/>
      <path d="M50 20 C38 36, 36 56, 50 64 C64 56, 62 36, 50 20 Z" fill="#c026d3" stroke="#701a75" stroke-width="2.5"/>
      <path d="M24 62 L22 68 M28 62 L28 70 M32 62 L34 68 M46 64 L44 70 M50 64 L50 72 M54 64 L56 70" stroke="#78350f" stroke-width="2"/>
    </svg>`,

    // UBI UNGU: Umbi ubi ungu lonjong dengan irisan bundar berwarna ungu pekat
    ubi_ungu: `<svg viewBox="0 0 80 80">
      <path d="M16 52 C14 38, 36 18, 58 20 C64 24, 54 48, 32 58 C22 62, 18 58, 16 52 Z" fill="#7e22ce" stroke="#4c1d95" stroke-width="2.5"/>
      <circle cx="54" cy="54" r="14" fill="#f3e8ff" stroke="#6b21a8" stroke-width="2.5"/>
      <circle cx="54" cy="54" r="10" fill="#9333ea"/>
    </svg>`,

    // KOL UNGU: Kubis/kol bulat berlapis warna ungu magenta dengan urat daun putih
    ketan_hitam: `<svg viewBox="0 0 80 80">
      <circle cx="40" cy="44" r="24" fill="#9333ea" stroke="#581c87" stroke-width="2.5"/>
      <path d="M22 34 Q40 48 58 34 M20 48 Q40 60 60 48 M40 20 V68" stroke="#f3e8ff" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`,

    // BUAH BUNI: Dompolan buah buni bulat ungu kemerahan di tangkai berdaun hijau
    buni: `<svg viewBox="0 0 80 80">
      <path d="M24 18 Q42 14 56 24" stroke="#15803d" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="28" cy="36" r="10" fill="#7e22ce" stroke="#3b0764" stroke-width="2"/>
      <circle cx="44" cy="34" r="10" fill="#be185d" stroke="#500724" stroke-width="2"/>
      <circle cx="36" cy="48" r="10" fill="#6b21a8" stroke="#3b0764" stroke-width="2"/>
      <circle cx="52" cy="48" r="10" fill="#7e22ce" stroke="#3b0764" stroke-width="2"/>
      <circle cx="42" cy="60" r="10" fill="#581c87" stroke="#3b0764" stroke-width="2"/>
    </svg>`,

    // SALAK: Buah salak cokelat bersisik meruncing ke atas beserta daging buah salak putih kekuningan
    salak: `<svg viewBox="0 0 80 80">
      <path d="M36 12 C22 28, 16 48, 24 60 C32 68, 44 68, 52 60 C60 48, 50 28, 36 12 Z" fill="#9a3412" stroke="#431407" stroke-width="2.5"/>
      <path d="M24 38 L46 54 M22 48 L40 62 M28 28 L50 44 M46 38 L24 54 M50 28 L28 44" stroke="#fed7aa" stroke-width="1.5" opacity="0.55"/>
      <ellipse cx="56" cy="54" rx="12" ry="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
    </svg>`,

    // SAWO: Buah sawo lonjong cokelat muda dengan belahan daging cokelat manis & biji hitam mengilap
    sawo: `<svg viewBox="0 0 80 80">
      <ellipse cx="30" cy="42" rx="17" ry="21" fill="#b45309" stroke="#78350f" stroke-width="2.5"/>
      <ellipse cx="50" cy="48" rx="17" ry="20" fill="#d97706" stroke="#78350f" stroke-width="2.5"/>
      <ellipse cx="47" cy="48" rx="2.5" ry="6" fill="#0f172a"/>
      <ellipse cx="53" cy="48" rx="2.5" ry="6" fill="#0f172a"/>
    </svg>`,

    // KURMA: Tiga buah kurma lonjong cokelat tua manis berkilau
    kurma: `<svg viewBox="0 0 80 80">
      <ellipse cx="28" cy="42" rx="11" ry="18" transform="rotate(-15 28 42)" fill="#78350f" stroke="#451a03" stroke-width="2"/>
      <ellipse cx="48" cy="38" rx="11" ry="18" transform="rotate(12 48 38)" fill="#92400e" stroke="#451a03" stroke-width="2"/>
      <ellipse cx="40" cy="54" rx="17" ry="11" fill="#78350f" stroke="#451a03" stroke-width="2"/>
      <ellipse cx="38" cy="51" rx="8" ry="2.5" fill="#d97706" opacity="0.6"/>
    </svg>`,

    // BENGKUANG: Umbi bengkuang membulat cokelat krem dengan irisan putih renyah
    bengkuang: `<svg viewBox="0 0 80 80">
      <path d="M40 12 V24" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 22 C18 22, 14 44, 28 56 C36 62, 40 68, 40 72 C40 68, 44 62, 52 56 C66 44, 62 22, 40 22 Z" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>
      <circle cx="56" cy="54" r="13" fill="#ffffff" stroke="#d97706" stroke-width="2"/>
    </svg>`
  };

  function renderItemGraphic(vocabOrSticker, sizePx = 44) {
    const rawId = String(vocabOrSticker.id || '').replace(/^st_buah_/, '');
    if (SVG_ILLUSTRATIONS[rawId]) {
      return `<span class="item-svg-wrap" style="width:${sizePx}px;height:${sizePx}px;">${SVG_ILLUSTRATIONS[rawId].replace(
        '<svg ',
        `<svg width="${sizePx}" height="${sizePx}" `
      )}</span>`;
    }
    return `<span>${vocabOrSticker.emoji}</span>`;
  }

  // --------------------------------------------------------------------------
  // 3. PEMETAAN FONETIK SUKU KATA BAHASA INDONESIA (ANTI-SINGKATAN TTS)
  // --------------------------------------------------------------------------
  const SYLLABLE_PHONETICS_ID = {
    A: 'aa',
    U: 'uu',
    BA: 'baa',
    BI: 'bii',
    BU: 'buu',
    BE: 'beh',
    BO: 'boo',
    CA: 'caa',
    CI: 'cii',
    CU: 'cuu',
    CE: 'ceh',
    CO: 'coo',
    DA: 'daa',
    DI: 'dii',
    DU: 'duu',
    DE: 'deh',
    DO: 'doo',
    FI: 'fii',
    GA: 'gaa',
    GI: 'gii',
    GU: 'guu',
    GE: 'geh',
    GO: 'goo',
    HA: 'haa',
    HI: 'hii',
    HU: 'huu',
    HE: 'heh',
    HO: 'hoo',
    JA: 'jaa',
    JI: 'jii',
    JU: 'juu',
    JE: 'jeh',
    JO: 'joo',
    KA: 'kaa',
    KI: 'kii',
    KU: 'kuu',
    KE: 'keh',
    KO: 'koo',
    LA: 'laa',
    LI: 'lii',
    LU: 'luu',
    LE: 'leh',
    LO: 'loo',
    MA: 'maa',
    MI: 'mii',
    MU: 'muu',
    ME: 'meh',
    MO: 'moo',
    NA: 'naa',
    NI: 'nii',
    NU: 'nuu',
    NE: 'neh',
    NO: 'noo',
    PA: 'paa',
    PI: 'pii',
    PU: 'puu',
    PE: 'peh',
    PO: 'poo',
    RA: 'raa',
    RI: 'rii',
    RU: 'ruu',
    RE: 'reh',
    RO: 'roo',
    SA: 'saa',
    SI: 'sii',
    SU: 'suu',
    SE: 'seh',
    SO: 'soo',
    TA: 'taa',
    TI: 'tii',
    TU: 'tuu',
    TE: 'teh',
    TO: 'too',
    WA: 'waa',
    WI: 'wii',
    WU: 'wuu',
    WE: 'weh',
    WO: 'woo',
    YA: 'yaa',
    YI: 'yii',
    YU: 'yuu',
    YE: 'yeh',
    YO: 'yoo',
    ZA: 'zaa',
    ZI: 'zii',
    ZU: 'zuu'
  };

  function getSpokenSyllable(syl) {
    const upper = String(syl || '').toUpperCase().trim();
    if (SYLLABLE_PHONETICS_ID[upper]) {
      return SYLLABLE_PHONETICS_ID[upper];
    }
    return upper.toLowerCase();
  }

  function item(id, name, emoji, color, colorHex, syllables) {
    const firstLetter = name.charAt(0).toUpperCase();
    return {
      id,
      name,
      emoji,
      color,
      colorSpoken: color.toLowerCase(),
      colorHex,
      letter: firstLetter,
      syllables,
      spokenSyllables: syllables.map((s) => getSpokenSyllable(s))
    };
  }

  // --------------------------------------------------------------------------
  // 4. BANK 60 VARIAN BUAH, SAYUR & TANAMAN KEBUN (2, 3, HINGGA 4 SUKU KATA)
  // --------------------------------------------------------------------------
  const VOCAB_BANK = [
    // --- WARNA MERAH (12 Varian Berbeda) ---
    item('apel', 'Apel', '🍎', 'MERAH', '#ef4444', ['A', 'PEL']),
    item('semangka', 'Semangka', '🍉', 'MERAH', '#ef4444', ['SE', 'MANG', 'KA']),
    item('tomat', 'Tomat', '🍅', 'MERAH', '#ef4444', ['TO', 'MAT']),
    item('stroberi', 'Stroberi', '🍓', 'MERAH', '#ef4444', ['STRO', 'BE', 'RI']),
    item('ceri', 'Ceri', '🍒', 'MERAH', '#ef4444', ['CE', 'RI']),
    item('cabai_merah', 'Cabai Merah', '🌶️', 'MERAH', '#ef4444', ['CA', 'BAI', 'ME', 'RAH']),
    item('delima', 'Delima', '🍎', 'MERAH', '#ef4444', ['DE', 'LI', 'MA']),
    item('rambutan', 'Rambutan', '🍓', 'MERAH', '#ef4444', ['RAM', 'BU', 'TAN']),
    item('jambu_merah', 'Jambu Merah', '🍎', 'MERAH', '#ef4444', ['JAM', 'BU', 'ME', 'RAH']),
    item('jambu_biji', 'Jambu Biji', '🍎', 'MERAH', '#ef4444', ['JAM', 'BU', 'BI', 'JI']),
    item('buah_naga', 'Buah Naga', '🍓', 'MERAH', '#ef4444', ['BU', 'AH', 'NA', 'GA']),
    item('leci', 'Leci', '🍒', 'MERAH', '#ef4444', ['LE', 'CI']),

    // --- WARNA KUNING (11 Varian Berbeda) ---
    item('pisang', 'Pisang', '🍌', 'KUNING', '#facc15', ['PI', 'SANG']),
    item('mangga', 'Mangga', '🥭', 'KUNING', '#facc15', ['MANG', 'GA']),
    item('nanas', 'Nanas', '🍍', 'KUNING', '#facc15', ['NA', 'NAS']),
    item('lemon', 'Lemon', '🍋', 'KUNING', '#facc15', ['LE', 'MON']),
    item('jagung_manis', 'Jagung Manis', '🌽', 'KUNING', '#facc15', ['JA', 'GUNG', 'MA', 'NIS']),
    item('belimbing', 'Belimbing', '🍋', 'KUNING', '#facc15', ['BE', 'LIM', 'BING']),
    item('durian', 'Durian', '🍍', 'KUNING', '#facc15', ['DU', 'RI', 'AN']),
    item('nangka', 'Nangka', '🥭', 'KUNING', '#facc15', ['NANG', 'KA']),
    item('cempedak', 'Cempedak', '🥭', 'KUNING', '#facc15', ['CEM', 'PE', 'DAK']),
    item('duku', 'Duku', '🍋', 'KUNING', '#facc15', ['DU', 'KU']),
    item('nanas_madu', 'Nanas Madu', '🍍', 'KUNING', '#facc15', ['NA', 'NAS', 'MA', 'DU']),

    // --- WARNA HIJAU (14 Varian Berbeda) ---
    item('kelapa', 'Kelapa', '🥥', 'HIJAU', '#22c55e', ['KE', 'LA', 'PA']),
    item('alpukat', 'Alpukat', '🥑', 'HIJAU', '#22c55e', ['AL', 'PU', 'KAT']),
    item('brokoli', 'Brokoli', '🥦', 'HIJAU', '#22c55e', ['BRO', 'KO', 'LI']),
    item('melon', 'Melon', '🍈', 'HIJAU', '#22c55e', ['ME', 'LON']),
    item('mentimun', 'Mentimun', '🥒', 'HIJAU', '#22c55e', ['MEN', 'TI', 'MUN']),
    item('bayam', 'Bayam', '🥬', 'HIJAU', '#22c55e', ['BA', 'YAM']),
    item('kiwi', 'Kiwi', '🥝', 'HIJAU', '#22c55e', ['KI', 'WI']),
    item('kacang_panjang', 'Kacang Panjang', '🫛', 'HIJAU', '#22c55e', ['KA', 'CANG', 'PAN', 'JANG']),
    item('sawi_hijau', 'Sawi Hijau', '🥬', 'HIJAU', '#22c55e', ['SA', 'WI', 'HI', 'JAU']),
    item('kacang_hijau', 'Kacang Hijau', '🫛', 'HIJAU', '#22c55e', ['KA', 'CANG', 'HI', 'JAU']),
    item('sirsak', 'Sirsak', '🍈', 'HIJAU', '#22c55e', ['SIR', 'SAK']),
    item('kedondong', 'Kedondong', '🍈', 'HIJAU', '#22c55e', ['KE', 'DON', 'DONG']),
    item('srikaya', 'Srikaya', '🍈', 'HIJAU', '#22c55e', ['SRI', 'KA', 'YA']),
    item('pare_hijau', 'Pare Hijau', '🥒', 'HIJAU', '#22c55e', ['PA', 'RE', 'HI', 'JAU']),

    // --- WARNA ORANYE (10 Varian Berbeda) ---
    item('jeruk', 'Jeruk', '🍊', 'ORANYE', '#f97316', ['JE', 'RUK']),
    item('wortel', 'Wortel', '🥕', 'ORANYE', '#f97316', ['WOR', 'TEL']),
    item('pepaya', 'Pepaya', '🥭', 'ORANYE', '#f97316', ['PE', 'PA', 'YA']),
    item('labu', 'Labu', '🎃', 'ORANYE', '#f97316', ['LA', 'BU']),
    item('persik', 'Persik', '🍑', 'ORANYE', '#f97316', ['PER', 'SIK']),
    item('kesemek', 'Kesemek', '🍊', 'ORANYE', '#f97316', ['KE', 'SE', 'MEK']),
    item('markisa', 'Markisa', '🍊', 'ORANYE', '#f97316', ['MAR', 'KI', 'SA']),
    item('aprikot', 'Aprikot', '🍑', 'ORANYE', '#f97316', ['A', 'PRI', 'KOT']),
    item('jeruk_bali', 'Jeruk Keprok', '🍊', 'ORANYE', '#f97316', ['JE', 'RUK', 'KE', 'PROK']),
    item('jeruk_manis', 'Jeruk Manis', '🍊', 'ORANYE', '#f97316', ['JE', 'RUK', 'MA', 'NIS']),

    // --- WARNA UNGU (7 Varian Berbeda) ---
    item('anggur', 'Anggur', '🍇', 'UNGU', '#a855f7', ['ANG', 'GUR']),
    item('terong', 'Terong', '🍆', 'UNGU', '#a855f7', ['TE', 'RONG']),
    item('manggis', 'Manggis', '🍇', 'UNGU', '#a855f7', ['MANG', 'GIS']),
    item('bawang_merah', 'Bawang Merah', '🧅', 'UNGU', '#a855f7', ['BA', 'WANG', 'ME', 'RAH']),
    item('ubi_ungu', 'Ubi Ungu', '🍠', 'UNGU', '#a855f7', ['U', 'BI', 'U', 'NGU']),
    item('ketan_hitam', 'Kol Ungu', '🥬', 'UNGU', '#a855f7', ['KOL', 'U', 'NGU']),
    item('buni', 'Buah Buni', '🫐', 'UNGU', '#a855f7', ['BU', 'AH', 'BU', 'NI']),

    // --- WARNA COKELAT (6 Varian Berbeda) ---
    item('kentang', 'Kentang', '🥔', 'COKELAT', '#b45309', ['KEN', 'TANG']),
    item('kacang_tanah', 'Kacang Tanah', '🥜', 'COKELAT', '#b45309', ['KA', 'CANG', 'TA', 'NAH']),
    item('salak', 'Salak', '🌰', 'COKELAT', '#b45309', ['SA', 'LAK']),
    item('sawo', 'Sawo', '🥔', 'COKELAT', '#b45309', ['SA', 'WO']),
    item('kurma', 'Kurma', '🌰', 'COKELAT', '#b45309', ['KUR', 'MA']),
    item('bengkuang', 'Bengkuang', '🥔', 'COKELAT', '#b45309', ['BENG', 'KU', 'ANG'])
  ];

  // Bank Suku Kata Pengecoh (Distractor) untuk Kereta Suku Kata agar total minimal 6 pilihan
  const DISTRACTOR_SYLLABLES = [
    { text: 'BO', spoken: 'boo' },
    { text: 'LU', spoken: 'luu' },
    { text: 'RE', spoken: 'reh' },
    { text: 'SO', spoken: 'soo' },
    { text: 'TU', spoken: 'tuu' },
    { text: 'FI', spoken: 'fii' },
    { text: 'GU', spoken: 'guu' },
    { text: 'HO', spoken: 'hoo' },
    { text: 'JI', spoken: 'jii' },
    { text: 'KU', spoken: 'kuu' },
    { text: 'LO', spoken: 'loo' },
    { text: 'MI', spoken: 'mii' },
    { text: 'NO', spoken: 'noo' },
    { text: 'PO', spoken: 'poo' },
    { text: 'RA', spoken: 'raa' },
    { text: 'SU', spoken: 'suu' },
    { text: 'TI', spoken: 'tii' },
    { text: 'WA', spoken: 'waa' },
    { text: 'YO', spoken: 'yoo' },
    { text: 'ZU', spoken: 'zuu' }
  ];

  // --------------------------------------------------------------------------
  // 5. KOLEKSI 100 STIKER BERSUARA BAHASA INDONESIA YANG BAIK DAN BENAR
  // --------------------------------------------------------------------------
  const EXTRA_40_STICKERS = [
    { id: 'st_kelinci', name: 'Kelinci Ceria', emoji: '🐰', voice: 'Halo teman kecil, aku Kelinci Ceria yang gemar makan sayur wortel.' },
    { id: 'st_rubah', name: 'Rubah Kasir', emoji: '🦊', voice: 'Halo, aku Rubah penjaga kasir di Pasar Cilik.' },
    { id: 'st_lebah', name: 'Lebah Madu', emoji: '🐝', voice: 'Aku Lebah Madu yang rajin mengumpulkan madu manis di kebun bunga.' },
    { id: 'st_kupu', name: 'Kupu Cantik', emoji: '🦋', voice: 'Aku Kupu-kupu bersayap indah yang terbang gembira di taman.' },
    { id: 'st_beruang', name: 'Beruang Madu', emoji: '🐻', voice: 'Halo anak pintar, tetap semangat belajar membaca dan berhitung ya.' },
    { id: 'st_kucing', name: 'Kucing Manis', emoji: '🐱', voice: 'Meong, senang sekali rasanya bisa bermain dan belajar bersamamu.' },
    { id: 'st_panda', name: 'Panda Lucu', emoji: '🐼', voice: 'Aku Panda menggemaskan yang suka makan pucuk bambu segar.' },
    { id: 'st_koala', name: 'Koala Pohon', emoji: '🐨', voice: 'Halo, aku Koala yang senang beristirahat di dahan pohon.' },
    { id: 'st_monyet', name: 'Monyet Cerdik', emoji: '🐵', voice: 'Aku Monyet cerdik yang sangat menyukai buah pisang matang.' },
    { id: 'st_singa', name: 'Singa Pemberani', emoji: '🦁', voice: 'Halo anak hebat, kamu tekun sekali menyelesaikan sepuluh soal.' },
    { id: 'st_harimau', name: 'Harimau Cilik', emoji: '🐯', voice: 'Aku Harimau Cilik penjaga hutan yang ramah dan bersahabat.' },
    { id: 'st_sapi', name: 'Sapi Perah', emoji: '🐮', voice: 'Aku Sapi Perah penghasil susu segar yang menyehatkan tubuh.' },
    { id: 'st_kuda', name: 'Kuda Poni', emoji: '🐴', voice: 'Aku Kuda Poni yang siap mengantar hasil panen kebun ke pasar.' },
    { id: 'st_domba', name: 'Domba Putih', emoji: '🐑', voice: 'Buluku putih bersih dan tebal seperti gumpalan awan.' },
    { id: 'st_kambing', name: 'Kambing Kebun', emoji: '🐐', voice: 'Aku Kambing Kebun yang suka makan rumput dan dedaunan hijau.' },
    { id: 'st_ayam', name: 'Ayam Jago', emoji: '🐓', voice: 'Kukuruyuk, selamat pagi anak Indonesia yang rajin belajar.' },
    { id: 'st_anak_ayam', name: 'Anak Ayam', emoji: '🐥', voice: 'Ciap ciap, aku Anak Ayam mungil berwarna kuning cerah.' },
    { id: 'st_bebek', name: 'Bebek Danau', emoji: '🦆', voice: 'Kwek kwek, aku Bebek yang gemar berenang bersama teman-teman.' },
    { id: 'st_burung_hantu', name: 'Burung Hantu', emoji: '🦉', voice: 'Aku Burung Hantu bijaksana yang gemar membaca buku cerita.' },
    { id: 'st_merpati', name: 'Burung Merpati', emoji: '🕊️', voice: 'Aku Burung Merpati putih yang terbang tinggi di angkasa.' },
    { id: 'st_katak', name: 'Katak Hijau', emoji: '🐸', voice: 'Aku Katak Hijau yang pandai melompat di atas daun teratai.' },
    { id: 'st_kura', name: 'Kura-kura Sabar', emoji: '🐢', voice: 'Aku Kura-kura yang berjalan santai, sabar, dan pantang menyerah.' },
    { id: 'st_kepik', name: 'Kepik Merah', emoji: '🐞', voice: 'Aku Kepik Merah berbintik hitam yang menjaga tanaman petani.' },
    { id: 'st_siput', name: 'Siput Kebun', emoji: '🐌', voice: 'Halo, aku Siput Kebun yang membawa cangkang rumah di punggungku.' },
    { id: 'st_semut', name: 'Semut Rajin', emoji: '🐜', voice: 'Aku Semut kecil yang selalu rukun dan bekerja sama.' },
    { id: 'st_tupai', name: 'Tupai Lincah', emoji: '🐿️', voice: 'Aku Tupai lincah yang gemar mengumpulkan biji kacang di pohon.' },
    { id: 'st_landak', name: 'Landak Mungil', emoji: '🦔', voice: 'Halo, aku Landak mungil penghuni taman bunga.' },
    { id: 'st_rusa', name: 'Rusa Taman', emoji: '🦌', voice: 'Aku Rusa Taman bertanduk indah yang berlari sangat tangkas.' },
    { id: 'st_gajah', name: 'Gajah Baik', emoji: '🐘', voice: 'Aku Gajah berbelalai panjang yang suka membantu menyiram tanaman.' },
    { id: 'st_jerapah', name: 'Jerapah Tinggi', emoji: '🦒', voice: 'Leherku tinggi sekali sehingga bisa memetik daun di pucuk pohon.' },
    { id: 'st_hamster', name: 'Hamster Lucu', emoji: '🐹', voice: 'Aku Hamster mungil yang suka menyimpan biji bunga matahari.' },
    { id: 'st_ikan', name: 'Ikan Mas', emoji: '🐠', voice: 'Aku Ikan Mas yang berenang lincah di kolam air jernih.' },
    { id: 'st_bunga_matahari', name: 'Bunga Matahari', emoji: '🌻', voice: 'Ini Bunga Matahari kuning yang mekar indah setiap pagi.' },
    { id: 'st_mawar', name: 'Bunga Mawar', emoji: '🌹', voice: 'Ini Bunga Mawar merah yang harum semerbak di taman.' },
    { id: 'st_tulip', name: 'Bunga Tulip', emoji: '🌷', voice: 'Ini Bunga Tulip warna-warni yang mempercantik kebun kita.' },
    { id: 'st_pohon', name: 'Pohon Rindang', emoji: '🌳', voice: 'Ini Pohon Rindang yang menyejukkan udara di sekitar kebun.' },
    { id: 'st_pelangi', name: 'Pelangi Cerah', emoji: '🌈', voice: 'Lihatlah indahnya warna-warni Pelangi di langit sehabis hujan.' },
    { id: 'st_matahari', name: 'Mentari Pagi', emoji: '🌞', voice: 'Sinar Mentari Pagi yang hangat membuat tanaman tumbuh subur.' },
    { id: 'st_traktor', name: 'Traktor Petani', emoji: '🚜', voice: 'Ini Traktor Petani yang membantu mengangkut hasil panen buah dan sayur.' },
    { id: 'st_piala', name: 'Piala Juara', emoji: '🏆', voice: 'Selamat ya, kamu adalah anak cerdas juara Petualangan Kebun dan Pasar Cilik.' }
  ];

  // Gabungkan 40 Stiker Sahabat Kebun + 60 Stiker Buah/Sayur = 100 Stiker!
  const STICKER_COLLECTION = [
    ...EXTRA_40_STICKERS,
    ...VOCAB_BANK.map((v) => ({
      id: `st_buah_${v.id}`,
      name: v.name,
      emoji: v.emoji,
      voice: `Ini adalah stiker ${v.name} yang berwarna ${v.colorSpoken}.`
    }))
  ];

  const INDONESIAN_NUMBERS = [
    'nol',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas',
    'dua belas',
    'tiga belas',
    'empat belas',
    'lima belas'
  ];

  // --------------------------------------------------------------------------
  // 6. WEB AUDIO SYNTHESIZER (EFEK SUARA POP, MELODI HORE, & BOING LEMBUT)
  // --------------------------------------------------------------------------
  let audioCtx = null;

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPop(freqStart = 520, freqEnd = 880) {
    try {
      const ctx = ensureAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, now);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, now + 0.085);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (_) {}
  }

  function playSuccessMelody() {
    try {
      const ctx = ensureAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.1;
        const duration = idx === notes.length - 1 ? 0.34 : 0.14;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.02);
      });
    } catch (_) {}
  }

  function playGentleBoing() {
    try {
      const ctx = ensureAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(310, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.12);
      osc.frequency.linearRampToValueAtTime(260, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // 7. MESIN PELAFALAN BAHASA INDONESIA NATURAL (DUAL-ENGINE)
  // --------------------------------------------------------------------------
  let currentInstructionText =
    'Selamat datang di Petualangan Kebun dan Pasar Cilik. Silakan pilih permainanmu.';
  let activeAudioElement = null;
  let speechFallbackTimer = null;

  function scoreIndonesianVoice(v) {
    if (!v) return -1;
    const rawLang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();

    const isIdLang =
      rawLang === 'id-id' ||
      rawLang === 'id' ||
      rawLang === 'in-id' ||
      rawLang === 'in' ||
      rawLang.startsWith('id-') ||
      rawLang.startsWith('in-');

    const isIdName =
      name.includes('indonesia') ||
      name.includes('damayanti') ||
      name.includes('gadis') ||
      name.includes('ardi') ||
      name.includes('bahasa');

    if (!isIdLang && !isIdName) return -1;

    if (name.includes('google') && name.includes('indonesia')) return 1000;
    if (name.includes('gadis') || name.includes('ardi')) return 950;
    if (name.includes('natural') || name.includes('neural') || name.includes('online')) return 900;
    if (uri.includes('premium') || uri.includes('enhanced') || name.includes('enhanced')) return 800;

    if (uri.includes('super-compact')) return 20;
    if (uri.includes('compact') || name.includes('compact') || name.includes('damayanti')) return 100;

    return 500;
  }

  function findBestIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return null;

    let bestVoice = null;
    let bestScore = -1;

    for (let i = 0; i < voices.length; i++) {
      const s = scoreIndonesianVoice(voices[i]);
      if (s > bestScore) {
        bestScore = s;
        bestVoice = voices[i];
      }
    }
    return bestVoice;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      findBestIndonesianVoice();
    };
  }

  function normalizeIndonesianSentence(rawText) {
    if (!rawText) return '';
    return String(rawText)
      .replace(/\[Soal\s+\d+\/\d+\]/gi, '')
      .replace(/\(\d+\)/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stopAllActiveSpeech() {
    if (speechFallbackTimer) {
      clearTimeout(speechFallbackTimer);
      speechFallbackTimer = null;
    }
    if (activeAudioElement) {
      try {
        activeAudioElement.pause();
        activeAudioElement.src = '';
      } catch (_) {}
      activeAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }
  }

  function speakWithWebSpeechAPI(cleanText) {
    if (!('speechSynthesis' in window)) return;
    try {
      const voice = findBestIndonesianVoice();
      const utter = new SpeechSynthesisUtterance(cleanText);
      window.__activeUtterance = utter;

      utter.lang = 'id-ID';
      if (voice) {
        utter.voice = voice;
      }

      utter.rate = 0.95;
      utter.pitch = 1.0;
      utter.volume = 1.0;

      window.speechSynthesis.speak(utter);
    } catch (_) {}
  }

  function speakText(text, updateCurrentInstruction = false) {
    if (updateCurrentInstruction) {
      currentInstructionText = text;
    }

    const cleanText = normalizeIndonesianSentence(text);
    if (!cleanText) return;

    stopAllActiveSpeech();

    if (navigator.onLine !== false) {
      try {
        const ttsUrl =
          'https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=id&dt=t&q=' +
          encodeURIComponent(cleanText);

        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.preload = 'auto';
        audio.src = ttsUrl;
        activeAudioElement = audio;

        let settled = false;
        const fallbackToSpeechSynthesis = () => {
          if (settled) return;
          settled = true;
          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }
          speakWithWebSpeechAPI(cleanText);
        };

        audio.addEventListener(
          'playing',
          () => {
            settled = true;
            if (speechFallbackTimer) {
              clearTimeout(speechFallbackTimer);
              speechFallbackTimer = null;
            }
          },
          { once: true }
        );

        audio.addEventListener('error', fallbackToSpeechSynthesis, { once: true });

        speechFallbackTimer = setTimeout(() => {
          if (!settled) {
            try {
              audio.pause();
              audio.src = '';
            } catch (_) {}
            fallbackToSpeechSynthesis();
          }
        }, 1100);

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(fallbackToSpeechSynthesis);
        }
        return;
      } catch (_) {}
    }

    speakWithWebSpeechAPI(cleanText);
  }

  // --------------------------------------------------------------------------
  // 8. STATE & LOCALSTORAGE PERSISTENCE
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'kebun_pasar_cilik_save_v2';

  const state = {
    stars: 0,
    unlockedStickers: ['st_kelinci'],
    currentScreen: 'home',
    activeMode: null,
    roundProgress: 0,
    kebunMissionIndex: 0,
    pasarMissionIndex: 0,
    isTransitioning: false
  };

  function loadState() {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY) || localStorage.getItem('kebun_pasar_cilik_save_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.stars === 'number') state.stars = parsed.stars;
        if (Array.isArray(parsed.unlockedStickers) && parsed.unlockedStickers.length > 0) {
          state.unlockedStickers = parsed.unlockedStickers;
        }
      }
    } catch (_) {}
    updateTopBarUI();
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stars: state.stars,
          unlockedStickers: state.unlockedStickers
        })
      );
    } catch (_) {}
    updateTopBarUI();
  }

  function updateTopBarUI() {
    const starEl = document.getElementById('starCountText');
    const badgeEl = document.getElementById('stickerCountBadge');
    if (starEl) starEl.textContent = String(state.stars);
    if (badgeEl) {
      badgeEl.textContent = `${state.unlockedStickers.length}/${STICKER_COLLECTION.length}`;
    }
  }

  // --------------------------------------------------------------------------
  // 9. UTILITY HELPERS
  // --------------------------------------------------------------------------
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function updateRoundDots(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const dots = container.querySelectorAll('.round-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('done', idx < count);
    });
  }

  function switchScreen(screenName) {
    state.currentScreen = screenName;
    const screens = {
      home: document.getElementById('screenHome'),
      kebun: document.getElementById('screenKebun'),
      pasar: document.getElementById('screenPasar'),
      album: document.getElementById('screenAlbum')
    };
    Object.entries(screens).forEach(([key, el]) => {
      if (el) el.classList.toggle('active', key === screenName);
    });
  }

  function triggerHintOnElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.remove('hint-wiggle');
      void el.offsetWidth;
      el.classList.add('hint-wiggle');
    });
  }

  function giveGentleEncouragement(hintSelector) {
    playGentleBoing();
    if (hintSelector) {
      triggerHintOnElements(hintSelector);
    }
    speakText('Belum tepat, ayo kita coba sekali lagi ya.', false);
  }

  // --------------------------------------------------------------------------
  // 10. CONFETTI & REWARD MODAL (SETIAP 10 SOAL SELESAI)
  // --------------------------------------------------------------------------
  function spawnConfettiRain() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#ef4444', '#facc15', '#22c55e', '#38bdf8', '#a855f7', '#f472b6', '#fb923c'];

    for (let i = 0; i < 38; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 96}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.6}s`;
      piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 90}px`);
      container.appendChild(piece);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 2900);
  }

  function handleMissionSuccess(praiseMessage) {
    if (state.isTransitioning) return;
    state.isTransitioning = true;
    playSuccessMelody();
    state.roundProgress += 1;

    if (state.activeMode === 'kebun') {
      updateRoundDots('kebunRoundDots', state.roundProgress);
    } else if (state.activeMode === 'pasar') {
      updateRoundDots('pasarRoundDots', state.roundProgress);
    }

    if (state.roundProgress >= QUESTIONS_PER_SET) {
      state.stars += 1;
      const locked = STICKER_COLLECTION.filter((s) => !state.unlockedStickers.includes(s.id));
      const rewardSticker = locked.length > 0 ? locked[0] : pickRandom(STICKER_COLLECTION);

      if (!state.unlockedStickers.includes(rewardSticker.id)) {
        state.unlockedStickers.push(rewardSticker.id);
      }
      saveState();

      setTimeout(() => {
        spawnConfettiRain();
        showRewardModal(rewardSticker);
      }, 650);
    } else {
      speakText(praiseMessage || 'Pintar sekali, ayo kita lanjutkan ke soal berikutnya.', false);
      setTimeout(() => {
        state.isTransitioning = false;
        loadNextMission();
      }, 2200);
    }
  }

  function showRewardModal(sticker) {
    const modal = document.getElementById('rewardModal');
    const box = document.getElementById('rewardStickerBox');
    const nameEl = document.getElementById('rewardStickerName');

    if (box) box.innerHTML = renderItemGraphic(sticker, 74);
    if (nameEl) nameEl.textContent = sticker.name;
    if (modal) modal.classList.add('show');

    playSuccessMelody();
    speakText(
      `Hore, sepuluh soal telah selesai! Kamu berhasil mendapatkan satu bintang baru dan membuka stiker ${sticker.name}.`,
      false
    );
  }

  function closeRewardModalAndContinue() {
    playPop();
    const modal = document.getElementById('rewardModal');
    if (modal) modal.classList.remove('show');
    state.roundProgress = 0;
    state.isTransitioning = false;
    updateRoundDots('kebunRoundDots', 0);
    updateRoundDots('pasarRoundDots', 0);
    loadNextMission();
  }

  function loadNextMission() {
    if (state.activeMode === 'kebun') {
      renderKebunMission();
    } else if (state.activeMode === 'pasar') {
      renderPasarMission();
    }
  }

  // --------------------------------------------------------------------------
  // 11. POINTER DRAG-AND-DROP + TAP-TO-MOVE HELPER FOR "KEBUN CERIA"
  // --------------------------------------------------------------------------
  function attachTapAndDragToFruit(tokenEl, basketEl, onDropCallback) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let pointerId = null;

    tokenEl.addEventListener('pointerdown', (e) => {
      if (tokenEl.classList.contains('collected') || state.isTransitioning) return;
      e.preventDefault();
      playPop(560, 820);
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      isDragging = true;
      tokenEl.classList.add('dragging');
      if (tokenEl.setPointerCapture) {
        try {
          tokenEl.setPointerCapture(pointerId);
        } catch (_) {}
      }
    });

    tokenEl.addEventListener('pointermove', (e) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      tokenEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.16)`;

      if (basketEl) {
        const bRect = basketEl.getBoundingClientRect();
        const overBasket =
          e.clientY >= bRect.top - 28 &&
          e.clientY <= bRect.bottom + 20 &&
          e.clientX >= bRect.left - 20 &&
          e.clientX <= bRect.right + 20;
        basketEl.classList.toggle('highlight-drop', overBasket);
      }
    });

    const finishGesture = (e) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      isDragging = false;
      tokenEl.classList.remove('dragging');
      if (basketEl) basketEl.classList.remove('highlight-drop');

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const movedDistance = Math.hypot(dx, dy);

      let droppedInBasket = false;
      if (basketEl) {
        const bRect = basketEl.getBoundingClientRect();
        droppedInBasket =
          e.clientY >= bRect.top - 32 &&
          e.clientY <= bRect.bottom + 24 &&
          e.clientX >= bRect.left - 24 &&
          e.clientX <= bRect.right + 24;
      }

      if (movedDistance < 18 || droppedInBasket) {
        tokenEl.style.transform = '';
        onDropCallback(tokenEl);
      } else {
        tokenEl.style.transform = '';
      }
    };

    tokenEl.addEventListener('pointerup', finishGesture);
    tokenEl.addEventListener('pointercancel', finishGesture);
  }

  // --------------------------------------------------------------------------
  // 12. MODE A: "KEBUN CERIA" (USIA TK / 3-5 TAHUN)
  // --------------------------------------------------------------------------
  function startKebunMode() {
    playPop();
    state.activeMode = 'kebun';
    state.roundProgress = 0;
    state.isTransitioning = false;
    updateRoundDots('kebunRoundDots', 0);
    switchScreen('kebun');
    renderKebunMission();
  }

  function renderKebunMission() {
    const missionType = state.kebunMissionIndex % 3;
    state.kebunMissionIndex += 1;

    if (missionType === 0) {
      renderKebunColorMission();
    } else if (missionType === 1) {
      renderKebunCountingMission();
    } else {
      renderKebunPhonicsMission();
    }
  }

  // MISI A1: MENGENAL WARNA (SEMUA BUAH BERBEDA JENIS, TIDAK ADA YANG SAMA)
  function renderKebunColorMission() {
    const stage = document.getElementById('kebunDynamicStage');
    const promptEl = document.getElementById('kebunPromptText');
    const mascotEl = document.getElementById('kebunMascot');
    if (!stage) return;

    const targetColors = [
      { name: 'MERAH', spoken: 'merah', hex: '#ef4444' },
      { name: 'KUNING', spoken: 'kuning', hex: '#facc15' },
      { name: 'HIJAU', spoken: 'hijau', hex: '#22c55e' },
      { name: 'ORANYE', spoken: 'oranye', hex: '#f97316' },
      { name: 'UNGU', spoken: 'ungu', hex: '#a855f7' },
      { name: 'COKELAT', spoken: 'cokelat', hex: '#b45309' }
    ];
    const chosenColor = pickRandom(targetColors);
    const matchingPool = VOCAB_BANK.filter((v) => v.color === chosenColor.name);
    const nonMatchingPool = VOCAB_BANK.filter((v) => v.color !== chosenColor.name);

    const targetCount = 3;
    const selectedTargets = shuffleArray(matchingPool).slice(0, targetCount);
    const distractors = shuffleArray(nonMatchingPool).slice(0, 3);

    const allTokens = shuffleArray([
      ...selectedTargets.map((v) => ({ ...v, isTarget: true })),
      ...distractors.map((v) => ({ ...v, isTarget: false }))
    ]);

    const currentRoundNum = state.roundProgress + 1;
    const visualPrompt = `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] Masukkan semua yang berwarna ${chosenColor.name} ke keranjang!`;
    const spokenPrompt = `Ayo masukkan semua buah dan sayur yang berwarna ${chosenColor.spoken} ke dalam keranjang.`;
    if (mascotEl) mascotEl.textContent = '🎨';
    if (promptEl) promptEl.textContent = visualPrompt;
    speakText(spokenPrompt, true);

    let collectedCount = 0;

    stage.innerHTML = `
      <div class="tree-canopy-zone" id="kebunTreeZone"></div>
      <div class="basket-zone" id="kebunBasketZone">
        <div class="basket-title">
          <span>🧺</span>
          <span>Keranjang Warna ${chosenColor.name} (<span id="colorProgressText">0/${targetCount}</span>)</span>
        </div>
        <div class="basket-items-tray" id="kebunBasketTray"></div>
      </div>
    `;

    const treeZone = document.getElementById('kebunTreeZone');
    const basketZone = document.getElementById('kebunBasketZone');
    const basketTray = document.getElementById('kebunBasketTray');
    const progressText = document.getElementById('colorProgressText');

    allTokens.forEach((fruit) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `fruit-token ${fruit.isTarget ? 'correct-target' : 'distractor-target'}`;
      btn.innerHTML = `
        <span class="color-dot-badge" style="background:${fruit.colorHex}"></span>
        ${renderItemGraphic(fruit, 44)}
        <span class="fruit-label">${fruit.name}</span>
      `;

      attachTapAndDragToFruit(btn, basketZone, () => {
        if (fruit.isTarget) {
          btn.classList.add('collected');
          collectedCount += 1;
          playPop(660, 990);

          const trayItem = document.createElement('div');
          trayItem.className = 'basket-collected-item';
          trayItem.innerHTML = renderItemGraphic(fruit, 34);
          basketTray.appendChild(trayItem);

          if (progressText) {
            progressText.textContent = `${collectedCount}/${targetCount}`;
          }

          if (collectedCount >= targetCount) {
            handleMissionSuccess(
              `${fruit.name}. Pintar sekali! Semua yang berwarna ${chosenColor.spoken} sudah masuk ke dalam keranjang.`
            );
          } else {
            speakText(`Benar, itu ${fruit.name} berwarna ${chosenColor.spoken}.`, false);
          }
        } else {
          giveGentleEncouragement('.correct-target:not(.collected)');
        }
      });

      treeZone.appendChild(btn);
    });
  }

  // MISI A2: BERHITUNG DASAR (1 - 5) DENGAN SUARA MENGHITUNG LANTANG
  function renderKebunCountingMission() {
    const stage = document.getElementById('kebunDynamicStage');
    const promptEl = document.getElementById('kebunPromptText');
    const mascotEl = document.getElementById('kebunMascot');
    if (!stage) return;

    const targetNumber = Math.floor(Math.random() * 4) + 2; // 2 sampai 5
    const targetWordSpoken = INDONESIAN_NUMBERS[targetNumber];
    const targetWordUpper = targetWordSpoken.toUpperCase();
    const targetFruit = pickRandom(VOCAB_BANK);
    const distractorsPool = shuffleArray(VOCAB_BANK.filter((v) => v.id !== targetFruit.id)).slice(
      0,
      2
    );

    const tokens = [];
    for (let i = 0; i < targetNumber + 1; i++) {
      tokens.push({ ...targetFruit, isTarget: true });
    }
    distractorsPool.forEach((d) => {
      tokens.push({ ...d, isTarget: false });
    });
    const shuffledTokens = shuffleArray(tokens);

    const currentRoundNum = state.roundProgress + 1;
    const visualPrompt = `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] Ayo petik ${targetWordUpper} (${targetNumber}) ${targetFruit.name}!`;
    const spokenPrompt = `Kelinci sedang lapar. Ayo petik ${targetWordSpoken} ${targetFruit.name}, lalu masukkan ke dalam keranjang.`;
    if (mascotEl) mascotEl.textContent = '🐰';
    if (promptEl) promptEl.textContent = visualPrompt;
    speakText(spokenPrompt, true);

    let countInBasket = 0;

    stage.innerHTML = `
      <div class="tree-canopy-zone" id="kebunTreeZone"></div>
      <div class="basket-zone" id="kebunBasketZone">
        <div class="basket-title">
          <span>🧺</span>
          <span>Hitung ${targetFruit.name}: <span id="countProgressText">0 / ${targetNumber}</span></span>
        </div>
        <div class="basket-items-tray" id="kebunBasketTray"></div>
      </div>
    `;

    const treeZone = document.getElementById('kebunTreeZone');
    const basketZone = document.getElementById('kebunBasketZone');
    const basketTray = document.getElementById('kebunBasketTray');
    const progressText = document.getElementById('countProgressText');

    shuffledTokens.forEach((fruit) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `fruit-token ${fruit.isTarget ? 'correct-target' : 'distractor-target'}`;
      btn.innerHTML = `
        ${renderItemGraphic(fruit, 44)}
        <span class="fruit-label">${fruit.name}</span>
      `;

      attachTapAndDragToFruit(btn, basketZone, () => {
        if (countInBasket >= targetNumber) return;

        if (fruit.isTarget) {
          btn.classList.add('collected');
          countInBasket += 1;
          playPop(580 + countInBasket * 70, 880 + countInBasket * 70);

          const trayItem = document.createElement('div');
          trayItem.className = 'basket-collected-item';
          trayItem.innerHTML = renderItemGraphic(fruit, 34);
          basketTray.appendChild(trayItem);

          if (progressText) {
            progressText.textContent = `${countInBasket} / ${targetNumber}`;
          }

          const numberSpoken = INDONESIAN_NUMBERS[countInBasket];
          if (countInBasket >= targetNumber) {
            handleMissionSuccess(
              `${numberSpoken}. Hore, sudah pas ${numberSpoken} ${targetFruit.name} untuk Kelinci!`
            );
          } else {
            speakText(numberSpoken, false);
          }
        } else {
          giveGentleEncouragement('.correct-target:not(.collected)');
        }
      });

      treeZone.appendChild(btn);
    });
  }

  // MISI A3: HURUF AWAL (FONIK DASAR BAHASA INDONESIA)
  function renderKebunPhonicsMission() {
    const stage = document.getElementById('kebunDynamicStage');
    const promptEl = document.getElementById('kebunPromptText');
    const mascotEl = document.getElementById('kebunMascot');
    if (!stage) return;

    const targetItem = pickRandom(VOCAB_BANK);
    const distractors = shuffleArray(
      VOCAB_BANK.filter((v) => v.letter !== targetItem.letter)
    ).slice(0, 2);

    const choices = shuffleArray([targetItem, ...distractors]);
    const currentRoundNum = state.roundProgress + 1;
    const spokenInstruction = `Manakah buah atau sayur yang namanya diawali dengan huruf ${targetItem.letter}, seperti pada kata ${targetItem.name}?`;

    if (mascotEl) mascotEl.textContent = '🔤';
    if (promptEl) {
      promptEl.textContent = `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] Manakah yang diawali huruf "${targetItem.letter}" (${targetItem.name})?`;
    }
    speakText(spokenInstruction, true);

    stage.innerHTML = `
      <div class="phonics-stage">
        <button type="button" class="giant-letter-card" id="btnGiantLetter" aria-label="Huruf ${targetItem.letter}">
          <span class="giant-letter-char">${targetItem.letter}</span>
          <span class="giant-letter-sub">🔊 Ketuk Huruf</span>
        </button>
        <div class="phonics-choices-grid" id="phonicsChoicesGrid"></div>
      </div>
    `;

    const giantLetterBtn = document.getElementById('btnGiantLetter');
    if (giantLetterBtn) {
      giantLetterBtn.addEventListener('click', () => {
        playPop(600, 900);
        speakText(`Ini huruf ${targetItem.letter}, untuk kata ${targetItem.name}.`, false);
      });
    }

    const choicesGrid = document.getElementById('phonicsChoicesGrid');
    choices.forEach((choice) => {
      const isCorrect = choice.id === targetItem.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `clay-btn clay-card phonics-choice-btn ${
        isCorrect ? 'correct-phonics-choice' : ''
      }`;
      const firstChar = choice.name.charAt(0);
      const restChars = choice.name.slice(1);
      btn.innerHTML = `
        <span class="phonics-choice-emoji">${renderItemGraphic(choice, 52)}</span>
        <span class="phonics-choice-word"><b>${firstChar}</b>${restChars}</span>
      `;

      btn.addEventListener('click', () => {
        if (state.isTransitioning) return;
        if (isCorrect) {
          playPop(700, 1050);
          handleMissionSuccess(
            `Tepat sekali! Kata ${choice.name} diawali dengan huruf ${choice.letter}.`
          );
        } else {
          giveGentleEncouragement('.correct-phonics-choice');
        }
      });

      choicesGrid.appendChild(btn);
    });
  }

  // --------------------------------------------------------------------------
  // 13. MODE B: "PASAR CILIK" (USIA 6-7 TAHUN)
  // --------------------------------------------------------------------------
  function startPasarMode() {
    playPop();
    state.activeMode = 'pasar';
    state.roundProgress = 0;
    state.isTransitioning = false;
    updateRoundDots('pasarRoundDots', 0);
    switchScreen('pasar');
    renderPasarMission();
  }

  function renderPasarMission() {
    const missionType = state.pasarMissionIndex % 3;
    state.pasarMissionIndex += 1;

    if (missionType === 0) {
      renderPasarSyllableTrainMission();
    } else if (missionType === 1) {
      renderPasarCoinCashierMission();
    } else {
      renderPasarMathCashierMission();
    }
  }

  // MISI B1: KERETA SUKU KATA (2, 3, ATAU 4 SUKU KATA + MINIMAL 6 PILIHAN GELEMBUNG)
  function renderPasarSyllableTrainMission() {
    const stage = document.getElementById('pasarDynamicStage');
    const promptEl = document.getElementById('pasarPromptText');
    const mascotEl = document.getElementById('pasarMascot');
    if (!stage) return;

    const desiredSylLengths = [2, 3, 4];
    const targetLen = desiredSylLengths[state.roundProgress % desiredSylLengths.length];
    const matchingLenPool = VOCAB_BANK.filter((v) => v.syllables.length === targetLen);
    const chosenItem =
      matchingLenPool.length > 0 ? pickRandom(matchingLenPool) : pickRandom(VOCAB_BANK);

    const totalSyllables = chosenItem.syllables.length;
    let currentIndex = 0;

    const correctBubbleObjs = chosenItem.syllables.map((text, idx) => ({
      id: `correct_${idx}`,
      isCorrectPart: true,
      idx,
      text,
      spoken: chosenItem.spokenSyllables[idx] || getSpokenSyllable(text)
    }));

    const minChoices = Math.max(6, totalSyllables + 2);
    const neededDistractors = minChoices - totalSyllables;
    const usedTexts = new Set(chosenItem.syllables.map((s) => s.toUpperCase()));

    const availableDistractors = shuffleArray(
      DISTRACTOR_SYLLABLES.filter((d) => !usedTexts.has(d.text.toUpperCase()))
    ).slice(0, neededDistractors);

    const distractorBubbleObjs = availableDistractors.map((d, idx) => ({
      id: `dist_${idx}`,
      isCorrectPart: false,
      idx: -1,
      text: d.text,
      spoken: d.spoken
    }));

    const allBubbles = shuffleArray([...correctBubbleObjs, ...distractorBubbleObjs]);

    const currentRoundNum = state.roundProgress + 1;
    const spokenInstruction = `Kereta Suku Kata. Ayo susun suku kata di bawah ini menjadi kata ${chosenItem.name}.`;
    if (mascotEl) mascotEl.textContent = '🚂';
    if (promptEl) {
      promptEl.textContent = `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] Susun ${totalSyllables} suku kata: ${chosenItem.name.toUpperCase()}`;
    }
    speakText(spokenInstruction, true);

    stage.innerHTML = `
      <div class="market-stall-card">
        <div class="stall-awning"></div>
        <div class="syllable-Showcase-emoji" id="stallEmojiBtn" title="Ketuk untuk dengar nama">${renderItemGraphic(chosenItem, 74)}</div>
        <div class="syllable-train-slots" id="syllableSlotsContainer"></div>
      </div>
      <div class="clay-card" style="padding: 10px 12px; text-align: center;">
        <p style="font-size: 0.85rem; font-weight: 800; color: #475569; margin-bottom: 4px;">
          Pilih suku kata yang tepat (${allBubbles.length} pilihan):
        </p>
        <div class="syllable-bubbles-pool" id="syllableBubblesPool"></div>
      </div>
    `;

    const emojiBtn = document.getElementById('stallEmojiBtn');
    if (emojiBtn) {
      emojiBtn.addEventListener('click', () => {
        playPop();
        speakText(chosenItem.name, false);
      });
    }

    const slotsContainer = document.getElementById('syllableSlotsContainer');
    const slotElements = [];
    for (let i = 0; i < totalSyllables; i++) {
      const slot = document.createElement('div');
      slot.className = 'syllable-slot';
      slot.textContent = '?';
      slotsContainer.appendChild(slot);
      slotElements.push(slot);
    }

    const poolContainer = document.getElementById('syllableBubblesPool');
    const bubbleButtons = [];

    allBubbles.forEach((sylObj) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'clay-btn clay-btn-yellow syllable-bubble-btn';
      btn.textContent = sylObj.text;
      btn.dataset.sylText = sylObj.text;

      btn.addEventListener('click', () => {
        if (state.isTransitioning || btn.classList.contains('used')) return;

        const expectedText = chosenItem.syllables[currentIndex];
        if (sylObj.text === expectedText) {
          playPop(620 + currentIndex * 80, 920 + currentIndex * 80);
          btn.classList.add('used');

          const activeSlot = slotElements[currentIndex];
          activeSlot.textContent = sylObj.text;
          activeSlot.classList.add('filled');

          currentIndex += 1;

          if (currentIndex >= totalSyllables) {
            handleMissionSuccess(
              `Dibaca, ${chosenItem.name}! Pintar sekali menyusun kata ${chosenItem.name}.`
            );
          } else {
            speakText(sylObj.spoken, false);
          }
        } else {
          bubbleButtons.forEach((b) => {
            if (!b.classList.contains('used') && b.dataset.sylText === expectedText) {
              b.classList.remove('hint-wiggle');
              void b.offsetWidth;
              b.classList.add('hint-wiggle');
            }
          });
          giveGentleEncouragement(null);
        }
      });

      poolContainer.appendChild(btn);
      bubbleButtons.push(btn);
    });
  }

  // MISI B2: KASIR CILIK - 5 PILIHAN KOIN (1, 2, 3, 4, 5) UNTUK PENJUMLAHAN 2 ATAU 3 KOIN
  function renderPasarCoinCashierMission() {
    const stage = document.getElementById('pasarDynamicStage');
    const promptEl = document.getElementById('pasarPromptText');
    const mascotEl = document.getElementById('pasarMascot');
    if (!stage) return;

    const fruitA = pickRandom(VOCAB_BANK);
    const fruitB = pickRandom(VOCAB_BANK.filter((v) => v.id !== fruitA.id));

    const countA = Math.floor(Math.random() * 4) + 3; // 3..6
    const countB = Math.floor(Math.random() * 5) + 3; // 3..7
    const targetTotal = countA + countB; // 6..13 koin

    let currentPaid = 0;
    let selectedCoinsList = [];

    const spokenCountA = INDONESIAN_NUMBERS[countA];
    const spokenCountB = INDONESIAN_NUMBERS[countB];
    const spokenTotal = INDONESIAN_NUMBERS[targetTotal];
    const currentRoundNum = state.roundProgress + 1;

    const spokenInstruction = `Kasir Cilik. Pembeli membeli ${spokenCountA} ${fruitA.name} dan ${spokenCountB} ${fruitB.name}. Jumlah harganya ${spokenTotal} koin. Ayo pilih dan jumlahkan koin di bawah hingga pas ${spokenTotal} koin.`;
    if (mascotEl) mascotEl.textContent = '🦊';
    if (promptEl) {
      promptEl.textContent = `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] Harga ${targetTotal} Koin. Gabungkan 2 atau 3 koin di bawah!`;
    }
    speakText(spokenInstruction, true);

    stage.innerHTML = `
      <div class="market-stall-card">
        <div class="stall-awning"></div>
        <div class="kasir-orders-box">
          <div class="kasir-item-group">
            <div class="kasir-item-emojis">${Array.from({ length: countA }, () => renderItemGraphic(fruitA, 28)).join('')}</div>
            <div class="kasir-item-count">${countA} ${fruitA.name}</div>
          </div>
          <div class="kasir-operator">+</div>
          <div class="kasir-item-group">
            <div class="kasir-item-emojis">${Array.from({ length: countB }, () => renderItemGraphic(fruitB, 28)).join('')}</div>
            <div class="kasir-item-count">${countB} ${fruitB.name}</div>
          </div>
        </div>
      </div>

      <div class="kasir-interaction-area">
        <div class="coin-counter-bar">
          <span>🎯 Harga: <b>${targetTotal}</b></span>
          <span>🪙 Koin: <b id="paidCoinFormula">0</b></span>
          <button type="button" id="btnResetCoins" class="clay-btn clay-btn-blue" style="min-height: 44px; min-width: 44px; padding: 6px 10px; font-size: 0.82rem; border-radius: 14px;">
            🔄 Ulang
          </button>
        </div>
        <div class="coin-buttons-row">
          <button type="button" class="clay-btn coin-btn" data-coin="1">
            <span>1</span>
            <small>KOIN</small>
          </button>
          <button type="button" class="clay-btn coin-btn" data-coin="2">
            <span>2</span>
            <small>KOIN</small>
          </button>
          <button type="button" class="clay-btn coin-btn" data-coin="3">
            <span>3</span>
            <small>KOIN</small>
          </button>
          <button type="button" class="clay-btn coin-btn" data-coin="4">
            <span>4</span>
            <small>KOIN</small>
          </button>
          <button type="button" class="clay-btn coin-btn" data-coin="5">
            <span>5</span>
            <small>KOIN</small>
          </button>
        </div>
      </div>
    `;

    const formulaText = document.getElementById('paidCoinFormula');
    const resetBtn = document.getElementById('btnResetCoins');
    const coinBtns = stage.querySelectorAll('.coin-btn');

    function updateFormulaDisplay() {
      if (!formulaText) return;
      if (selectedCoinsList.length === 0) {
        formulaText.textContent = '0';
      } else if (selectedCoinsList.length === 1) {
        formulaText.textContent = `${selectedCoinsList[0]}`;
      } else {
        formulaText.textContent = `${selectedCoinsList.join(' + ')} = ${currentPaid}`;
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playPop(420, 620);
        currentPaid = 0;
        selectedCoinsList = [];
        updateFormulaDisplay();
        speakText('Hitungan koin diulang dari nol ya.', false);
      });
    }

    coinBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (state.isTransitioning) return;
        const val = Number(btn.dataset.coin);

        if (currentPaid + val > targetTotal) {
          const remaining = targetTotal - currentPaid;
          const bestCoin = Math.min(5, Math.max(1, remaining));
          giveGentleEncouragement(`.coin-btn[data-coin="${bestCoin}"]`);
          return;
        }

        currentPaid += val;
        selectedCoinsList.push(val);
        playPop(600 + currentPaid * 35, 900 + currentPaid * 35);
        updateFormulaDisplay();

        const spokenPaid = INDONESIAN_NUMBERS[currentPaid] || String(currentPaid);
        if (currentPaid === targetTotal) {
          handleMissionSuccess(
            `${spokenPaid} koin. Hebat sekali, jumlah koin yang dibayarkan sudah pas!`
          );
        } else {
          speakText(`${spokenPaid} koin.`, false);
        }
      });
    });
  }

  // MISI B3: KASIR CILIK - PENJUMLAHAN & PENGURANGAN DASAR (RENTANG 1 - 15)
  function renderPasarMathCashierMission() {
    const stage = document.getElementById('pasarDynamicStage');
    const promptEl = document.getElementById('pasarPromptText');
    const mascotEl = document.getElementById('pasarMascot');
    if (!stage) return;

    const isSubtraction = Math.random() > 0.45;
    const fruitA = pickRandom(VOCAB_BANK);
    const fruitB = isSubtraction
      ? fruitA
      : pickRandom(VOCAB_BANK.filter((v) => v.id !== fruitA.id));

    let numA, numB, correctTotal, operatorSymbol, spokenInstruction;

    if (isSubtraction) {
      numA = Math.floor(Math.random() * 7) + 6;
      numB = Math.floor(Math.random() * 4) + 2;
      correctTotal = numA - numB;
      operatorSymbol = '−';
      spokenInstruction = `Di meja pasar ada ${INDONESIAN_NUMBERS[numA]} ${fruitA.name}, lalu terjual ${INDONESIAN_NUMBERS[numB]} ${fruitA.name}. Berapakah sisa ${fruitA.name} sekarang?`;
    } else {
      numA = Math.floor(Math.random() * 6) + 3;
      numB = Math.floor(Math.random() * 6) + 2;
      correctTotal = numA + numB;
      operatorSymbol = '+';
      spokenInstruction = `Mari berhitung bersama. Ada ${INDONESIAN_NUMBERS[numA]} ${fruitA.name} ditambah ${INDONESIAN_NUMBERS[numB]} ${fruitB.name}. Berapakah jumlah seluruhnya?`;
    }

    const optionsSet = new Set([correctTotal]);
    while (optionsSet.size < 3) {
      const offset = pickRandom([-3, -2, -1, 1, 2, 3]);
      const candidate = correctTotal + offset;
      if (candidate >= 1 && candidate <= 15) {
        optionsSet.add(candidate);
      }
    }
    const choices = shuffleArray([...optionsSet]);
    const currentRoundNum = state.roundProgress + 1;

    if (mascotEl) mascotEl.textContent = '🧮';
    if (promptEl) {
      promptEl.textContent = isSubtraction
        ? `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] ${numA} ${fruitA.name} − ${numB} ${fruitA.name} = ?`
        : `[Soal ${currentRoundNum}/${QUESTIONS_PER_SET}] ${numA} ${fruitA.name} + ${numB} ${fruitB.name} = ?`;
    }
    speakText(spokenInstruction, true);

    stage.innerHTML = `
      <div class="market-stall-card">
        <div class="stall-awning"></div>
        <div class="kasir-orders-box">
          <div class="kasir-item-group">
            <div class="kasir-item-emojis">${Array.from({ length: numA }, () => renderItemGraphic(fruitA, 26)).join('')}</div>
            <div class="kasir-item-count">${numA} ${fruitA.name}</div>
          </div>
          <div class="kasir-operator">${operatorSymbol}</div>
          <div class="kasir-item-group">
            <div class="kasir-item-emojis">${Array.from({ length: numB }, () => renderItemGraphic(fruitB, 26)).join('')}</div>
            <div class="kasir-item-count">${numB} ${fruitB.name}</div>
          </div>
        </div>
      </div>

      <div class="kasir-interaction-area">
        <p style="font-size: 0.95rem; font-weight: 900; color: #15803d;">
          Ketuk angka jawaban yang benar:
        </p>
        <div class="number-choices-grid" id="mathNumberChoices"></div>
      </div>
    `;

    const grid = document.getElementById('mathNumberChoices');
    choices.forEach((num) => {
      const isCorrect = num === correctTotal;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `clay-btn clay-btn-green number-choice-btn ${
        isCorrect ? 'correct-math-choice' : ''
      }`;
      btn.textContent = String(num);

      btn.addEventListener('click', () => {
        if (state.isTransitioning) return;
        if (isCorrect) {
          playPop(720, 1080);
          const word = INDONESIAN_NUMBERS[num] || String(num);
          handleMissionSuccess(`Tepat sekali! Jawabannya adalah ${word}.`);
        } else {
          giveGentleEncouragement('.correct-math-choice');
        }
      });

      grid.appendChild(btn);
    });
  }

  // --------------------------------------------------------------------------
  // 14. ALBUM 100 STIKER KOLEKSI SCREEN
  // --------------------------------------------------------------------------
  function openStickerAlbum() {
    playPop();
    switchScreen('album');
    const countText =
      INDONESIAN_NUMBERS[state.unlockedStickers.length] || String(state.unlockedStickers.length);
    const instruction = `Ini adalah Album seratus Stiker koleksimu. Kamu sudah membuka ${countText} stiker. Ketuk stiker yang sudah terbuka untuk mendengarkan suaranya.`;
    speakText(instruction, true);

    const grid = document.getElementById('albumGrid');
    if (!grid) return;
    grid.innerHTML = '';

    STICKER_COLLECTION.forEach((sticker, index) => {
      const isUnlocked = state.unlockedStickers.includes(sticker.id);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `sticker-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <span class="sticker-emoji">${renderItemGraphic(sticker, 44)}</span>
        <span class="sticker-name">${isUnlocked ? `${index + 1}. ${sticker.name}` : `🔒 #${index + 1}`}</span>
      `;

      card.addEventListener('click', () => {
        if (isUnlocked) {
          playPop(640, 960);
          speakText(sticker.voice, false);
        } else {
          playGentleBoing();
          speakText('Selesaikan satu set sepuluh soal untuk membuka stiker kejutan ini ya.', false);
        }
      });

      grid.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // 15. EVENT LISTENERS & SERVICE WORKER AUTO-UPDATE
  // --------------------------------------------------------------------------
  function initApp() {
    loadState();

    const btnHome = document.getElementById('btnHome');
    const btnSpeaker = document.getElementById('btnSpeaker');
    const btnModeKebun = document.getElementById('btnModeKebun');
    const btnModePasar = document.getElementById('btnModePasar');
    const btnOpenAlbum = document.getElementById('btnOpenAlbum');
    const btnContinueGame = document.getElementById('btnContinueGame');

    if (btnHome) {
      btnHome.addEventListener('click', () => {
        playPop(500, 750);
        state.activeMode = null;
        state.isTransitioning = false;
        switchScreen('home');
        speakText(
          'Selamat datang di halaman utama. Silakan pilih permainan Kebun Ceria atau Pasar Cilik.',
          true
        );
      });
    }

    if (btnSpeaker) {
      btnSpeaker.addEventListener('click', () => {
        playPop(680, 940);
        speakText(currentInstructionText, false);
      });
    }

    if (btnModeKebun) {
      btnModeKebun.addEventListener('click', startKebunMode);
    }

    if (btnModePasar) {
      btnModePasar.addEventListener('click', startPasarMode);
    }

    if (btnOpenAlbum) {
      btnOpenAlbum.addEventListener('click', openStickerAlbum);
    }

    if (btnContinueGame) {
      btnContinueGame.addEventListener('click', closeRewardModalAndContinue);
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./sw.js?v=5')
          .then((reg) => {
            reg.update();
          })
          .catch(() => {});
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
