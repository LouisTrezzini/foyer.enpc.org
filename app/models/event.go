package models

type Event interface {
	Name() string

	Apply(account *Account) error
}
