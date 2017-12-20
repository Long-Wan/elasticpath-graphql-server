// const fetch = require('node-fetch');

module.exports = {
  Query: {
    allProducts: (root, args, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Products.All()
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    Product: (root, { id }, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Products.Get(id)
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    allBrands: (root, args, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Brands.All()
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    Brand: (root, { id }, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Brands.Get(id)
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    allCollections: (root, args, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Collections.All()
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    Collection: (root, { id }, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Collections.Get(id)
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    allCategories: (root, args, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Categories.All()
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    Category: (root, { id }, { Moltin }) => {
      return new Promise((resolve, reject) => {
        Moltin.Categories.Get(id)
          .then(({ data }) => resolve(data))
          .catch(err => reject(err));
      });
    },

    Cart: (root, _, { Moltin }) => {
      const getCart = new Promise((resolve, reject) =>
        resolve(Moltin.Cart.Get())
      );

      const getCartItems = new Promise((resolve, reject) =>
        resolve(Moltin.Cart.Items())
      );

      return Promise.all([getCart, getCartItems]).then(([cart, items]) => {
        return Object.assign(
          {},
          {
            id: cart.data.id,
            items: items.data
          }
        );
      });
    }
  },
  Mutation: {
    authenticate: (root, args, { apiUrl }) => {
      return new Promise((resolve, reject) => {
        const body = {
          client_id: args.clientId,
          client_secret: args.clientSecret,
          grant_type: args.grantType
        };

        fetch(`${apiUrl}/oauth/access_token`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(body)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
            .join('&')
        })
          .then(data => data.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    }
  }
};