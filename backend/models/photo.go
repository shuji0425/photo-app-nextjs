package models

// photosテーブルの構造体
type Photo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}
