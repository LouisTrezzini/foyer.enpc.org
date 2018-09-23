package dependency_injection

import (
	"github.com/google/go-cloud/wire"
	"github.com/LouisTrezzini/foyer.enpc.org/app/services"
	)

var ServicesProviderSet = wire.NewSet(
	services.NewInMemoryAccountRepository,
	services.NewInMemoryDrinkRepository,
	services.FoyerServiceImpl{},
	wire.Bind(new(services.FoyerService), new(services.FoyerServiceImpl)),

	Container{},
)

var ProviderSet = wire.NewSet(
	ServicesProviderSet,

	wire.Bind(new(services.AccountRepository), new(services.InMemoryAccountRepository)),
	wire.Bind(new(services.DrinkRepository), new(services.InMemoryDrinkRepository)),
)
