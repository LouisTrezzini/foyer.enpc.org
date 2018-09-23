// +build wireinject
// The build tag makes sure the stub is not built in the final build.

package dependency_injection

import (
	"github.com/google/go-cloud/wire"
)

func initializeContainer() (Container, error) {
	panic(wire.Build(ProviderSet))
}
