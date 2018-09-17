package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/models"
	"sync"
)

type inMemoryAccountRepository struct {
	mutex       sync.RWMutex
	accountsMap map[string]models.Account
}

func NewInMemoryAccountRepository() AccountRepository {
	repo := &inMemoryAccountRepository{
		accountsMap: map[string]models.Account{},
	}

	repo.init()

	return repo
}

func (repo *inMemoryAccountRepository) init() {
	repo.accountsMap = make(map[string]models.Account)
	repo.accountsMap["louis.trezzini"] = models.NewAccount("louis.trezzini")
	repo.accountsMap["guillaume.desforges"] = models.NewAccount("guillaume.desforges")
}

func (repo *inMemoryAccountRepository) GetOne(userID string) (models.Account, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	account, ok := repo.accountsMap[userID]
	if !ok {
		return models.NewAccount(userID), nil
	}
	return account, nil
}

func (repo *inMemoryAccountRepository) GetAll() []models.Account {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	accounts := make([]models.Account, 0, len(repo.accountsMap))

	for _, account := range repo.accountsMap {
		accounts = append(accounts, account)
	}

	return accounts
}

func (repo *inMemoryAccountRepository) Update(account models.Account) (models.Account, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.accountsMap[account.UserID] = account

	return repo.accountsMap[account.UserID], nil
}
