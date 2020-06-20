/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const landingPgSections = document.querySelectorAll('section');
const scrollToTopButton = document.getElementById('back2Top');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function isElementInViewport(el){
    let rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    // Only completely visible elements return true:
    const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    // const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function checkForScrollButton(){
    // Get the current scroll value
    let y = window.scrollY;
    
    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
        scrollToTopButton.className = "show";
      } 
    else {
        scrollToTopButton.className = "hide";
    }
}

// Add class 'active' to section when near top of viewport
function updateDistinguishedSection(){
    for (const landingPgSection of landingPgSections){
        if (isElementInViewport(landingPgSection)){
            landingPgSection.classList.add("your-active-class");
        }
        else {
            landingPgSection.classList.remove("your-active-class");
        }
    }
}

// build the nav
function buildNavbar(){
    const myNavbar = document.querySelector('#navbar__list');
    myNavbar.innerHTML = '<li><a href="#top" class="menu__link">Home</a></li>';

    for (const landingPgSection of landingPgSections){
        const navTab = document.createElement('li');
        const tabAnchor = document.createElement('a');
        const landingPgSectionName = landingPgSection.getAttribute("data-nav");
        tabAnchor.setAttribute('href', '#'+landingPgSection.id);
        tabAnchor.setAttribute('class', 'menu__link '+landingPgSectionName);
        tabAnchor.textContent = landingPgSectionName;
        navTab.appendChild(tabAnchor);
        myNavbar.appendChild(navTab);
    }
}

// Scroll to anchor ID using scrollIntoView
function scrollSmoothly(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// Scroll to section on link click
document.addEventListener('DOMContentLoaded', (event) => {
    buildNavbar();
    scrollSmoothly();
});

// Set sections as active
// Update Scroll to Top Button
window.addEventListener("scroll", (event) => {
    updateDistinguishedSection();
    checkForScrollButton();
});
