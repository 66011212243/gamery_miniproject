export interface CartGetResponse {
    cart_id:      number;
    user_id:      number;
    cart_item_id: number;
    game_id:      number;
    quantity:     number;
    name:         string;
    price:        number;
    type_id:      number;
    image:        string;
    description:  string;
    release_date: Date;
    total_sales:  number;
    status:       number;
}