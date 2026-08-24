// Authentication Module for Amul Store with Backend API Integration
(function () {
    const STORAGE_KEY_USERS = "amul_users";
    const STORAGE_KEY_CURRENT_USER = "amul_current_user";

    // Initial default demo user if not existing
    function initUsers() {
        const users = getUsers();
        if (users.length === 0) {
            const demoUser = {
                id: "user_" + Date.now(),
                name: "Rahul Sharma",
                email: "rahul@amul.com",
                phone: "9876543210",
                password: "password123",
                createdAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([demoUser]));
        }
    }

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
        } catch (e) {
            return [];
        }
    }

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT_USER)) || null;
        } catch (e) {
            return null;
        }
    }

    function setCurrentUser(user) {
        if (user) {
            localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
        }
        updateAuthUI();
        window.dispatchEvent(new CustomEvent("amul:auth-changed", { detail: user }));
    }

    async function register(name, email, phone, password) {
        try {
            // Attempt API call to backend database
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, password })
            });

            if (res.ok) {
                const data = await res.json();
                setCurrentUser(data.user);
                return { success: true, user: data.user, message: data.message || "Account created successfully! Welcome to Amul." };
            } else {
                const errData = await res.json().catch(() => ({}));
                if (res.status === 409 || res.status === 400) {
                    return { success: false, message: errData.error || "An account with this email/phone already exists." };
                }
            }
        } catch (apiErr) {
            console.log("Backend API offline or unreachable, using local storage fallback.");
        }

        // Local Fallback
        const users = getUsers();
        const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            return { success: false, message: "An account with this email already exists." };
        }

        const newUser = {
            id: "user_" + Date.now(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
        setCurrentUser(newUser);
        return { success: true, user: newUser, message: "Account created successfully! Welcome to Amul." };
    }

    async function login(emailOrPhone, password) {
        try {
            // Attempt API call to backend database
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: emailOrPhone, password })
            });

            if (res.ok) {
                const data = await res.json();
                setCurrentUser(data.user);
                return { success: true, user: data.user, message: data.message || `Welcome back, ${data.user.name}!` };
            } else {
                const errData = await res.json().catch(() => ({}));
                if (res.status === 401 || res.status === 400) {
                    return { success: false, message: errData.error || "Invalid email/phone or password." };
                }
            }
        } catch (apiErr) {
            console.log("Backend API offline, using local storage login verification.");
        }

        // Local Fallback
        const users = getUsers();
        const identifier = emailOrPhone.trim().toLowerCase();
        const user = users.find(u => 
            (u.email.toLowerCase() === identifier || u.phone === identifier) && 
            u.password === password
        );

        if (!user) {
            return { success: false, message: "Invalid email/phone or password." };
        }

        setCurrentUser(user);
        return { success: true, user: user, message: `Welcome back, ${user.name}!` };
    }

    function logout() {
        setCurrentUser(null);
        showToast("Logged out successfully.", "info");
        return { success: true };
    }

    function updateAuthUI() {
        const user = getCurrentUser();
        const authBtnContainer = document.getElementById("auth-nav-container");
        const mobileAuthContainer = document.getElementById("mobile-auth-container");

        if (!authBtnContainer) return;

        if (user) {
            // User is logged in
            const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
            authBtnContainer.innerHTML = `
                <div class="relative group">
                    <button id="user-menu-btn" class="flex items-center gap-2 bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 text-primary px-3 py-1.5 rounded-full border border-pink-200 dark:border-pink-800 transition-all">
                        <div class="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
                            ${initials}
                        </div>
                        <span class="text-sm font-semibold max-w-[100px] truncate text-gray-800 dark:text-gray-200">${user.name}</span>
                        <span class="material-icons text-sm text-gray-500">expand_more</span>
                    </button>
                    <!-- Dropdown -->
                    <div class="absolute right-0 mt-2 w-52 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 hidden group-hover:block z-[1100] transition-all">
                        <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                            <p class="text-xs text-gray-400">Signed in as</p>
                            <p class="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">${user.email}</p>
                        </div>
                        <button onclick="window.AmulCheckout.openOrdersModal()" class="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-pink-950 flex items-center gap-2">
                            <span class="material-icons text-primary text-sm">receipt_long</span>
                            My Orders
                        </button>
                        <button onclick="window.AmulAuth.logout()" class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2">
                            <span class="material-icons text-red-500 text-sm">logout</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            `;
            if (mobileAuthContainer) {
                mobileAuthContainer.innerHTML = `
                    <div class="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/30 rounded-xl mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                                ${initials}
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-800 dark:text-gray-100">${user.name}</p>
                                <p class="text-xs text-gray-500 truncate">${user.email}</p>
                            </div>
                        </div>
                        <button onclick="window.AmulAuth.logout()" class="text-xs text-red-600 font-semibold px-2 py-1 bg-white dark:bg-surface-dark rounded-md border border-red-200">
                            Logout
                        </button>
                    </div>
                `;
            }
        } else {
            // User is guest
            authBtnContainer.innerHTML = `
                <button onclick="window.AmulAuth.openAuthModal('signin')" class="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span class="material-icons text-base text-primary">account_circle</span>
                    <span>Sign In</span>
                </button>
            `;
            if (mobileAuthContainer) {
                mobileAuthContainer.innerHTML = `
                    <button onclick="window.AmulAuth.openAuthModal('signin')" class="w-full bg-primary text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 mb-3">
                        <span class="material-icons text-sm">login</span>
                        Sign In / Register
                    </button>
                `;
            }
        }
    }

    function openAuthModal(mode = 'signin') {
        const modal = document.getElementById("auth-modal");
        if (!modal) return;
        switchTab(mode);
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }

    function closeAuthModal() {
        const modal = document.getElementById("auth-modal");
        if (!modal) return;
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
    }

    function switchTab(mode) {
        const signinTab = document.getElementById("auth-tab-signin");
        const signupTab = document.getElementById("auth-tab-signup");
        const signinForm = document.getElementById("auth-form-signin");
        const signupForm = document.getElementById("auth-form-signup");
        const modalTitle = document.getElementById("auth-modal-title");

        if (mode === 'signin') {
            signinTab.classList.add("border-primary", "text-primary", "font-bold");
            signinTab.classList.remove("border-transparent", "text-gray-500");
            signupTab.classList.remove("border-primary", "text-primary", "font-bold");
            signupTab.classList.add("border-transparent", "text-gray-500");
            
            signinForm.classList.remove("hidden");
            signupForm.classList.add("hidden");
            if (modalTitle) modalTitle.innerText = "Welcome to Amul";
        } else {
            signupTab.classList.add("border-primary", "text-primary", "font-bold");
            signupTab.classList.remove("border-transparent", "text-gray-500");
            signinTab.classList.remove("border-primary", "text-primary", "font-bold");
            signinTab.classList.add("border-transparent", "text-gray-500");
            
            signupForm.classList.remove("hidden");
            signinForm.classList.add("hidden");
            if (modalTitle) modalTitle.innerText = "Create Your Amul Account";
        }
    }

    // Global Toast Notification Helper
    function showToast(message, type = "success") {
        let container = document.getElementById("amul-toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "amul-toast-container";
            container.className = "fixed bottom-5 right-5 z-[99999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 flex items-center gap-3 p-4 rounded-2xl shadow-xl text-sm font-medium ${
            type === "success" ? "bg-gray-900 text-white border border-emerald-500/40" :
            type === "error" ? "bg-red-900 text-white border border-red-500/40" :
            "bg-gray-900 text-white border border-primary/40"
        }`;

        const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
        const iconColor = type === "success" ? "text-emerald-400" : type === "error" ? "text-red-400" : "text-pink-400";

        toast.innerHTML = `
            <span class="material-icons ${iconColor} text-xl">${icon}</span>
            <div class="flex-1">${message}</div>
            <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-white">
                <span class="material-icons text-base">close</span>
            </button>
        `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove("translate-y-4", "opacity-0");
        });

        setTimeout(() => {
            toast.classList.add("translate-y-4", "opacity-0");
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Attach Event Listeners on DOM load
    document.addEventListener("DOMContentLoaded", () => {
        initUsers();
        updateAuthUI();

        // Sign In form submit
        const signinForm = document.getElementById("auth-form-signin");
        if (signinForm) {
            signinForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const identifier = document.getElementById("signin-identifier").value;
                const password = document.getElementById("signin-password").value;
                
                const result = await login(identifier, password);
                if (result.success) {
                    showToast(result.message, "success");
                    closeAuthModal();
                } else {
                    showToast(result.message, "error");
                }
            });
        }

        // Sign Up form submit
        const signupForm = document.getElementById("auth-form-signup");
        if (signupForm) {
            signupForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const name = document.getElementById("signup-name").value;
                const email = document.getElementById("signup-email").value;
                const phone = document.getElementById("signup-phone").value;
                const password = document.getElementById("signup-password").value;
                const confirmPassword = document.getElementById("signup-confirm-password").value;

                if (password !== confirmPassword) {
                    showToast("Passwords do not match!", "error");
                    return;
                }
                if (password.length < 6) {
                    showToast("Password must be at least 6 characters.", "error");
                    return;
                }

                const result = await register(name, email, phone, password);
                if (result.success) {
                    showToast(result.message, "success");
                    closeAuthModal();
                } else {
                    showToast(result.message, "error");
                }
            });
        }
    });

    // Expose to window
    window.AmulAuth = {
        getUsers,
        getCurrentUser,
        register,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
        switchTab,
        updateAuthUI,
        showToast
    };
})();
