package models

import (
	"fmt"
)

func BuildAccountAggregate(events []Event) (account Account, err error) {
	account = Account{}

	// Every event in the slice carries Event state change that has to be applied
	// on our Account, in order to rebuild its current state.
	for _, event := range events {
		if err := event.Apply(&account); err != nil {
			err = fmt.Errorf("building the aggregate: %v", err)
			return account, err
		}
	}

	return
}
