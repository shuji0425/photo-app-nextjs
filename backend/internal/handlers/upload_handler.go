package handlers

import (
	"backend/internal/services"
	"mime/multipart"
	"net/http"
	"sync"

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

	// 並列アップロード
	var wg sync.WaitGroup
	uploadedURLs := make([]string, len(files))
	errors := make([]error, len(files))

	for i, file := range files {
		wg.Add(1)
		go func(index int, f *multipart.FileHeader) {
			defer wg.Done()
			url, err := services.UploadPhoto(f)
			if err != nil {
				errors[index] = err
				return
			}
			uploadedURLs[index] = url
		}(i, file)
	}

	wg.Wait()

	// エラーがあれば返却
	var errList []string
	for _, err := range errors {
		if err != nil {
			errList = append(errList, err.Error())
		}
	}

	if len(errList) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"errors": "errList"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"error": "アップロード成功", "files": uploadedURLs})
}
