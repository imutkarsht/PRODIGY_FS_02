document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    const menuItems = navMenu.querySelectorAll('a');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('hidden');
        toggleMenuIcon();
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.add('hidden');
            toggleMenuIcon();
        });
    });

    function toggleMenuIcon() {
        if(menuIcon.classList.contains('bx-menu-alt-right')){
            menuIcon.classList.remove('bx-menu-alt-right');
            menuIcon.classList.add('bx-x');
        } else {
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu-alt-right');
        }
    }
});