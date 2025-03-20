package routes

import (
	"backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/api/photos", handlers.GetPhotos)
	r.POST("/api/upload", handlers.UploadPhotos)
}
