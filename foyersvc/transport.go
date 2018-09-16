package foyersvc

// The foyersvc is just over HTTP, so we just have a single transport.go.

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/go-kit/kit/log"
	httptransport "github.com/go-kit/kit/transport/http"
)

var (
	// ErrBadRouting is returned when an expected path variable is missing.
	// It always indicates programmer error.
	ErrBadRouting = errors.New("inconsistent mapping between route and handler (programmer error)")
)

// MakeHTTPHandler mounts all of the service endpoints into an http.Handler.
// Useful in a foyersvc server.
func MakeHTTPHandler(s Service, logger log.Logger) http.Handler {
	r := mux.NewRouter()
	e := MakeServerEndpoints(s)
	options := []httptransport.ServerOption{
		httptransport.ServerErrorLogger(logger),
		httptransport.ServerErrorEncoder(encodeError),
	}

	r.Methods("GET").Path("/accounts/").Handler(httptransport.NewServer(
		e.GetAllAccountsEndpoint,
		decodeGetAllAccountsRequest,
		encodeResponse,
		options...,
	))
	r.Methods("GET").Path("/accounts/{id}").Handler(httptransport.NewServer(
		e.GetAccountEndpoint,
		decodeGetAccountRequest,
		encodeResponse,
		options...,
	))
	r.Methods("POST").Path("/accounts/{id}/buy_drink/").Handler(httptransport.NewServer(
		e.BuyDrinkEndpoint,
		decodeBuyDrinkRequest,
		encodeResponse,
		options...,
	))
	r.Methods("POST").Path("/accounts/{id}/top_up/").Handler(httptransport.NewServer(
		e.TopUpAccountEndpoint,
		decodeTopUpRequest,
		encodeResponse,
		options...,
	))
	return r
}

func decodeGetAccountRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, ErrBadRouting
	}
	return getAccountRequest{UserID: id}, nil
}

func decodeGetAllAccountsRequest(_ context.Context, _ *http.Request) (request interface{}, err error) {
	return getAllAccountsRequest{}, nil
}

func decodeBuyDrinkRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, ErrBadRouting
	}
	var address BuyDrink
	if err := json.NewDecoder(r.Body).Decode(&address); err != nil {
		return nil, err
	}
	return buyDrinkRequest{
		UserID:  id,
	}, nil
}

func decodeTopUpRequest(_ context.Context, r *http.Request) (request interface{}, err error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return nil, ErrBadRouting
	}
	var address TopUp
	if err := json.NewDecoder(r.Body).Decode(&address); err != nil {
		return nil, err
	}
	return topUpRequest{
		UserID: id,
		Amount: address.Amount,
	}, nil
}

// errorer is implemented by all concrete response types that may contain
// errors. It allows us to change the HTTP response code without needing to
// trigger an endpoint (transport-level) error. For more information, read the
// big comment in endpoints.go.
type errorer interface {
	error() error
}

// encodeResponse is the common method to encode all response types to the
// client. I chose to do it this way because, since we're using JSON, there's no
// reason to provide anything more specific. It's certainly possible to
// specialize on a per-response (per-method) basis.
func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if e, ok := response.(errorer); ok && e.error() != nil {
		// Not a Go kit transport error, but a business-logic error.
		// Provide those as HTTP errors.
		encodeError(ctx, e.error(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

func encodeError(_ context.Context, err error, w http.ResponseWriter) {
	if err == nil {
		panic("encodeError with nil error")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(codeFrom(err))
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}

func codeFrom(err error) int {
	switch err {
	case ErrNotFound:
		return http.StatusNotFound
	case ErrAlreadyExists, ErrInconsistentIDs:
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}
