package models

type TopUpEvent struct {
	Amount float64 `json:"amount"`
}

func (event *TopUpEvent) Name() string {
	return "top_up"
}

func (event *TopUpEvent) Apply(account *Account) error {
	account.Balance += event.Amount

	return nil
}

type TopUpCommand struct {
	Amount float64 `json:"amount"`
}
