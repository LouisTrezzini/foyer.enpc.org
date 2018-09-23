package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
)

type DrinkRepository interface {
	GetOne(drinkID string) (models.Drink, error)
	GetAll() ([]models.Drink, error)

	Create(drink models.Drink) (models.Drink, error)
	Update(drink models.Drink) (models.Drink, error)
	Delete(drinkID string) error
}