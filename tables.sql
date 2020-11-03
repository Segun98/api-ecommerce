-- Where i write out my queries to test 

CREATE TYPE user_role AS enum
('admin','super_admin', 'customer', 'vendor');

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
    online boolean default 'true',
    role user_role NOT NULL,
    phone VARCHAR(255) default null,
    business_name VARCHAR(255) UNIQUE default null,
    business_name_slug VARCHAR(255) UNIQUE default null,
    business_address Text default null,
    business_image VARCHAR(255) default null,
    business_bio Text default null,
    customer_address Text default null,
    featured boolean default 'false',
    created_at TIMESTAMP
    with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,

)

    CREATE TABLE products
    (
        id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_slug VARCHAR(255) NOT NULL,
        description Text,
        price int NOT NULL,
        category VARCHAR(255),
        party_category VARCHAR(255),
        image text
        ARRAY[4],
        featured boolean DEFAULT 'false',
        in_stock boolean DEFAULT 'true',
        available_qty int NOT NULL DEFAULT 1,
        creator_id uuid references users
        (id) ON
        DELETE CASCADE ON
        UPDATE CASCADE NOT NULL,
        created_at TIMESTAMP
        with time zone DEFAULT CURRENT_TIMESTAMP
)

        CREATE TABLE orders
        (
            id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
            order_id serial unique not null,
            name VARCHAR(255) NOT NULL,
            price int NOT NULL,
            quantity int,
            delivery_fee int,
            subtotal int,
            request Text,
            completed boolean default 'false',
            accepted boolean default 'false',
            canceled boolean default 'false',
            customer_email VARCHAR(255),
            vendor_email VARCHAR(255),
            customer_phone VARCHAR(255),
            vendor_phone VARCHAR(255),
            customer_address VARCHAR(255),
            business_address VARCHAR(255),
            product_id uuid,
            customer_id uuid,
            prod_creator_id uuid,
            created_at TIMESTAMP
            with time zone DEFAULT CURRENT_TIMESTAMP
)


            CREATE TABLE cart
            (
                id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                -- name VARCHAR(255) NOT NULL,
                quantity int default 1 NOT NULL,
                --     subtotal int generated always as
                -- (price * quantity + delivery_fee) stored,
                --     description VARCHAR
                -- (255),
                product_id uuid NOT NULL,
                prod_creator_id uuid
                    references users
            (id) ON
            DELETE CASCADE ON
            UPDATE CASCADE NOT NULL,
                customer_id uuid
                    references users
            (id) ON
            DELETE CASCADE ON
            UPDATE CASCADE NOT NULL,
                created_at TIMESTAMP
                with time zone DEFAULT CURRENT_TIMESTAMP
)

