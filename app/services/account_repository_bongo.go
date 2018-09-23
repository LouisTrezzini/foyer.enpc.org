package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
	"github.com/go-bongo/bongo"
	"github.com/globalsign/mgo/bson"
	"github.com/LouisTrezzini/foyer.enpc.org/app/errors"
)

type AccountRepositoryBongo struct {
	Connection *bongo.Connection
}

func (repo *AccountRepositoryBongo) GetOne(userID string) (models.Account, error) {
	account := models.Account{}

	err := repo.Connection.Collection("accounts").FindOne(bson.M{"UserID": userID}, &account)
	if err != nil {
		return models.Account{}, &errors.ErrAccountNotFound{UserID: userID}
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
