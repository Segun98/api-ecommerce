-- Where i write out my queries to test 

CREATE TYPE user_role AS enum
('admin', 'customer', 'vendor');

CREATE TYPE boolean AS enum
('true', 'false');

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 () primary key,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pending boolean NOT NULL,
    phone VARCHAR(255),
    role user_role NOT NULL,
    business_name VARCHAR(255) UNIQUE,
    business_name_slug VARCHAR(255) UNIQUE,
    business_address VARCHAR(255),
    business_area VARCHAR(255) default 'everywhere',
    business_image VARCHAR(255),
    business_bio VARCHAR(255),
    customer_address VARCHAR(255),
    created_at TIMESTAMP
    with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,

)

    insert into users
        (name,email,password,phone,role,pending)
    values
        ('segun', 'segun@mail.com', '34gy3', '3629862', 'customer', 'false')


    CREATE TABLE products
    (
        id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_slug VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        price int NOT NULL,
        category VARCHAR(255),
        image VARCHAR(255),
        in_stock boolean DEFAULT 'true',
        creator_id uuid references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
        created_at TIMESTAMP
        with time zone DEFAULT CURRENT_TIMESTAMP
)

        -- Mutations - createOrder, cancelOrder, completeOrder
        -- Queries - getOrders, getAllOrders(admin)
        CREATE TABLE orders
        (
            id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price int NOT NULL,
            quantity int NOT NULL,
            description VARCHAR(255),
            completed boolean default false,
            canceled boolean default false,
            product_id uuid references products(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            customer_id uuid references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            prod_creator_id uuid references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            created_at TIMESTAMP
            with time zone DEFAULT CURRENT_TIMESTAMP
)


            -- Mutations - addToCart, deleteFromCart
            -- Queries - getCartItems(id-from token)
            CREATE TABLE cart
            (
                id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price int NOT NULL,
                quantity int default 1 NOT NULL,
                description VARCHAR(255),
                product_id uuid references products(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                prod_creator_id uuid references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                --it's on products
                customer_id uuid references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
                --from token!!
                created_at TIMESTAMP
                with time zone DEFAULT CURRENT_TIMESTAMP
)


