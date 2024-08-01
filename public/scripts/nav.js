const hamburger = document.getElementById('hamburger')
const menuIcon = document.getElementById('menuIcon')

hamburger.addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('hidden');
    if(menuIcon.classList.contains('bx bx-menu-alt-right')){
        menuIcon.classList.remove('bx bx-menu-alt-right')
        menuIcon.classList.add('bx bx-x')
    }
    if(menuIcon.classList.contains('bx bx-x')){
        menuIcon.classList.remove('bx bx-x')
        menuIcon.classList.add('bx bx-menu-alt-right')
    }
});