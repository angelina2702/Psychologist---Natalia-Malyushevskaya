const menuBtn = document.querySelector(".img2");
const dropdown = document.getElementById("dropdownMenu");

if (menuBtn && dropdown) {
  menuBtn.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) && event.target !== menuBtn) {
      dropdown.classList.remove('open');
    }
  });
}