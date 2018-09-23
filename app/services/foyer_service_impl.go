package services

import "github.com/LouisTrezzini/foyer.enpc.org/app/models"

type FoyerServiceImpl struct {
	AccountRepository AccountRepository
	DrinkRepository   DrinkRepository
}

func (service *FoyerServiceImpl) BuyDrink(userID string, drinkID string) (models.Account, error) {
	account, err := service.AccountRepository.GetOne(userID)
	if err != nil {
		return account, err
	}

	drink, err := service.DrinkRepository.GetOne(drinkID)
	if err != nil {
		return account, err
	}

	if err := account.BuyDrink(drink); err != nil {
		return account, err
	}

	if _, err := service.AccountRepository.Update(account); err != nil {
		return account, err
	}

	return account, nil
}

func (service *FoyerServiceImpl) TopUpAccount(userID string, amount float64) (models.Account, error) {
	account, err := service.AccountRepository.GetOne(userID)
	if err != nil {
		return account, err
	}

	if err := account.TopUpAccount(amount); err != nil {
		return account, err
	}

	if _, err := service.AccountRepository.Update(account); err != nil {
		return account, err
	}

	return account, nil
}
