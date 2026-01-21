function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return num.toString();
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function handleScroll() {
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.problem__stat-number');
    
    if (isElementInViewport(statsSection)) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (parseInt(counter.textContent) === 0) {
                animateCounter(counter, target);
            }
        });
        window.removeEventListener('scroll', handleScroll);
    }
}

window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll);