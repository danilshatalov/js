function addReview() {
  const productName = document.getElementById('productName').value.trim();
  const reviewText = document.getElementById('reviewText').value.trim();

  if (productName && reviewText) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    reviews[productName] = reviews[productName] || [];
    reviews[productName].push(reviewText);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('productName').value = '';
    document.getElementById('reviewText').value = '';

    displayReviews();
  } else {
    alert('Пожалуйста, введите название продукта и текст отзыва.');
  }
}

function displayReviews() {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';

  const reviews = JSON.parse(localStorage.getItem('reviews')) || {};

  for (const productName in reviews) {
    const productItem = document.createElement('li');
    productItem.innerHTML = `<strong>${productName}</strong>`;

    const reviewsList = document.createElement('ul');
    reviews[productName].forEach(review => {
      const reviewItem = document.createElement('li');
      reviewItem.textContent = review;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.onclick = function() {
        deleteReview(productName, review);
      };

      reviewItem.appendChild(deleteButton);
      reviewsList.appendChild(reviewItem);
    });

    productItem.appendChild(reviewsList);
    productsList.appendChild(productItem);
  }
}

function deleteReview(productName, review) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
  reviews[productName] = reviews[productName].filter(item => item !== review);
  localStorage.setItem('reviews', JSON.stringify(reviews));

  displayReviews();
}

displayReviews();
