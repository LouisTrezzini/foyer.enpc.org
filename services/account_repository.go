package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/models"
)

type AccountRepository interface {
	GetOne(userID string) (models.Account, error)
	GetAll() []models.Account

	Update(account models.Account) (models.Account, error)
}