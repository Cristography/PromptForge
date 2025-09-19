let promptData = [];
let toastTimeout; // Can stay global

// --- All functions can remain here, as they are just definitions ---

function buildNavigation() {
    const navListContainer = document.getElementById('navList'); // Get it inside the function
    navListContainer.innerHTML = '';

    promptData.forEach(category => {
        const catElem = document.createElement('div');
        catElem.className = 'category';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            <h3>${category.category}</h3>
            <i class="fa-solid fa-chevron-right toggle-icon"></i>
        `;
        header.addEventListener('click', () => {
            catElem.classList.toggle('open');
        });
        catElem.appendChild(header);

        const ul = document.createElement('ul');
        ul.className = 'prompt-list';
        category.prompts.forEach(prompt => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'prompt-link';
            a.textContent = prompt.name;
            a.dataset.promptId = prompt.id;
            a.addEventListener('click', onPromptClick);
            li.appendChild(a);
            ul.appendChild(li);
        });

        catElem.appendChild(ul);
        navListContainer.appendChild(catElem);
    });
}

function onPromptClick(event) {
    event.preventDefault();
    const clickedLink = event.currentTarget;
    const body = document.body;

    document.querySelectorAll('.prompt-link.active').forEach(el => el.classList.remove('active'));
    clickedLink.classList.add('active');

    const promptId = clickedLink.dataset.promptId;
    let selectedPrompt;
    promptData.some(category => {
        selectedPrompt = category.prompts.find(p => p.id === promptId);
        return !!selectedPrompt;
    });

    if (selectedPrompt) {
        showPrompt(selectedPrompt);
    }

    if (window.innerWidth <= 768) {
        body.classList.add('nav-collapsed');
        document.body.style.overflow = '';
    }
}

function showPrompt(promptObj) {
    if (!promptObj) return;
    const mainContent = document.getElementById('mainContent');
    const promptForm = document.getElementById('promptForm');
    const copyBtn = document.getElementById('copyBtn');

    promptForm.classList.remove('hidden', 'fade-in');
    copyBtn.classList.remove('hidden');

    void promptForm.offsetWidth;
    promptForm.classList.add('fade-in');

    promptForm.innerHTML = '';
    mainContent.querySelector('h2').textContent = promptObj.name;

    const { prompt: promptText, placeholders } = promptObj;
    const regex = /\[([^\]]+?)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(promptText)) !== null) {
        if (match.index > lastIndex) {
            promptForm.appendChild(document.createTextNode(promptText.substring(lastIndex, match.index)));
        }
        const placeholderName = match[1];
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'inline-input';
        input.value = placeholders[placeholderName] || '';
        input.placeholder = placeholderName;
        input.setAttribute('aria-label', placeholderName);
        promptForm.appendChild(input);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < promptText.length) {
        promptForm.appendChild(document.createTextNode(promptText.substring(lastIndex)));
    }
    copyBtn.dataset.promptText = promptText;
}

function toggleNavigation() {
    const body = document.body;
    const navToggleBtn = document.getElementById('navToggleBtn'); // Get fresh reference

    if (window.innerWidth <= 768) {
        const isCollapsed = body.classList.toggle('nav-collapsed');
        navToggleBtn.setAttribute('aria-expanded', !isCollapsed);
        if (isCollapsed) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    } else {
        body.classList.toggle('nav-collapsed');
    }
}


function filterPrompts() {
    const searchInput = document.getElementById('promptSearch');
    const searchTerm = searchInput.value.toLowerCase();

    document.querySelectorAll('.category').forEach(catElem => {
        let categoryHasVisiblePrompts = false;
        const promptLinks = catElem.querySelectorAll('.prompt-link');

        promptLinks.forEach(link => {
            const promptName = link.textContent.toLowerCase();
            const li = link.parentElement;
            if (promptName.includes(searchTerm)) {
                li.style.display = 'block';
                categoryHasVisiblePrompts = true;
            } else {
                li.style.display = 'none';
            }
        });

        if (categoryHasVisiblePrompts) {
            catElem.style.display = 'block';
            if (searchTerm.length > 0) {
                catElem.classList.add('open');
            }
        } else {
            catElem.style.display = 'none';
        }

        if (searchTerm.length === 0) {
            catElem.classList.remove('open');
        }
    });
}

function copyPrompt() {
    const promptForm = document.getElementById('promptForm');
    const copyBtn = document.getElementById('copyBtn');

    if (promptForm.classList.contains('hidden')) return;
    const template = copyBtn.dataset.promptText;
    if (!template) return;

    const inputs = promptForm.querySelectorAll('input.inline-input');
    let inputIndex = 0;
    const finalPrompt = template.replace(/\[([^\]]+?)\]/g, () => {
        const val = inputs[inputIndex]?.value.trim() || "";
        inputIndex++;
        return val;
    });

    navigator.clipboard.writeText(finalPrompt.trim())
        .then(() => {
            showToast("Prompt copied successfully!");
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = 'Copy Prompt';
                copyBtn.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            showToast("Error: Could not copy prompt.", true);
            console.error("Failed to copy prompt: ", err);
        });
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}


// --- ✅ INITIALIZATION & EVENT LISTENERS MOVED HERE ---
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT REFERENCES ---
    const body = document.body;
    const navToggleBtn = document.getElementById('navToggleBtn');
    const searchInput = document.getElementById('promptSearch');
    const copyBtn = document.getElementById('copyBtn');

    // --- EVENT LISTENERS ---
    navToggleBtn.addEventListener('click', toggleNavigation);
    searchInput.addEventListener('input', filterPrompts);
    copyBtn.addEventListener('click', copyPrompt);

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 &&
            !body.classList.contains('nav-collapsed') &&
            !e.target.closest('#sideNav') &&
            e.target.closest('#navToggleBtn') === null) { // ensure clicking the button itself doesn't close it
            body.classList.add('nav-collapsed');
            document.body.style.overflow = '';
            navToggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // --- DATA FETCHING ---
    fetch("prompts.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            promptData = data;
            buildNavigation();
        })
        .catch(error => {
            console.error("Failed to load prompts:", error);
            showToast("Error loading prompts. Check console.", true);
        });

    // Set initial nav state for mobile
    if (window.innerWidth <= 768) {
        body.classList.add('nav-collapsed');
    }
});
