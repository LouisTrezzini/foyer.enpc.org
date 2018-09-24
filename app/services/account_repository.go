package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
)

type AccountRepository interface {
	GetOne(userID string) (models.Account, error)
	GetOrCreate(userID string) (models.Account, error)
	GetAll() ([]models.Account, error)

	Update(account models.Account) (models.Account, error)
}
