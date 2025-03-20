package services

import (
	"backend/internal/repositories"
	"backend/models"
)

// 全ての画像情報を取得
func GetAllPhotos() ([]models.Photo, error) {
	return repositories.FetchPhotos()
}
