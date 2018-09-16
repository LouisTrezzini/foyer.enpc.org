package foyersvc

type Drink struct {
	ID       string  `json:"id"`
	Price    float64 `json:"price"`
	ImageUrl string  `json:"image_url"`
	Alcohol float64 `json:"alcohol"`
	Volume  float64 `json:"volume"`
}

type Account struct {
	UserID  string       `json:"user_id"`
	Balance float64      `json:"balance"`
	Stats   AccountStats `json:"stats"`
	Events  []AccountEvent
}

func (account *Account) trackEvent(event Event) {
	accountEvent := ToAccountEvent(event)
	account.Events = append(account.Events, accountEvent)

	event.Apply(account)
}

func (account *Account) BuyDrink(drink Drink) {
	account.trackEvent(BuyDrink{Drink: drink})
}

func (account *Account) TopUpAccount(amount float64) {
	account.trackEvent(TopUp{Amount: amount})
}

type AccountStats struct {
	DrinksCount int     `json:"drinks_count"`
	TotalVolume float64 `json:"total_volume"`
	TotalSpent  float64 `json:"total_spent"`
}

type AccountEvent struct {
	AccountID string `json:"account_id"`
	EventName string `json:"event_name"`
	Payload   string `json:"payload"`
}
