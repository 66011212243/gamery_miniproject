export interface GameGetRes {
    game_id:      number;
    name:         string;
    price:        number;
    type_id:      number;
    image:        string;
    description:  string;
    release_date: Date;
    total_sales:  number;
    type_name:    string;
}