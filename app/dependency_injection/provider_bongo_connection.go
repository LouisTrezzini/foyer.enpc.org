package dependency_injection

import "github.com/go-bongo/bongo"

func NewBongoConnection() (*bongo.Connection, error) {
	config := &bongo.Config{
		ConnectionString: "localhost",
		Database:         "bongotest",
	}

	return bongo.Connect(config)
}