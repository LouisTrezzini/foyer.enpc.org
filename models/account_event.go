package models

import "time"

type AccountEvent struct {
	AccountID  string    `json:"account_id"`
	RecordedAt time.Time `json:"recorded_at"`
	EventName  string    `json:"event_name"`
	Payload    string    `json:"payload"`
}
