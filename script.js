// (The promptData array remains the same)
const promptData = [
    {
        category: "Image Generation",
        prompts: [
            { id: "img-1", name: "Fantasy Landscape", prompt: "Create a [style] landscape with a [mainSubject] in the [weather] weather.", placeholders: { style: "fantasy", mainSubject: "castle", weather: "misty" } },
            { id: "img-2", name: "Sci-Fi Robot", prompt: "Design a [adjective] robot with a [color] finish on a [background] background.", placeholders: { adjective: "sleek", color: "metallic blue", background: "dark cityscape" } },
            { id: "img-3", name: "Surreal Portrait", prompt: "Paint a surreal portrait of a person wearing a [headgear] surrounded by [elements].", placeholders: { headgear: "flower crown", elements: "floating clocks" } },
            { id: "img-4", name: "Underwater Scene", prompt: "Illustrate a [creature] swimming through [plantLife] in a [depth] ocean scene.", placeholders: { creature: "giant squid", plantLife: "glowing seaweed", depth: "deep" } },
            { id: "img-5", name: "Abstract Art", prompt: "Create an abstract artwork using [shapes] and [colors] that evokes [emotion].", placeholders: { shapes: "circles and triangles", colors: "vibrant reds and blues", emotion: "passion" } }
        ]
    },
    {
        category: "Story Writing",
        prompts: [
            { id: "story-1", name: "Hero's Journey", prompt: "Write a story about a [protagonistRole] who embarks on a journey to find the [object].", placeholders: { protagonistRole: "young warrior", object: "ancient sword" } },
            { id: "story-2", name: "Mystery Thriller", prompt: "Describe a [setting] where a detective investigates a [crime] that shocked the town.", placeholders: { setting: "foggy city", crime: "mysterious disappearance" } },
            { id: "story-3", name: "Sci-Fi Adventure", prompt: "Outline a tale of a [occupation] traveling through [spacePlace] searching for [item].", placeholders: { occupation: "space explorer", spacePlace: "the Andromeda galaxy", item: "a lost artifact" } },
            { id: "story-4", name: "Romantic Comedy", prompt: "Write about two [relationship] who meet in a [setting] and face challenges to be together.", placeholders: { relationship: "college students", setting: "small town" } },
            { id: "story-5", name: "Historical Fiction", prompt: "Tell the story of a [historicalFigure] during the [event] and their struggle for freedom.", placeholders: { historicalFigure: "revolutionary leader", event: "war of independence" } }
        ]
    },
    {
        category: "Coding Snippets",
        prompts: [
            { id: "code-1", name: "Array Sort", prompt: "Write a [language] function to sort an array of [datatype] in [order] order.", placeholders: { language: "JavaScript", datatype: "numbers", order: "ascending" } },
            { id: "code-2", name: "API Fetch", prompt: "Show how to fetch data from a [apiName] API using [method] requests.", placeholders: { apiName: "GitHub", method: "GET" } },
            { id: "code-3", name: "Form Validation", prompt: "Implement form validation for [fieldType] inputs in [language].", placeholders: { fieldType: "email", language: "Python" } },
            { id: "code-4", name: "Recursive Function", prompt: "Write a recursive [language] function to compute the [operation] of a number.", placeholders: { language: "C++", operation: "factorial" } },
            { id: "code-5", name: "Database Query", prompt: "Create a [dbType] query to select all records where [condition].", placeholders: { dbType: "SQL", condition: "age > 30" } }
        ]
    },
    {
        category: "Marketing Copy",
        prompts: [
            { id: "marketing-1", name: "Product Launch", prompt: "Write a catchy tagline for a [productType] that features [featureHighlight].", placeholders: { productType: "smartphone", featureHighlight: "a revolutionary camera" } },
            { id: "marketing-2", name: "Social Media Post", prompt: "Create a social media post promoting a [event] happening on [date].", placeholders: { event: "summer sale", date: "July 1st" } },
            { id: "marketing-3", name: "Email Subject", prompt: "Suggest an email subject line to increase open rates for [campaignName].", placeholders: { campaignName: "holiday discounts" } },
            { id: "marketing-4", name: "Brand Story", prompt: "Describe the brand story of a company that values [values] and innovation.", placeholders: { values: "sustainability" } },
            { id: "marketing-5", name: "Call to Action", prompt: "Write a call to action encouraging users to [action] on the website.", placeholders: { action: "sign up for our newsletter" } }
        ]
    },
    {
        category: "Educational Prompts",
        prompts: [
            { id: "edu-1", name: "Math Problem", prompt: "Create a math problem involving the calculation of [operation] of two [units].", placeholders: { operation: "addition", units: "fractions" } },
            { id: "edu-2", name: "History Question", prompt: "Formulate a question about the [event] during the [century].", placeholders: { event: "French Revolution", century: "18th" } },
            { id: "edu-3", name: "Science Experiment", prompt: "Explain how to conduct an experiment showing [phenomenon] in [subject].", placeholders: { phenomenon: "photosynthesis", subject: "biology" } },
            { id: "edu-4", name: "Language Exercise", prompt: "Design a language exercise focusing on the use of [grammarTopic] in sentences.", placeholders: { grammarTopic: "past tense verbs" } },
            { id: "edu-5", name: "Geography Quiz", prompt: "Construct a quiz question related to the [geographicFeature] in [region].", placeholders: { geographicFeature: "rivers", region: "South America" } }
        ]
    }
];


