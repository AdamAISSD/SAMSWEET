export const defaultLocale = "en";

export const localeOrder = ["en", "ar", "fr", "es", "pt", "ru", "zh-CN"];

export const localeMeta = {
  en: { name: "English", short: "EN", lang: "en", dir: "ltr" },
  ar: { name: "العربية", short: "AR", lang: "ar", dir: "rtl" },
  fr: { name: "Français", short: "FR", lang: "fr", dir: "ltr" },
  es: { name: "Español", short: "ES", lang: "es", dir: "ltr" },
  pt: { name: "Português", short: "PT", lang: "pt", dir: "ltr" },
  ru: { name: "Русский", short: "RU", lang: "ru", dir: "ltr" },
  "zh-CN": { name: "简体中文", short: "中文", lang: "zh-CN", dir: "ltr" }
};

const shared = {
  categoryLabels: {
    all: "All",
    "PCIe SSD": "PCIe SSD",
    "SATA SSD": "2.5 SATA SSD",
    "M.2 NGFF SSD": "M.2 NGFF SSD",
    "mSATA SSD": "mSATA SSD",
    "DDR Memory": "DDR Memory"
  }
};

export const translations = {
  en: {
    ...shared,
    nav: {
      categories: "Categories",
      products: "Products",
      quality: "Quality",
      faq: "FAQ",
      cart: "Inquiry Cart",
      whatsapp: "WhatsApp"
    },
    hero: {
      eyebrow: "Wholesale SSD Supply",
      title: "SAMSWEET SSD for Fast, Reliable Storage Upgrades.",
      subtitle:
        "Wholesale-ready SSD and memory products for PC builders, repair shops, distributors, and global buyers.",
      primary: "View Products",
      secondary: "Send Inquiry on WhatsApp",
      stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "Bulk Supply", "QC Support"]
    },
    categories: {
      eyebrow: "Product Categories",
      title: "Choose the storage line that fits your customer base.",
      body:
        "Compare PCIe, SATA, NGFF, mSATA and DDR memory options, then build an inquiry cart for current quotation and stock confirmation."
    },
    products: {
      eyebrow: "Featured Products",
      title: "Static product data, clear sourcing notes, fast inquiry.",
      body:
        "Prices are reference RMB figures from the June 8, 2026 SAMSWEET list. Final details are confirmed by quotation.",
      search: "Search product, capacity, interface",
      category: "Category",
      capacity: "Capacity",
      allCapacities: "All capacities",
      noResults: "No products match the current filters.",
      add: "Add to Inquiry",
      added: "Added to inquiry cart.",
      qty: "Qty",
      details: "Details",
      source: "Source",
      placeholder: "Placeholder visual",
      referenceAsset: "Reference asset"
    },
    why: {
      eyebrow: "Why SAMSWEET",
      title: "Built for export wholesale conversations.",
      items: [
        ["Factory-backed supply", "Practical SSD and memory lines for buyers planning channel orders."],
        ["Clear quotation path", "Reference prices help start the conversation; final price and stock are confirmed directly."],
        ["Quality checked before shipment", "Batch inspection, packaging support, and after-sales communication can be aligned before order."],
        ["Responsible claims", "Specifications, warranty terms, and performance details are confirmed by SKU and quotation."]
      ]
    },
    specs: {
      eyebrow: "Technical Specs",
      title: "Key interfaces buyers ask about first.",
      items: [
        ["PCIe SSD", "M.2 NVMe-class SSD family. Confirm controller, NAND, speed and warranty by datasheet."],
        ["2.5 SATA SSD", "SATA 3.0 / 6.0Gbps interface for common desktop and laptop upgrades."],
        ["M.2 NGFF SSD", "M.2 SATA option for compatible notebooks, mini PCs and repair channels."],
        ["mSATA SSD", "Compact SATA storage for older systems and embedded upgrade needs."],
        ["DDR Memory", "DDR3 / DDR4 memory SKUs for repair, upgrade and channel supply."]
      ]
    },
    flow: {
      eyebrow: "Wholesale Order Flow",
      title: "From product selection to confirmed shipment.",
      steps: [
        ["Choose product and quantity", "Add the exact capacities and quantities to your inquiry cart."],
        ["Submit inquiry via WhatsApp", "Your order text is copied and WhatsApp opens with the message ready."],
        ["Confirm quotation and stock", "Confirm price, packaging, quality grade, warranty and lead time."],
        ["Arrange payment and shipment", "Proceed only after final quotation and shipment details are confirmed."]
      ]
    },
    quality: {
      eyebrow: "Warranty / Quality Control",
      title: "Credible support without inflated promises.",
      points: [
        "Batch inspection before shipment",
        "Stable supply discussion for repeat orders",
        "Packaging support for channel buyers",
        "Warranty support confirmed by quotation",
        "SN / order tracking if available"
      ]
    },
    cart: {
      title: "Inquiry Cart",
      empty: "Your inquiry cart is empty.",
      subtotalNote: "Reference prices are for orientation only. Final quotation is confirmed by SAMSWEET.",
      open: "Open inquiry cart",
      close: "Close cart",
      remove: "Remove",
      clear: "Clear cart",
      formTitle: "Customer Info",
      name: "Name",
      country: "Country",
      whatsapp: "Your WhatsApp",
      remark: "Remark",
      submit: "Copy Order & Open WhatsApp",
      copied: "Order copied. WhatsApp will open with your inquiry message.",
      fallbackTitle: "Copy your inquiry",
      fallbackBody: "Clipboard access was blocked. Your order is safe here. Copy it manually, then send it on WhatsApp.",
      fallbackButton: "Open WhatsApp",
      required: "Please add at least one product before submitting."
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common wholesale questions.",
      items: [
        ["How can I get the latest quotation?", "Add products to the inquiry cart and send the WhatsApp message. SAMSWEET will confirm current price, stock and shipment details."],
        ["Do you support wholesale orders?", "Yes. The site is designed for bulk inquiries from PC builders, repair shops, distributors and global buyers."],
        ["Can I mix different capacities?", "Yes. Add each capacity and quantity to the cart so the quotation request is clear."],
        ["How do I confirm compatibility?", "Share the device model, interface requirement and target use case. Final compatibility should be confirmed by specification or sample evaluation."],
        ["How do I place an order?", "Send the inquiry by WhatsApp, confirm quotation and stock, then arrange payment and shipment after final confirmation."],
        ["What if WhatsApp does not open?", "The site also copies your order text. If WhatsApp is blocked, use the fallback text box and send the message manually."]
      ]
    },
    finalCta: {
      title: "Ready to build your SAMSWEET SSD inquiry?",
      body: "Select products, add quantities, and send a clean WhatsApp message with your sourcing requirements.",
      button: "Start Inquiry"
    },
    footer: {
      summary: "SAMSWEET SSD and memory products for wholesale buyers, repair channels and global distributors.",
      disclaimer: "Product specifications and prices may change. Final details are confirmed by quotation.",
      whatsapp: "WhatsApp: +86 19064025220"
    }
  },
  ar: {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "الكل" },
    nav: { categories: "الفئات", products: "المنتجات", quality: "الجودة", faq: "الأسئلة", cart: "سلة الاستفسار", whatsapp: "WhatsApp" },
    hero: {
      eyebrow: "توريد SSD بالجملة",
      title: "SAMSWEET SSD لترقيات تخزين سريعة وموثوقة.",
      subtitle: "منتجات SSD وذاكرة جاهزة للجملة لبناة الحواسيب، محلات الصيانة، الموزعين والمشترين العالميين.",
      primary: "عرض المنتجات",
      secondary: "إرسال استفسار عبر WhatsApp",
      stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "توريد كميات", "دعم فحص الجودة"]
    },
    categories: {
      eyebrow: "فئات المنتجات",
      title: "اختر خط التخزين المناسب لعملائك.",
      body: "قارن خيارات PCIe وSATA وNGFF وmSATA وDDR، ثم أنشئ سلة استفسار لتأكيد السعر والمخزون الحالي."
    },
    products: {
      eyebrow: "منتجات مميزة",
      title: "بيانات واضحة ومصادر محددة واستفسار سريع.",
      body: "الأسعار أرقام RMB مرجعية من قائمة SAMSWEET بتاريخ 8 يونيو 2026. التفاصيل النهائية تؤكد بعرض السعر.",
      search: "ابحث عن المنتج أو السعة أو الواجهة",
      category: "الفئة",
      capacity: "السعة",
      allCapacities: "كل السعات",
      noResults: "لا توجد منتجات تطابق عوامل التصفية الحالية.",
      add: "أضف إلى الاستفسار",
      added: "تمت الإضافة إلى سلة الاستفسار.",
      qty: "الكمية",
      details: "التفاصيل",
      source: "المصدر",
      placeholder: "صورة مؤقتة",
      referenceAsset: "صورة مرجعية"
    },
    why: {
      eyebrow: "لماذا SAMSWEET",
      title: "مصمم لمحادثات الجملة والتصدير.",
      items: [
        ["توريد مدعوم من المصنع", "خطوط SSD وذاكرة عملية للمشترين الذين يخططون لطلبات القنوات."],
        ["مسار عرض سعر واضح", "تساعد الأسعار المرجعية على بدء الحديث، ويتم تأكيد السعر والمخزون مباشرة."],
        ["فحص قبل الشحن", "يمكن تنسيق فحص الدفعات، التغليف، وخدمة ما بعد البيع قبل الطلب."],
        ["ادعاءات مسؤولة", "تؤكد المواصفات والضمان والأداء حسب SKU وعرض السعر."]
      ]
    },
    specs: {
      eyebrow: "المواصفات التقنية",
      title: "الواجهات الأساسية التي يسأل عنها المشترون أولا.",
      items: [
        ["PCIe SSD", "عائلة M.2 NVMe-class SSD. تؤكد وحدة التحكم وNAND والسرعة والضمان عبر ورقة البيانات."],
        ["2.5 SATA SSD", "واجهة SATA 3.0 / 6.0Gbps لترقيات الحواسيب المكتبية والمحمولة."],
        ["M.2 NGFF SSD", "خيار M.2 SATA للأجهزة المتوافقة وقنوات الصيانة."],
        ["mSATA SSD", "تخزين SATA مدمج للأنظمة الأقدم واحتياجات الترقية."],
        ["DDR Memory", "منتجات DDR3 / DDR4 للإصلاح والترقية والتوريد."]
      ]
    },
    flow: {
      eyebrow: "خطوات طلب الجملة",
      title: "من اختيار المنتج إلى تأكيد الشحن.",
      steps: [
        ["اختر المنتج والكمية", "أضف السعات والكميات الدقيقة إلى سلة الاستفسار."],
        ["أرسل الاستفسار عبر WhatsApp", "يتم نسخ نص الطلب وفتح WhatsApp برسالة جاهزة."],
        ["أكد السعر والمخزون", "أكد السعر والتغليف ودرجة الجودة والضمان ومدة التسليم."],
        ["رتب الدفع والشحن", "تابع فقط بعد تأكيد عرض السعر وتفاصيل الشحن."]
      ]
    },
    quality: {
      eyebrow: "الضمان / فحص الجودة",
      title: "دعم موثوق من دون مبالغة.",
      points: ["فحص الدفعات قبل الشحن", "مناقشة توريد مستقر للطلبات المتكررة", "دعم التغليف للمشترين", "دعم ضمان يؤكد بعرض السعر", "تتبع SN / الطلب إذا كان متاحا"]
    },
    cart: {
      title: "سلة الاستفسار",
      empty: "سلة الاستفسار فارغة.",
      subtotalNote: "الأسعار المرجعية للتوجيه فقط. يؤكد السعر النهائي من SAMSWEET.",
      open: "افتح سلة الاستفسار",
      close: "إغلاق السلة",
      remove: "إزالة",
      clear: "مسح السلة",
      formTitle: "معلومات العميل",
      name: "الاسم",
      country: "الدولة",
      whatsapp: "رقم WhatsApp الخاص بك",
      remark: "ملاحظات",
      submit: "نسخ الطلب وفتح WhatsApp",
      copied: "تم نسخ الطلب. سيفتح WhatsApp برسالة الاستفسار.",
      fallbackTitle: "انسخ الاستفسار",
      fallbackBody: "تم حظر الوصول إلى الحافظة. طلبك محفوظ هنا. انسخه يدويا ثم أرسله عبر WhatsApp.",
      fallbackButton: "افتح WhatsApp",
      required: "يرجى إضافة منتج واحد على الأقل قبل الإرسال."
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "أسئلة الجملة المتكررة.",
      items: [
        ["كيف أحصل على أحدث عرض سعر؟", "أضف المنتجات إلى سلة الاستفسار وأرسل رسالة WhatsApp. ستؤكد SAMSWEET السعر والمخزون والشحن."],
        ["هل تدعمون طلبات الجملة؟", "نعم. الموقع مخصص لاستفسارات الكميات من بناة الحواسيب ومحلات الصيانة والموزعين."],
        ["هل يمكنني خلط سعات مختلفة؟", "نعم. أضف كل سعة وكمية إلى السلة ليكون طلب السعر واضحا."],
        ["كيف أؤكد التوافق؟", "شارك طراز الجهاز ومتطلبات الواجهة والاستخدام المطلوب. يؤكد التوافق النهائي بالمواصفة أو العينة."],
        ["كيف أضع طلبا؟", "أرسل الاستفسار عبر WhatsApp، أكد السعر والمخزون، ثم رتب الدفع والشحن بعد التأكيد."],
        ["ماذا لو لم يفتح WhatsApp؟", "يقوم الموقع أيضا بنسخ نص الطلب. استخدم مربع النص الاحتياطي وأرسل الرسالة يدويا."]
      ]
    },
    finalCta: { title: "هل أنت جاهز لبناء استفسار SAMSWEET SSD؟", body: "اختر المنتجات والكميات وأرسل رسالة WhatsApp واضحة بمتطلبات التوريد.", button: "ابدأ الاستفسار" },
    footer: { summary: "منتجات SAMSWEET SSD والذاكرة لمشتري الجملة وقنوات الصيانة والموزعين العالميين.", disclaimer: "قد تتغير مواصفات المنتجات والأسعار. تؤكد التفاصيل النهائية بعرض السعر.", whatsapp: "WhatsApp: +86 19064025220" }
  },
  fr: {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "Tous" },
    nav: { categories: "Catégories", products: "Produits", quality: "Qualité", faq: "FAQ", cart: "Panier d'inquiry", whatsapp: "WhatsApp" },
    hero: { eyebrow: "Approvisionnement SSD en gros", title: "SAMSWEET SSD pour des mises à niveau rapides et fiables.", subtitle: "SSD et mémoire prêts pour le wholesale, destinés aux assembleurs PC, réparateurs, distributeurs et acheteurs internationaux.", primary: "Voir les produits", secondary: "Envoyer sur WhatsApp", stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "Lots wholesale", "Support QC"] },
    categories: { eyebrow: "Catégories", title: "Choisissez la gamme adaptée à votre clientèle.", body: "Comparez PCIe, SATA, NGFF, mSATA et DDR, puis préparez un panier d'inquiry pour confirmer prix et stock." },
    products: { eyebrow: "Produits en avant", title: "Données statiques, sources claires, inquiry rapide.", body: "Les prix sont des références RMB de la liste SAMSWEET du 8 juin 2026. Les détails finaux sont confirmés par devis.", search: "Rechercher produit, capacité, interface", category: "Catégorie", capacity: "Capacité", allCapacities: "Toutes les capacités", noResults: "Aucun produit ne correspond aux filtres.", add: "Ajouter à l'inquiry", added: "Ajouté au panier d'inquiry.", qty: "Qté", details: "Détails", source: "Source", placeholder: "Visuel temporaire", referenceAsset: "Visuel de référence" },
    why: { eyebrow: "Pourquoi SAMSWEET", title: "Pensé pour les échanges export et wholesale.", items: [["Supply factory-backed", "Gammes SSD et mémoire pratiques pour planifier des commandes channel."], ["Devis clair", "Les prix de référence lancent l'échange; prix final et stock sont confirmés directement."], ["Contrôle avant expédition", "Inspection de lot, packaging et support après-vente peuvent être alignés avant commande."], ["Messages responsables", "Spécifications, garantie et performances sont confirmées par SKU et devis."]] },
    specs: { eyebrow: "Spécifications", title: "Les interfaces clés demandées en premier.", items: [["PCIe SSD", "Famille M.2 NVMe-class. Contrôleur, NAND, vitesse et garantie à confirmer par fiche technique."], ["2.5 SATA SSD", "Interface SATA 3.0 / 6.0Gbps pour mises à niveau PC courantes."], ["M.2 NGFF SSD", "Option M.2 SATA pour notebooks, mini PC et réparation compatibles."], ["mSATA SSD", "Stockage SATA compact pour systèmes anciens et besoins embarqués."], ["DDR Memory", "SKUs DDR3 / DDR4 pour réparation, upgrade et distribution."]] },
    flow: { eyebrow: "Processus wholesale", title: "De la sélection produit à l'expédition confirmée.", steps: [["Choisir produit et quantité", "Ajoutez capacités et quantités exactes au panier."], ["Envoyer via WhatsApp", "Le texte est copié et WhatsApp s'ouvre avec le message prêt."], ["Confirmer devis et stock", "Validez prix, packaging, grade qualité, garantie et délai."], ["Organiser paiement et transport", "Avancez après confirmation finale du devis et de l'expédition."]] },
    quality: { eyebrow: "Garantie / Contrôle qualité", title: "Un support crédible, sans promesses excessives.", points: ["Inspection de lot avant expédition", "Discussion de supply stable pour commandes répétées", "Support packaging pour buyers channel", "Garantie confirmée par devis", "Suivi SN / commande si disponible"] },
    cart: { title: "Panier d'inquiry", empty: "Votre panier est vide.", subtotalNote: "Les prix de référence sont indicatifs. Le devis final est confirmé par SAMSWEET.", open: "Ouvrir le panier", close: "Fermer", remove: "Retirer", clear: "Vider", formTitle: "Infos client", name: "Nom", country: "Pays", whatsapp: "Votre WhatsApp", remark: "Remarque", submit: "Copier et ouvrir WhatsApp", copied: "Commande copiée. WhatsApp va s'ouvrir avec votre message.", fallbackTitle: "Copiez votre inquiry", fallbackBody: "L'accès au presse-papiers a été bloqué. Votre demande est ici; copiez-la puis envoyez-la sur WhatsApp.", fallbackButton: "Ouvrir WhatsApp", required: "Ajoutez au moins un produit avant l'envoi." },
    faq: { eyebrow: "FAQ", title: "Questions wholesale fréquentes.", items: [["Comment obtenir le dernier devis ?", "Ajoutez les produits au panier et envoyez le message WhatsApp. SAMSWEET confirmera prix, stock et expédition."], ["Acceptez-vous les commandes wholesale ?", "Oui, pour assembleurs PC, réparateurs, distributeurs et acheteurs internationaux."], ["Puis-je mélanger les capacités ?", "Oui. Ajoutez chaque capacité et quantité au panier pour un devis clair."], ["Comment confirmer la compatibilité ?", "Partagez modèle appareil, interface et usage cible. La compatibilité finale se confirme par spécification ou échantillon."], ["Comment passer commande ?", "Envoyez l'inquiry, confirmez devis et stock, puis organisez paiement et expédition."], ["Et si WhatsApp ne s'ouvre pas ?", "Le texte est aussi copié. Utilisez la zone de secours pour envoyer manuellement."]] },
    finalCta: { title: "Prêt à préparer votre inquiry SAMSWEET SSD ?", body: "Sélectionnez produits et quantités, puis envoyez un message WhatsApp clair.", button: "Démarrer l'inquiry" },
    footer: { summary: "SSD et mémoire SAMSWEET pour buyers wholesale, réparation et distribution internationale.", disclaimer: "Les spécifications et prix peuvent changer. Les détails finaux sont confirmés par devis.", whatsapp: "WhatsApp : +86 19064025220" }
  },
  es: {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "Todos" },
    nav: { categories: "Categorías", products: "Productos", quality: "Calidad", faq: "FAQ", cart: "Carrito de consulta", whatsapp: "WhatsApp" },
    hero: { eyebrow: "Suministro SSD al por mayor", title: "SAMSWEET SSD para actualizaciones rápidas y fiables.", subtitle: "SSD y memorias listos para mayoristas, integradores PC, talleres de reparación, distribuidores y compradores globales.", primary: "Ver productos", secondary: "Enviar por WhatsApp", stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "Pedidos bulk", "Soporte QC"] },
    categories: { eyebrow: "Categorías", title: "Elige la línea de almacenamiento para tus clientes.", body: "Compara PCIe, SATA, NGFF, mSATA y DDR, y crea un carrito de consulta para confirmar precio y stock." },
    products: { eyebrow: "Productos destacados", title: "Datos claros, origen visible, consulta rápida.", body: "Los precios son referencias RMB de la lista SAMSWEET del 8 de junio de 2026. Los detalles finales se confirman por cotización.", search: "Buscar producto, capacidad, interfaz", category: "Categoría", capacity: "Capacidad", allCapacities: "Todas las capacidades", noResults: "No hay productos con estos filtros.", add: "Añadir a consulta", added: "Añadido al carrito de consulta.", qty: "Cant.", details: "Detalles", source: "Fuente", placeholder: "Imagen temporal", referenceAsset: "Imagen de referencia" },
    why: { eyebrow: "Por qué SAMSWEET", title: "Preparado para conversaciones de exportación y canal.", items: [["Suministro con respaldo de fábrica", "Líneas SSD y memoria prácticas para planificar pedidos de canal."], ["Ruta clara de cotización", "Los precios de referencia inician la conversación; el precio final y stock se confirman directamente."], ["Revisión antes del envío", "Inspección por lote, packaging y soporte postventa pueden acordarse antes del pedido."], ["Mensajes responsables", "Especificaciones, garantía y rendimiento se confirman por SKU y cotización."]] },
    specs: { eyebrow: "Especificaciones", title: "Interfaces clave que los compradores revisan primero.", items: [["PCIe SSD", "Familia M.2 NVMe-class. Controlador, NAND, velocidad y garantía se confirman por ficha técnica."], ["2.5 SATA SSD", "Interfaz SATA 3.0 / 6.0Gbps para upgrades comunes."], ["M.2 NGFF SSD", "Opción M.2 SATA para notebooks, mini PCs y reparación compatibles."], ["mSATA SSD", "Almacenamiento SATA compacto para sistemas antiguos y embebidos."], ["DDR Memory", "SKUs DDR3 / DDR4 para reparación, upgrade y canal."]] },
    flow: { eyebrow: "Proceso mayorista", title: "De la selección al envío confirmado.", steps: [["Elegir producto y cantidad", "Añade capacidades y cantidades exactas al carrito."], ["Enviar por WhatsApp", "El texto se copia y WhatsApp se abre con el mensaje listo."], ["Confirmar precio y stock", "Confirma precio, packaging, grado de calidad, garantía y plazo."], ["Organizar pago y envío", "Avanza solo tras confirmar cotización y detalles de envío."]] },
    quality: { eyebrow: "Garantía / Control de calidad", title: "Soporte creíble sin promesas exageradas.", points: ["Inspección por lote antes del envío", "Conversación de suministro estable", "Soporte de packaging para canal", "Garantía confirmada por cotización", "Seguimiento SN / pedido si está disponible"] },
    cart: { title: "Carrito de consulta", empty: "Tu carrito está vacío.", subtotalNote: "Los precios de referencia son orientativos. SAMSWEET confirma la cotización final.", open: "Abrir carrito", close: "Cerrar", remove: "Quitar", clear: "Vaciar", formTitle: "Datos del cliente", name: "Nombre", country: "País", whatsapp: "Tu WhatsApp", remark: "Nota", submit: "Copiar y abrir WhatsApp", copied: "Pedido copiado. WhatsApp se abrirá con tu mensaje.", fallbackTitle: "Copia tu consulta", fallbackBody: "El navegador bloqueó el portapapeles. Tu consulta está aquí; cópiala y envíala por WhatsApp.", fallbackButton: "Abrir WhatsApp", required: "Añade al menos un producto antes de enviar." },
    faq: { eyebrow: "FAQ", title: "Preguntas mayoristas comunes.", items: [["¿Cómo obtengo la cotización más reciente?", "Añade productos al carrito y envía el WhatsApp. SAMSWEET confirmará precio, stock y envío."], ["¿Aceptan pedidos al por mayor?", "Sí, para integradores PC, reparación, distribuidores y compradores globales."], ["¿Puedo mezclar capacidades?", "Sí. Añade cada capacidad y cantidad para una cotización clara."], ["¿Cómo confirmo compatibilidad?", "Comparte modelo, interfaz y uso. La compatibilidad final se confirma por especificación o muestra."], ["¿Cómo hago un pedido?", "Envía la consulta, confirma cotización y stock, y luego organiza pago y envío."], ["¿Qué pasa si WhatsApp no abre?", "El texto también se copia. Usa el cuadro de respaldo y envíalo manualmente."]] },
    finalCta: { title: "¿Listo para crear tu consulta SAMSWEET SSD?", body: "Selecciona productos, agrega cantidades y envía un mensaje claro por WhatsApp.", button: "Iniciar consulta" },
    footer: { summary: "SSD y memorias SAMSWEET para compradores mayoristas, reparación y distribuidores globales.", disclaimer: "Las especificaciones y precios pueden cambiar. Los detalles finales se confirman por cotización.", whatsapp: "WhatsApp: +86 19064025220" }
  },
  pt: {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "Todos" },
    nav: { categories: "Categorias", products: "Produtos", quality: "Qualidade", faq: "FAQ", cart: "Carrinho de cotação", whatsapp: "WhatsApp" },
    hero: { eyebrow: "Fornecimento SSD no atacado", title: "SAMSWEET SSD para upgrades rápidos e confiáveis.", subtitle: "SSDs e memórias prontos para atacado, integradores PC, assistência técnica, distribuidores e compradores globais.", primary: "Ver produtos", secondary: "Enviar pelo WhatsApp", stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "Atacado", "Suporte QC"] },
    categories: { eyebrow: "Categorias", title: "Escolha a linha de storage para seus clientes.", body: "Compare PCIe, SATA, NGFF, mSATA e DDR, depois monte um carrinho para confirmar preço e estoque." },
    products: { eyebrow: "Produtos em destaque", title: "Dados claros, origem visível, consulta rápida.", body: "Os preços são referências RMB da lista SAMSWEET de 8 de junho de 2026. Os detalhes finais são confirmados por cotação.", search: "Buscar produto, capacidade, interface", category: "Categoria", capacity: "Capacidade", allCapacities: "Todas as capacidades", noResults: "Nenhum produto corresponde aos filtros.", add: "Adicionar à cotação", added: "Adicionado ao carrinho de cotação.", qty: "Qtd.", details: "Detalhes", source: "Fonte", placeholder: "Imagem temporária", referenceAsset: "Imagem de referência" },
    why: { eyebrow: "Por que SAMSWEET", title: "Feito para conversas de exportação e atacado.", items: [["Fornecimento com apoio de fábrica", "Linhas SSD e memória práticas para planejar pedidos de canal."], ["Cotação objetiva", "Preços de referência iniciam a conversa; preço final e estoque são confirmados diretamente."], ["Inspeção antes do envio", "Inspeção por lote, embalagem e suporte podem ser alinhados antes do pedido."], ["Comunicação responsável", "Especificações, garantia e desempenho são confirmados por SKU e cotação."]] },
    specs: { eyebrow: "Especificações", title: "Interfaces que compradores perguntam primeiro.", items: [["PCIe SSD", "Família M.2 NVMe-class. Controlador, NAND, velocidade e garantia por ficha técnica."], ["2.5 SATA SSD", "Interface SATA 3.0 / 6.0Gbps para upgrades comuns."], ["M.2 NGFF SSD", "Opção M.2 SATA para notebooks, mini PCs e reparo compatíveis."], ["mSATA SSD", "Storage SATA compacto para sistemas antigos e embarcados."], ["DDR Memory", "SKUs DDR3 / DDR4 para reparo, upgrade e canal."]] },
    flow: { eyebrow: "Fluxo de pedido", title: "Da seleção ao envio confirmado.", steps: [["Escolha produto e quantidade", "Adicione capacidades e quantidades exatas ao carrinho."], ["Envie pelo WhatsApp", "O texto é copiado e o WhatsApp abre com a mensagem pronta."], ["Confirme cotação e estoque", "Confirme preço, embalagem, grade de qualidade, garantia e prazo."], ["Organize pagamento e envio", "Avance depois da confirmação final da cotação e envio."]] },
    quality: { eyebrow: "Garantia / Controle de qualidade", title: "Suporte confiável sem promessas exageradas.", points: ["Inspeção por lote antes do envio", "Discussão de fornecimento estável", "Suporte de embalagem para canais", "Garantia confirmada por cotação", "Rastreamento SN / pedido se disponível"] },
    cart: { title: "Carrinho de cotação", empty: "Seu carrinho está vazio.", subtotalNote: "Preços de referência são apenas orientação. A cotação final é confirmada pela SAMSWEET.", open: "Abrir carrinho", close: "Fechar", remove: "Remover", clear: "Limpar", formTitle: "Dados do cliente", name: "Nome", country: "País", whatsapp: "Seu WhatsApp", remark: "Observação", submit: "Copiar e abrir WhatsApp", copied: "Pedido copiado. O WhatsApp abrirá com sua mensagem.", fallbackTitle: "Copie sua consulta", fallbackBody: "O acesso à área de transferência foi bloqueado. Sua consulta está aqui; copie e envie pelo WhatsApp.", fallbackButton: "Abrir WhatsApp", required: "Adicione pelo menos um produto antes de enviar." },
    faq: { eyebrow: "FAQ", title: "Perguntas comuns de atacado.", items: [["Como recebo a cotação mais recente?", "Adicione produtos ao carrinho e envie pelo WhatsApp. A SAMSWEET confirmará preço, estoque e envio."], ["Vocês atendem atacado?", "Sim, para integradores PC, assistência técnica, distribuidores e compradores globais."], ["Posso misturar capacidades?", "Sim. Adicione cada capacidade e quantidade para uma cotação clara."], ["Como confirmo compatibilidade?", "Informe modelo, interface e uso. A compatibilidade final é confirmada por especificação ou amostra."], ["Como faço um pedido?", "Envie a consulta, confirme cotação e estoque, depois organize pagamento e envio."], ["E se o WhatsApp não abrir?", "O texto também é copiado. Use a caixa de backup e envie manualmente."]] },
    finalCta: { title: "Pronto para montar sua consulta SAMSWEET SSD?", body: "Selecione produtos, adicione quantidades e envie uma mensagem clara pelo WhatsApp.", button: "Iniciar consulta" },
    footer: { summary: "SSDs e memórias SAMSWEET para compradores de atacado, reparo e distribuidores globais.", disclaimer: "Especificações e preços podem mudar. Detalhes finais são confirmados por cotação.", whatsapp: "WhatsApp: +86 19064025220" }
  },
  ru: {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "Все" },
    nav: { categories: "Категории", products: "Продукты", quality: "Качество", faq: "FAQ", cart: "Корзина запроса", whatsapp: "WhatsApp" },
    hero: { eyebrow: "Оптовые поставки SSD", title: "SAMSWEET SSD для быстрых и надежных апгрейдов.", subtitle: "SSD и память для оптовых покупателей, сборщиков ПК, сервисных центров, дистрибьюторов и международных клиентов.", primary: "Смотреть продукты", secondary: "Отправить в WhatsApp", stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "Оптовые партии", "QC support"] },
    categories: { eyebrow: "Категории", title: "Выберите линейку хранения под ваших клиентов.", body: "Сравните PCIe, SATA, NGFF, mSATA и DDR, затем соберите запрос для подтверждения цены и наличия." },
    products: { eyebrow: "Рекомендуемые продукты", title: "Понятные данные, видимый источник, быстрый запрос.", body: "Цены являются справочными RMB из списка SAMSWEET от 8 июня 2026 года. Финальные условия подтверждаются котировкой.", search: "Поиск по продукту, емкости, интерфейсу", category: "Категория", capacity: "Емкость", allCapacities: "Все емкости", noResults: "Нет продуктов по выбранным фильтрам.", add: "Добавить в запрос", added: "Добавлено в корзину запроса.", qty: "Кол-во", details: "Детали", source: "Источник", placeholder: "Временное изображение", referenceAsset: "Референс-изображение" },
    why: { eyebrow: "Почему SAMSWEET", title: "Для оптовых и экспортных переговоров.", items: [["Поставка с поддержкой фабрики", "Практичные линейки SSD и памяти для планирования каналных заказов."], ["Понятный путь котировки", "Справочные цены помогают начать диалог; финальная цена и наличие подтверждаются напрямую."], ["Проверка перед отгрузкой", "Инспекция партии, упаковка и постпродажная поддержка согласуются до заказа."], ["Ответственные заявления", "Спецификации, гарантия и производительность подтверждаются по SKU и котировке."]] },
    specs: { eyebrow: "Технические данные", title: "Ключевые интерфейсы, которые покупатели проверяют первыми.", items: [["PCIe SSD", "Семейство M.2 NVMe-class. Контроллер, NAND, скорость и гарантия подтверждаются datasheet."], ["2.5 SATA SSD", "Интерфейс SATA 3.0 / 6.0Gbps для типовых апгрейдов."], ["M.2 NGFF SSD", "M.2 SATA для совместимых ноутбуков, mini PC и ремонта."], ["mSATA SSD", "Компактное SATA-хранилище для старых систем и embedded-задач."], ["DDR Memory", "DDR3 / DDR4 SKU для ремонта, апгрейда и каналных поставок."]] },
    flow: { eyebrow: "Оптовый процесс", title: "От выбора продукта до подтвержденной отгрузки.", steps: [["Выберите продукт и количество", "Добавьте точные емкости и количества в корзину."], ["Отправьте запрос в WhatsApp", "Текст копируется, WhatsApp открывается с готовым сообщением."], ["Подтвердите цену и наличие", "Согласуйте цену, упаковку, grade, гарантию и сроки."], ["Организуйте оплату и доставку", "Переходите дальше после финального подтверждения котировки и доставки."]] },
    quality: { eyebrow: "Гарантия / Контроль качества", title: "Надежная поддержка без завышенных обещаний.", points: ["Проверка партии перед отгрузкой", "Обсуждение стабильных повторных поставок", "Поддержка упаковки для каналов", "Гарантия подтверждается котировкой", "SN / order tracking при наличии"] },
    cart: { title: "Корзина запроса", empty: "Корзина запроса пуста.", subtotalNote: "Справочные цены только для ориентира. Финальную котировку подтверждает SAMSWEET.", open: "Открыть корзину", close: "Закрыть", remove: "Удалить", clear: "Очистить", formTitle: "Данные клиента", name: "Имя", country: "Страна", whatsapp: "Ваш WhatsApp", remark: "Комментарий", submit: "Скопировать и открыть WhatsApp", copied: "Заказ скопирован. WhatsApp откроется с вашим сообщением.", fallbackTitle: "Скопируйте запрос", fallbackBody: "Доступ к буферу обмена заблокирован. Ваш запрос сохранен здесь; скопируйте и отправьте в WhatsApp.", fallbackButton: "Открыть WhatsApp", required: "Добавьте хотя бы один продукт перед отправкой." },
    faq: { eyebrow: "FAQ", title: "Частые вопросы по опту.", items: [["Как получить актуальную котировку?", "Добавьте продукты в корзину и отправьте WhatsApp. SAMSWEET подтвердит цену, наличие и доставку."], ["Вы поддерживаете оптовые заказы?", "Да, для сборщиков ПК, сервисов, дистрибьюторов и международных покупателей."], ["Можно смешивать разные емкости?", "Да. Добавьте каждую емкость и количество для понятной котировки."], ["Как подтвердить совместимость?", "Сообщите модель устройства, интерфейс и сценарий. Финальная совместимость подтверждается спецификацией или образцом."], ["Как разместить заказ?", "Отправьте запрос, подтвердите цену и наличие, затем согласуйте оплату и доставку."], ["Что если WhatsApp не открылся?", "Текст также копируется. Используйте резервное поле и отправьте вручную."]] },
    finalCta: { title: "Готовы собрать запрос SAMSWEET SSD?", body: "Выберите продукты, добавьте количества и отправьте четкое сообщение в WhatsApp.", button: "Начать запрос" },
    footer: { summary: "SSD и память SAMSWEET для оптовых покупателей, ремонта и международных дистрибьюторов.", disclaimer: "Спецификации и цены могут изменяться. Финальные детали подтверждаются котировкой.", whatsapp: "WhatsApp: +86 19064025220" }
  },
  "zh-CN": {
    ...shared,
    categoryLabels: { ...shared.categoryLabels, all: "全部" },
    nav: { categories: "分类", products: "产品", quality: "质量", faq: "FAQ", cart: "询价车", whatsapp: "WhatsApp" },
    hero: { eyebrow: "SSD 批发供应", title: "SAMSWEET SSD，为快速可靠的存储升级而来。", subtitle: "面向装机商、维修店、分销商和海外买家的 SSD 与内存产品，适合批量询价和渠道供货。", primary: "查看产品", secondary: "WhatsApp 询价", stats: ["PCIe / NVMe", "SATA 3.0", "M.2 / mSATA", "DDR Memory", "批量供货", "质检支持"] },
    categories: { eyebrow: "产品分类", title: "选择适合客户群体的存储产品线。", body: "对比 PCIe、SATA、NGFF、mSATA 和 DDR 内存产品，加入询价车后确认当前报价与库存。" },
    products: { eyebrow: "精选产品", title: "静态产品数据，来源清晰，快速询价。", body: "页面价格为 2026 年 6 月 8 日 SAMSWEET 报价单中的 RMB 参考价，最终以正式报价确认为准。", search: "搜索产品、容量、接口", category: "分类", capacity: "容量", allCapacities: "全部容量", noResults: "当前筛选条件下没有产品。", add: "加入询价", added: "已加入询价车。", qty: "数量", details: "详情", source: "来源", placeholder: "临时占位图", referenceAsset: "参考仓库素材" },
    why: { eyebrow: "为什么选择 SAMSWEET", title: "为海外批发沟通而设计。", items: [["工厂支持供应", "适合渠道订单规划的 SSD 与内存产品线。"], ["报价路径清晰", "参考价用于开启沟通，最终价格和库存由 SAMSWEET 直接确认。"], ["出货前检测", "批次检测、包装支持和售后沟通可在下单前确认。"], ["可信文案", "规格、质保和性能信息按 SKU 与报价确认，不做夸大承诺。"]] },
    specs: { eyebrow: "技术规格", title: "买家首先关注的关键接口。", items: [["PCIe SSD", "M.2 NVMe-class 产品线，控制器、NAND、速度和质保以规格书确认为准。"], ["2.5 SATA SSD", "SATA 3.0 / 6.0Gbps 接口，适合常见台式机和笔记本升级。"], ["M.2 NGFF SSD", "面向兼容笔记本、迷你主机和维修渠道的 M.2 SATA 选项。"], ["mSATA SSD", "适合旧设备和嵌入式升级需求的紧凑 SATA 存储。"], ["DDR Memory", "DDR3 / DDR4 内存 SKU，适合维修、升级和渠道供货。"]] },
    flow: { eyebrow: "批发下单流程", title: "从选品到确认出货。", steps: [["选择产品和数量", "把准确容量和数量加入询价车。"], ["通过 WhatsApp 提交", "订单文本会复制，并打开 WhatsApp 预填消息。"], ["确认报价和库存", "确认价格、包装、质量等级、质保和交期。"], ["安排付款和发货", "最终报价和物流细节确认后再推进。"]] },
    quality: { eyebrow: "质保 / 品控", title: "可信支持，不夸大承诺。", points: ["出货前批次检测", "可讨论长期稳定供货", "支持渠道买家包装沟通", "质保支持以报价确认为准", "如可用，支持 SN / 订单追踪"] },
    cart: { title: "询价车", empty: "询价车为空。", subtotalNote: "参考价仅供沟通，最终报价由 SAMSWEET 确认。", open: "打开询价车", close: "关闭", remove: "移除", clear: "清空", formTitle: "客户信息", name: "姓名", country: "国家", whatsapp: "您的 WhatsApp", remark: "备注", submit: "复制订单并打开 WhatsApp", copied: "订单已复制。WhatsApp 将打开并带上您的询价消息。", fallbackTitle: "复制您的询价", fallbackBody: "浏览器阻止了剪贴板访问。订单内容已保留在这里，请手动复制后发送到 WhatsApp。", fallbackButton: "打开 WhatsApp", required: "请至少添加一个产品后再提交。" },
    faq: { eyebrow: "FAQ", title: "常见批发问题。", items: [["如何获得最新报价？", "将产品加入询价车并发送 WhatsApp，SAMSWEET 会确认当前价格、库存和发货细节。"], ["支持批发订单吗？", "支持。网站面向装机商、维修店、分销商和海外买家的批量询价。"], ["可以混合不同容量吗？", "可以。请把每个容量和数量加入询价车，方便准确报价。"], ["如何确认兼容性？", "请提供设备型号、接口需求和使用场景，最终兼容性以规格或样品测试确认为准。"], ["如何下单？", "通过 WhatsApp 发送询价，确认报价和库存后，再安排付款和发货。"], ["如果 WhatsApp 没有打开怎么办？", "网站也会复制订单文本。可使用兜底文本框手动复制并发送。"]] },
    finalCta: { title: "准备好创建 SAMSWEET SSD 询价了吗？", body: "选择产品、填写数量，并通过 WhatsApp 发送清晰的采购需求。", button: "开始询价" },
    footer: { summary: "SAMSWEET SSD 与内存产品，服务批发买家、维修渠道和全球分销商。", disclaimer: "产品规格和价格可能变化，最终细节以报价确认为准。", whatsapp: "WhatsApp: +86 19064025220" }
  }
};
