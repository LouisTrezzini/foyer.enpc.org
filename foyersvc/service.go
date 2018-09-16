package foyersvc

import (
	"context"
)

type Service interface {
	GetAllAccounts(ctx context.Context) []Account
	GetAccount(ctx context.Context, userID string) Account

	BuyDrink(ctx context.Context, userID string, drinkID string) (Account, error)
	TopUpAccount(ctx context.Context, userID string, amount float64) (Account, error)
}