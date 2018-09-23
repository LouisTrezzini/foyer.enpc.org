package controllers

import (
	"github.com/revel/revel"
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
	DI "github.com/LouisTrezzini/foyer.enpc.org/app/dependency_injection"
)

type AccountController struct {
	*revel.Controller
}

func (controller *AccountController) Get(userID string) revel.Result {
	account, err := DI.GetContainer().AccountRepository.GetOne(userID)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}

func (controller *AccountController) GetAll() revel.Result {
	accounts := DI.GetContainer().AccountRepository.GetAll()

	return controller.RenderJSON(accounts)
}

func (controller *AccountController) BuyDrink(userID string, command models.BuyDrinkCommand) revel.Result {
	account, err := DI.GetContainer().FoyerService.BuyDrink(userID, command.DrinkID)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}

func (controller *AccountController) TopUp(userID string, command models.TopUpCommand) revel.Result {
	account, err := DI.GetContainer().FoyerService.TopUpAccount(userID, command.Amount)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}
