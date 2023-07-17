// Creacion de los cards--------------------->>>
// Manipulacion del DOM---------------------->>>
// let burguerContainer = []

// burguers.forEach((item)=> { 
// 	let content = document.createElement("div");
// 	content.className = "item";
// 	content.innerHTML = `
// 		<figure>
// 			<img src="${item.img}">
// 		</figure>
// 		<div class="info-product">
// 			<h2>${item.nombre}</h2>
// 			<h3>Precio</h3>
// 			<p class="price">$${item.precio}</p>
// 			<button class="btn-add-cart" id="${item.id}">Agregar</button>
// 		</div>
// 	`;
// 	// Aclado a un elemento del DOM
// 	ContentCards.append(content);
// })

// ------------------------------------------------------->>>
// Busqueda de cards mediante map------------------------->>>
// ------------------------------------------------------->>>

const categories = [...new Set(burguers.map((item) => { return item }))]

document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = categories.filter((item) => {
        return (
            item.nombre.toLowerCase().includes(searchData)
        )
    })
    displayItem(filteredData)
});
// ------------------------------------------------------->>>
// Creacion de los cards mediante map--------------------->>>
// ------------------------------------------------------->>>
const displayItem = (items) => {
	document.getElementById('containerBurguer').innerHTML = items.map((item) => {
		let { id, nombre, precio, img, altImg  } = item;
		return (
			` 
				<div class='item'>
			  		<figure class="card">
			  			<img src="${img}" alt="${altImg}">
			  		</figure>
			 		<div class="info-product">
			  			<h2>${nombre}</h2>
			  			<h3>Precio</h3>
			  			<p class="price">$${precio}</p>
			  			<button class="btn-add-cart" id="${id}">Agregar</button>
					</div>
				</div>
			`
		)
	}).join('')
};
displayItem(categories);


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Creacion de interaccion de carrito de compras--------------------->>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos que estan en los cards 
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

