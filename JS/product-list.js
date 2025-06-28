document.addEventListener('DOMContentLoaded', () => {
    // Toggle functionality for all sections, including price
    const toggleHeadings = document.querySelectorAll('.toggle-heading');
  
    toggleHeadings.forEach(heading => {
      heading.addEventListener('click', () => {
        const content = heading.nextElementSibling;
        const icon = heading.querySelector('.toggle-icon');
  
        // Toggle visibility
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
    });
  
    // Price range inputs and sliders
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const minPriceInput = document.getElementById('min-price-input');
    const maxPriceInput = document.getElementById('max-price-input');
    const progress = document.getElementById('progress');
  
    function updateRange() {
      let min = parseInt(minPrice.value) || 0;
      let max = parseInt(maxPrice.value) || parseInt(maxPrice.max);
  
      if (min > max) {
        min = max;
        minPrice.value = min;
      }
  
      if (max < min) {
        max = min;
        maxPrice.value = max;
      }
  
      minPriceInput.value = min;
      maxPriceInput.value = max;
  
      // Update the progress bar position and width
      const range = maxPrice.max - minPrice.min;
      progress.style.left = `${(min / range) * 100}%`;
      progress.style.width = `${((max - min) / range) * 100}%`;
    }
  
    minPrice.addEventListener('input', updateRange);
    maxPrice.addEventListener('input', updateRange);
  
    minPriceInput.addEventListener('input', () => {
      let value = parseInt(minPriceInput.value);
      if (!isNaN(value) && value >= 0 && value <= parseInt(maxPrice.max)) {
        if (value > parseInt(maxPriceInput.value)) {
          value = parseInt(maxPriceInput.value);
        }
        minPrice.value = value;
        updateRange();
      }
    });
  
    maxPriceInput.addEventListener('input', () => {
      let value = parseInt(maxPriceInput.value);
      if (!isNaN(value) && value >= 0 && value <= parseInt(maxPrice.max)) {
        if (value < parseInt(minPriceInput.value)) {
          value = parseInt(minPriceInput.value);
        }
        maxPrice.value = value;
        updateRange();
      }
    });
  
    updateRange(); // Initial setup
  });
  

   // Select all buttons with the class 'heart-btn'
   const heartButtons = document.querySelectorAll('.heart-btn');

   heartButtons.forEach(button => {
       button.addEventListener('click', () => {
           const icon = button.querySelector('.heart-icon');

           if (icon.src.includes('heart2.png')) {
               icon.src = '/public/Assets/user-options/saved.png';
               
               // Add bounce effect
               icon.classList.add('bounce');
               
               // Remove bounce class after animation completes to allow re-triggering
               icon.addEventListener('animationend', () => {
                   icon.classList.remove('bounce');
               }, { once: true }); // Ensures it only triggers once
           } else {
               icon.src = '/public/Assets/user-options/heart2.png';
           }
       });
   });
   document.addEventListener('DOMContentLoaded', () => {
    const gridIcon = document.getElementById('grid-icon');
    const menuIcon = document.getElementById('menu-icon');
    const productContainer = document.getElementById('product-container');

    if (gridIcon && menuIcon && productContainer) {
        // Grid Layout Click
        gridIcon.addEventListener('click', () => {
            productContainer.classList.add('grid-layout');
            productContainer.classList.remove('list-layout');

            gridIcon.classList.add('active');
            menuIcon.classList.remove('active');

            // Hide product descriptions in grid view
            document.querySelectorAll('.product p').forEach(p => {
                p.style.display = 'none';
            });
           
            document.querySelectorAll('.free-ship').forEach(p => {
                p.style.display = 'none';
            });
        });

        // List Layout Click
        menuIcon.addEventListener('click', () => {
            productContainer.classList.add('list-layout');
            productContainer.classList.remove('grid-layout');

            menuIcon.classList.add('active');
            gridIcon.classList.remove('active');

            // Show product descriptions in list view
            document.querySelectorAll('.product p').forEach(p => {
                p.style.display = 'block';
            });
           
            document.querySelectorAll('.free-ship').forEach(p => {
              p.style.display = 'block';
          });
        });
    }
});

