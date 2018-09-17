package routers

import (
	"github.com/LouisTrezzini/foyer.enpc.org/controllers"

	"github.com/astaxie/beego"
	"github.com/LouisTrezzini/foyer.enpc.org/services"
)

func init() {
	accountRepository := services.NewInMemoryAccountRepository()
	foyerService := services.NewFoyerServiceImpl(accountRepository)

	louis, _ := accountRepository.GetOne("louis.trezzini")

	louis, _ = foyerService.TopUpAccount(louis, 10)
	louis, _ = foyerService.BuyDrink(louis, "pinte-kro")
	louis, _ = foyerService.BuyDrink(louis, "delirium")

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
