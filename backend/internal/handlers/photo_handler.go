package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 画像情報取得
func GetPhotos(c *gin.Context) {
	photos, err := services.FetchPhotoURLs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "データ取得に失敗しました"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"photos": photos})
}
