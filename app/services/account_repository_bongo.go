package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/errors"
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
	"github.com/globalsign/mgo/bson"
	"github.com/go-bongo/bongo"
)

type AccountRepositoryBongo struct {
	Connection *bongo.Connection
}

func (repo *AccountRepositoryBongo) GetOne(userID string) (models.Account, error) {
	account := models.Account{}

	err := repo.Connection.Collection("accounts").FindOne(bson.M{"userid": userID}, &account)
	if err != nil {
		return account, &errors.ErrAccountNotFound{UserID: userID}
	}

	return account, err
}

func (repo *AccountRepositoryBongo) GetOrCreate(userID string) (models.Account, error) {
	account, err := repo.GetOne(userID)
	if _, ok := err.(*errors.ErrAccountNotFound); ok {
		return repo.Update(models.NewAccount(userID))
	}

	return account, err
}

func (repo *AccountRepositoryBongo) GetAll() ([]models.Account, error) {
	count, err := repo.Connection.Collection("accounts").Collection().Count()
	if err != nil {
		return nil, err
	}
	results := repo.Connection.Collection("accounts").Find(bson.M{})

	accounts := make([]models.Account, 0, count)
	account := models.Account{}

	for results.Next(&account) {
		accounts = append(accounts, account)
	}

	return accounts, nil
}

func (repo *AccountRepositoryBongo) Update(account models.Account) (models.Account, error) {
	if err := repo.Connection.Collection("accounts").Save(&account); err != nil {
		return account, err
	}

	return account, nil
}
