package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
	"github.com/pkg/errors"
	"sync"
)

type DrinkRepositoryInMemory struct {
	mutex     sync.RWMutex
	drinksMap map[string]models.Drink
}

func NewDrinkRepositoryInMemory() *DrinkRepositoryInMemory {
	repo := &DrinkRepositoryInMemory{
		drinksMap: map[string]models.Drink{},
	}

	repo.init()

	return repo
}

func (repo *DrinkRepositoryInMemory) init() {
	repo.drinksMap = make(map[string]models.Drink)

	{
		kro := models.NewDrink("pinte-kro")
		kro.Price = 1
		kro.Volume = 1
		repo.drinksMap["pinte-kro"] = kro
	}

	{
		delirium := models.NewDrink("delirium")
		delirium.Price = 2.5
		delirium.Volume = 0.25
		repo.drinksMap["delirium"] = delirium
	}
}

func (repo *DrinkRepositoryInMemory) GetOne(drinkID string) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	drink, ok := repo.drinksMap[drinkID]
	if !ok {
		return drink, errors.Errorf("drink %s not found", drinkID)
	}
	return drink, nil
}

func (repo *DrinkRepositoryInMemory) GetAll() ([]models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	drinks := make([]models.Drink, 0, len(repo.drinksMap))

	for _, drink := range repo.drinksMap {
		drinks = append(drinks, drink)
	}

	return drinks, nil
}

func (repo *DrinkRepositoryInMemory) Create(drink models.Drink) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.drinksMap[drink.Slug] = drink

	return repo.drinksMap[drink.Slug], nil
}

func (repo *DrinkRepositoryInMemory) Update(drink models.Drink) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.drinksMap[drink.Slug] = drink

	return repo.drinksMap[drink.Slug], nil
}

func (repo *DrinkRepositoryInMemory) Delete(drinkID string) error {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	delete(repo.drinksMap, drinkID)

	return nil
}
