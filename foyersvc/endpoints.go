package foyersvc

import (
	"context"
	"github.com/go-kit/kit/endpoint"
)

// Endpoints collects all of the endpoints that compose a profile service. It's
// meant to be used as a helper struct, to collect all of the endpoints into a
// single parameter.
//
// In a server, it's useful for functions that need to operate on a per-endpoint
// basis. For example, you might pass an Endpoints to a function that produces
// an http.Handler, with each method (endpoint) wired up to a specific path. (It
// is probably a mistake in design to invoke the Service methods on the
// Endpoints struct in a server.)
//
// In a client, it's useful to collect individually constructed endpoints into a
// single type that implements the Service interface. For example, you might
// construct individual endpoints using transport/http.NewClient, combine them
// into an Endpoints, and return it to the caller as a Service.
type Endpoints struct {
	GetAccountEndpoint     endpoint.Endpoint
	GetAllAccountsEndpoint endpoint.Endpoint
	BuyDrinkEndpoint       endpoint.Endpoint
	TopUpAccountEndpoint   endpoint.Endpoint
}

// MakeServerEndpoints returns an Endpoints struct where each endpoint invokes
// the corresponding method on the provided service. Useful in a foyersvc
// server.
func MakeServerEndpoints(s Service) Endpoints {
	return Endpoints{
		GetAccountEndpoint:     MakeGetAccountEndpoint(s),
		GetAllAccountsEndpoint: MakeGetAllAccountsEndpoint(s),
		BuyDrinkEndpoint:       MakeBuyDrinkEndpoint(s),
		TopUpAccountEndpoint:   MakeTopUpAccountEndpoint(s),
	}
}

func MakeGetAccountEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(getAccountRequest)
		account := s.GetAccount(ctx, req.UserID)
		return getAccountResponse{Account: account}, nil
	}
}

func MakeGetAllAccountsEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		accounts := s.GetAllAccounts(ctx)
		return getAllAccountsResponse{Accounts: accounts}, nil
	}
}

func MakeBuyDrinkEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(buyDrinkRequest)
		account, err := s.BuyDrink(ctx, req.UserID, req.DrinkID)
		return buyDrinkResponse{Account: account, Err: err}, err
	}
}

func MakeTopUpAccountEndpoint(s Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req := request.(topUpRequest)
		account, err := s.TopUpAccount(ctx, req.UserID, req.Amount)
		return topUpAccountResponse{Account: account, Err: err}, err
	}
}

// We have two options to return errors from the business logic.
//
// We could return the error via the endpoint itself. That makes certain things
// a little bit easier, like providing non-200 HTTP responses to the client. But
// Go kit assumes that endpoint errors are (or may be treated as)
// transport-domain errors. For example, an endpoint error will count against a
// circuit breaker error count.
//
// Therefore, it's often better to return service (business logic) errors in the
// response object. This means we have to do a bit more work in the HTTP
// response encoder to detect e.g. a not-found error and provide a proper HTTP
// status code. That work is done with the errorer interface, in transport.go.
// Response types that may contain business-logic errors implement that
// interface.

type getAccountRequest struct {
	UserID string
}

type getAccountResponse struct {
	Account Account `json:"account,omitempty"`
}

func (r getAccountResponse) error() error { return nil }

type getAllAccountsRequest struct {}

type getAllAccountsResponse struct {
	Accounts []Account `json:"accounts,omitempty"`
}

func (r getAllAccountsResponse) error() error { return nil }

type buyDrinkRequest struct {
	UserID  string
	DrinkID string
}

type topUpRequest struct {
	UserID string
	Amount float64
}

type accountEventResponse struct {
	Account Account `json:"account,omitempty"`
	Err     error   `json:"error,omitempty"`
}

func (r accountEventResponse) error() error { return r.Err }
