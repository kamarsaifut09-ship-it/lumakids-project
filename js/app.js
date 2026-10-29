const I18N = {
    ru: {
        noResults: "По вашему запросу ничего не найдено. Попробуйте изменить фильтр.",
        quickView: "Подробнее",
        fromPrice: "Цена уточняется",
        productAsk: "Уточнить наличие в Telegram",
        productPriceNote: "Цена и наличие требуют подтверждения перед заказом.",
        formSuccess: "Заявка подготовлена.",
        copied: "Текст заявки скопирован.",
        copyFailed: "Не удалось скопировать автоматически.",
        requestWholesale: "Заявка на оптовое сотрудничество",
        labelName: "Имя или компания",
        labelContact: "Телефон или Telegram",
        labelType: "Вы представляете",
        labelVolume: "Объём",
        labelMessage: "Что вас интересует?",
        copyRequest: "Скопировать текст заявки"
    },
    uz: {
        noResults: "So‘rovingiz bo‘yicha hech narsa topilmadi.",
        quickView: "Batafsil",
        fromPrice: "Narx aniqlashtiriladi",
        productAsk: "Telegram orqali mavjudligini so‘rash",
        productPriceNote: "Narx va mavjudlik tasdiqlanishi kerak.",
        formSuccess: "So‘rov tayyorlandi.",
        copied: "So‘rov matni nusxalandi.",
        copyFailed: "Avtomatik nusxalash amalga oshmadi.",
        requestWholesale: "Ulgurji hamkorlik uchun so‘rov",
        labelName: "Ism yoki kompaniya",
        labelContact: "Telefon yoki Telegram",
        labelType: "Siz kimsiz?",
        labelVolume: "Hajm",
        labelMessage: "Sizni nima qiziqtiradi?",
        copyRequest: "So‘rov matnini nusxalash"
    }
};

const products = [
    {
        id: "pajama-sweet-dreams",
        name: { ru: "Пижама Sweet Dreams", uz: "Sweet Dreams pijamasi" },
        category: "sleep",
        type: { ru: "Пижама", uz: "Pijama" },
        image: "./public/images/17849858430676630.jpg",
        sizes: "98–134 см",
        price: "179 000 сум"
    },
    {
        id: "tracksuit-lavender",
        name: { ru: "Спортивный костюм Lavanda", uz: "Lavanda sport kostyumi" },
        category: "sets",
        type: { ru: "Спортивный костюм", uz: "Sport kostyumi" },
        image: "./public/images/17852493543659977.jpg",
        sizes: "104–140 см",
        price: "259 000 сум"
    },
    {
        id: "hoodie-everyday",
        name: { ru: "Худи Everyday", uz: "Everyday xudisi" },
        category: "tops",
        type: { ru: "Худи", uz: "Xudi" },
        image: "./public/images/17855690934636164.jpg",
        sizes: "Размеры уточняются",
        price: ""
    },
    {
        id: "tshirt-basic",
        name: { ru: "Футболка Basic", uz: "Basic futbolkasi" },
        category: "tops",
        type: { ru: "Футболка", uz: "Futbolka" },
        image: "./public/images/17860733421585008.jpg",
        sizes: "Размеры уточняются",
        price: ""
    },
    {
        id: "tracksuit-core",
        name: { ru: "Спортивный комплект Core", uz: "Core sport to‘plami" },
        category: "sets",
        type: { ru: "Костюм", uz: "Kostyum" },
        image: "./public/images/17861036598580539.jpg",
        sizes: "Размеры уточняются",
        price: ""
    },
    {
        id: "pajama-soft",
        name: { ru: "Пижама Soft Day", uz: "Soft Day pijamasi" },
        category: "sleep",
        type: { ru: "Пижама", uz: "Pijama" },
        image: "./public/images/17866543881527941.jpg",
        sizes: "Размеры уточняются",
        price: ""
    },
    {
        id: "sweatshirt-day",
        name: { ru: "Свитшот Daylight", uz: "Daylight svitshoti" },
        category: "tops",
        type: { ru: "Свитшот", uz: "Svitshot" },
        image: "./public/images/17870661123599568.jpg",
        sizes: "Размеры уточняются",
        price: ""
    },
    {
        id: "vest-layer",
        name: { ru: "Жилет Layer", uz: "Layer nimchasi" },
        category: "tops",
        type: { ru: "Жилет", uz: "Nimcha" },
        image: "./public/images/17872721088487035.jpg",
        sizes: "Размеры уточняются",
        price: ""
    }
];

