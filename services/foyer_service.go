package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/models"
	)

type FoyerService interface {
	BuyDrink(account models.Account, drinkID string) (models.Account, error)
	TopUpAccount(Account models.Account, amount float64) (models.Account, error)
}
