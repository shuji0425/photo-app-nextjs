package handlers

import (
	"backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 画像情報取得
func GetPhotos(c *gin.Context) {
	limitParam := c.Query("limit")
	limit, err := strconv.Atoi(limitParam)
	// エラーとlimitが0以下は0とする
	if err != nil || limit <= 0 {
		limit = 0
	}

	photos, err := services.FetchPhotoURLs(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "データ取得に失敗しました"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"photos": photos})
}
