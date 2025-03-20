package main

import (
	"backend/config"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// 設定の読み込み
	config.ConnectDB()
	config.InitMinIO()

	// Ginのセットアップ
	r := gin.Default()
	routes.SetupRoutes(r)

	// サーバー起動
	r.Run(":8080")
}
