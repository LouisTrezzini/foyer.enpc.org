package foyersvc

import (
	"sync"
	"context"
)

type inMemoryService struct {
	mutex       sync.RWMutex
	accountsMap map[string]Account
}

func NewInMemoryService() Service {
	return &inMemoryService{
		accountsMap: map[string]Account{},
	}
}

func (service *inMemoryService) GetAccount(ctx context.Context, userID string) Account {
	service.mutex.RLock()
	defer service.mutex.RUnlock()

	account, ok := service.accountsMap[userID]
	if !ok {
		return Account{}
	}
	return account
}

func (service *inMemoryService) GetAllAccounts(ctx context.Context) []Account {
	service.mutex.RLock()
	defer service.mutex.RUnlock()

	accounts := make([]Account, len(service.accountsMap))

	for _, account := range service.accountsMap {
		accounts = append(accounts, account)
	}

	return accounts
}

func (service *inMemoryService) BuyDrink(ctx context.Context, userID string, drinkID string) (Account, error) {
	service.mutex.RLock()
	defer service.mutex.RUnlock()

	account, ok := service.accountsMap[userID]
	if !ok {
		account = Account{}
	}

	account.BuyDrink(Drink{
		ID: drinkID,
		Price: 2,
		Volume: 1,
		Alcohol: 5,
	}) // FIXME

	service.accountsMap[userID] = account

	return account, nil
}

func (service *inMemoryService) TopUpAccount(ctx context.Context, userID string, amount float64) (Account, error) {
	service.mutex.RLock()
	defer service.mutex.RUnlock()

	account, ok := service.accountsMap[userID]
	if !ok {
		account = Account{}
	}

	account.TopUpAccount(amount)

	service.accountsMap[userID] = account

	return account, nil
}