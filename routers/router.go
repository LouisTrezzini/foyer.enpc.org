package routers

import (
	"github.com/LouisTrezzini/foyer.enpc.org/controllers"

	"github.com/astaxie/beego"
	"github.com/LouisTrezzini/foyer.enpc.org/services"
)

func init() {
	accountRepository := services.NewInMemoryAccountRepository()
	drinkRepository := services.NewInMemoryDrinkRepository()
	foyerService := services.NewFoyerServiceImpl(accountRepository, drinkRepository)

	foyerService.TopUpAccount("louis.trezzini", 10)
	foyerService.BuyDrink("louis.trezzini", "pinte-kro")
	foyerService.BuyDrink("louis.trezzini", "delirium")

	ns := beego.NewNamespace("/v1",
		beego.NSNamespace("/accounts",
			beego.NSInclude(&controllers.AccountController{
				AccountRepository: accountRepository,
				FoyerService: foyerService,
			}),
		),
	)
	beego.AddNamespace(ns)
}
