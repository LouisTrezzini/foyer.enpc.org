package services

import "github.com/LouisTrezzini/foyer.enpc.org/app/models"

type FoyerService interface {
	BuyDrink(userID string, drinkID string) (models.Account, error)
	TopUpAccount(userID string, amount float64) (models.Account, error)
}
