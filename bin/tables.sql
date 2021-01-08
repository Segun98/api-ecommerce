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
    completed_qty int default 0,
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
        -- purchase_frequency int default 0,
        creator_id uuid references users
        (id) ON
        DELETE CASCADE ON
        UPDATE CASCADE NOT NULL,
        created_at TIMESTAMP
        with time zone DEFAULT CURRENT_TIMESTAMP
)


        -- alter table orders drop column delivery_fee, order_id, completed, accepted, canceled, delivery_date, paid, canceled_by, cancel_reason, refund
        -- alter table orders add column order_id text not null

        CREATE TABLE orders
        (
            -- id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
            order_id text not null,
            name VARCHAR(255) NOT NULL,
            price int NOT NULL,
            quantity int,
            subtotal int,
            request Text,
            customer_email VARCHAR
            (255),
            vendor_email VARCHAR
            (255),
            customer_phone VARCHAR
            (255),
            vendor_phone VARCHAR
            (255),
            customer_address VARCHAR
            (255),
            business_address VARCHAR
            (255),
            product_id uuid,
            customer_id uuid,
            prod_creator_id uuid,
            created_at TIMESTAMP
            with time zone DEFAULT CURRENT_TIMESTAMP
)

            --created after payment
            CREATE TABLE order_status
            (
                id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                transaction_id text not null,
                --From Paystack
                order_id text NOT NULL,
                delivery_fee int,
                total_price int not null,
                delivered boolean default 'false',
                in_transit boolean default 'false',
                -- (Set to true when delivery person gathers it all) -- in transit
                canceled boolean default 'false',
                canceled_reason text default null
                refund boolean default 'false',
    paid boolean default 'true',
    delivery_date TIMESTAMP
                with time zone default null
    created_at TIMESTAMP
                with time zone DEFAULT CURRENT_TIMESTAMP

)


                -- alter table cart drop column customer_id
                -- alter table cart add column customer_id uuid not null

                CREATE TABLE cart
                (
                    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                    quantity int default 1 NOT NULL,
                    product_id uuid NOT NULL,
                    prod_creator_id uuid
                        references users
            (id) ON
            DELETE CASCADE ON
            UPDATE CASCADE NOT NULL,
                    customer_id uuid not null,
                    created_at TIMESTAMP
                    with time zone DEFAULT CURRENT_TIMESTAMP
)

