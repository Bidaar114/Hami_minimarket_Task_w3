

export const PRODUCTS =  [

    {id: 1, name: "Granate",  price: 5, category: "Fruit", img: "../assets/images/beytraf.png" },
    {id: 2, name: "Banana",        price: 3, category: "Fruit", img: "../assets/images/banana.png" },
    {id: 3, name: "Orange",        price: 6, category: "Fruit", img: "../assets/images/orange.png" },
    {id : 4,name: "Grapes",        price: 9, category: "Fruit", img: "../assets/images/grapes.png" },
    {id: 5, name: "Apple",         price: 8, category: "Fruit", img: "./assets/images/apple.png" },
    {id: 6, name: "pineapple",     price: 7, category: "Fruit", img: "../assets/images/pineapple.png" },
    

    {id: 7, name: "Carrot",   price:  4, category: "Vegetable",  img: "../assets/images/carrot.png" },
    {id: 8, name: "Tomato",   price:  2, category: "Vegetable",  img: "../assets/images/tomato.png" },
    {id: 9, name: "Potato",   price:  3, category: "Vegetable",  img: "../assets/images/patato.png" },
    {id: 10, name: "Cabbage", price: 7, category: "Vegetable",  img: "../assets/images/capage.png" },
    {id: 11, name: "Onion",   price: 6, category: "Vegetable",  img: "../assets/images/onion.png" },
    {id: 12, name: "Bell peppers",  price: 5, category: "Vegetable", img: "./assets/images/barba.png" },
];


export function renderProducts(PRODUCTS){
const container = document.querySelector(".products");
if(!container) return;
container.innerHTML = '';


   PRODUCTS.forEach(product => {
        container.innerHTML += `
       <div class="product_grid">
        <div class="product_img">
            <img src="${product.img}">
        </div>
        <div class="product_text">
            <h4>${product.name}</h4>
            <p>${product.category}</p>
            <p class="price">$${product.price}</p>
             <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
          
             `;
    });
    
}



// Filter logic

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = Number(priceFilter.value);

    const filtered = PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchText) &&
        (selectedCategory === "All" || product.category === selectedCategory) && 
        product.price < selectedPrice
    );
     renderProducts(filtered);
   
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);





// Init display

 renderProducts(PRODUCTS);












export function getProductById(id){
return PRODUCTS.find(p => p.id === id);

}

