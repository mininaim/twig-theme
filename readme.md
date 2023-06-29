# Zid Catalog Default Theme
## Version 1.0.0

## Table of Contents
- [Introduction](#introduction)
- [Files Structure](#files-structure)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Colors and Theming](#colors-and-theming)
- [Todo](#todo)
- [License](#license)
- [Credits](#credits)
- [Support](#support)
- [Show Your Support](#show-your-support)
- [Note](#note)

## Introduction
Zid Catalog's new default theme is a sleek and modern design built with the latest version of Bootstrap, version 5.3.x. It is fully responsive and optimized for all devices.

## Files Structure

### Files in Main directory
- `layout.twig` layout of the page, contains the header, footer and the main content
- `header.twig` header of the page, contains the navbar and the offcanvas elements
- `footer.twig` footer of the page, contains the footer widgets and the footer copyright

### Files in /templates/ folder
- `home.twig` template for the home page
- `categories.twig` template for the page that lists categories
- `category.twig` template for the page that lists products in a specific category
- `blogs.twig` template for the page that lists blog posts
- `blog.twig` template for the page showing a single blog post
- `account-orders.twig` template for the page showing the user's orders
- `account-profile.twig` template for the page showing the user's profile
- `account-addresses.twig` template for the page showing the user's addresses
- `cart.twig` template for the page showing the items in the user's shopping cart
- `product.twig` template for product single page
- `products.twig` template for the page that lists all products
- `shipping-and-payments.twig` template for the page showing information about shipping and payment options
- `faqs.twig` template for the page showing a list of frequently asked questions
- `page.twig` template for a general-purpose page
- `404.twig` template for the 404 error page
- `search.twig` template for the search page **not used**

### Files in /modules/ folder
- `slider.twig` module that displays a slider on the home page
- `store-description.twig` module that displays a description of the store on the home page
- `image-with-text.twig` module that displays an image with text on the home page
- `home-categories.twig` module that displays a list of categories on the home page
- `products.twig` module that lists products on the home page
- `partners.twig` module that lists the store's partners or sponsors on the home page
- `testimonials.twig` module that displays customer testimonials on the home page

### Files in /common/ folder
- `alert.twig` template that displays an alert message
- `progressbar.twig` template displays a progress bar
- `toast.twig` template that displays a toast with a message
- `cookies.twig` template that displays the cookies bar
- `toolbar.twig` template for a toolbar used for experiences/labs
- `navbar.twig` template for the navbar
- `navbar-search.twig` template for search form inside the navbar
- `navigation.twig` template for the main navigation menu
- `offcanvas-mobile-sidemenu.twig` template for the menu/drawer for mobile and tablet version
- `offcanvas-internationalization.twig` template that allows users to select their country and language
- `offcanvas-products-prices.twig` template that allows users to filter products using price range or inputs
- `offcanvas-cart.twig` template for the offcanvas element showing the items in the user's shopping cart
- `products-filters.twig` template that allows users to filter products with some options
- `product-item.twig` template for the single card, displaying all information needed in the product item
- `product-review-list.twig` template showing a list of reviews for the product
- `product-review-modal.twig` template that allows users to add a review for a product
- `product-rating.twig` template that displays the rating component in a list of stars icons
- `breadcrumb.twig` template for the breadcrumb navigation
- `pagination.twig` template that allows users to navigate through pages of products

## Features
- Fully responsive design for all devices, including mobile phones and tablets
- Shortcuts for Quick access to important pages such as the cart, products, categories, etc.
- Customizable color scheme and theme
- Dark mode feature
- Support for both RTL and LTR languages
- Simple and intuitive interface for easy navigation
- Interactive elements to engage users and enhanced user experience
- Tons of improvements and new features
- .. And more!"

## Setup and Installation
To set up the theme on a local server, follow these steps:

1. Download the theme files from this repository.
2. Extract the theme files and place them in `zid/catalog/public/storefrontThemes/{default}`.

## Colors and Theming
- To customize the color scheme of the theme, simply edit the color from the merchant dashboard.
- You can alter the color scheme from the small toolbar located on the homepage.

## Todo
- [x] Fix a bug when deleting a product from the offcanvas cart
- [x] Fix `Too much loops` in shipping and payments file
- [x] We should add English content to see if we need any adjustment 
- [x] To Fix an issue in the sidebar cart, when removing an item from the cart, the next item is not removed
- [ ] Rewrite `function productOptionsChanged()` to match the new product slider structure
- [x] Fix any Fitrina issues that may arise
- [ ] Test `user_custom_css` rendering, (Maybe we should add some customm classes: css-navbar, css-navigation ..)
- [ ] Some assets are missing (e.g: https://media.zid.store/static/default/icons/zid_zidship_Cold.png)
- [x] Resolve Fitrina issues
- [x] Integrate Tabby/Tamara
- [x] Investigate the use of `template_for_cart_payments_widget`
- [ ] Isolate all JS code in the cart and product pages, following industry best practices
- [ ] Rewrite the old JS code in product.twig and cart.twig (90% done)
- [x] Clean up and rewrite the localization files (ar.json and en.json), in order to make them more readable and easier to maintain
- [ ] Implement missing pages, such as search.twig and pages.twig (backend issue)
- [ ] Fix the is_default key in the orders API (API issue)
- [ ] Add breadcrumb to the single product page
- [ ] Its considerd good practice to implement something like: already_in_cart `(response.status === 'product_already_in_cart')`
- [x] Eliminate all console log errors
- [x] Add comments and documentation to the codebase
- [ ] Conduct performance and speed tests
- [x] Improve accessibility
- [x] Improve Lighthouse scores
- [ ] Minify code and optimize for CDN usage

## License
This theme is released under the [MIT License](LICENSE).

## Credits
This theme was developed and designed by: 

### Core Contributors

#### Mbasiddeq
- GitHub: [@Mbasiddeq](https://github.com/mbasiddeq/)
- Email: [Mbasiddeq@zid.sa)

### Additional Contributors
- Please add your name to this list if you have contributed to the project.

### Special Thanks
- In addition, many other people from the team provided valuable help and support in making this project a reality.

Check authors.txt for more information.

## Support
If you had any questions or concerns, please feel free to open an issue pull request or contact us at: [storefront@zid.sa](mailto:torefront@zid.sa)

## Show Your Support
- Give a ✨ if this project helped you!

## Note
We are currently using Bootstrap 5.3.x for this theme, since all themes are using the same framework, (including the merchant dashboard).
You can choose to use a different framework, such as Tailwind CSS, as the files are set up to use classes rather than inline styling or custom CSS, which should prevent any confusion.

This theme is a static HTML/CSS/JS implementation that can be easily (with some custimization, and tweaks) integrated with various ecommerce platforms, such as Shopify, WooCommerce, etc, but its dedicated to Zid ecommerce platform as a default theme.

We hope it helps you create a beautiful theme for your store.
