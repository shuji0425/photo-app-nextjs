package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPhotos(c *gin.Context) {
	photos, err := services.GetAllPhotos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "データ取得に失敗しました"})
		return
	}
	c.JSON(http.StatusOK, photos)
}
