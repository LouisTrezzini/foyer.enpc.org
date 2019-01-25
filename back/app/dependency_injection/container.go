package dependency_injection

import (
	"errors"
	"github.com/LouisTrezzini/foyer.enpc.org/app/services"
)

type Container struct {
	AccountRepository services.AccountRepository
	DrinkRepository   services.DrinkRepository
	FoyerService      services.FoyerService
}

var container *Container

func GetContainer() *Container {
	return container
}

func InitContainer() error {
	if container != nil {
		return errors.New("container is already initialized")
	}

	newContainer, err := initializeContainer()
	if err != nil {
		return err
	}

	container = &newContainer

	return nil
}
