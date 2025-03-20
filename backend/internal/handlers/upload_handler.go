package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 画像アップロード
func UploadPhotos(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "画像の取得に失敗しました"})
		return
	}

	files := form.File["photos"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "画像が選択されていません"})
		return
	}

	uploadedURLs, err := services.UploadMultiplePhotos(files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "アップロードに失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"error": "アップロード成功", "files": uploadedURLs})
}
