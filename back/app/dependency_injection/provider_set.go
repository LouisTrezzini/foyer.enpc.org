package dependency_injection

import (
	"github.com/LouisTrezzini/foyer.enpc.org/app/services"
	"github.com/google/go-cloud/wire"
)

var ServicesProviderSet = wire.NewSet(
	services.FoyerServiceImpl{},
	wire.Bind(new(services.FoyerService), new(services.FoyerServiceImpl)),

	Container{},
)

var ProviderSet = wire.NewSet(
	ServicesProviderSet,

	NewBongoConnection,

	services.AccountRepositoryBongo{},
	services.NewDrinkRepositoryInMemory,

	wire.Bind(new(services.AccountRepository), new(services.AccountRepositoryBongo)),
	wire.Bind(new(services.DrinkRepository), new(services.DrinkRepositoryInMemory)),
)

var InMemoryProviderSet = wire.NewSet(
	ServicesProviderSet,

	services.NewAccountRepositoryInMemory,
	services.NewDrinkRepositoryInMemory,

	wire.Bind(new(services.AccountRepository), new(services.AccountRepositoryInMemory)),
	wire.Bind(new(services.DrinkRepository), new(services.DrinkRepositoryInMemory)),
)
