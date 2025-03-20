package repositories

import (
	"backend/config"
	"backend/models"
	"database/sql"
	"log"
	"os"
)

// 画像情報を取得
func GetPhotoURLs() ([]models.Photo, error) {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := config.DB.Query("SELECT id, title, url FROM photos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var photos []models.Photo
	for rows.Next() {
		// タイトルとURLがnullの場合を考慮
		var photo models.Photo
		var title sql.NullString
		var url sql.NullString

		// 確認
		if err := rows.Scan(&photo.ID, &title, &url); err != nil {
			return nil, err
		}

		// NULLの場合は空文字を代入
		photo.Title = title.String
		photo.URL = url.String

		photos = append(photos, photo)
	}

	return photos, nil
}

// 写真データをDBへ保存
func SavePhoto(title, url string) error {
	_, err := config.DB.Exec("INSERT INTO photos (title, url) VALUES ($1, $2)", title, url)
	if err != nil {
		log.Println("SavePhoto: データ保存エラー", err)
		return err
	}

	return nil
}
