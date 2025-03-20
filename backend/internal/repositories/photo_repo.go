package repositories

import (
	"backend/config"
	"backend/models"
)

// 画像情報を取得
func FetchPhotos() ([]models.Photo, error) {
	rows, err := config.DB.Query("SELECT * FROM photos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var photos []models.Photo
	for rows.Next() {
		var p models.Photo
		if err := rows.Scan(&p.ID, &p.Title, &p.URL); err != nil {
			return nil, err
		}
		photos = append(photos, p)
	}

	return photos, nil
}
