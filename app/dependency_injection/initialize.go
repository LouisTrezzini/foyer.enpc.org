// +build wireinject
// The build tag makes sure the stub is not built in the final build.

package dependency_injection

import (
		"github.com/google/go-cloud/wire"
		"github.com/LouisTrezzini/foyer.enpc.org/app/controllers"
)

func initializeAccountController() (controllers.AccountController, error) {
	panic(wire.Build(ProviderSet))
}
