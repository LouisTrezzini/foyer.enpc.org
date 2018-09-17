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

func (service *foyerServiceImpl) BuyDrink(account models.Account, drinkID string) (models.Account, error) {
	account.BuyDrink(models.Drink{
		ID:      drinkID,
		Price:   2,
		Volume:  1,
		Alcohol: 5,
	}) // FIXME

	account, _ = service.accountRepository.Update(account)

	return account, nil
}

func (service *foyerServiceImpl) TopUpAccount(account models.Account, amount float64) (models.Account, error) {
	account.TopUpAccount(amount)

	service.accountRepository.Update(account)

	return account, nil
}
