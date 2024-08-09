(function ($) {

  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  var initSwiper = function () {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 8,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 5,
        },
        1500: {
          slidesPerView: 8,
        },
      }
    });

    $(".products-carousel").each(function () {
      var $el_id = $(this).attr('id');

      var products_swiper = new Swiper("#" + $el_id + " .swiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 500,
        navigation: {
          nextEl: "#" + $el_id + " .products-carousel-next",
          prevEl: "#" + $el_id + " .products-carousel-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          },
        }
      });

    });


    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 5,
      spaceBetween: 20,
      // autoplay: true,
      direction: "vertical",
      breakpoints: {
        0: {
          direction: "horizontal"
        },
        992: {
          direction: "vertical"
        },
      },
    });

    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      // autoplay: true,
      spaceBetween: 0,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // input spinner
  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function () {

    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar-menu');
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const offcanvasClose = document.querySelector('.offcanvas-close');

  toggleButton.addEventListener('click', function () {
    // navbarMenu.classList.toggle('show');
    offcanvasMenu.classList.toggle('show');
  });

  offcanvasClose.addEventListener('click', function () {
    offcanvasMenu.classList.remove('show');
    // navbarMenu.classList.remove('show');
  });
});

// Ensure each quantity input field has a unique ID and necessary attributes
// $('.product-item').each(function(index) {
//   var $quantityInput = $(this).find('input[name="quantity"]');

//   // Check if the input field already has an id
//   if (!$quantityInput.attr('id')) {
//     // Create a unique id for each input field
//     var uniqueId = 'quantity-' + index;
//     $quantityInput.attr('id', uniqueId);
//   }

//   // Ensure the input field has a name attribute
//   if (!$quantityInput.attr('name')) {
//     $quantityInput.attr('name', 'quantity');
//   }

//   // Add autocomplete attribute if missing
//   if (!$quantityInput.attr('autocomplete')) {
//     $quantityInput.attr('autocomplete', 'off');
//   }
// });

// Function to add product to cart
function addToCart(event) {
  event.preventDefault(); // Prevent default action

  var $productItem = $(this).closest('.product-item');
  var productName = $productItem.find('h3').text().trim();
  var productImage = $productItem.find('figure img').attr('src');
  var productQuantity = parseInt($productItem.find('input[name="quantity"]').val().trim(), 10);
  var productPrice = parseFloat($productItem.find('.text-dark.fw-semibold').text().replace('$', '').trim());

  var product = {
    name: productName,
    image: productImage,
    quantity: productQuantity,
    price: productPrice
  };


  // ------------------- Cart page related JS ----------------------

  // Retrieve existing cart or initialize an empty array
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  var productExists = cart.some(function (existingProduct) {
    return existingProduct.name === product.name;
  });

  if (productExists) {
    // Optionally, update the quantity of the existing product
    cart = cart.map(function (existingProduct) {
      if (existingProduct.name === product.name) {
        existingProduct.quantity = productQuantity; // Set to new quantity
        existingProduct.price = productPrice; // Update price in case it changes
      }
      return existingProduct;
    });
  } else {
    // Add the new product to the cart array
    cart.push(product);
  }

  // Store the updated cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName}, Added to the cart.`)
  console.log('Product added to cart:', product);
}

// Attach event handler to the "Add to Cart" button
$('.btn-cart').on('click', addToCart);


// Attach click event listener to all "Add to Cart" buttons
$('.btn-cart').on('click', addToCart);

// Function to load cart data from local storage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let $tbody = $('.cart tbody');
  $tbody.empty(); // Clear the existing cart items

  let subtotal = 0;

  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    $tbody.append(`
      <tr data-product-id="${item.id}">
        <td scope="row" class="py-4">
          <div class="cart-info d-flex flex-wrap align-items-center mb-4">
            <div class="col-lg-3">
              <div class="card-image">
                <img src="${item.image}" alt="${item.name}" class="img-fluid">
              </div>
            </div>
            <div class="col-lg-9">
              <div class="card-detail ps-3">
                <h5 class="card-title">
                  <a href="#" class="text-decoration-none">${item.name}</a>
                </h5>
              </div>
            </div>
          </div>
        </td>
        <td class="py-4">
          <div class="input-group product-qty w-50">
            <span class="input-group-btn">
              <button type="button" class="quantity-left-minus btn btn-light btn-number" data-product-id="${item.id}" data-type="minus">
                <i class="fas fa-minus"></i>
              </button>
            </span>
            <input type="text" id="quantity" name="quantity" class="form-control input-number text-center" value="${item.quantity}" data-product-id="${item.id}">
            <span class="input-group-btn">
              <button type="button" class="quantity-right-plus btn btn-light btn-number" data-product-id="${item.id}" data-type="plus">
                <i class="fas fa-plus"></i>
              </button>
            </span>
          </div>
        </td>
        <td class="py-4">
          <div class="total-price">
            <span class="money text-dark">$${itemTotal.toFixed(2)}</span>
          </div>
        </td>
        <td class="py-4">
          <div class="cart-remove">
            <a href="#" class="remove-item" data-product-id="${item.id}">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </td>
      </tr>
    `);

  });

  // Update subtotal and total
  $('.subtotal .price-amount').text(`$${subtotal.toFixed(2)}`);
  console.log(subtotal)
  $('.order-total .price-amount').text(`$${subtotal.toFixed(2)}`);
}

