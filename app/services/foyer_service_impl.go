package services

import "github.com/LouisTrezzini/foyer.enpc.org/app/models"

type FoyerServiceImpl struct {
	accountRepository AccountRepository
	drinkRepository   DrinkRepository
}

func NewFoyerServiceImpl(accountRepository AccountRepository, drinkRepository DrinkRepository) *FoyerServiceImpl {
	return &FoyerServiceImpl{
		accountRepository: accountRepository,
		drinkRepository:   drinkRepository,
	}
}

func (service *FoyerServiceImpl) BuyDrink(userID string, drinkID string) (models.Account, error) {
	account, err := service.accountRepository.GetOne(userID)
	if err != nil {
		return account, err
	}

	drink, err := service.drinkRepository.GetOne(drinkID)
	if err != nil {
		return account, err
	}

	if err := account.BuyDrink(drink); err != nil {
		return account, err
	}

	if _, err := service.accountRepository.Update(account); err != nil {
		return account, err
	}

	return account, nil
}

func (service *FoyerServiceImpl) TopUpAccount(userID string, amount float64) (models.Account, error) {
	account, err := service.accountRepository.GetOne(userID)
	if err != nil {
		return account, err
	}

	if err := account.TopUpAccount(amount); err != nil {
		return account, err
	}

	if _, err := service.accountRepository.Update(account); err != nil {
		return account, err
	}

	return account, nil
}
