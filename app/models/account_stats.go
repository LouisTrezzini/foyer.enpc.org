package models

type AccountStats struct {
	DrinksCount int     `json:"drinks_count"`
	TotalVolume float64 `json:"total_volume"`
	TotalSpent  float64 `json:"total_spent"`
}
