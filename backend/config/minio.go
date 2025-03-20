package config

import (
	"log"
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

// グローバル変数
var MinioClient *minio.Client

// minioの初期化
func InitMinIO() {
	endpoint := "localhost:9000"
	accessKeyID := os.Getenv("MINIO_ROOT_USER")
	secretAccessKey := os.Getenv("MINIO_ROOT_PASSWORD")

	var err error
	MinioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: false,
	})

	if err != nil {
		log.Fatal("🚨 MinIO接続エラー:", err)
	}

	log.Println("✅ MinIO接続成功")
}
