# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
Get all products: GET - "/products"
Get product by id: GET - "/products/:id"
Get product by category: GET - "/products/category/:category"
Create new product: POST - "/products"
Delete product by id: DELETE - "/products/:id"

#### Users
Get all users: GET - "/users"
Get user by id: GET - "/users/:id"
Log in by user: POST - "/users/logIn"
Create new user: POST - "/users"
Delete user by id: DELETE - "/users/:id"

#### Orders
Create new order: POST - "/orders"
Get all order by user id: GET - "/orders/:userId"
Get all completed order by user id: GET - "/orders/complete/:userId"


## Data Shapes
#### Product
TABLE Products (
    id SERIAL NOT NULL,
    name varchar(255) NOT NULL,
    price integer NOT NULL,
    category varchar(255) NOT NULL,
    PRIMARY KEY (id)
)

#### User

TABLE Users ( 
    id SERIAL NOT NULL, 
    firstName varchar(255) NOT NULL, 
    lastName varchar(255) NOT NULL,
    userName varchar(255) NOT NULL,  
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

#### Orders

TABLE Orders ( 
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    orderstatus varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

TABLE OrderItems (
    id SERIAL NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);