// Load cart data when the page loads
loadCart();
// // Handle quantity change (assuming quantity is updated by other logic)
// $(document).on('click', '.quantity-left-minus, .quantity-right-plus', function() {
//   let $button = $(this);
//   let productId = $button.data('product-id');
//   let $input = $(`input[data-product-id="${productId}"]`);
//   let newQuantity = parseInt($input.val(), 10);

//   // Update local storage
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];
//   let item = cart.find(item => item.id === productId);
//   if (item) {
//     item.quantity = newQuantity;
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }

//   // Reload cart to reflect changes
//   loadCart();
// });

// Handle item removal
$(document).on('click', '.remove-item', function (e) {
  e.preventDefault();
  let productId = $(this).data('product-id');

  // Remove item from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Reload cart to reflect changes
  loadCart();
});

// Handle update cart button click
$('.btn-update-cart').on('click', function () {
  loadCart(); // Reload the cart when the "Update Cart" button is clicked
});

// Function to remove a product from cart based on product name
function removeProductFromCart(productName) {
  // Get the current cart from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Filter out the product with the specified name
  cart = cart.filter(item => item.name !== productName);

  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Reload the page to reflect changes
  location.reload();
}

// Handle item removal with jQuery
$(document).on('click', '.remove-item', function (e) {
  e.preventDefault(); // Prevent default link behavior

  // Find the product name in the same row
  let $row = $(this).closest('tr');
  let productName = $row.find('.card-title a').text().trim();

  // Call function to remove product from cart
  removeProductFromCart(productName);
});


// Handle quantity change for plus and minus buttons
$(document).on('click', '.quantity-left-minus, .quantity-right-plus', function () {
  // Get the button that was clicked
  let $button = $(this);

  // Get the product name from the row where the button was clicked
  let $row = $button.closest('tr');
  let productName = $row.find('.card-title a').text().trim();

  // Get the current quantity from the input field
  let $input = $row.find('input[name="quantity"]');
  let currentQuantity = parseInt($input.val(), 10);

  // Determine the new quantity based on the button clicked
  let newQuantity = currentQuantity;

  if ($button.hasClass('quantity-left-minus') && currentQuantity > 1) {
    newQuantity--;
  } else if ($button.hasClass('quantity-right-plus')) {
    newQuantity++;
  }

  // Update the quantity in the input field
  $input.val(newQuantity);

  // Update local storage
  updateCartQuantity(productName, newQuantity);

  // For example: loadCart();
  // Reload the page to reflect changes
  // location.reload();
});

