package models

type BuyDrink struct {
	Drink Drink `json:"drink"`
}

func (event *BuyDrink) Name() string {
	return "buy_drink"
}

func (event *BuyDrink) Apply(account *Account) error {
	account.Balance -= event.Drink.Price

	account.Stats.DrinksCount += 1
	account.Stats.TotalSpent += event.Drink.Price
	account.Stats.TotalVolume += event.Drink.Volume

	return nil
}
