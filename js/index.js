// Creacion de los cards--------------------->>>
// Manipulacion del DOM---------------------->>>

let burguers = []
let categories = []
let sortValue = 1

// Funcion para renderizar las cards
const displayItem = (items) => {
	document.getElementById('containerBurguer').innerHTML = items.map((item) => {
		let { id, nombre, precio, img, altImg } = item;
		return (
			` 
				<div class='item'>
			  		<figure class="card">
			  			<img src="${img}" alt="${altImg}">
			  		</figure>
			 		<div class="info-product">
			  			<h2>${nombre}</h2>
			  			<h3>Precio</h3>
			  			<p>$<span class="price">${precio.toFixed(2)}</span></p>
			  			<button class="btn-add-cart" id="${id}">Agregar</button>
					</div>
				</div>
			`
		)
		
	}).join('')
	
	
};

// Traemos el JSON mediante funcion asincrona
const loadItems = async () => {
	const response = await fetch('../js/products.json')
	const data = await response.json();
	burguers = [...data]
	categories = [...new Set(burguers.map((item) => { return item }))]
	displayItem(categories)
}

loadItems()

// ------------------------------------------------------->>>
// Busqueda de segun caracteres--------------------------->>>
// ------------------------------------------------------->>>
// Seleccionamos el elemento searchBar del HTML, y adicionameos el evento keyup 
// ('keyup', (e) => { ... }): Esto agrega un evento de escucha al elemento 
// seleccionado. El evento que se escucha aquí es 'keyup', lo que significa 
// que se activará cada vez que el usuario suelte una tecla después de presionarla. 
// Cuando este evento se dispare, se ejecutará la función proporcionada como segundo argumento.

document.getElementById('searchBar').addEventListener('keyup', (e) => {
	// convertimos todos los caracteres en minuscula para que nuestro searchbar no sea key-sensitive
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

// displayItem(categories);

// Boton ordenar de menor a mayor------------------------->>>

let btnMenorMayor = document.getElementById("btnMenorMayor")

btnMenorMayor.addEventListener('click', () => {
	const orderedArray = [...burguers].sort(function(productA, productB) {
		if (productA.precio > productB.precio) {
			return 1;
		} 
		else {
			return -1;
		}
	})
	displayItem(orderedArray);
})

// Boton ordenar de mayor a menor------------------------->>>
let btnMayorMenor = document.getElementById("btnMayorMenor")

btnMayorMenor.addEventListener('click', () => {
	const orderedArray = [...burguers].sort(function(productA, productB) {
		if (productA.precio < productB.precio) {
			return 1;
		} 
		else {
			return -1;
		}
	})
	displayItem(orderedArray);
})

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

// ############################################################
// ############################################################


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
const productAdd = document.querySelector('.product-add');

productsList.addEventListener('click', e => {

	if (e.target.classList.contains('btn-add-cart')) {		
		/*############################################################*/
		/*##                      Sweet Alert                       ##*/
		/*############################################################*/
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: 'Su producto ha sido agregado correctamente',
			showConfirmButton: false,
			timer: 1500
		})
		/*############################################################*/
		/*##                     Agregar Productos                  ##*/
		/*############################################################*/
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};
			
		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);
		/*############################################################*/
		/*##              Agregar Productos existentes              ##*/
		/*############################################################*/
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









/* ========================= */

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

	valorTotal.innerText = `$${total.toFixed(2)}`;
	countProducts.innerText = totalOfProducts;
};

let precios = document.querySelectorAll(".price")
console.log(precios)

// ========================================

