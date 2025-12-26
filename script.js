 const menuBtn = document.getElementById("img2");
    const dropdown = document.getElementById("dropdownMenu");

    menuBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Закрыть меню при клике вне его
    document.addEventListener('click', function(event) {
      if (!dropdown.contains(event.target) && event.target !== menuBtn) {
        dropdown.classList.remove('open');
      }
    });

     // Переменные
        let currentReview = 0;
        const reviews = document.querySelectorAll('.review-item');
        const totalReviews = reviews.length;

        // Функция показа отзыва по индексу
        function showReview(index) {
            reviews.forEach((review, i) => {
                review.classList.remove('active');
            });
            reviews[index].classList.add('active');
            currentReview = index;
        }

        // Переключение на следующий отзыв
        function nextReview() {
            currentReview = (currentReview + 1) % totalReviews;
            showReview(currentReview);
        }

        // Переключение на предыдущий отзыв
        function prevReview() {
            currentReview = (currentReview - 1 + totalReviews) % totalReviews;
            showReview(currentReview);
        }

        // Автоматическая смена отзывов каждые 5 секунд
        setInterval(nextReview, 5000);

        // Инициализация — показать первый отзыв
        showReview(0);

        // Обработка свайпа (touch)
        let startX = 0;
        const container = document.querySelector('.swipe-area');

        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        container.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) {
                nextReview(); // свайп влево → следующий
            } else if (diff < -50) {
                prevReview(); // свайп вправо → предыдущий
            }
        });