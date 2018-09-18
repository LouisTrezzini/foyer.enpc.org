package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/models"
)

type DrinkRepository interface {
	GetOne(drinkID string) (models.Drink, error)
	GetAll() []models.Drink

	Create(drink models.Drink) (models.Drink, error)
	Update(drink models.Drink) (models.Drink, error)
	Delete(drinkID string) error
}