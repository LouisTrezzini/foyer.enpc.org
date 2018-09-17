package services

type FoyerService interface {
	BuyDrink(userID string, drinkID string) error
	TopUpAccount(userID string, amount float64) error
}
