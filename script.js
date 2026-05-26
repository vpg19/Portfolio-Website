document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 1. SYSTEM DIAGNOSTIC BOOTLOADER SIMULATION
    // -------------------------------------------------------------------------
    const bootLogs = document.getElementById("boot-logs");
    const bootOverlay = document.getElementById("system-boot-overlay");
    const appContainer = document.getElementById("app-container");

    const bootMessages = [
        { text: "LOADING VPG_SYS_BOOTLOADER v2.06.6...", class: "" },
        { text: "CHECKING SYSTEM INTEGRITY... STATUS_OK", class: "success" },
        { text: "CONNECTING TO VIT-CHENNAI CSE ROBOTICS CORE NODE-1...", class: "" },
        { text: "RESOLVING IP PORT... 172.16.42.99 (SECURE SHIELD ACTIVE)", class: "cyan" },
        { text: "RETRIEVING PROFILE METADATA...", class: "" },
        { text: "USER DETECTED: Vansh Prakash Gupta (B.Tech CSE - 2nd Year)", class: "success" },
        { text: "READING ACADEMIC RECORDS... CGPA 8.86/10", class: "cyan" },
        { text: "PARSING PATENT RECORDS... PATENT_PENDING // ID: NFC-WM-2026", class: "warning" },
        { text: "NFC WIRELESS MOUSE DIAGNOSTIC: ESP32 Core HID + RC522 SPI Active", class: "success" },
        { text: "COMPILING SKILL MATRICES... PYTHON (95%) | C/C++ (85%) | JAVA (80%)", class: "" },
        { text: "ESTABLISHING CORE NETWORK CHANNELS...", class: "" },
        { text: "EMAIL CHANNEL: guptavanshprakash@gmail.com... SECURE", class: "cyan" },
        { text: "GITHUB CHANNEL: github.com/vpg19... STABLE", class: "cyan" },
        { text: "INITIALIZING MATRIX GRAPHIC ENGINE...", class: "success" },
        { text: "SYSTEM STATUS: 01001011 (READY)", class: "success" },
        { text: "LAUNCHING PORTFOLIO INTERRUPT COMMAND...", class: "warning" }
    ];

    let logIndex = 0;
    
    function printBootLog() {
        if (logIndex < bootMessages.length) {
            const msg = bootMessages[logIndex];
            const div = document.createElement("div");
            div.className = `log-entry ${msg.class}`;
            div.innerHTML = `&gt; ${msg.text}`;
            bootLogs.appendChild(div);
            bootLogs.scrollTop = bootLogs.scrollHeight;
            logIndex++;
            setTimeout(printBootLog, Math.random() * 120 + 40);
        } else {
            setTimeout(() => {
                bootOverlay.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
                bootOverlay.style.opacity = "0";
                setTimeout(() => {
                    bootOverlay.style.display = "none";
                    appContainer.classList.add("visible-fade");
                    initMainFeatures();
                }, 600);
            }, 1000);
        }
    }

    // Start Boot Sequence
    printBootLog();

    // -------------------------------------------------------------------------
    // 2. MAIN INITIALIZATION FUNCTION (RUN AFTER BOOTLOADER FINISHES)
    // -------------------------------------------------------------------------
    function initMainFeatures() {
        initCustomCursor();
        initMatrixCanvas();
        initTextScramble();
        initDynamicTyping();
        initInteractiveTerminal();
        initBlueprintInteractivity();
        initProjectFiltering();
        initContactForm();
        initScrollSpy();
    }

    // -------------------------------------------------------------------------
    // 3. SMOOTH CUSTOM INTERACTIVE CURSOR
    // -------------------------------------------------------------------------
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    function initCustomCursor() {
        const dot = document.getElementById("cursor-dot");
        const ring = document.getElementById("cursor-ring");

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly place dot
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        });

        // Smooth Lerp loop for the outer ring
        function updateRingPosition() {
            // Lerp formula: current += (target - current) * factor
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;

            requestAnimationFrame(updateRingPosition);
        }
        updateRingPosition();

        // Add hover effects for triggers
        const hoverTriggers = document.querySelectorAll(".hover-trigger, a, button, .hotspot, .spec-tab, .filter-btn");
        hoverTriggers.forEach(el => {
            el.addEventListener("mouseenter", () => {
                ring.classList.add("hovered");
                dot.classList.add("hovered");
            });
            el.addEventListener("mouseleave", () => {
                ring.classList.remove("hovered");
                dot.classList.remove("hovered");
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. REACTIVE FALLING BINARY MATRIX CANVAS
    // -------------------------------------------------------------------------
    function initMatrixCanvas() {
        const canvas = document.getElementById("matrix-canvas");
        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        function drawMatrix() {
            // Clear with high opacity to leave trails
            ctx.fillStyle = "rgba(3, 3, 3, 0.08)";
            ctx.fillRect(0, 0, width, height);

            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Select binary digit (0 or 1)
                const text = Math.random() > 0.5 ? "1" : "0";

                // INTERACTIVE MOUSE FEATURE:
                // If text element is close to the mouse cursor, make it glow cyan
                const dx = x - mouseX;
                const dy = y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.fillStyle = "#00f0ff";
                    // Add subtle glow shadow for highlighted characters
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "#00f0ff";
                } else {
                    ctx.fillStyle = "rgba(0, 255, 102, 0.35)"; // Dim Matrix green for background
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, x, y);

                // Reset drop or slide down
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            // Clean shadows
            ctx.shadowBlur = 0;
            requestAnimationFrame(drawMatrix);
        }

        drawMatrix();
    }

    // -------------------------------------------------------------------------
    // 5. INTERACTIVE GLITCH SCRAMBLE ANIMATION
    // -------------------------------------------------------------------------
    function initTextScramble() {
        const glitchElements = document.querySelectorAll(".glitch-hover");
 
        glitchElements.forEach(el => {
            const originalText = el.getAttribute("data-value") || el.innerText;
            const letters = "01010101_#X$/%&?";
            let interval = null;
 
            el.addEventListener("mouseenter", () => {
                let iteration = 0;
                clearInterval(interval);
 
                interval = setInterval(() => {
                    el.innerText = originalText
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            // Random binary or symbol characters
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("");
 
                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                        el.innerText = originalText;
                    }
 
                    iteration += 1 / 3;
                }, 25);
            });
 
            el.addEventListener("mouseleave", () => {
                clearInterval(interval);
                el.innerText = originalText;
            });
        });
    }

    // -------------------------------------------------------------------------
    // 6. DYNAMIC TYPING EFFECT
    // -------------------------------------------------------------------------
    function initDynamicTyping() {
        const typingElement = document.getElementById("dynamic-typing");
        const phrases = [
            ">> EMBEDDED SYSTEMS ENGINEER",
            ">> DATA ENGINEER & ARCHITECT",
            ">> ROBOTICS AUTOMATION SPECIALIST",
            ">> FULL-STACK DATABASE DEVELOPER",
            ">> NFC HARDWARE INNOVATOR"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, 2500);
                    return;
                }
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 300);
                    return;
                }
            }

            setTimeout(type, isDeleting ? 50 : 100);
        }

        type();
    }

    // -------------------------------------------------------------------------
    // 7. INTERACTIVE TERMINAL EMULATOR
    // -------------------------------------------------------------------------
    function initInteractiveTerminal() {
        const terminalSection = document.getElementById("terminal-section");
        if (!terminalSection) return; // Skip if section doesn't exist

        const terminalLines = terminalSection.querySelectorAll(".terminal-line");
        terminalLines.forEach((line, index) => {
            line.style.opacity = "0";
            line.style.transform = "translateY(10px)";
            line.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

            setTimeout(() => {
                line.style.opacity = "1";
                line.style.transform = "translateY(0)";
            }, 200 + index * 100);
        });
    }

    // -------------------------------------------------------------------------
    // 8. BLUEPRINT INTERACTIVITY (SPEC TABS)
    // -------------------------------------------------------------------------
    function initBlueprintInteractivity() {
        const specTabs = document.querySelectorAll(".spec-tab");
        const specPanels = document.querySelectorAll(".spec-panel");

        specTabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                e.preventDefault();

                const targetTab = tab.getAttribute("data-tab");
                
                // Remove active from all tabs in this blueprint
                const blueprintContainer = tab.closest(".blueprint-specs");
                blueprintContainer.querySelectorAll(".spec-tab").forEach(t => t.classList.remove("active"));
                blueprintContainer.querySelectorAll(".spec-panel").forEach(p => p.classList.remove("active"));

                // Add active to clicked tab and corresponding panel
                tab.classList.add("active");
                document.getElementById(targetTab).classList.add("active");
            });
        });
    }

    // -------------------------------------------------------------------------
    // 9. PROJECT CARD FILTERING
    // -------------------------------------------------------------------------
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll(".filter-btn");
        const cards = document.querySelectorAll(".project-card");

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Active status toggling
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-filter");

                cards.forEach(card => {
                    const langs = card.getAttribute("data-languages").split(" ");
                    
                    if (filter === "all" || langs.includes(filter)) {
                        card.style.display = "flex";
                        // Reset animations
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.95)";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 10. CONTACT FORM INITIALIZATION
    // -------------------------------------------------------------------------
    function initContactForm() {
        // Form submission is handled by the global handleFormSubmit function
        // which is called from the HTML onsubmit attribute
    }

    // -------------------------------------------------------------------------
    // 11. NAVBAR LINK SPYING & SCROLL MANAGEMENT
    // -------------------------------------------------------------------------
    function initScrollSpy() {
        const sections = document.querySelectorAll(".section");
        const navLinks = document.querySelectorAll(".nav-link-item");

        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach(sec => {
                const sectionTop = sec.offsetTop;
                const sectionHeight = sec.clientHeight;
                
                // Triggers scroll focus when section occupies viewport center
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = sec.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                const href = link.getAttribute("href").substring(1);
                
                if (href === current) {
                    link.classList.add("active");
                } else if (current === "terminal-section" && href === "terminal-section") {
                    link.classList.add("active");
                }
            });
        });
    }
}); // END DOMContentLoaded

