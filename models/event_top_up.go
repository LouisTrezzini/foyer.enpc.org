package models

type TopUp struct {
	Amount float64 `json:"amount"`
}

func (event TopUp) Name() string {
	return "top_up"
}

func (event TopUp) Apply(account *Account) error {
	account.Balance += event.Amount

	return nil
}
