package controllers

import (
	"github.com/revel/revel"
	"github.com/LouisTrezzini/foyer.enpc.org/app/services"
	"github.com/LouisTrezzini/foyer.enpc.org/app/models"
)

type AccountController struct {
	*revel.Controller
	accountRepository services.AccountRepository
	foyerService      services.FoyerService
}

func NewAccountController(accountRepository services.AccountRepository, foyerService services.FoyerService) AccountController {
	return AccountController{
		accountRepository: accountRepository,
		foyerService:      foyerService,
	}
}

func (controller *AccountController) Get(userID string) revel.Result {
	account, err := controller.accountRepository.GetOne(userID)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}

func (controller *AccountController) GetAll() revel.Result {
	accounts := controller.accountRepository.GetAll()

	return controller.RenderJSON(accounts)
}

func (controller *AccountController) BuyDrink(userID string, command models.BuyDrinkCommand) revel.Result {
	account, err := controller.foyerService.BuyDrink(userID, command.DrinkID)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}

func (controller *AccountController) TopUp(userID string, command models.TopUpCommand) revel.Result {
	account, err := controller.foyerService.TopUpAccount(userID, command.Amount)
	if err != nil {
		return controller.RenderError(err)
	}

	return controller.RenderJSON(account)
}
