var app = new Vue({
    el: '#app',
    data: {
        product: {
            id: 0,
            name: "Socks",
            inStock: true,
            variant: 0,
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
         * Adds the product into the user's cart item list
         * 
         * @param {Object} product - selected product
         */
        addProductToCart(product) {
            this.cart.items.push(product);
        }

    }
});