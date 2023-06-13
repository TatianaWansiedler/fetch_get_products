// ссылка на GH Pages https://tatianawansiedler.github.io/fetch_get_products/

function fetchProducts(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const products = data.products.map(({ title, price, images, rating }) => ({
                title, price,
                image: images[0],
                rating: Math.round(+rating)
            }))
            console.log(products);
            render(products)
        })
        .catch(err => console.log(err))
}

let url = "https://dummyjson.com/products"
fetchProducts(url)

const root = document.querySelector('#root')
const div_container = document.createElement('div')
div_container.classList = 'products_container'

function render(products) {
    products.forEach(({ title, price, image, rating }) => {
        let div_product = document.createElement('div')
        let img_product = document.createElement('img')
        let p_title = document.createElement('p')
        let p_price = document.createElement('p')
        let p_rating = getRating(rating)

        img_product.src = image
        p_title.innerText = `Title: ${title}`
        p_price.innerText = `Price: ${price} $`
        div_product.className = 'product_item'
        img_product.className = 'product_image'
        p_rating.classList = 'product_rating'
        div_product.append(img_product, p_title, p_price, p_rating)
        div_container.append(div_product)
    })
    root.append(div_container)
}

function getRating(n) {
    let rating = document.createElement('p')
    for (let i = 0; i < 5; i++) {
        let star = document.createElement('span')
        star.className = i < n ? "fa fa-star active" : "fa fa-star"
        rating.append(star)
    }
    return rating
}

