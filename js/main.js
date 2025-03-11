document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const userMenu = document.querySelector('.user-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            userMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
            
            // Change icon when menu is active
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Accordion functionality for FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    userMenu.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                    
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const supportForm = document.querySelector('.support-form');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (subject.value === '') {
                highlightField(subject, true);
                isValid = false;
            } else {
                highlightField(subject, false);
            }
            
            if (message.value === '') {
                highlightField(message, true);
                isValid = false;
            } else {
                highlightField(message, false);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                showFormSuccess(supportForm);
            }
        });
    }
    
    function highlightField(field, isError) {
        if (isError) {
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = field.parentElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Este campo es obligatorio';
                field.parentElement.appendChild(errorMsg);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if it exists
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    }
    
    function showFormSuccess(form) {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Tu mensaje ha sido enviado. Te responderemos lo antes posible.';
        
        // Hide the form
        form.style.display = 'none';
        
        // Add success message after the form
        form.parentElement.appendChild(successMsg);
        
        // Reset form and show it again after a delay
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMsg.remove();
        }, 5000);
    }
    
    // Add active class to current page link
    function setActiveLink() {
        const currentLocation = window.location.hash || '#dashboard';
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === currentLocation) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Call initially and on hash change
    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);
    
    // Simulate loading data (for demo purposes)
    simulateLoadingData();
    
    function simulateLoadingData() {
        // For demo purposes, we'll add a loading state to certain elements
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        const creditSummary = document.querySelector('.credit-summary');
        const paymentHistory = document.querySelector('.payment-history');
        const documentsGrid = document.querySelector('.documents-grid');
        
        // Add loading state
        const elements = [
            ...(dashboardCards || []), 
            creditSummary, 
            paymentHistory, 
            documentsGrid
        ].filter(el => el !== null);
        
        elements.forEach(el => {
            el.classList.add('loading');
            
            // Create loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="spinner"></div>';
            el.appendChild(loadingOverlay);
        });
        
        // Remove loading state after a short delay
        setTimeout(() => {
            elements.forEach(el => {
                el.classList.remove('loading');
                const overlay = el.querySelector('.loading-overlay');
                if (overlay) {
                    overlay.remove();
                }
            });
        }, 1500);
    }
    
    // Add CSS for loading elements
    addLoadingStyles();
    
    function addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .loading {
                position: relative;
                min-height: 100px;
            }
            
            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10;
                border-radius: var(--border-radius);
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(0, 174, 239, 0.2);
                border-radius: 50%;
                border-top-color: var(--primary-color);
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .error {
                border-color: var(--danger-color) !important;
            }
            
            .error-message {
                color: var(--danger-color);
                font-size: 0.85rem;
                margin-top: 5px;
            }
            
            .success-message {
                background-color: rgba(40, 167, 69, 0.1);
                color: var(--success-color);
                padding: 15px;
                border-radius: var(--border-radius);
                margin-top: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .success-message i {
                font-size: 1.5rem;
            }
            
            .nav-links.active, 
            .user-menu.active {
                display: flex;
                flex-direction: column;
                background-color: white;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                z-index: 999;
            }
            
            .nav-links.active a {
                padding: 15px 0;
                border-bottom: 1px solid var(--bg-dark);
            }
            
            .user-menu.active {
                top: unset;
                padding-top: 0;
            }
        `;
        document.head.appendChild(style);
    }
}); 