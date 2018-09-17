package models

import "time"

type AccountEvent struct {
	AccountID string    `json:"account_id"`
	Date      time.Time `json:"date"`
	EventName string    `json:"event_name"`
	Payload   string    `json:"payload"`
}
