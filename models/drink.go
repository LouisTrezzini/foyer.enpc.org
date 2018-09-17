package models

type Drink struct {
	ID       string  `json:"id"`
	Price    float64 `json:"price"`
	ImageUrl string  `json:"image_url"`
	Alcohol  float64 `json:"alcohol"`
	Volume   float64 `json:"volume"`
}

