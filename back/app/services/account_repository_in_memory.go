package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/errors"
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
	"sync"
)

type AccountRepositoryInMemory struct {
	mutex       sync.RWMutex
	accountsMap map[string]models.Account
}

func NewAccountRepositoryInMemory() *AccountRepositoryInMemory {
	repo := &AccountRepositoryInMemory{
		accountsMap: map[string]models.Account{},
	}

	repo.init()

	return repo
}

func (repo *AccountRepositoryInMemory) init() {
	repo.accountsMap = make(map[string]models.Account)
	repo.accountsMap["louis.trezzini"] = models.NewAccount("louis.trezzini")
	repo.accountsMap["guillaume.desforges"] = models.NewAccount("guillaume.desforges")
}

func (repo *AccountRepositoryInMemory) GetOne(userID string) (models.Account, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	account, ok := repo.accountsMap[userID]
	if !ok {
		return account, &errors.ErrAccountNotFound{UserID: userID}
	}
	return account, nil
}

func (repo *AccountRepositoryInMemory) GetOrCreate(userID string) (models.Account, error) {
	account, err := repo.GetOne(userID)
	if _, ok := err.(*errors.ErrAccountNotFound); ok {
		return repo.Update(models.NewAccount(userID))
	}

	return account, err
}

func (repo *AccountRepositoryInMemory) GetAll() ([]models.Account, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	accounts := make([]models.Account, 0, len(repo.accountsMap))

	for _, account := range repo.accountsMap {
		accounts = append(accounts, account)
	}

	return accounts, nil
}

func (repo *AccountRepositoryInMemory) Update(account models.Account) (models.Account, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.accountsMap[account.UserID] = account

	return repo.accountsMap[account.UserID], nil
}
