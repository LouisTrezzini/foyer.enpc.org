package foyersvc

import (
	"encoding/json"
)

type Event interface {
	Name() string

	Apply(account *Account) error
}

func ToAccountEvent(event Event) AccountEvent {
	payload, err := json.Marshal(event)
	if err != nil {
		panic(err)
	}

	return AccountEvent{
		EventName: event.Name(),
		Payload: string(payload),
	}
}