let lang = "ru";
let activeFilter = "all";
let searchTerm = "";
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function t(key) {
    return I18N[lang]?.[key] || I18N.ru[key] || key;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function renderProducts() {
    const grid = $("#productGrid");
    if (!grid) return;

    const filtered = products.filter(product => {
        const name = product.name[lang] || product.name.ru;
        const type = product.type[lang] || product.type.ru;

        return (
            (activeFilter === "all" || product.category === activeFilter) &&
            `${name} ${type}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (!filtered.length) {
        grid.innerHTML = `<div class="empty-state"><strong>${t("noResults")}</strong></div>`;
        return;
    }

    grid.innerHTML = filtered.map((product, index) => `
        <article class="product-card" style="animation-delay:${Math.min(index * 55, 220)}ms">
            <div class="product-image">
                <img
                    src="${escapeHtml(product.image)}"
                    alt="${escapeHtml(product.name[lang] || product.name.ru)}"
                    loading="lazy"
                    onerror="this.onerror=null;this.style.opacity='0.3';"
                >
                <span class="product-badge">Luma Kids</span>
                <button class="product-quick" data-product="${product.id}">
                    ${t("quickView")} <span>↗</span>
                </button>
            </div>

            <div class="product-meta">
                <div>
                    <h3 class="product-name">${escapeHtml(product.name[lang] || product.name.ru)}</h3>
                    <div class="product-category">${escapeHtml(product.type[lang] || product.type.ru)}</div>
                </div>
                <div class="product-price ${product.price ? "" : "muted"}">
                    ${product.price ? escapeHtml(product.price) : t("fromPrice")}
                </div>
            </div>

            <div class="product-sizes">
                <span class="size-pill">${escapeHtml(product.sizes)}</span>
            </div>
        </article>
    `).join("");
}

function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openProduct(id) {
    const product = products.find(item => item.id === id);
    const dialog = $("#productDialog");
    const content = $("#dialogContent");

    if (!product || !dialog || !content) return;

    content.innerHTML = `
        <div class="dialog-product">
            <img src="${escapeHtml(product.image)}"
                 alt="${escapeHtml(product.name[lang] || product.name.ru)}">

            <div class="dialog-product-copy">
                <p class="eyebrow">${escapeHtml(product.type[lang] || product.type.ru)}</p>
                <h3>${escapeHtml(product.name[lang] || product.name.ru)}</h3>
                <p><strong>${escapeHtml(product.price || t("fromPrice"))}</strong></p>
                <p>${escapeHtml(product.sizes)}</p>
                <p>${t("productPriceNote")}</p>
                <a class="button button-green"
                   href="https://t.me/lumakids_uz"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${t("productAsk")} <span>↗</span>
                </a>
            </div>
        </div>
    `;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        dialog.setAttribute("open", "");
    }
}

function setLanguage(nextLanguage) {
    lang = nextLanguage;
    document.documentElement.lang = nextLanguage;

    $$("[data-lang]").forEach(button => {
        button.classList.toggle("active", button.dataset.lang === nextLanguage);
    });

    renderProducts();
}

function attachForm() {
    const form = $("#wholesaleForm");
    const result = $("#wholesaleResult");

    if (!form || !result) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const contact = String(data.get("contact") || "").trim();

        if (!name || !contact) return;

        const request = [
            t("requestWholesale"),
            "",
            `${t("labelName")}: ${name}`,
            `${t("labelContact")}: ${contact}`,
            `${t("labelType")}: ${data.get("type") || ""}`,
            `${t("labelVolume")}: ${data.get("volume") || ""}`,
            `${t("labelMessage")}: ${data.get("message") || ""}`
        ].join("\n");

        result.hidden = false;
        result.innerHTML = `
            <p>${t("formSuccess")}</p>
            <textarea id="requestText" rows="6" readonly></textarea>
            <button type="button" id="copyRequest">${t("copyRequest")}</button>
        `;

        $("#requestText").value = request;

        $("#copyRequest").addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(request);
                showToast(t("copied"));
            } catch {
                const textarea = $("#requestText");
                textarea.focus();
                textarea.select();
                showToast(t("copyFailed"));
            }
        });
    });
}

document.addEventListener("click", event => {
    const productButton = event.target.closest("[data-product]");

    if (productButton) {
        openProduct(productButton.dataset.product);
        return;
    }

    const filterButton = event.target.closest("[data-filter]");

    if (filterButton) {
        activeFilter = filterButton.dataset.filter;

        $$("[data-filter]").forEach(button => {
            button.classList.toggle("active", button === filterButton);
        });

        renderProducts();
    }

    const languageButton = event.target.closest("[data-lang]");
    if (languageButton) setLanguage(languageButton.dataset.lang);

    const navLink = event.target.closest(".main-nav a");

    if (navLink) {
        $(".main-nav")?.classList.remove("open");
        $(".menu-toggle")?.setAttribute("aria-expanded", "false");
    }
});

$("#catalogSearch")?.addEventListener("input", event => {
    searchTerm = event.target.value;
    renderProducts();
});

$(".menu-toggle")?.addEventListener("click", () => {
    const nav = $(".main-nav");
    if (!nav) return;

    const isOpen = !nav.classList.contains("open");
    nav.classList.toggle("open", isOpen);
    $(".menu-toggle").setAttribute("aria-expanded", String(isOpen));
});

$("#dialogClose")?.addEventListener("click", () => {
    $("#productDialog")?.close();
});

$("#productDialog")?.addEventListener("click", event => {
    if (event.target === $("#productDialog")) {
        $("#productDialog").close();
    }
});

if ($("#year")) {
    $("#year").textContent = new Date().getFullYear();
}

attachForm();
renderProducts();