// Function to update the quantity of a product in local storage
function updateCartQuantity(productName, newQuantity) {
  // Retrieve the current cart from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Find the product in the cart
  let item = cart.find(item => item.name === productName);

  if (item) {
    // Update the quantity of the product
    item.quantity = newQuantity;

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// Attach click event handler to the "Update Cart" button
$(document).on('click', '.btn-update-cart', function () {
  // Reload the page
  location.reload();
});


// --------------------------------- Checkout page related js -----------------------------------
$(document).ready(function () {
  // Function to load cart data and update the cart summary and badge
  function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var $cartList = $('.list-group'); // Assuming the cart list has the class 'list-group'
    var total = 0;
    var totalItems = 0; // Track total items for badge update

    // Clear existing cart items
    $cartList.empty();

    // Populate cart items
    cart.forEach(function (item) {
      var itemTotal = item.quantity * item.price;
      total += itemTotal;

      $cartList.append(`
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">${item.name}</h6>
            <small class="text-body-secondary">Quantity: ${item.quantity}</small>
          </div>
          <span class="text-body-secondary">$${itemTotal.toFixed(2)}</span>
        </li>
      `);
    });

    // Append promo code and total
    $cartList.append(`
      <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
        <div class="text-success">
          <h6 class="my-0">Promo code</h6>
          <small>EXAMPLECODE</small>
        </div>
        <span class="text-success">−$5</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>$${(total - 5).toFixed(2)}</strong> <!-- Assuming a fixed promo discount of $5 -->
      </li>
    `);

    // Update the badge with the total number of items

    // // Calculate the length of the cart (assuming cart is an array)
    const cartLength = cart ? cart.length : 0;

    // // Output the length of the cart
    console.log('Length of the cart:', cartLength);

    $('.badge.bg-primary.rounded-pill').text(cartLength);
  }

  // Call the function to load cart on page load
  loadCart();

  // Function to populate form fields with local storage data
  function populateForm() {
    var formData = JSON.parse(localStorage.getItem('formData')) || {};

    $('#firstName').val(formData.firstName || '');
    $('#lastName').val(formData.lastName || '');
    $('#username').val(formData.username || '');
    $('#email').val(formData.email || '');
    $('#address').val(formData.address || '');
    $('#address2').val(formData.address2 || '');
    $('#country').val(formData.country || '');
    $('#state').val(formData.state || '');
    $('#zip').val(formData.zip || '');
  }

  // Call the function to populate form fields on page load
  populateForm();

  // // Save form data to local storage on form submit
  // $('form.needs-validation').on('submit', function () {
  //   var formData = {
  //     firstName: $('#firstName').val(),
  //     lastName: $('#lastName').val(),
  //     username: $('#username').val(),
  //     email: $('#email').val(),
  //     address: $('#address').val(),
  //     address2: $('#address2').val(),
  //     country: $('#country').val(),
  //     state: $('#state').val(),
  //     zip: $('#zip').val()
  //   };

  //   localStorage.setItem('formData', JSON.stringify(formData));
  // });

  // Redirect for "Continue Shopping" button
  // $('.btn-dark').on('click', function () {
  //   window.location.href = '/shop'; // Redirect to the shopping page
  // });

  // Redirect for "Proceed to Checkout" button
  // $('.btn-primary.btn-lg').on('click', function () {
  //   // You can add validation or additional logic here if needed
  //   window.location.href = '/checkout'; // Redirect to the checkout page
  // });
});



// ---------------------product detailed page --------------------------------------
// Function to add product to cart
// Function to add a product to the cart
function addProductToCart(event) {
  event.preventDefault(); // Prevent default form submission

  // Get product details
  var productName = $('.product-info h2').text().trim(); // Trim whitespace
  var productImage = $('.product-large-slider .swiper-slide-active img').attr('src');
  var productPriceText = $('.product-price .text-primary').text().replace('$', '').trim();
  var productPrice = parseFloat(productPriceText); // Convert to float

  var productQuantity = parseInt($('#quantity').val(), 10); // Parse as integer

  var product = {
    name: productName,
    image: productImage,
    quantity: productQuantity,
    price: productPrice
  };

  // Retrieve existing cart or initialize an empty array
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  var productExists = cart.some(function (existingProduct) {
    return existingProduct.name === product.name;
  });

  if (productExists) {
    // Update the quantity of the existing product
    cart = cart.map(function (existingProduct) {
      if (existingProduct.name === product.name) {
        existingProduct.quantity += productQuantity;
      }
      return existingProduct;
    });
  } else {
    // Add the new product to the cart array
    cart.push(product);
  }

  // Store the updated cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName}, Added to the cart.`)
  console.log('Product added to cart:', product);
}

// Attach event listeners to "Add to cart" and "Buy now" buttons
$('.add-to-cart-single-product').on('click', addProductToCart);
$('.buy-single-product').on('click', addProductToCart);

$('form.needs-validation').on('submit', function (event) {
  event.preventDefault();
  // Do nothing
  // Clear previous validation states
  $(this).removeClass('was-validated');

  // Validate each field manually
  var isValid = false;

  // Validate first name
  var firstName = $('#firstName');
  if (firstName.val().trim() === '') {
    firstName.addClass('is-invalid');
    firstName.next('.invalid-feedback').html('Valid first name is required.');
    isValid = false;
  } else {
    firstName.removeClass('is-invalid');
    firstName.addClass('is-valid');
  }

  // Validate last name
  var lastName = $('#lastName');
  if (lastName.val().trim() === '') {
    lastName.addClass('is-invalid');
    lastName.next('.invalid-feedback').html('Valid last name is required.');
    isValid = false;
  } else {
    lastName.removeClass('is-invalid');
    lastName.addClass('is-valid');
  }

  // Validate username
  var username = $('#username');
  if (username.val().trim() === '') {
    username.addClass('is-invalid');
    username.next('.invalid-feedback').html('Your username is required.');
    isValid = false;
  } else {
    username.removeClass('is-invalid');
    username.addClass('is-valid');
  }

  // Validate email (optional)
  var email = $('#email');
  if (email.val().trim() !== '' && !isValidEmail(email.val().trim())) {
    email.addClass('is-invalid');
    email.next('.invalid-feedback').html('Please enter a valid email address.');
    isValid = false;
  } else {
    email.removeClass('is-invalid');
    email.addClass('is-valid');
  }

  // Validate address
  var address = $('#address');
  if (address.val().trim() === '') {
    address.addClass('is-invalid');
    address.next('.invalid-feedback').html('Please enter your shipping address.');
    isValid = false;
  } else {
    address.removeClass('is-invalid');
    address.addClass('is-valid');
  }

  // Validate country
  var country = $('#country');
  if (country.val() === '') {
    country.addClass('is-invalid');
    country.next('.invalid-feedback').html('Please select a valid country.');
    isValid = false;
  } else {
    country.removeClass('is-invalid');
    country.addClass('is-valid');
  }

  // Validate state
  var state = $('#state');
  if (state.val() === '') {
    state.addClass('is-invalid');
    state.next('.invalid-feedback').html('Please provide a valid state.');
    isValid = false;
  } else {
    state.removeClass('is-invalid');
    state.addClass('is-valid');
  }

  // Validate zip code
  var zip = $('#zip');
  if (zip.val().trim() === '') {
    zip.addClass('is-invalid');
    zip.next('.invalid-feedback').html('Zip code required.');
    isValid = false;
  } else {
    zip.removeClass('is-invalid');
    zip.addClass('is-valid');
  }

  // Validate credit card name
  var ccName = $('#cc-name');
  if (ccName.val().trim() === '') {
    ccName.addClass('is-invalid');
    ccName.next('.invalid-feedback').html('Name on card is required.');
    isValid = false;
  } else {
    ccName.removeClass('is-invalid');
    ccName.addClass('is-valid');
  }

  // Validate credit card number
  var ccNumber = $('#cc-number');
  if (ccNumber.val().trim() === '') {
    ccNumber.addClass('is-invalid');
    ccNumber.next('.invalid-feedback').html('Credit card number is required.');
    isValid = false;
  } else {
    ccNumber.removeClass('is-invalid');
    ccNumber.addClass('is-valid');
  }

  // Validate expiration date
  var ccExpiration = $('#cc-expiration');
  if (ccExpiration.val().trim() === '') {
    ccExpiration.addClass('is-invalid');
    ccExpiration.next('.invalid-feedback').html('Expiration date required.');
    isValid = false;
  } else {
    ccExpiration.removeClass('is-invalid');
    ccExpiration.addClass('is-valid');
  }

  // Validate CVV
  var ccCvv = $('#cc-cvv');
  if (ccCvv.val().trim() === '') {
    ccCvv.addClass('is-invalid');
    ccCvv.next('.invalid-feedback').html('Security code required.');
    isValid = false;
  } else {
    ccCvv.removeClass('is-invalid');
    ccCvv.addClass('is-valid');
  }

    if (isValid) {
    alert('Form submitted successfully!');
    this.submit();
  }
});

// Function to validate email format
function isValidEmail(email) {
  // Basic email validation using regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// contact form validation 
$("#contact-from").on("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting the default way
  // Clear previous error messages

  $(".form-input input, .form-input textarea").removeClass("is-invalid");
  $(".invalid-feedback").remove();

  // Validate fields
  let isValid = true;

  // Check each input field
  $(".form-input input, .form-input textarea").each(function () {
    if ($(this).val().trim() === "") {
      $(this).addClass("is-invalid");
      $(this).after('<div class="invalid-feedback">This field is required.</div>');
      isValid = false;
    }
  });

  if (isValid) {
    // You can add your form submission code here
    alert("Form submitted successfully!");
  }
});
