package services

import (
	"backend/config"
	"backend/internal/repositories"
	"backend/models"
	"context"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/minio/minio-go/v7"
)

const bucketName = "photo-bucket"

var tempDir = filepath.Join("uploads", "tmp")

// 全ての画像情報を取得
func FetchPhotoURLs() ([]models.Photo, error) {
	return repositories.GetPhotoURLs()
}

// アップロード
func UploadMultiplePhotos(files []*multipart.FileHeader) ([]string, error) {
	uploadedFiles := []string{}

	if _, err := os.Stat(tempDir); os.IsNotExist(err) {
		fmt.Println("ℹ️ `uploads/tmp/` が存在しないため作成します")
		if err := os.MkdirAll(tempDir, os.ModePerm); err != nil {
			fmt.Println("❌ ディレクトリ作成に失敗:", err)
			return nil, err
		}
	}

	// MinIO クライアントが `nil` でないかチェック
	if config.MinioClient == nil {
		fmt.Println("❌ MinIO クライアントが初期化されていません！")
		return nil, fmt.Errorf("MinIO クライアントが `nil` のため、アップロードできません")
	}

	for _, file := range files {
		fileName := fmt.Sprintf("%d-%s", time.Now().UnixNano(), file.Filename)
		filePath := filepath.Join(tempDir, fileName)

		// ファイルを一時保存
		src, err := file.Open()
		if err != nil {
			fmt.Println("❌ Failed to open file:", err)
			return nil, err
		}
		defer src.Close()

		out, err := os.Create(filePath)
		if err != nil {
			fmt.Println("❌ Failed to create temp file:", err)
			return nil, err
		}
		defer out.Close()

		_, err = out.ReadFrom(src)
		if err != nil {
			fmt.Println("❌ Failed to write temp file:", err)
			return nil, err
		}

		// minioにアップロード
		_, err = config.MinioClient.FPutObject(
			context.Background(), bucketName, fileName, filePath, minio.PutObjectOptions{ContentType: "image/jpeg"},
		)

		if err != nil {
			fmt.Println("❌ MinIO upload failed:", err)
			return nil, err
		}

		// アップロード後のurl
		photoURL := fmt.Sprintf("http://localhost:9000/%s/%s", bucketName, fileName)

		// DBへ保存
		if err := repositories.SavePhoto(file.Filename, photoURL); err != nil {
			fmt.Println("❌ Failed to save photo to DB:", err)

			// DBへの保存に失敗したときはminioを削除
			fmt.Println("🗑️ Cleaning up MinIO file:", fileName)
			deleteErr := config.MinioClient.RemoveObject(context.Background(), bucketName, fileName, minio.RemoveObjectOptions{})
			if deleteErr != nil {
				fmt.Println("❌ MinIO cleanup failed:", deleteErr)
			}

			return nil, err
		}

		// 一時ファイルからも削除
		err = os.Remove(filePath)

		uploadedFiles = append(uploadedFiles, photoURL)
	}

	return uploadedFiles, nil
}
