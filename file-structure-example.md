Example used from [*"How to structure files in large React projects"*](https://www.youtube.com/watch?v=1uQ9j8ynQlM&t=46s)

```
index.ts
src/
|
├── components/
|   ├── Button/
|   |   ├── Button.tsx
|   |   ├── Button.tsx
|   |   └── Button.tsx
|   ├── Dropdown/
|   ├── Toaster/
|   ├── Header/
|   └── Footer/
|
├── layouts/
|   └── StoreLayout/
|      ├── components/
|      |    ├── SearchDropdown/
|      └── StoreLayout.tsx
|   
└── pages/
    ├── StoreProductPage/
    |   ├── components/
    |   |    ├── Carousel/
    |   |    └── ProductCard/
    |   └── StoreProductPage.tsx
    |
    └── StoreCheckoutPage/
        ├── components/
        |    ├── Carousel/
        |    └── ProductCard/
        └── StoreCheckoutPage.tsx
```
