Vue.config.devtools = true;

Vue.component('product', {
    template: `
        <div class="product">

            <div class="product__top-container">

                <div class="product__left-container">

                    <div class="product__image-container">
                        <img class="product__image" :src="product.image">
                    </div>

                </div>

                <div class="product__right-container">

                    <div class="product__information">

                        <h1 class="product__name">{{ productTitle }}</h1>
                        
                        <p 
                            v-if="!product.inStock"
                            class="product__stock-status product__stock-status--out" 
                        >Out of stock</p>
                        <p 
                            v-else-if="product.inStock"
                            class="product__stock-status product__stock-status--in"
                        >In stock</p>

                        <div class="product__details">
                            <h2>Details</h2>
                            <ul>
                                <li 
                                    v-for="detail in product.details"
                                    class="product__details-item"
                                >{{ detail }}</li>
                            </ul>
                        </div>

                        <div class="product__shipping">
                            <h2>Shipping</h2>
                            <p class="product__shipping-text">{{ productShipping }}</p>
                        </div>

                        <div class="product__sizes">
                            <h2>Sizes</h2>
                            <div class="product__sizes-list">
                                <div
                                    v-for="size in product.sizes"
                                    class="product__sizes-item"
                                    :class="{'product__sizes-item--selected': product.size === size}"
                                    @click="changeProductSize(size)"
                                >
                                    <p class="product__sizes-item-text">{{ size }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="product__variants">
                            <h2>Variants</h2>
                            <div class="product__variants-list">
                                <div
                                    v-for="variant in product.variants"
                                    @click="changeProductVariant(variant.variantId)"
                                    class="product__variants-item"
                                >
                                    <div
                                        class="product__variants-color"
                                        :style="{backgroundColor: variant.variantColor}"
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="product__actions">

                        <button 
                            class="button button--primary"
                            :class="{'button--disabled': !product.inStock}"
                            @click="addToCart"
                            :disabled="!product.inStock"
                        >Add to cart</button>

                    </div>

                </div>

            </div>

            <div class="product__reviews">
                <product-review
                    @review-submitted="addReview"
                ></product-review>
            </div>

        </div>
    `,
    props: {
        freeShipping: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            product: {
                id: 0,
                brand: "Vue Mastery",
                name: "Socks",
                inStock: true,
                variant: 0,
                size: "M",
                shipping: 2.99,
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
                image: "./assets/vmSocks-green.jpg",
                reviews: []
            },
            
        }
    },
    computed: {
        productTitle() {
            return `${this.product.brand} ${this.product.name}`;
        },
        productShipping() {
            return this.freeShipping
                ? 'Free shipping'
                : `R$ ${this.product.shipping}`;
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

        addToCart() {
            this.$emit('add-to-cart', {...this.product});
        },

        addReview(productReview) {
            this.product.reviews.push(productReview);
        }

    }
});

Vue.component('product-review', {
    template: `
        <form @submit.prevent="submitReview">
            <div class="product__review-input-field">
                <label class="product__review-label" for="name">Name</label>
                <input id="name" type="text" v-model="name">
            </div>

            <div class="product__review-input-field">
                <label class="product__review-label">Rating</label>
                <span class="product__review-radio">
                    <input id="rating-1" type="radio" v-model.number="rating" value="1">
                    <label for="rating-1">1</label>
                </span>
                
                <span class="product__review-radio">
                    <input id="rating-2" type="radio" v-model.number="rating" value="2">
                    <label for="rating-2">2</label>
                </span>

                <span class="product__review-radio">
                    <input id="rating-3" type="radio" v-model.number="rating" value="3">
                    <label for="rating-3">3</label>
                </span>

                <span class="product__review-radio">
                    <input id="rating-4" type="radio" v-model.number="rating" value="4">
                    <label for="rating-4">4</label>
                </span>

                <span class="product__review-radio">
                    <input id="rating-5" type="radio" v-model.number="rating" value="5">
                    <label for="rating-5">5</label>
                </span>
            </div>
            
            <div class="product__review-input-field">
                <label class="product__review-label" for="review">Review</label>
                <textarea id="review" v-model="review"></textarea>
            </div>

            <button class="button button--primary" type="submit">Send Review</button>
        </form>
    `,
    data() {
        return {
            name: "",
            rating: 0,
            review: ""
        }
    },
    methods: {
        submitReview() {
            let productReview = {
                name: this.name,
                rating: this.rating,
                review: this.review
            }

            this.$emit('review-submitted', productReview);
            this.clearReviewFields();
        },

        clearReviewFields() {
            this.name = null;
            this.rating = null;
            this.review = null;
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premiumUser: true,
        cart: {
            items: []
        }
    },
    computed: {
        cartLabel() {
            return `cart ${this.cart.items.length > 0 ? "(" + this.cart.items.length + ")" : ""}`;
        }
    },
    methods: {
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