function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.findIndex(item => item.name === name);
      if (index > -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ name: name, price: price, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    }

    function filterMenu() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const items = document.querySelectorAll('.item');
      items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(input)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }