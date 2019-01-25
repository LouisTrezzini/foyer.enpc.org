package models

type Drink struct {
	BaseModel `bson:",inline"`
	Slug      string  `json:"slug"`
	Price     float64 `json:"price"`
	ImageUrl  string  `json:"image_url"`
	Alcohol   float64 `json:"alcohol"`
	Volume    float64 `json:"volume"`
}

func NewDrink(drinkID string) Drink {
	return Drink{
		Slug: drinkID,
	}
}