// =============================================================================
// GLOBAL: Email Handler with Brevo Backend Integration
// =============================================================================
const OWNER_EMAIL   = "guptavanshprakash@gmail.com";
const OWNER_NAME    = "Vansh Prakash Gupta";
// Note: API key should ONLY be on backend, not exposed in client code

function handleFormSubmit(event) {
    event.preventDefault();

    const senderName  = document.getElementById("sender-name").value.trim();
    const senderEmail = document.getElementById("sender-email").value.trim();
    const subject     = document.getElementById("subject").value.trim();
    const message     = document.getElementById("message").value.trim();

    const submitBtn = document.getElementById("submit-signal-btn");
    const btnText   = document.getElementById("btn-text");
    const btnIcon   = document.getElementById("btn-icon-arrow");
    const statusLog = document.getElementById("form-status-log");

    // ── Lock button & show spinner
    submitBtn.disabled      = true;
    submitBtn.style.opacity = "0.6";
    btnText.textContent     = "TRANSMITTING...";
    btnIcon.className       = "fa-solid fa-circle-notch fa-spin";

    statusLog.innerHTML = "";
    statusLog.classList.remove("hidden");

    // ── Animated pre-send log lines
    const preSteps = [
        { text: "ESTABLISHING SMTP RELAY...",           color: "var(--text-muted)" },
        { text: "ENCRYPTING PAYLOAD [AES-256]...",             color: "var(--text-muted)" },
        { text: `ROUTING → ${OWNER_EMAIL}`,                   color: "var(--cyber-cyan)"  },
        { text: `TRANSMITTING PACKET FROM ${senderEmail}...`,  color: "var(--text-muted)" },
    ];

    function appendLog(text, color) {
        const line = document.createElement("span");
        line.className = "c-line";
        line.style.color = color;
        line.textContent = "> " + text;
        statusLog.appendChild(line);
    }

    let step = 0;
    function runPreSteps() {
        if (step < preSteps.length) {
            appendLog(preSteps[step].text, preSteps[step].color);
            step++;
            setTimeout(runPreSteps, 400);
        } else {
            // ── Fire real email API call
            sendEmail(senderName, senderEmail, subject, message)
                .then(() => {
                    appendLog("✓ SIGNAL ACKNOWLEDGED — MESSAGE DELIVERED.", "var(--matrix-green)");
                    appendLog(`THANK YOU, ${senderName.toUpperCase()}. VANSH WILL RESPOND SOON.`, "var(--matrix-green)");
                    document.getElementById("contact-form").reset();
                })
                .catch(err => {
                    appendLog("✗ TRANSMISSION FAILED — EMAIL SERVICE ERROR.", "var(--warning-red)");
                    appendLog("FALLBACK: EMAIL guptavanshprakash@gmail.com DIRECTLY.", "var(--warning-yellow)");
                    console.error("Email error:", err);
                })
                .finally(() => {
                    submitBtn.disabled      = false;
                    submitBtn.style.opacity = "1";
                    btnText.textContent     = "TRANSMIT_SIGNAL()";
                    btnIcon.className       = "fa-solid fa-arrow-right-long";
                });
        }
    }
    runPreSteps();
    return false;
}

async function sendEmail(senderName, senderEmail, subject, message) {
    // Use Web3Forms (free CORS-enabled email service)
    // Sign up at https://web3forms.com to get your access key
    
    const payload = {
        access_key: "fd5baab0-79eb-490d-a6f3-1e5ab7717754", // Replace with your Web3Forms key from https://web3forms.com
        name: senderName,
        email: senderEmail,
        subject: `[VPG Portfolio] ${subject}`,
        message: message,
        redirect: "" // No redirect for AJAX
    };

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${response.status}`);
    }

    return response.json();
}
