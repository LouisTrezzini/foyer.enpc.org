package errors

import "fmt"

type ErrAccountNotFound struct {
	UserID string
}

func (err *ErrAccountNotFound) Error() string {
	return fmt.Sprintf( "account %s not found", err.UserID)
}

func (err *ErrAccountNotFound) HTTPCode() int {
	return 404
}
