package foyersvc

import (
	"context"
	"time"

	"github.com/go-kit/kit/log"
)

// Middleware describes a service (as opposed to endpoint) middleware.
type Middleware func(Service) Service

func LoggingMiddleware(logger log.Logger) Middleware {
	return func(next Service) Service {
		return &loggingMiddleware{
			next:   next,
			logger: logger,
		}
	}
}

type loggingMiddleware struct {
	next   Service
	logger log.Logger
}

func (mw loggingMiddleware) GetAccount(ctx context.Context, userID string) Account {
	defer func(begin time.Time) {
		mw.logger.Log("method", "GetAccount", "UserID", userID, "took", time.Since(begin))
	}(time.Now())
	return mw.next.GetAccount(ctx, userID)
}

func (mw loggingMiddleware) GetAllAccounts(ctx context.Context) []Account {
	defer func(begin time.Time) {
		mw.logger.Log("method", "GetAllAccounts", "took", time.Since(begin))
	}(time.Now())
	return mw.next.GetAllAccounts(ctx)
}

func (mw loggingMiddleware) BuyDrink(ctx context.Context, userID string, drinkID string) (account Account, err error) {
	defer func(begin time.Time) {
		mw.logger.Log("method", "BuyDrink", "UserID", userID, "DrinkID", drinkID, "took", time.Since(begin), "err", err)
	}(time.Now())
	account, err = mw.next.BuyDrink(ctx, userID, drinkID)
	return account, err
}

func (mw loggingMiddleware) TopUpAccount(ctx context.Context, userID string, amount float64) (account Account, err error) {
	defer func(begin time.Time) {
		mw.logger.Log("method", "TopUp()", "UserID", userID, "DrinkID", amount, "took", time.Since(begin), "err", err)
	}(time.Now())
	account, err = mw.next.TopUpAccount(ctx, userID, amount)
	return account, err
}


