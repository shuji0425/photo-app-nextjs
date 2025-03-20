package services

import (
	"backend/config"
	"backend/internal/repositories"
	"backend/models"
	"context"
	"fmt"
	"mime/multipart"
	"time"

	"github.com/minio/minio-go/v7"
)

const bucketName = "photo-bucket"

// 全ての画像情報を取得
func FetchPhotoURLs() ([]models.Photo, error) {
	return repositories.GetPhotoURLs()
}

// アップロード
func UploadPhoto(file *multipart.FileHeader) (string, error) {
	fileName := fmt.Sprintf("%d-%s", time.Now().UnixNano(), file.Filename)

	// ファイルを一時保存
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("ファイルを開けませんでした: %w", err)
	}
	defer src.Close()

	// minioにアップロード
	_, err = config.MinioClient.PutObject(
		context.Background(), bucketName, fileName, src, file.Size,
		minio.PutObjectOptions{ContentType: "image/jpeg"},
	)

	if err != nil {
		return "", fmt.Errorf("minioアップロード失敗: %w", err)
	}

	// アップロード後のurl
	photoURL := fmt.Sprintf("http://localhost:9000/%s/%s", bucketName, fileName)

	// DBへ保存
	if err := repositories.SavePhoto(file.Filename, photoURL); err != nil {
		config.MinioClient.RemoveObject(context.Background(), bucketName, fileName, minio.RemoveObjectOptions{})

		return "", fmt.Errorf("DB保存失敗: %w", err)
	}

	return photoURL, nil
}
