package services

import (
	"bytes"
	"fmt"
	"image"
	"mime/multipart"

	"github.com/chai2010/webp"
	"github.com/nfnt/resize"
)

// 画像をリサイズ
func ResizeImage(file multipart.File, width uint) (*bytes.Buffer, error) {
	// 画像をデコード
	img, _, err := image.Decode(file)
	if err != nil {
		return nil, fmt.Errorf("画像のデコードに失敗: %w", err)
	}

	// リサイズ処理（アスペクト比は保持）
	resizedImage := resize.Resize(width, 0, img, resize.Lanczos3)

	// メモリ上でwebpにエンコード
	var buffer bytes.Buffer
	err = webp.Encode(&buffer, resizedImage, &webp.Options{Quality: 80})
	if err != nil {
		return nil, fmt.Errorf("JPEGエンコード失敗: %w", err)
	}

	return &buffer, nil
}
