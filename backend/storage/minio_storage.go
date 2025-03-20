package storage

import (
	"backend/config"
	"bytes"
	"context"
	"fmt"

	"github.com/minio/minio-go/v7"
)

const bucketName = "photo-bucket"

// minioに画像をアップロード
func UploadToMinio(fileName string, imageBuffer *bytes.Buffer) (string, error) {
	// minioにアップロード
	uploadInfo, err := config.MinioClient.PutObject(
		context.Background(),
		bucketName,
		fileName,
		bytes.NewBuffer(imageBuffer.Bytes()),
		int64(imageBuffer.Len()),
		minio.PutObjectOptions{ContentType: "image/jpeg"},
	)

	if err != nil {
		return "", fmt.Errorf("minioアップロード失敗: %w", err)
	}

	// アップロード後のurl
	photoURL := fmt.Sprintf("http://localhost:9000/%s/%s", bucketName, uploadInfo.Key)

	return photoURL, nil
}
