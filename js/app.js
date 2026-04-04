document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE HAMBURGER INJECTION ---
    const topNavbar = document.querySelector('.navbar');
    const rootNavLinks = document.querySelector('.nav-links');
    if (topNavbar && rootNavLinks) {
        const hamburger = document.createElement('div');
        hamburger.className = 'mobile-hamburger glow-effect';
        // Natively hidden on desktop via CSS, enabled on mobile
        hamburger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer; transition: transform 0.2s ease;"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
        topNavbar.prepend(hamburger);

        // Sidebar Cross Button for absolute UX control
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-close-btn';
        closeBtn.innerHTML = '<i data-lucide="x" style="color:white; width:28px; height:28px;"></i>';
        rootNavLinks.prepend(closeBtn);

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            rootNavLinks.classList.toggle('mobile-active');
            hamburger.style.transform = 'scale(0.8)';
            setTimeout(() => hamburger.style.transform = 'scale(1)', 150);
        });
        
        const forceCloseMenu = () => rootNavLinks.classList.remove('mobile-active');
        closeBtn.addEventListener('click', forceCloseMenu);

        // Absolute Touch and Click dismissal
        document.addEventListener('touchstart', (e) => {
            if(!rootNavLinks.contains(e.target) && !hamburger.contains(e.target)) forceCloseMenu();
        });
        document.addEventListener('click', (e) => {
            if(!rootNavLinks.contains(e.target) && !hamburger.contains(e.target)) forceCloseMenu();
        });
    }

    const initTiltEffect = () => {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        // Pricing Card Mouse follow removed due to browser hit-box invalidation on 3D transforms.
    };
    
    // Global User Display Binding
    const globalNameDisplays = document.querySelectorAll('#user-name-display, #checkout-user-name-display');
    const loggedUserEmail = localStorage.getItem('ishva_user');
    if (loggedUserEmail) {
        globalNameDisplays.forEach(el => el.innerText = loggedUserEmail);
    }
    
    const initScrollParallax = () => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroParallaxEls = document.querySelectorAll('.hero-content, .hero-3d-visuals');
            heroParallaxEls.forEach(el => {
                const depth = parseFloat(el.getAttribute('data-depth')) || 0.2;
                const movement = -(scrollY * depth);
                el.style.transform = `translate3d(0, ${movement}px, 0)`;
            });
        });
    };

    initTiltEffect();
    initScrollParallax();

    // --- MODALS & ROUTING ---
    const loginModal = document.getElementById('login-modal');
    const navLoginTab = document.getElementById('nav-quotation-tab');
    const ctaBtns = document.querySelectorAll('.cta-btn');
    const loginSubmitBtn = document.getElementById('login-submit-btn');

    if (loginModal) {
        const triggerLogin = (e) => {
            if(e) e.preventDefault();

            // Intelligent Authentication Bypass Protocol
            if (loggedUserEmail) {
                if (loggedUserEmail === 'admin@ishva.com') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'quotation.html';
                }
                return;
            }

            loginModal.classList.add('active');
        };
        if (navLoginTab) navLoginTab.addEventListener('click', triggerLogin);
        ctaBtns.forEach(btn => btn.addEventListener('click', triggerLogin));
    }

    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', () => {
            const emailInput = document.getElementById('login-email');
            const passInput = document.getElementById('login-pass');
            const phoneInput = document.getElementById('login-phone');
            const countrySelect = document.getElementById('country-code');
            
            let hasError = false;

            // Strict Email Validation Regex
            const emailVal = emailInput.value.trim();
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                emailInput.classList.add('shake');
                hasError = true;
            }

            // Phone Validation Length Array Checker
            const phoneVal = phoneInput.value.replace(/\D/g, ''); // Extract only digits
            const allowedLengths = countrySelect.options[countrySelect.selectedIndex].getAttribute('data-len').split(',').map(Number);
            if (!phoneVal || !allowedLengths.includes(phoneVal.length)) {
                phoneInput.classList.add('shake');
                hasError = true;
            }

            // Password basic check
            if (!passInput.value) {
                passInput.classList.add('shake');
                hasError = true;
            }
            
            if (hasError) {
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                    passInput.classList.remove('shake');
                    phoneInput.classList.remove('shake');
                }, 400);
                return;
            }

            // Admin bypass without OTP
            if (emailVal === 'admin@ishva.com') {
                window.location.href = 'admin.html';
                return;
            } 
            
            // Render OTP Screen
            document.getElementById('main-login-form').style.display = 'none';
            const otpForm = document.getElementById('otp-form');
            if (otpForm) otpForm.style.display = 'block';
            document.getElementById('otp-display-number').innerText = countrySelect.value + " " + phoneVal;

            // Generate Fake OTP
            const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
            
            // Trigger SMS Notification
            setTimeout(() => {
                const smsNotif = document.getElementById('sms-notification');
                if (smsNotif) {
                    document.getElementById('sms-code-display').innerText = generatedOtp;
                    smsNotif.style.top = '20px';
                    setTimeout(() => { smsNotif.style.top = '-100px'; }, 8000); // Hide after 8s
                }
            }, 1200);

            // Bind OTP inputs auto-advance securely
            const otpInputsRaw = document.querySelectorAll('.otp-input');
            otpInputsRaw.forEach(i => i.value = ''); // Clean old entries from previous attempts
            
            const newOtpInputs = Array.from(otpInputsRaw).map(i => {
                const clone = i.cloneNode(true);
                i.parentNode.replaceChild(clone, i);
                return clone;
            });

            newOtpInputs.forEach((input, index) => {
                input.addEventListener('input', (e) => {
                    if (e.target.value.length === 1 && index < newOtpInputs.length - 1) {
                        newOtpInputs[index + 1].focus();
                    }
                });
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                        newOtpInputs[index - 1].focus();
                    }
                });
            });

            // Bind Submit OTP
            const otpVerifyBtn = document.getElementById('otp-verify-btn');
            otpVerifyBtn.onclick = () => {
                const otpVal = newOtpInputs.map(i => i.value).join('');
                if(otpVal !== generatedOtp) {
                    newOtpInputs.forEach(i => i.classList.add('shake'));
                    setTimeout(() => newOtpInputs.forEach(i => i.classList.remove('shake')), 400);
                    return;
                }
                
                otpVerifyBtn.innerText = "Authenticating...";
                
                // Simulate network delay
                setTimeout(() => {
                    fetch('http://localhost:8000/api/login', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: emailVal,
                            phone: countrySelect.value + phoneVal,
                            password: passInput.value
                        })
                    }).catch(e => console.log('Using Local Storage fallback.'));
                    
                    localStorage.setItem('ishva_user', emailVal);
                    localStorage.setItem('ishva_phone', countrySelect.value + phoneVal);
                    window.location.href = 'quotation.html';
                }, 800);
            };
        });
    }

    const closeModals = document.querySelectorAll('.close-btn');
    closeModals.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mod = e.target.closest('.modal-overlay');
            if(mod) mod.classList.remove('active');
        });
    });


    // --- QUOTATION PAGE LOGIC & DB RESTORE ---
    const quotationSection = document.getElementById('quotation');
    if (quotationSection) {
        const steps = document.querySelectorAll('.form-step');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        let currentStep = 0;

        // SAFE Restore active database state to fix the crash
        const currentUser = localStorage.getItem('ishva_user') || 'Guest';
        const savedState = localStorage.getItem('ishva_saved_db_' + currentUser);
        
        let orderState;
        try {
            orderState = savedState ? JSON.parse(savedState) : null;
        } catch(e) {
            orderState = null;
        }

        if(!orderState || typeof orderState !== 'object' || !orderState.baseType || !Array.isArray(orderState.features) || !orderState.styleLevel) {
            orderState = {
                baseType: { name: 'Single Page', price: 3000, value: 'landing' },
                features: [],
                styleLevel: { name: 'Premium', multiplier: 1.2 },
                calculatedTotal: 3600,
                customizationNote: ''
            };
        }

        const priceDisplay = document.getElementById('total-price');
        const breakdownList = document.getElementById('pricing-breakdown');

        const getFeaturePrice = (featureVal, baseTypeVal) => {
            if (featureVal === 'seo') {
                if (baseTypeVal === 'landing') return 2000;
                if (baseTypeVal === 'corporate') return 4000;
                if (baseTypeVal === 'ecommerce') return 20000;
            }
            if (featureVal === 'domain') return 800; 
            if (featureVal === '3d') return 5000;
            return 0;
        };

        const updatePricingUI = () => {
            let featuresTotal = 0;
            const updatedFeatures = orderState.features.map(f => {
                const cost = getFeaturePrice(f.value, orderState.baseType.value);
                featuresTotal += cost;
                return { ...f, price: cost };
            });

            let subtotal = orderState.baseType.price + featuresTotal;
            let total = Math.round(subtotal * orderState.styleLevel.multiplier);
            orderState.calculatedTotal = total;

            animateValue(priceDisplay, parseInt(priceDisplay.innerText.replace(/,/g, '')) || 0, total, 500);

            breakdownList.innerHTML = '';
            
            const baseLi = document.createElement('li');
            baseLi.innerHTML = `<span>${orderState.baseType.name}</span><span>₹${orderState.baseType.price.toLocaleString()}</span>`;
            breakdownList.appendChild(baseLi);

            if (orderState.baseType.value === 'corporate') {
                const subLi = document.createElement('li');
                subLi.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 10px; line-height: 1.3;">➔ Blogs, Image Galleries, 3D Interactives</span><span style="font-size: 0.8rem; color: var(--accent-2);">Included</span>`;
                breakdownList.appendChild(subLi);
            } else if (orderState.baseType.value === 'ecommerce') {
                const subLi = document.createElement('li');
                subLi.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-secondary); padding-left: 10px; line-height: 1.3; max-width: 200px;">➔ Payment Integration, Products, Ranking, Admin Panel (Manage products)</span><span style="font-size: 0.8rem; color: var(--accent-2);">Included</span>`;
                breakdownList.appendChild(subLi);
            }

            updatedFeatures.forEach(f => {
                let costStr = f.value === 'domain' ? `~₹${f.price.toLocaleString()}` : `₹${f.price.toLocaleString()}`;
                const li = document.createElement('li');
                li.innerHTML = `<span>+ ${f.name}</span><span>${costStr}</span>`;
                breakdownList.appendChild(li);
            });

            if(orderState.styleLevel.multiplier !== 1) {
                const li = document.createElement('li');
                li.innerHTML = `<span>Style: ${orderState.styleLevel.name}</span><span>x${orderState.styleLevel.multiplier}</span>`;
                breakdownList.appendChild(li);
            }

            localStorage.setItem('ishva_saved_db_' + currentUser, JSON.stringify(orderState));
        };

        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 4);
                const currentVal = Math.floor(easeOut * (end - start) + start);
                obj.innerHTML = currentVal.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.innerHTML = end.toLocaleString();
                }
            };
            window.requestAnimationFrame(step);
        };

        // Rehydrate UI
        const typeCards = document.querySelectorAll('.option-card[data-type="type"]');
        typeCards.forEach(c => {
            c.classList.remove('active');
            if (c.getAttribute('data-value') === orderState.baseType.value) c.classList.add('active');
            
            c.addEventListener('click', () => {
                typeCards.forEach(card => card.classList.remove('active'));
                c.classList.add('active');
                orderState.baseType = {
                    name: c.querySelector('h4').innerText,
                    price: parseInt(c.getAttribute('data-price')),
                    value: c.getAttribute('data-value')
                };
                updatePricingUI();
            });
        });

        const featureCards = document.querySelectorAll('.option-card[data-type="feature"]');
        featureCards.forEach(c => {
            c.classList.remove('active');
            if (orderState.features.some(f => f.value === c.getAttribute('data-value'))) c.classList.add('active');

            c.addEventListener('click', () => {
                c.classList.toggle('active');
                const featureName = c.querySelector('h4').innerText;
                const featureValue = c.getAttribute('data-value');
                
                if (c.classList.contains('active')) {
                    if(!orderState.features.some(f=> f.value === featureValue)) {
                        orderState.features.push({ name: featureName, value: featureValue });
                    }
                } else {
                    orderState.features = orderState.features.filter(f => f.value !== featureValue);
                }
                updatePricingUI();
            });
        });

        const styleSlider = document.getElementById('style-slider');
        if(styleSlider) {
            const multiMapReverse = { "1.0": 1, "1.2": 2, "1.5": 3, "1": 1 };
            styleSlider.value = multiMapReverse[orderState.styleLevel.multiplier.toString()] || 2;
            
            styleSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value);
                const styles = [
                    { name: 'Minimalist', multiplier: 1.0 },
                    { name: 'Premium', multiplier: 1.2 },
                    { name: 'Avant-Garde', multiplier: 1.5 }
                ];
                orderState.styleLevel = styles[val - 1];
                updatePricingUI();
            });
        }

        const noteArea = document.getElementById('customization-note');
        if(noteArea) {
            if(orderState.customizationNote) noteArea.value = orderState.customizationNote;
            noteArea.addEventListener('input', (e) => {
                orderState.customizationNote = e.target.value;
                localStorage.setItem('ishva_saved_db_' + currentUser, JSON.stringify(orderState));
            });
        }

        const updateSteps = () => {
            steps.forEach((step, index) => {
                step.classList.remove('active', 'exit-left');
                if (index === currentStep) {
                    step.classList.add('active');
                } else if (index < currentStep) {
                    step.classList.add('exit-left');
                }
            });
            prevBtn.disabled = currentStep === 0;
            if (currentStep === steps.length - 1) {
                nextBtn.innerText = 'Finish';
            } else {
                nextBtn.innerText = 'Next Step';
            }
        };

        const contactModal = document.getElementById('checkout-contact-modal');
        const triggerSendBtn = document.getElementById('trigger-final-send-btn');
        const closeContactBtn = document.getElementById('close-checkout-contact');

        const performCheckout = () => {
            const phoneInput = localStorage.getItem('ishva_phone') || 'No Phone';
            const noteArea = document.getElementById('customization-note');
            if(noteArea) orderState.customizationNote = noteArea.value;

            // Open the Separated Contact Form Before Checkout
            if (contactModal) {
                document.getElementById('final-mail').value = currentUser;
                document.getElementById('final-phone').value = phoneInput;
                document.getElementById('final-price').value = "₹" + orderState.calculatedTotal.toLocaleString();
                document.getElementById('final-req').value = orderState.customizationNote;
                
                contactModal.classList.add('active');
                return; // halt actual execution until they conform in modal
            }
        };

        if (closeContactBtn) closeContactBtn.addEventListener('click', () => contactModal.classList.remove('active'));

        if (triggerSendBtn) {
            triggerSendBtn.addEventListener('click', () => {
                triggerSendBtn.innerText = "Dispatching to Gmail Gateway...";
                
                const phoneInput = localStorage.getItem('ishva_phone') || 'No Phone';
                const currentLeads = JSON.parse(localStorage.getItem('ishva_leads') || '[]');
                
                // Read from modal textbox if they edited it real-time
                orderState.customizationNote = document.getElementById('final-req').value;

                currentLeads.push({
                    phone: phoneInput,
                    user: currentUser,
                    state: orderState,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem('ishva_leads', JSON.stringify(currentLeads));
                localStorage.setItem('ishva_current_order', JSON.stringify(orderState));
                
                // Save to Python DB natively
                fetch('http://localhost:8000/api/save', {
                    method: 'POST',
                    body: JSON.stringify({ email: currentUser, payload: orderState })
                }).catch(e => console.log('No backend server running.'));

                // Send Email to vanapalligowtham890@gmail.com via FormSubmit payload
                const emailBody = `
New Quotation Request from Ishva!
---------------------------------
Client Email: ${currentUser}
Client Phone: ${phoneInput}

Package Selected: ${orderState.baseType.name}
Style Level: ${orderState.styleLevel.name}
Total Project Value: ₹${orderState.calculatedTotal.toLocaleString()}

Client Requirements / Business Vision:
${orderState.customizationNote || 'No customization notes provided.'}
                `;

                fetch("https://formsubmit.co/ajax/vanapalligowtham890@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: "Ishva Lead | " + currentUser + " | ₹" + orderState.calculatedTotal,
                        email: currentUser,
                        Client_Phone: phoneInput,
                        Project_Total: "₹" + orderState.calculatedTotal,
                        Client_Requirement: orderState.customizationNote || "None",
                        message: emailBody
                    })
                }).then(() => {
                    window.location.href = 'checkout.html';
                }).catch(e => {
                    console.log('Email forward offline.');
                    window.location.href = 'checkout.html';
                });
            });
        }

        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) { 
                currentStep++; updateSteps(); 
            } else if (currentStep === steps.length - 1) {
                // Phase 2 Translation
                document.querySelector('.quotation-form').classList.add('phase-hidden');
                document.querySelector('.receipt-panel').classList.add('phase-active');
            }
        });
        
        const editPrefBtn = document.getElementById('edit-preferences-btn');
        if(editPrefBtn) {
            editPrefBtn.addEventListener('click', () => {
                document.querySelector('.quotation-form').classList.remove('phase-hidden');
                document.querySelector('.receipt-panel').classList.remove('phase-active');
            });
        }
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) { currentStep--; updateSteps(); }
        });

        const downloadPdfBtn = document.getElementById('download-pdf-btn');
        if(downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => {
                const printUser = document.getElementById('print-user');
                const printDate = document.getElementById('print-date');
                if(printUser) printUser.innerText = currentUser;
                if(printDate) printDate.innerText = new Date().toLocaleDateString();
                window.print();
            });
        }

        const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
        if(proceedCheckoutBtn) {
            proceedCheckoutBtn.addEventListener('click', performCheckout);
        }

        updatePricingUI();
    }

    // --- CHECKOUT PAGE LOGIC ---
    const checkoutSummary = document.getElementById('checkout-summary');
    if (checkoutSummary) {
        const orderDataRaw = localStorage.getItem('ishva_current_order');
        if (orderDataRaw) {
            const activeOrder = JSON.parse(orderDataRaw);
            checkoutSummary.innerHTML = `
                <div style="font-size: 1.1rem; color: white;">Package Strategy: ${activeOrder.baseType.name}</div>
                <div>Base Construction Value: ₹${activeOrder.baseType.price.toLocaleString()}</div>
                <div>Extra Features Included: ${activeOrder.features.length}</div>
                <div style="margin-top: 10px; font-weight: bold; color: var(--accent-2); font-size: 1.5rem;">Total Quotation Payable: ₹${activeOrder.calculatedTotal.toLocaleString()}</div>
            `;
        } else {
            checkoutSummary.innerHTML = "No active order found. Please return to Quotation builder.";
        }

        const payBtn = document.getElementById('pay-btn');
        if (payBtn) {
            payBtn.addEventListener('click', () => {
                alert('Payment captured successfully! You will be redirected back to the dashboard.');
                window.location.href = 'quotation.html';
            });
        }
    }

    // --- ADMIN PAGE LOGIC ---
    const adminTableBody = document.getElementById('admin-table-body');
    if (adminTableBody) {
        const currentLeads = JSON.parse(localStorage.getItem('ishva_leads') || '[]');
        
        const quotesCount = document.getElementById('admin-quotes-count');
        if (quotesCount) quotesCount.innerText = currentLeads.length;

        // Settings Profile
        const adminProfile = JSON.parse(localStorage.getItem('ishva_admin_profile')) || { name: 'Admin User', icon: '👑' };
        const nameDisplay = document.getElementById('admin-name-display');
        const iconDisplay = document.getElementById('admin-icon-display');
        
        if (nameDisplay) nameDisplay.innerText = adminProfile.name;
        if (iconDisplay) iconDisplay.innerText = adminProfile.icon;

        const profileBtn = document.getElementById('admin-profile-btn');
        const settingsModal = document.getElementById('admin-settings-modal');
        const closeSettingsBtn = document.getElementById('close-settings-modal');
        const saveSettingsBtn = document.getElementById('save-settings-btn');

        if (profileBtn && settingsModal) {
            profileBtn.addEventListener('click', () => {
                document.getElementById('setting-name').value = adminProfile.name;
                document.getElementById('setting-icon').value = adminProfile.icon;
                settingsModal.classList.add('active');
            });
            if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
            
            if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', () => {
                const newName = document.getElementById('setting-name').value || 'Admin User';
                const newIcon = document.getElementById('setting-icon').value || '👑';
                const newProfile = { name: newName, icon: newIcon };
                localStorage.setItem('ishva_admin_profile', JSON.stringify(newProfile));
                
                nameDisplay.innerText = newProfile.name;
                iconDisplay.innerText = newProfile.icon;
                settingsModal.classList.remove('active');
            });
        }
        
        window.deleteLead = function(idx) {
            currentLeads.splice(idx, 1);
            localStorage.setItem('ishva_leads', JSON.stringify(currentLeads));
            window.location.reload();
        };

        if (currentLeads.length > 0) {
            currentLeads.forEach((lead, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">${lead.phone} <br><span style="font-size:0.7rem; color:gray;">[${lead.user}]</span></td>
                    <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        ${lead.state.baseType.name}<br>
                        <span style="font-size:0.8rem; color: var(--text-secondary);">+${lead.state.features.length} addons</span>
                        <div style="font-size:0.75rem; color: var(--text-secondary); margin-top: 5px; max-width: 200px; white-space: pre-wrap;">📝 ${lead.state.customizationNote || 'No notes left'}</div>
                    </td>
                    <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: var(--accent-1);">₹${lead.state.calculatedTotal.toLocaleString()}</td>
                    <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <button onclick="window.deleteLead(${idx})" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; background: rgba(255,0,0,0.1); border-color: rgba(255,0,0,0.3); color: #ff6b6b;">Dismiss Form</button>
                    </td>
                `;
                adminTableBody.appendChild(tr);
            });
        } else {
            adminTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 40px;">No incoming quotes at the moment.</td></tr>`;
        }
    }

    // ==========================================
    // Gemini 2.5 Flash Authenticated Assistant
    // ==========================================
    const injectChatbot = () => {
        if (!loggedUserEmail) return; // ONLY inject if logged in. Hidden Phone security protocol.

        // 1. Create Widget
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget glow-effect';
        widget.innerHTML = `<i data-lucide="bot" style="width:28px; height:28px;"></i>`;
        document.body.appendChild(widget);

        // 2. Create Window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chatbot-window glass-panel';
        chatWindow.innerHTML = `
            <div class="chatbot-header">
                <h3><i data-lucide="sparkles" style="width:18px; color:var(--accent-1);"></i> Gemini AI <span class="badge">v2.5 Flash</span></h3>
                <button id="close-chat-btn" style="background:none; border:none; color:white; cursor:pointer;"><i data-lucide="x"></i></button>
            </div>
            <div class="chatbot-messages" id="chat-feed">
                <div class="chat-message bot">Hello ${loggedUserEmail.split('@')[0]}! I am your automated AI assistant powered by Gemini 2.5 Flash architecture. How can I map your quotation today?</div>
            </div>
            <div class="chatbot-input">
                <input type="text" id="chat-input-text" placeholder="Ask about processes, pricing..." autocomplete="off">
                <button id="chat-send-btn"><i data-lucide="send" style="width:16px;"></i></button>
            </div>
        `;
        document.body.appendChild(chatWindow);

        lucide.createIcons();

        // 3. Logic Listeners
        let isOpen = false;
        widget.addEventListener('click', () => {
            isOpen = !isOpen;
            chatWindow.classList.toggle('active', isOpen);
        });
        document.getElementById('close-chat-btn').addEventListener('click', () => {
            isOpen = false;
            chatWindow.classList.remove('active');
        });

        const feed = document.getElementById('chat-feed');
        const input = document.getElementById('chat-input-text');
        const sendBtn = document.getElementById('chat-send-btn');

        const processMessage = () => {
            const text = input.value.trim();
            if(!text) return;
            
            // Add User Message safely
            feed.innerHTML += '<div class="chat-message user">' + text.replace(/</g,"&lt;") + '</div>';
            input.value = '';
            feed.scrollTop = feed.scrollHeight;

            // Simulate Gemini 2.5 Flash Thinking
            const typingId = 'typing-' + Date.now();
            setTimeout(() => {
                feed.innerHTML += '<div class="chat-message bot" id="' + typingId + '">Thinking...</div>';
                feed.scrollTop = feed.scrollHeight;
                
                setTimeout(() => {
                    const response = getGeminiResponse(text.toLowerCase());
                    document.getElementById(typingId).remove();
                    feed.innerHTML += '<div class="chat-message bot">' + response + '</div>';
                    feed.scrollTop = feed.scrollHeight;
                }, 800); // 800ms flash emulation
            }, 300);
        };

        input.addEventListener('keypress', (e) => { if(e.key === 'Enter') processMessage(); });
        sendBtn.addEventListener('click', () => processMessage());

        // Simulated Gemini Responder
        const getGeminiResponse = (query) => {
            if (query.includes('price') || query.includes('cost') || query.includes('quote') || query.includes('how much')) {
                return "Our sophisticated pricing starts at ₹3,000 for a single page, adapting accurately through your inputs. Feel free to use the Interactive Pricing system.";
            }
            if (query.includes('time') || query.includes('how long') || query.includes('handover') || query.includes('days')) {
                return "According to Ishva standard terms, all comprehensive projects are formally handed over within 30 days of the deposit realization.";
            }
            if (query.includes('domain') || query.includes('hosting')) {
                return "Domain names and active hosting nodes operate on a separate matrix specifically billed to the client outside of quotation scopes.";
            }
            if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
                return "Greetings! I'm completely connected to the Ishva internal parameters. How may I assist your engineering constraints?";
            }
            
            // ULTIMATE SILENT FALLBACK -> Unmasks the private contact number
            return "I am currently governed strictly by Gemini 2.5 Flash architectural parameters and cannot decisively answer your request. For immediate physical assistance, please contact our human team directly at <b style='color:var(--accent-1);'>8309939554</b>.";
        };
    };

    if (loggedUserEmail) {
        injectChatbot(); 
    }
});
