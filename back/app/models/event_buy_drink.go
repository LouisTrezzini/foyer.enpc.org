package models

type BuyDrinkEvent struct {
	Drink Drink `json:"drink"`
}

func (event *BuyDrinkEvent) Name() string {
	return "buy_drink"
}

func (event *BuyDrinkEvent) Apply(account *Account) error {
	account.Balance -= event.Drink.Price

	account.Stats.DrinksCount += 1
	account.Stats.TotalSpent += event.Drink.Price
	account.Stats.TotalVolume += event.Drink.Volume

	return nil
}

type BuyDrinkCommand struct {
	DrinkID string `json:"drink_id"`
}
