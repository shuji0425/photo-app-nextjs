package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	if err := godotenv.Load(".env"); err != nil {
		log.Println(".envが見つかりません。環境変数を直接使用します。")
	}
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("DB接続エラー:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("DB応答なし:", err)
	}

	fmt.Println("DB接続成功")

	// テーブル作成
	createTableQuery := `
	CREATE TABLE IF NOT EXISTS photos (
	    id SERIAL PRIMARY KEY,
	    title TEXT NOT NULL,
	    url TEXT NOT NULL,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = DB.Exec(createTableQuery)
	if err != nil {
		log.Fatal("🚨 テーブル作成エラー:", err)
	} else {
		fmt.Println("✅ `photos` テーブルの確認完了")
	}
}
