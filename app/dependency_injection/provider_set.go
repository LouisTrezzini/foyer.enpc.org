package dependency_injection

import (
	"github.com/google/go-cloud/wire"
	"github.com/LouisTrezzini/foyer.enpc.org/app/services"
	"github.com/LouisTrezzini/foyer.enpc.org/app/controllers"
)

var ServicesProviderSet = wire.NewSet(
	services.NewInMemoryAccountRepository,
	services.NewInMemoryDrinkRepository,
	services.FoyerServiceImpl{},
	wire.Bind(new(services.FoyerService), new(services.FoyerServiceImpl)),
)

var ControllersProviderSet = wire.NewSet(
	controllers.NewAccountController,
)

var ProviderSet = wire.NewSet(
	ServicesProviderSet,
	ControllersProviderSet,

	wire.Bind(new(services.AccountRepository), new(services.InMemoryAccountRepository)),
	wire.Bind(new(services.DrinkRepository), new(services.InMemoryDrinkRepository)),
)
