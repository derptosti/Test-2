const products = {
    spruce: [
        { name: 'Spruce Trapdoor', price: 15, min: 0, increment: 16, id: 'spruce-trapdoor' },
        { name: 'Spruce Fence', price: 8, min: 0, increment: 16, id: 'spruce-fence' },
        { name: 'Spruce Door', price: 65, min: 0, increment: 16, id: 'spruce-door' },
        { name: 'Spruce Planks', price: 5, min: 0, increment: 16, id: 'spruce-planks' },
        { name: 'Spruce Stairs', price: 4, min: 0, increment: 16, id: 'spruce-stairs' },
        { name: 'Spruce Slab', price: 3, min: 0, increment: 16, id: 'spruce-slab' },
        { name: 'Spruce Fence Gate', price: 10, min: 0, increment: 16, id: 'spruce-fence-gate' }
    ],
    bricks: [
        { name: 'Bricks', price: 8, min: 0, increment: 16, id: 'alltime-bricks' },
        { name: 'Brick Stairs', price: 6, min: 0, increment: 16, id: 'alltime-brick-stairs' },
        { name: 'Brick Slab', price: 4, min: 0, increment: 16, id: 'alltime-brick-slab' },
        { name: 'Brick Wall', price: 5, min: 0, increment: 16, id: 'alltime-brick-wall' }
    ],
    sandstone: [
        { name: 'Sandstone', price: 6.00, min: 0, increment: 16, id: 'alltime-sandstone' },
        { name: 'Sandstone Stairs', price: 5.00, min: 0, increment: 16, id: 'alltime-sandstone-stairs' },
        { name: 'Sandstone Slab', price: 3.00, min: 0, increment: 16, id: 'alltime-sandstone-slab' },
        { name: 'Sandstone Wall', price: 4.00, min: 0, increment: 16, id: 'alltime-sandstone-wall' },
        { name: 'Smooth Sandstone', price: 6.00, min: 0, increment: 16, id: 'alltime-smooth-sandstone' },
        { name: 'Smooth Sandstone Stairs', price: 5.00, min: 0, increment: 16, id: 'alltime-smooth-sandstone-stairs' },
        { name: 'Smooth Sandstone Slab', price: 3.00, min: 0, increment: 16, id: 'alltime-smooth-sandstone-slab' }
    ],
    andesite: [
        { name: 'Polished Andesite', price: 5.00, min: 0, increment: 16, id: 'alltime-polished-andesite' },
        { name: 'Polished Andesite Stairs', price: 4.00, min: 0, increment: 16, id: 'alltime-polished-andesite-stairs' },
        { name: 'Polished Andesite Slab', price: 3.00, min: 0, increment: 16, id: 'alltime-polished-andesite-slab' },
        { name: 'Andesite', price: 3.00, min: 0, increment: 16, id: 'alltime-andesite' },
        { name: 'Polished Granite', price: 5.00, min: 0, increment: 16, id: 'alltime-polished-granite' },
        { name: 'Polished Granite Stairs', price: 4.00, min: 0, increment: 16, id: 'alltime-polished-granite-stairs' },
        { name: 'Polished Granite Slab', price: 3.00, min: 0, increment: 16, id: 'alltime-polished-granite-slab' },
        { name: 'Granite', price: 3.00, min: 0, increment: 16, id: 'alltime-granite' }
    ]
};

const savedInputs = {};

function filterProducts() {
    const category = document.getElementById('category').value;
    const productsContainer = document.getElementById('products');

    // Save current inputs
    const currentInputs = document.querySelectorAll('#products input');
    currentInputs.forEach(input => {
        savedInputs[input.id] = input.value;
    });

    // Clear previous products
    productsContainer.innerHTML = '';

    // Display products for the selected category
    if (category && products[category]) {
        products[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Product name
            const productName = document.createElement('p');
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            // Quantity input field
            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';
            const quantityInput = document.createElement('input');
            quantityInput.setAttribute('type', 'number');
            quantityInput.setAttribute('min', product.min);
            quantityInput.setAttribute('id', product.id);
            quantityInput.setAttribute('name', product.id);
            quantityInput.setAttribute('required', true);
            quantityInput.setAttribute('value', savedInputs[product.id] || product.min); // Set value to saved or minimum

            // Ensure quantity is in increments of 'inkoop per'
            quantityInput.addEventListener('input', () => {
                const val = parseInt(quantityInput.value);
                const remainder = val % product.increment;
                if (val !== 0 && remainder !== 0) {
                    quantityInput.setCustomValidity(`Please enter a quantity in increments of ${product.increment}.`);
                } else {
                    quantityInput.setCustomValidity('');
                }
            });

            quantityLabel.appendChild(quantityInput);
            productDiv.appendChild(quantityLabel);

            // Price
            const price = document.createElement('p');
            price.textContent = `Price: €${product.price.toFixed(2)}`;
            productDiv.appendChild(price);

            productsContainer.appendChild(productDiv);
        });
    }
}

function validateAllInputs() {
    let isValid = true;

    Object.keys(products).forEach(category => {
        products[category].forEach(product => {
            const input = document.getElementById(product.id);
            if (input) {
                const val = parseInt(input.value);
                const remainder = val % product.increment;
                if (val !== 0 && remainder !== 0) {
                    input.setCustomValidity(`Please enter a quantity in increments of ${product.increment}.`);
                    isValid = false;
                } else {
                    input.setCustomValidity('');
                }
                input.reportValidity();
            }
        });
    });

    return isValid;
}

function submitForm(event) {
    event.preventDefault();

    if (validateAllInputs()) {
        // Gather form data
        const formData = new FormData(document.getElementById('orderForm'));
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Display the data (for demonstration purposes)
        console.log('Form Data:', data);
        alert('Form submitted successfully! Check the console for data.');

        // Redirect to success page
        window.location.href = 'success.html';
    } else {
        alert('Please correct the errors in the form.');
    }
}

// Initial products filter
filterProducts();
