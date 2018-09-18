package services

import (
	"github.com/LouisTrezzini/foyer.enpc.org/models"
	"sync"
	)

type inMemoryDrinkRepository struct {
	mutex     sync.RWMutex
	drinksMap map[string]models.Drink
}

func NewInMemoryDrinkRepository() DrinkRepository {
	repo := &inMemoryDrinkRepository{
		drinksMap: map[string]models.Drink{},
	}

	repo.init()

	return repo
}

func (repo *inMemoryDrinkRepository) init() {
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

func (repo *inMemoryDrinkRepository) GetOne(drinkID string) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	drink, ok := repo.drinksMap[drinkID]
	if !ok {
		return drink, models.NotFoundErr
	}
	return drink, nil
}

func (repo *inMemoryDrinkRepository) GetAll() []models.Drink {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	drinks := make([]models.Drink, 0, len(repo.drinksMap))

	for _, drink := range repo.drinksMap {
		drinks = append(drinks, drink)
	}

	return drinks
}

func (repo *inMemoryDrinkRepository) Create(drink models.Drink) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.drinksMap[drink.ID] = drink

	return repo.drinksMap[drink.ID], nil
}

func (repo *inMemoryDrinkRepository) Update(drink models.Drink) (models.Drink, error) {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	repo.drinksMap[drink.ID] = drink

	return repo.drinksMap[drink.ID], nil
}

func (repo *inMemoryDrinkRepository) Delete(drinkID string) error {
	repo.mutex.RLock()
	defer repo.mutex.RUnlock()

	delete(repo.drinksMap, drinkID)

	return nil
}
