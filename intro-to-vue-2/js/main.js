var app = new Vue({
    el: '#app',
    data: {
        product: {
            id: 0,
            brand: "Vue Mastery",
            name: "Socks",
            inStock: true,
            variant: 0,
            size: "M",
            variants: [
                {
                    variantId: 2234,
                    variantName: "green",
                    variantColor: "#0f0",
                    variantImage: "./assets/vmSocks-green.jpg"
                },
                {
                    variantId: 2235,
                    variantName: "blue",
                    variantColor: "#00f",
                    variantImage: "./assets/vmSocks-blue.jpg"
                }
            ],
            sizes: ["P", "M", "G"],
            details: [
                "80% cotton",
                "20% polyester",
                "Gender-neutral"
            ],
            image: "./assets/vmSocks-green.jpg"
        },
        cart: {
            items: []
        }
    },
    computed: {
        productTitle() {
            return `${this.product.brand} ${this.product.name}`;
        }
    },
    methods: {

        /**
         * Changes the variant of the product
         * depending on the id of the variant that 
         * is selected by the user
         * 
         * @param {number} variantId - id of the selected variant
         */
        changeProductVariant(variantId) {
            this.product.variant = variantId;
            this.changeProductImageByVariant(this.product.variant);
        },

        /**
         * Changes the image displayed at the page
         * depending on the id of the product variant
         * 
         * @param {number} variantId - id of the selected variant
         */
        changeProductImageByVariant(variantId) {
            this.product.image = this.product.variants.find(variant => {
                return variantId === variant.variantId;
            }).variantImage;
        },

        /**
         * Changes the size of the product
         * depending on the size that 
         * is selected by the user
         * 
         * @param {number} size - id of the selected size
         */
         changeProductSize(size) {
            this.product.size = size;
        },

        /**
         * Adds the product into the user's cart item list
         * 
         * @param {Object} product - selected product
         */
        addProductToCart(product) {
            if (!product.inStock) {
                alert(`The product "${product.name}" can not be added to your cart since it is out of stock.`);
                return;
            }
            this.cart.items.push(product);
        }

    }
});