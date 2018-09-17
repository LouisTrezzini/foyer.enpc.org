package controllers

import (
	"github.com/astaxie/beego"
	"github.com/LouisTrezzini/foyer.enpc.org/services"
)

type AccountController struct {
	beego.Controller
	AccountRepository services.AccountRepository
	FoyerService      services.FoyerService
}

// @Title Get
// @Description find account by userId
// @Param	userId		path 	string	true		"the userId you want to get"
// @Success 200 {object} models.Account
// @Failure 403 :userId is empty
// @router /:userId [get]
func (controller *AccountController) Get() {
	objectId := controller.Ctx.Input.Param(":userId")
	if objectId != "" {
		ob, err := controller.AccountRepository.GetOne(objectId)
		if err != nil {
			controller.Data["json"] = err.Error()
		} else {
			controller.Data["json"] = ob
		}
	}
	controller.ServeJSON()
}

// @Title GetAll
// @Description get all objects
// @Success 200 {object} models.Account
// @Failure 403 :userId is empty
// @router / [get]
func (controller *AccountController) GetAll() {
	obs := controller.AccountRepository.GetAll()
	controller.Data["json"] = obs
	controller.ServeJSON()
}

// @Title Buy a drink
// @Param	userId		path 	string	true		"the userId you want to get"
// @Success 200 {object} models.Account
// @Failure 403 :userId is empty
// @router /:userId/buy-drink/ [post]
func (controller *AccountController) BuyDrink() {
	objectId := controller.Ctx.Input.Param(":userId")
	if objectId != "" {
		ob, err := controller.AccountRepository.GetOne(objectId)
		if err != nil {
			controller.Data["json"] = err.Error()
		} else {
			controller.Data["json"] = ob
		}
	}
	controller.ServeJSON()
}
