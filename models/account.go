package models

import (
	"encoding/json"
	"time"
)

type Account struct {
	UserID  string         `json:"user_id"`
	Balance float64        `json:"balance"`
	Stats   AccountStats   `json:"stats"`
	Events  []AccountEvent `json:"events"`
}

func NewAccount(userID string) Account {
	return Account{
		UserID: userID,
		Events: make([]AccountEvent, 0),
	}
}

func (account *Account) trackEvent(event Event) error {
	err := event.Apply(account)
	if err != nil {
		return err
	}

	account.saveEvent(event)

	return nil
}

func (account *Account) saveEvent(event Event) {
	payload, err := json.Marshal(event)
	if err != nil {
		panic(err)
	}
	accountEvent := AccountEvent{
		AccountID: account.UserID,
		Date:      time.Now(),
		EventName: event.Name(),
		Payload:   string(payload),
	}
	account.Events = append(account.Events, accountEvent)
}

func (account *Account) BuyDrink(drink Drink) error {
	return account.trackEvent(&BuyDrinkEvent{Drink: drink})
}

func (account *Account) TopUpAccount(amount float64) error {
	return account.trackEvent(&TopUpEvent{Amount: amount})
}
