package services

import (
	"backend/config"
	"backend/internal/repositories"
	"backend/models"
	"backend/storage"
	"context"
	"fmt"
	"mime/multipart"
	"time"

	"github.com/minio/minio-go/v7"
)

const bucketName = "photo-bucket"

// 全ての画像情報を取得
func FetchPhotoURLs(limit, offset int) ([]models.Photo, error) {
	return repositories.GetPhotoURLs(limit, offset)
}

// アップロード
func UploadPhoto(file *multipart.FileHeader) (string, error) {
	fileName := fmt.Sprintf("%d-%s", time.Now().UnixNano(), file.Filename)
	// ファイルを開く
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("ファイルを開けませんでした: %w", err)
	}
	defer src.Close()

	// 画像をリサイズ(800px幅)
	resizedImage, err := ResizeImage(src, 800)
	if err != nil {
		return "", fmt.Errorf("リサイズ処理失敗: %w", err)
	}

	// minioにアップロード
	url, err := storage.UploadToMinio(fileName, resizedImage)
	if err != nil {
		return "", fmt.Errorf("MinIOアップロードエラー: %w", err)
	}

	// DBへ保存
	if err := repositories.SavePhoto(file.Filename, url); err != nil {
		config.MinioClient.RemoveObject(context.Background(), bucketName, fileName, minio.RemoveObjectOptions{})

		return "", fmt.Errorf("DB保存失敗: %w", err)
	}

	return url, nil
}
