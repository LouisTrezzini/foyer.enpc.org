package controllers

import (
	"github.com/astaxie/beego"
	"github.com/LouisTrezzini/foyer.enpc.org/services"
	"github.com/LouisTrezzini/foyer.enpc.org/models"
	"github.com/astaxie/beego/context"
)

type AccountController struct {
	beego.Controller
	AccountRepository services.AccountRepository
	FoyerService      services.FoyerService
}

// @Title Get
// @Description find account by userID
// @Param userID path string true "the userID you want to get"
// @Success 200 {object} models.Account
// @Failure 403 :userID is empty
// @router /:userID [get]
func (controller *AccountController) Get() {
	userID := controller.Ctx.Input.Param(":userID")

	account, err := controller.AccountRepository.GetOne(userID)

	if err != nil {
		controller.Data["json"] = err.Error()
	} else {
		controller.Data["json"] = account
	}
	controller.ServeJSON()
}

// @Title GetAll
// @Description get all objects
// @Success 200 {object} models.Account
// @router / [get]
func (controller *AccountController) GetAll() {
	accounts := controller.AccountRepository.GetAll()

	controller.Data["json"] = accounts
	controller.ServeJSON()
}

// @Title Buy a drink
// @Param userID path string true "the userID you want to affect"
// @Param command body {models.BuyDrinkCommand} true "the command"
// @router /:userID/buy-drink/ [post]
func (controller *AccountController) BuyDrink(userID string, command models.BuyDrinkCommand) (*models.Account, error) {
	account, err := controller.FoyerService.BuyDrink(userID, command.DrinkID)

	if err == models.NotFoundErr {
		return nil, context.NotFound
	}

	return &account, nil
}

// @Title Top up
// @Param userID path string true "the userID you want to affect"
// @Param command body {models.TopUpCommand} true "the command"
// @router /:userID/top-up/ [post]
func (controller *AccountController) TopUp(userID string, command models.TopUpCommand) (*models.Account, error) {
	account, err := controller.FoyerService.TopUpAccount(userID, command.Amount)

	if err == models.NotFoundErr {
		return nil, context.NotFound
	}

	return &account, nil
}
