package services

import (
			"github.com/LouisTrezzini/foyer.enpc.org/models"
)

type foyerServiceImpl struct {
	accountRepository AccountRepository
}

func NewFoyerServiceImpl(accountRepository AccountRepository) FoyerService {
	return &foyerServiceImpl{
		accountRepository: accountRepository,
	}
}

func (service *foyerServiceImpl) BuyDrink(userID string, drinkID string) error {
	account, _ := service.accountRepository.GetOne(userID)

	account.BuyDrink(models.Drink{
		ID:      drinkID,
		Price:   2,
		Volume:  1,
		Alcohol: 5,
	}) // FIXME

	service.accountRepository.Update(account)

	return nil
}

func (service *foyerServiceImpl) TopUpAccount(userID string, amount float64) error {
	account, _ := service.accountRepository.GetOne(userID)

	account.TopUpAccount(amount)

	service.accountRepository.Update(account)

	return nil
}