// --- DOM ELEMENT REFERENCES ---
const body = document.body;
const navListContainer = document.getElementById('navList');
const mainContent = document.getElementById('mainContent');
const promptForm = document.getElementById('promptForm');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toastNotification');
const navToggleBtn = document.getElementById('navToggleBtn');
const searchInput = document.getElementById('promptSearch');
let toastTimeout;

// --- NAVIGATION & UI LOGIC ---

// 1. Build the dynamic navigation with accordions
function buildNavigation() {
    navListContainer.innerHTML = ''; // Clear nav

    promptData.forEach(category => {
        // Create category container
        const catElem = document.createElement('div');
        catElem.className = 'category';

        // Create accordion header
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

        // Create list of prompts
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

// 2. Handle prompt selection
function onPromptClick(event) {
    event.preventDefault();
    const clickedLink = event.currentTarget;

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

    // On mobile, collapse nav after selection
    if (window.innerWidth <= 768) {
        body.classList.add('nav-collapsed');
    }
}

// 3. Render the selected prompt in the main area
function showPrompt(promptObj) {
    // This function is the same as the previous version
    if (!promptObj) return;

    promptForm.classList.remove('hidden', 'fade-in');
    copyBtn.classList.remove('hidden');

    void promptForm.offsetWidth; // Reflow to restart animation
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

// 4. Handle navigation toggle (collapse/expand)
function toggleNavigation() {
    body.classList.toggle('nav-collapsed');
}

// 5. Filter prompts based on search input
function filterPrompts() {
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

        // Show/hide the entire category based on whether it has matches
        if (categoryHasVisiblePrompts) {
            catElem.style.display = 'block';
            // If searching, auto-expand the category to show results
            if (searchTerm.length > 0) {
                catElem.classList.add('open');
            }
        } else {
            catElem.style.display = 'none';
        }

        // if search is cleared, remove the forced-open class
        if (searchTerm.length === 0) {
            catElem.classList.remove('open');
        }
    });
}

// 6. Copy and Toast logic (same as previous version)
function copyPrompt() {
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
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();

    // Set initial nav state based on screen size
    if (window.innerWidth <= 768) {
        body.classList.add('nav-collapsed');
    }
});

navToggleBtn.addEventListener('click', toggleNavigation);
searchInput.addEventListener('input', filterPrompts);
copyBtn.addEventListener('click', copyPrompt);